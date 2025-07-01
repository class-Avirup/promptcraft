import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  // Handle modal visibility for Login and Signup
  const handleCloseSubscribe = () => setShowSubscribe(false);
  const handleShowSubscribe = () => setShowSubscribe(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Note: localStorage would be used here in a real environment
  const logname = "User"; // localStorage.getItem("username");

  const handleSubscribe = async () => {
    console.log("func working");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
        email,
      });

      console.log("Login Successful:", response.data.message);
      toast.success("Subscribed successfully!");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Bootstrap CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      {/* Premium Font - Inter */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Custom Neubrutalism Styles */}
      <style>
        {`
          body {
            background-color: #1a1a1a !important;
            color: white !important;
            font-family:'Courier New', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
            font-weight: 400 !important;
          }
          
          .neubrutalism-navbar {
            background-color: #1a1a1a !important;
            border-bottom: 4px solid white !important;
            box-shadow: 0 8px 0 0 #FFD700 !important;
          }
          
          .neubrutalism-brand {
            color: white !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            font-size: 1.75rem !important;
            text-decoration: none !important;
          }
          
          .neubrutalism-brand:hover {
            color: #FFD700 !important;
          }
          
          .neubrutalism-nav-link {
            color: white !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
            text-decoration: none !important;
            transition: all 0.2s ease !important;
            font-size: 0.95rem !important;
          }
          
          .neubrutalism-nav-link:hover {
            color: #FFD700 !important;
          }
          
          .neubrutalism-nav-link.active {
            color: #FFD700 !important;
            border-bottom: 2px solid #FFD700 !important;
            padding-bottom: 2px !important;
          }
          
          .neubrutalism-btn {
            font-weight: 700 !important;
            letter-spacing: 0.5px !important;
            border: 3px solid white !important;
            transition: all 0.2s ease !important;
            position: relative !important;
            font-size: 0.9rem !important;
            padding: 0.6rem 1.5rem !important;
          }
          
          .neubrutalism-btn:hover {
            transform: translate(-2px, -2px) !important;
          }
          
          .neubrutalism-btn-primary {
            background-color: #FFD700 !important;
            border-color:#2a2a2a !important;
            color: black !important;
          }
          
          .neubrutalism-btn-primary:hover {
            background-color: #FFD700 !important;
            box-shadow: 4px 4px 0 0 white !important;
            border-color:black !important;
            color: black !important;
          }
          
          .neubrutalism-btn-secondary {
            background-color: #2a2a2a !important;
            border-color: white !important;
            color: white !important;
          }
          
          .neubrutalism-btn-secondary:hover {
            background-color: #1a1a1a !important;
            box-shadow: 4px 4px 0 0 #FFD700 !important;
            border-color: white !important;
            color: white !important;
          }
          
          .neubrutalism-modal {
            background-color: rgba(0, 0, 0, 0.8) !important;
          }
          
          .neubrutalism-modal-content {
            background-color: #1a1a1a !important;
            border: 1px solid white !important;
            box-shadow: 2px 2px 0 0 #FFD700 !important;
            border-radius: 0 !important;
          }
          
          .neubrutalism-modal-header {
            border-bottom: 1px solid white !important;
            background-color: #1a1a1a !important;
          }
          
          .neubrutalism-modal-title {
            color: white !important;
            font-weight: 800 !important;
            letter-spacing: 1px !important;
            font-size: 1.5rem !important;
          }
          
          .neubrutalism-modal-footer {
            border-top: 1px solid white !important;
            background-color: #1a1a1a !important;
          }
          
          .neubrutalism-form-control {
            background-color: #2a2a2a !important;
            border: 0.25px solid white !important;
            color: white !important;
            font-weight: 500 !important;
            border-radius: 25 !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.95rem !important;
          }
          
          .neubrutalism-form-control:focus {
            background-color: #2a2a2a !important;
            border-color: #FFD700 !important;
            box-shadow: 4px 4px 0 0 #FFD700 !important;
            color: white !important;
          }
          
          .neubrutalism-form-control::placeholder {
            color: #999 !important;
            font-weight: 400 !important;
          }
          
          .neubrutalism-form-label {
            color: white !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
            font-size: 0.9rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .neubrutalism-close {
            color: white !important;
            font-size: 1.75rem !important;
            font-weight: 300 !important;
            opacity: 1 !important;
            line-height: 1 !important;
          }
          
          .neubrutalism-close:hover {
            color: #FFD700 !important;
          }
          
          .neubrutalism-dropdown-menu {
            background-color: #2a2a2a !important;
            border: 3px solid white !important;
            box-shadow: 6px 6px 0 0 #FFD700 !important;
            border-radius: 0 !important;
          }
          
          .neubrutalism-dropdown-item {
            color: white !important;
            font-weight: 500 !important;
            letter-spacing: 0.5px !important;
            font-size: 0.9rem !important;
            padding: 0.75rem 1rem !important;
          }
          
          .neubrutalism-dropdown-item:hover {
            background-color: #FFD700 !important;
            color: white !important;
          }
          
          .neubrutalism-dropdown-divider {
            border-color: #555 !important;
            border-width: 1px !important;
          }
          
          .neubrutalism-toggler {
            border: 3px solid white !important;
            border-radius: 0 !important;
          }
          
          .neubrutalism-toggler:focus {
            box-shadow: 0 0 0 0.25rem rgba(255, 107, 53, 0.25) !important;
          }
          
          .neubrutalism-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='3' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          }
          
          .demo-content {
            background-color: #2a2a2a !important;
            border: 4px solid white !important;
            box-shadow: 8px 8px 0 0 #FFD700 !important;
          }
          
          .disabled-link {
            color: #666 !important;
          }
          
          .premium-heading {
            font-weight: 800 !important;
            letter-spacing: 1px !important;
            line-height: 1.2 !important;
          }
          
          .premium-text {
            font-weight: 500 !important;
            line-height: 1.6 !important;
            color: #e0e0e0 !important;
          }
        `}
      </style>

      {/* Navbar */}

      <nav className="navbar navbar-expand-lg bg-dark fixed-top ">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Promptcraft
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <a className="neubrutalism-nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="neubrutalism-nav-link" href="/hook">
                  Hook Generator
                </a>
              </li>
            </ul>

            <div className="d-flex gap-3">
              <button
                className="btn neubrutalism-btn neubrutalism-btn-primary"
                onClick={handleShowSubscribe}
              >
                Subscribe
              </button>
              <a href="https://zentrigger.gumroad.com/">
                <button className="btn neubrutalism-btn neubrutalism-btn-secondary">
                  Visit Store
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <motion.div
        className="w-100 text-center py-2"
        style={{
          backgroundColor: "#000",
          borderBottom: "3px solid #FFD700",
          boxShadow: "0 2px 0 0 #FFD700",
          marginTop: "64px", // Adjust based on navbar height
          zIndex: 999,
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="fw-semibold"
          style={{ fontSize: "0.95rem", color: "#FFF" }}
        >
          Try our new&nbsp;
          <Link
            to="/hook"
            className="text-decoration-none"
            style={{
              color: "#FFD700",
              fontWeight: "bold",
              borderBottom: "1px dotted #FFD700",
            }}
          >
            Hook Generator
          </Link>
          &nbsp;to boost your content!
        </span>
      </motion.div>

      {/* Login Modal */}
      {showSubscribe && (
        <div
          className="modal show neubrutalism-modal"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content neubrutalism-modal-content">
              <div className="modal-header neubrutalism-modal-header">
                <h5 className="modal-title neubrutalism-modal-title">
                  Subscribe
                </h5>
                <button
                  type="button"
                  className="btn-close neubrutalism-close"
                  onClick={handleCloseSubscribe}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label neubrutalism-form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control neubrutalism-form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer neubrutalism-modal-footer">
                <button
                  type="button"
                  className="btn neubrutalism-btn neubrutalism-btn-secondary"
                  onClick={handleCloseSubscribe}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn neubrutalism-btn neubrutalism-btn-primary"
                  onClick={() => {
                    handleCloseSubscribe();
                    handleSubscribe();
                  }}
                  disabled={loading}
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default Navbar;
