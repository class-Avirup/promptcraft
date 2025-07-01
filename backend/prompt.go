package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Structs
type HookRequest struct {
	Product  string `json:"product"`
	Audience string `json:"audience"`
}

type GroqResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

type ChatRequest struct {
	Prompt string `json:"prompt"`
}

type Subscriber struct {
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
}

type Prompt struct {
	Title       string                 `json:"title"`
	Description string                 `json:"description"`
	Prompt      string                 `json:"prompt"`
	UseCases    []string               `json:"useCases"`
	Example     map[string]interface{} `json:"example"`
	CreatedAt   time.Time              `json:"createdAt"`
	Tags        []string               `json:"tags"`
}

type UnsubscribeRequest struct {
	Email string `json:"email" binding:"required,email"`
}

var userCollection *mongo.Collection
var promptCollection *mongo.Collection

func initMongo() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("❌ MongoDB connection failed:", err)
	}
	db := client.Database("promptcraft")
	promptCollection = db.Collection("prompts")
	userCollection = db.Collection("subscribers")
}

// Handlers
func handleSubscribe(c *gin.Context) {
	var subscriber Subscriber
	if err := c.BindJSON(&subscriber); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	if subscriber.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	var existing Subscriber
	err := userCollection.FindOne(context.TODO(), bson.M{"email": subscriber.Email}).Decode(&existing)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already subscribed"})
		return
	}
	if err != mongo.ErrNoDocuments {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	subscriber.CreatedAt = time.Now()
	_, insertErr := userCollection.InsertOne(context.TODO(), subscriber)
	if insertErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save subscriber"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully subscribed!"})
}

func handleAddPrompt(c *gin.Context) {
	var prompt Prompt
	if err := c.BindJSON(&prompt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	prompt.CreatedAt = time.Now()
	_, err := promptCollection.InsertOne(context.TODO(), prompt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save prompt"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Prompt submitted!"})
}

func handleGetPrompts(c *gin.Context) {
	cursor, err := promptCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch prompts"})
		return
	}
	defer cursor.Close(context.TODO())

	var prompts []Prompt
	if err := cursor.All(context.TODO(), &prompts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode prompts"})
		return
	}

	c.JSON(http.StatusOK, prompts)
}

func handleGetPromptByTitle(c *gin.Context) {
	title := c.Query("title")
	if title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title parameter is required"})
		return
	}

	var prompt Prompt
	err := promptCollection.FindOne(context.TODO(), bson.M{"title": title}).Decode(&prompt)
	if err == mongo.ErrNoDocuments {
		c.JSON(http.StatusNotFound, gin.H{"error": "Prompt not found"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, prompt)
}

func handleGetLatestPrompts(c *gin.Context) {
	opts := options.Find().SetSort(bson.D{{"createdAt", -1}}).SetLimit(3)

	cursor, err := promptCollection.Find(context.TODO(), bson.M{}, opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch prompts"})
		return
	}
	defer cursor.Close(context.TODO())

	var prompts []Prompt
	if err := cursor.All(context.TODO(), &prompts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode prompts"})
		return
	}

	c.JSON(http.StatusOK, prompts)
}

func handleCopyHookWriter(c *gin.Context) {
	var req HookRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing product or audience"})
		return
	}

	prompt := "Generate 5 catchy copywriting hooks for a product called \"" + req.Product + "\" targeting \"" + req.Audience + "\". Make them short, scroll-stopping, and emotionally engaging. Output as plain list."

	payload := map[string]interface{}{
		"model": "llama3-8b-8192",
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
	}
	jsonPayload, _ := json.Marshal(payload)

	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "GROQ_API_KEY not set"})
		return
	}

	reqGroq, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonPayload))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Groq request"})
		return
	}

	reqGroq.Header.Set("Authorization", "Bearer "+apiKey)
	reqGroq.Header.Set("Content-Type", "application/json")

	resp, err := (&http.Client{Timeout: 20 * time.Second}).Do(reqGroq)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Groq API unreachable"})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Groq API error", "details": string(body)})
		return
	}

	var groqResp GroqResponse
	if err := json.Unmarshal(body, &groqResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse Groq response"})
		return
	}

	var hooks []string
	for _, line := range strings.Split(groqResp.Choices[0].Message.Content, "\n") {
		line = strings.TrimSpace(strings.TrimPrefix(line, "• "))
		if line != "" {
			hooks = append(hooks, line)
		}
	}

	c.JSON(http.StatusOK, gin.H{"hooks": hooks})
}

func handleUnsubscribe(c *gin.Context) {
	var req UnsubscribeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
		return
	}

	res, err := userCollection.DeleteOne(context.TODO(), bson.M{"email": req.Email})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unsubscribe"})
		return
	}

	if res.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unsubscribed successfully"})
}

func main() {
	_ = godotenv.Load() // Load .env if available (development only)
	initMongo()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	frontend := os.Getenv("FRONTEND_URL")
	if frontend == "" {
		frontend = "http://localhost:5173"
	}

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontend},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes
	router.GET("/api/prompts", handleGetPrompts)
	router.POST("/api/subscribe", handleSubscribe)
	router.POST("/api/prompts", handleAddPrompt)
	router.GET("/api/prompts/by-title", handleGetPromptByTitle)
	router.GET("/api/latestprompts", handleGetLatestPrompts)
	router.POST("/api/groq", handleCopyHookWriter)
	router.POST("/api/unsubscribe", handleUnsubscribe)

	log.Println("✅ Server running on port", port)
	router.Run(":" + port)
}
