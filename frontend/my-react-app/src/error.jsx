import { Link } from "react-router-dom";

const styles = {
  page: {
    backgroundColor: "#121212",
    color: "#e0e0e0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Courier New, monospace",
    textAlign: "center",
    padding: "2rem",
  },
  errorCode: {
    fontSize: "5rem",
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#ccc",
  },
  subMessage: {
    fontSize: "1rem",
    color: "#888",
    marginBottom: "2rem",
  },
  backButton: {
    backgroundColor: "#FFD700",
    color: "#121212",
    border: "none",
    padding: "0.6rem 1.4rem",
    borderRadius: "6px",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "3px 3px 0 #000",
    transition: "transform 0.1s ease-in-out",
  },
};

export default function Error() {
  return (
    <div style={styles.page}>
      <div style={styles.errorCode}>404</div>
      <div style={styles.message}>Oops, the page you're looking for isn't here.</div>
      <div style={styles.subMessage}>
        It might have been moved, renamed, or never existed.
      </div>
      <Link to="/" style={styles.backButton}>
        ← Back to Home
      </Link>
    </div>
  );
}
