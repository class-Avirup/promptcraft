import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const [idea, setIdea] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubscribed(true);
    } catch (err) {
      setErrorMsg("Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
    <motion.div
      className="container min-vh-100 d-flex flex-column align-items-center justify-content-center py-5 text-light"
      style={{ fontFamily: "Courier New, monospace" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      
      <motion.h1
        className="display-4 fw-bold text-center mb-4 border-bottom border-secondary pb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >PromptCraft
      </motion.h1>
      

      <motion.p
        className="text-center mb-4"
        style={{ maxWidth: "600px", fontSize: "1.1rem", color: "#ccc" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Zero Fluff. Infinite Ideas.
      </motion.p>

      {idea && (
        <motion.div
          className="border border-light bg-dark text-light p-3 mb-4"
          style={{
            maxWidth: "700px",
            width: "100%",
            fontSize: "1.1rem",
            borderLeft: "5px solid #FFD700",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {idea}
        </motion.div>
      )}

      <motion.div
        className="w-100"
        style={{ maxWidth: "400px" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {!subscribed ? (
          <div className="border border-light p-4 bg-black">
            <p
              className="fw-bold text-uppercase text-center mb-3"
              style={{ color: "#FFD700" }}
            >
              Daily Ideas in Your Inbox
            </p>
            <input
              type="email"
              className="form-control mb-2 bg-dark text-light border border-secondary"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ transition: "border-color 0.3s ease" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FFD700")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#6c757d")}
            />
            {errorMsg && (
              <p
                className="text-danger mb-2 text-center"
                style={{ fontSize: "0.9rem" }}
              >
                {errorMsg}
              </p>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="btn fw-bold w-100"
              style={{ backgroundColor: "#fcbf47", color: "#000" }}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </div>
        ) : (
          <motion.p
            className="text-center fw-bold text-success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            You're subscribed! 🚀
          </motion.p>
        )}
      </motion.div>
    </motion.div>
    </>
  );
}
