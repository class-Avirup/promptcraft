import KofiButton from "./kofibutton";

export default function FooterNew() {
  return (
    <footer
      className="mt-5 text-center py-4 w-100 bg-dark text-white"
      style={{
        fontSize: "0.9rem",
        borderTop: "1px solid #333",
        fontFamily: "Courier New, monospace",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row justify-content-between align-items-center"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}
      >
        {/* Left Text */}
        <div className="mb-2 mb-md-0">Built by zentrigger with 💛</div>

        {/* Center Links */}
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <a
            href="https://www.instagram.com/zen.trigger?igsh=MXBjaTE0cnRkbHo3Nw=="
            className="text-decoration-none"
            style={{ color: "#FFD700" }}
          >
            Instagram
          </a>
          <a
            href="https://github.com/class-Avirup"
            className="text-decoration-none"
            style={{ color: "#FFD700" }}
          >
            GitHub
          </a>
          <a
            href="https://ko-fi.com/zentrigger"
            className="text-decoration-none"
            style={{ color: "#FFD700" }}
          >
            KofiStore
          </a>
        </div>
        <a
          href="/about"
          className="btn btn-sm btn-outline-warning"
          style={{ fontFamily: "Courier New, monospace" }}
        >
          About
        </a>
        <a
          href="https://zentrigger.gumroad.com/"
          className="btn btn-sm btn-warning text-dark fw-bold"
          style={{ fontFamily: "Courier New, monospace" }}
        >
          Visit Store
        </a>
        {/* Right Kofi Button */}
        <div className="mt-3 mt-md-0">
          <KofiButton />
        </div>
      </div>
    </footer>
  );
}
