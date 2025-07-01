import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
export default function CopyHookWriter() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [hooks, setHooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateHooks = async () => {
    if (!product || !audience) {
      setError("Please enter both product and audience.");
      return;
    }

    setLoading(true);
    setHooks([]);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/groq", {
        product,
        audience,
      });

      setHooks(response.data.hooks || []);
    } catch (err) {
      console.error(err);
      setError("Failed to generate hooks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!", { position: "top-right", autoClose: 2000 });
  };

  return (
    <>
      <Navbar />
      <div
        className="min-vh-100 bg-dark text-light py-5 px-3"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        <ToastContainer />
        <div className="container" style={{ maxWidth: "600px" }}>
          <h2 className="mb-3 fw-bold" style={{ color: "#FFD700" }}>
            Hook Generator
          </h2>
          <p className="text-muted mb-4">
            Instantly generate scroll-stopping hooks tailored to your product
            and audience.
          </p>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Product or Service"
              className="form-control bg-black text-light border border-warning"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Target Audience"
              className="form-control bg-black text-light border border-warning"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <button
            className="btn w-100 fw-semibold"
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              border: "2px solid #000",
            }}
            onClick={generateHooks}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Hooks"}
          </button>

          {error && <div className="alert alert-danger mt-4">{error}</div>}

          {hooks.length > 0 && (
            <div className="mt-5">
              <h5 className="mb-3" style={{ color: "#FFD700" }}>
                Generated Hooks
              </h5>
              <ul className="list-group">
                {hooks.slice(1, -1).map((hook, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center bg-black text-light border border-warning"
                  >
                    <span style={{ flex: 1, marginRight: "1rem" }}>
                      {hook.replace(/^\d+\.?\s*/, "")}
                    </span>
                    <button
                      className="btn btn-sm"
                      style={{
                        color: "#FFD700",
                        border: "1px solid #FFD700",
                        background: "transparent",
                      }}
                      onClick={() => copyToClipboard(hook)}
                    >
                      Copy
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
