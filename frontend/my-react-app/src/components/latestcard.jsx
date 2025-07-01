import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const LatestCard = ({ title, description, image, prompt }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Prompt copied to clipboard!", {
        position: "bottom-center",
        theme: "dark",
      });
    } catch (err) {
      toast.error("❌ Failed to copy prompt");
    }
  };

  return (
    <motion.div
      className="card text-white"
      style={{
        backgroundColor: "#0e0e0e",
        border: "2px solid #333",
        boxShadow: "1px 1px 0 0 #fcbf47",
        borderRadius: "0.5rem",
        maxWidth: "320px",
        minHeight: "420px",
        fontFamily: "'Courier', sans-serif",
        margin: "1rem",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <img
        src="/zenlogo.png"
        className="card-img-top"
        alt={title}
        style={{
          borderBottom: "2px solid #333",
          height: "160px",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5
            className="card-title fw-bold mb-2"
            style={{ fontSize: "1.1rem", color: "#FFD700" }}
          >
            {title}
          </h5>
          <p
            className="card-text"
            style={{ fontSize: "0.9rem", color: "#ccc", lineHeight: "1.4" }}
          >
            {description}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleCopy}
          className="btn fw-bold mt-3"
          style={{
            backgroundColor: "#fcbf47",
            border: "2px solid black",
            color: "#000",
            borderRadius: "0.25rem",
          }}
        >
          Copy Prompt
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LatestCard;
