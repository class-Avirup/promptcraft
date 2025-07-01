import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const styles = {
  htmlBody: {
    backgroundColor: "#121212",
    fontFamily: "Courier New, monospace",
    margin: 0,
    padding: 0,
  },
  page: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    fontFamily: "Courier New, monospace",
    padding: "5rem 1rem",
    margin: 0,
  },
  card: {
    backgroundColor: "#1c1c1c",
    border: "1px solid #333",
    borderRadius: "12px",
    boxShadow: "5px 5px 0 #FFD700",
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    color: "#FFD700",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  section: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "0.95rem",
    color: "#FFD700",
    textTransform: "uppercase",
    marginBottom: "0.25rem",
    letterSpacing: "0.4px",
  },
  promptBlock: {
    backgroundColor: "#191919",
    border: "1px solid #FFD700",
    borderRadius: "6px",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#fff",
    boxShadow: "0 0 12px rgba(244, 93, 34, 0.25)",
    lineHeight: 1.5,
    marginBottom: 0,
  },
  textBlock: {
    backgroundColor: "#181818",
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "1rem",
    fontSize: "0.95rem",
    whiteSpace: "pre-wrap",
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  tagBadge: {
    backgroundColor: "#FFD700",
    color: "#121212",
    borderRadius: "20px",
    padding: "0.3rem 0.8rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    boxShadow: "2px 2px 0 #000",
  },
  backLink: {
    display: "inline-block",
    marginBottom: "2rem",
    color: "#FFD700",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "2px solid #FFD700",
  },
  copyBtn: {
    marginTop: "0.6rem",
    backgroundColor: "#FFD700",
    color: "#121212",
    fontWeight: 600,
    fontSize: "0.85rem",
    padding: "0.4rem 0.9rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  toast: {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    backgroundColor: "#FFD700",
    color: "#121212",
    padding: "0.75rem 1.25rem",
    borderRadius: "6px",
    fontWeight: 600,
    boxShadow: "0 0 10px #000",
    zIndex: 9999,
  },
};

export default function PromptDetail() {
  const { title } = useParams();
  const [promptData, setPromptData] = useState(null);
  const [copied, setCopied] = useState(false); // ✅ New state

  useEffect(() => {
    document.body.style.backgroundColor = styles.htmlBody.backgroundColor;
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/prompts/by-title?title=${encodeURIComponent(title)}`
    )
      .then((res) => res.json())
      .then((data) => setPromptData(data))
      .catch((err) => console.error("Failed to fetch prompt:", err));
  }, [title]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptData.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }; // ✅ Copy logic

  if (!promptData) {
    return (
      <div style={styles.page} className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <Link to="/" style={styles.backLink}>
          ← Back
        </Link>

        <div style={styles.card}>
          <h2 style={styles.heading}>{promptData.title}</h2>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Description</div>
            <div>{promptData.description}</div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Prompt</div>
            <div style={styles.promptBlock}>{promptData.prompt}</div>
            <button style={styles.copyBtn} onClick={handleCopy}>
              📋 Copy Prompt
            </button>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Use Cases</div>
            <ul className="ps-3">
              {Array.isArray(promptData.useCases) ? (
                promptData.useCases.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li>{promptData.useCases}</li>
              )}
            </ul>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Tags</div>
            <div style={styles.tagContainer}>
              {Array.isArray(promptData.tags) &&
                promptData.tags.map((tag, idx) => (
                  <div key={idx} style={styles.tagBadge}>
                    {tag}
                  </div>
                ))}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Example</div>
            <div style={styles.textBlock}>
              {JSON.stringify(promptData.example, null, 2)}
            </div>
          </div>
        </div>
      </div>

      {copied && <div style={styles.toast}>✅ Prompt copied to clipboard!</div>}
    </>
  );
}
