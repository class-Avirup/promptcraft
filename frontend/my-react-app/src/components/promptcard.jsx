import { Link } from "react-router-dom";
export default function PromptCard({
  title = "AI Prompt Idea",
  description = "An intelligent, ready-to-use prompt crafted to speed up your workflow and generate better results.",
  image = "frontend/my-react-app/public/zenlogo.png",
}) {
  return (
    <Link
      to={`/prompt/${encodeURIComponent(title)}`}
      className="text-decoration-none"
    >
      <div
        className="border border-light bg-black text-white p-4 my-3 w-100 d-flex align-items-start gap-3"
        style={{
          fontFamily: "Courier New, monospace",
          maxWidth: "700px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderLeft: "4px solid #FFD700",
          boxShadow: "0 0 0 transparent",
          borderRadius: "8px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 102, 0, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 0 transparent";
        }}
      >
        <img
          src="/zenlogo.png"
          alt="Prompt Icon"
          style={{
            width: "48px",
            height: "48px",
            objectFit: "cover",
            borderRadius: "4px",
            border: "1px solid #333",
          }}
        />
        <div>
          <h3
            className="fw-bold mb-2 text-uppercase"
            style={{ color: "#FFD700", fontSize: "1rem" }}
          >
            {title}
          </h3>
          <p className="mb-0" style={{ color: "#ccc", fontSize: "0.95rem" }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
