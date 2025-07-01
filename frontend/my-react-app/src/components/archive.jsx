import { useState, useEffect } from "react";
import PromptCard from "./promptcard";
import axios from "axios";

const TAGS = [
  "All",
  "marketing",
  "education",
  "finance",
  "healthcare",
  "e-commerce",
  "SaaS",
  "real estate",
  "coaching",
  "content creation",
];

export default function Archive() {
  const [prompts, setPrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState("All");
  const pageSize = 3;

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/prompts`);
        setPrompts(response.data);
      } catch (error) {
        console.error("❌ Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, []);

  const filteredPrompts = prompts.filter((prompt) => {
    const titleMatch = prompt.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const tagMatch =
      selectedTag === "All" ||
      (Array.isArray(prompt.tags) && prompt.tags.includes(selectedTag));

    return titleMatch && tagMatch;
  });

  const totalPages = Math.ceil(filteredPrompts.length / pageSize);
  const visiblePrompts = filteredPrompts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const tagButtonStyle = (tag) => ({
    backgroundColor: selectedTag === tag ? "#FFD700" : "#191919",
    color: selectedTag === tag ? "#121212" : "#FFD700",
    border: "1px solid #FFD700",
    padding: "0.4rem 0.9rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderRadius: "20px",
    margin: "0.25rem",
    cursor: "pointer",
  });

  return (
    <div className="container py-5">
      <h2
        className="text-white mb-4"
        style={{ fontFamily: "Courier New, monospace" }}
      >
        🗂️ Archive
      </h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control border-2 border-warning bg-dark text-light rounded-4 px-4 py-2"
          placeholder="🔍 Search prompts by title..."
          style={{
            width: "500px",
            maxWidth: "90%",
            boxShadow: "none",
            fontFamily: "monospace",
            borderColor: "#fcbf47",
          }}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 🏷️ Tag Filters */}
      <div className="mb-4 d-flex flex-wrap">
        {TAGS.map((tag) => (
          <button
            key={tag}
            style={tagButtonStyle(tag)}
            onClick={() => {
              setSelectedTag(tag);
              setCurrentPage(1);
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 📋 Prompt Cards */}
      {visiblePrompts.length === 0 ? (
        <p className="text-light">No prompts found.</p>
      ) : (
        visiblePrompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            title={prompt.title}
            description={prompt.description}
            image="/prompt-icon.png"
          />
        ))
      )}

      {/* 🔁 Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-2">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <span className="text-light align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
