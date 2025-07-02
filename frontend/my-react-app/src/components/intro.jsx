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
      setErrorMsg("Please enter a valid email address.");
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

      if (!res.ok) throw new Error("Failed");

      setSubscribed(true);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 text-light"
      style={{ fontFamily: "Courier New, sans-serif", backgroundColor: "#0c0c0c" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-center fw-bold mb-3"
        style={{ fontSize: "2.8rem", color: "#fcbf47" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        PromptCraft
      </motion.h1>

      <motion.p
        className="text-center mb-4"
        style={{ color: "#ccc", fontSize: "1.1rem", maxWidth: "600px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        A curated AI prompt newsletter that delivers 3–5 powerful prompt strategies, use cases, and examples — straight to your inbox every week.
      </motion.p>

      {idea && (
        <motion.div
          className="bg-dark border border-secondary p-3 mb-4 rounded"
          style={{
            width: "100%",
            maxWidth: "700px",
            fontSize: "1.05rem",
            lineHeight: "1.6",
            borderLeft: "4px solid #fcbf47",
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
          <div className="bg-black border border-secondary p-4 rounded">
            <p className="text-center fw-semibold mb-3" style={{ color: "#fcbf47" }}>
              Subscribe to PromptCraft
            </p>
            <input
              type="email"
              className="form-control mb-2 bg-dark text-light border border-secondary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ transition: "border-color 0.3s" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#fcbf47")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#6c757d")}
            />
            {errorMsg && (
              <p className="text-danger text-center mb-2" style={{ fontSize: "0.9rem" }}>
                {errorMsg}
              </p>
            )}
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="btn fw-bold w-100"
              style={{ backgroundColor: "#fcbf47", color: "#000" }}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Get Weekly Prompts"}
            </motion.button>
          </div>
        ) : (
          <motion.div
            className="text-center text-success fw-bold py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            🎉 You're subscribed to PromptCraft!
            <p style={{ fontSize: "0.95rem", color: "#aaa" }}>
              Check your inbox every Monday morning.
            </p>
          </motion.div>
        )}
      </motion.div>

      <motion.div className="mt-5 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <p style={{ fontSize: "0.85rem", color: "#666" }}>
          Built for creators, solopreneurs, and marketers. <br />
          <Link to="/archive" className="text-warning fw-semibold">Browse past prompts →</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
