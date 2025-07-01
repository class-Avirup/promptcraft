import { useState, useEffect } from "react";
import axios from "axios";
import LatestCard from "./latestcard";

export default function Archive() {
  const [prompts, setPrompts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/latestprompts`
        );
        setPrompts(response.data);
      } catch (error) {
        console.error("❌ Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, []);

  const totalPages = Math.ceil(prompts.length / pageSize);
  const visiblePrompts = prompts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container py-5">
      <h2
        className="text-white mb-4"
        style={{ fontFamily: "Courier New, monospace" }}
      >
        Popular Prompts
      </h2>

      <div className="d-flex flex-wrap gap-3 justify-content-start">
        {visiblePrompts.map((prompt) => (
          <LatestCard
            key={prompt._id}
            title={prompt.title}
            description={prompt.description}
            prompt={prompt.prompt}
            image="/prompt-icon.png"
          />
        ))}
      </div>

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
    </div>
  );
}
