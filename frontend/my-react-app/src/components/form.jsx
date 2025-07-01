import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const PromptForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    prompt: "",
    useCases: "",
    example: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", form);

    await axios.post("http://localhost:8080/api/prompts", form);


    alert("Prompt submitted successfully!");
  };

  return (
    <div className="container mt-5 text-white" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 fw-bold" style={{ color: "#FF6B35" }}>
        Add New AI Prompt
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control neubrutal-input"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Blog Post Generator"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <input
            className="form-control neubrutal-input"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Generate SEO-friendly blog posts"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Main Prompt</label>
          <textarea
            className="form-control neubrutal-input"
            name="prompt"
            rows="3"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Enter the core prompt..."
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Use Cases (comma-separated)</label>
          <input
            className="form-control neubrutal-input"
            name="useCases"
            value={form.useCases}
            onChange={handleChange}
            placeholder="e.g. blog, marketing, ads"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Example Output</label>
          <textarea
            className="form-control neubrutal-input"
            name="example"
            rows="3"
            value={form.example}
            onChange={handleChange}
            placeholder="Show what output looks like..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-outline-light"
          style={{
            border: "2px solid white",
            backgroundColor: "#FF6B35",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Submit Prompt
        </button>
      </form>

      <style>{`
        body {
          background-color: #1a1a1a;
          font-family: 'Inter', sans-serif;
        }
        .neubrutal-input {
          background-color: #2a2a2a;
          border: 2px solid white;
          color: white;
          border-radius: 0;
        }
        .neubrutal-input:focus {
          border-color: #FF6B35;
          box-shadow: 4px 4px 0 0 #FF6B35;
        }
      `}</style>
    </div>
  );
};

export default PromptForm;
