import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
export default function About() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:8080/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("You’ve been unsubscribed.");
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="min-vh-100 py-5 px-3"
        style={{
          backgroundColor: "#0f0f0f",
          color: "#e6e6e6",
          fontFamily: "Courier, sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Title */}
          <motion.h1
            className="fw-bold mb-4"
            style={{
              fontSize: "2.8rem",
              color: "#FFD700",
              borderBottom: "2px solid #333",
              paddingBottom: "0.5rem",
            }}
          >
            About PromptCraft
          </motion.h1>

          {/* Introduction */}
          <p
            className="fs-5 mb-4"
            style={{ lineHeight: "1.75", color: "#ccc" }}
          >
            PromptCraft is your creative partner in the AI era — offering an
            evolving library of precision-crafted prompts and automation tools
            for creators, solopreneurs, and marketers who want to move fast
            without compromising quality.
          </p>

          {/* Offer Section */}
          <div
            className="p-4 mb-4 rounded-4"
            style={{
              backgroundColor: "#151515",
              borderLeft: "4px solid #FFD700",
            }}
          >
            <h5 className="text-warning mb-3 fw-semibold">What We Offer</h5>
            <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.8" }}>
              <li>
                Battle-tested AI prompts for writing, marketing, and ideation
              </li>
              <li>
                Modular frameworks for product launches and content systems
              </li>
              <li>Weekly drops with creative workflows, tools & tips</li>
            </ul>
          </div>

          {/* Testimonials */}
          <div
            className="p-4 mb-5 rounded-4"
            style={{ backgroundColor: "#121212", border: "1px solid #2c2c2c" }}
          >
            <h6 className="text-warning fw-semibold mb-3">
              What People Are Saying
            </h6>
            <div
              className="d-flex flex-column gap-3"
              style={{ fontSize: "1rem", fontStyle: "italic", color: "#ccc" }}
            >
              <div>
                “PromptCraft saved me hours every week. I use the copywriting
                and content prompts regularly.”
                <div className="mt-2" style={{ color: "#888" }}>
                  — Aayush, Indie Marketer
                </div>
              </div>
              <div>
                “I plugged a launch prompt into X, and it went viral. Clean,
                powerful, and ridiculously useful.”
                <div className="mt-2" style={{ color: "#888" }}>
                  — Priya, Solopreneur
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Philosophy */}
          <div
            className="p-4 mb-4 rounded-4"
            style={{
              backgroundColor: "#181818",
              borderLeft: "4px solid #FFD700",
            }}
          >
            <h5 className="fw-semibold mb-3" style={{ color: "#FFD700" }}>
              Why Our Newsletter Stands Out
            </h5>
            <ul
              style={{
                paddingLeft: "1.2rem",
                lineHeight: "1.75",
                color: "#ddd",
              }}
            >
              <li>No fluff — only actionable, ready-to-use prompts</li>
              <li>Curated by actual builders, not generic AI spam</li>
              <li>Free frameworks, tools, and updates that keep you ahead</li>
              <li>
                Clean design. Bite-sized drops. Easy to scan, save, and apply
              </li>
            </ul>
          </div>

          {/* Unsubscribe CTA */}
          <div
            className="p-4 mt-5 text-center rounded-4"
            style={{ backgroundColor: "#161616", borderTop: "1px solid #333" }}
          >
            <h6 className="fw-semibold mb-3" style={{ color: "#FFD700" }}>
              Want to unsubscribe from emails?
            </h6>
            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center align-items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control bg-black text-light border border-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ maxWidth: "300px" }}
              />
              <button
                onClick={handleUnsubscribe}
                className="btn btn-outline-warning"
                disabled={loading}
              >
                {loading ? "Processing..." : "Unsubscribe"}
              </button>
            </div>
            {status && (
              <div
                className="mt-2"
                style={{
                  color: status.includes("unsubscribed")
                    ? "#28a745"
                    : "#dc3545",
                }}
              >
                {status}
              </div>
            )}
          </div>

          {/* Back Link */}
          <div className="text-center mt-4">
            <a
              href="/"
              className="btn btn-sm rounded-pill px-4 py-2 mt-2"
              style={{
                backgroundColor: "#FFD700",
                color: "#0f0f0f",
                fontWeight: "600",
                border: "none",
              }}
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
