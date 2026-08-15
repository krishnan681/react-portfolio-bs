import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar-wrapper">

      {/* Left Nav Links */}
      <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <a href="#hero" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#branding" onClick={closeMenu}>Branding</a>
        <a href="#tools" onClick={closeMenu}>Tools</a>
        <a href="#visual" onClick={closeMenu}>Visuals</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <div className="navbar-menu-mobile-cta">
          <a href="mailto:barath@email.com" className="mobile-mail-btn" onClick={closeMenu}>
            Get in Touch ↗
          </a>
        </div>
      </nav>

      {/* Right Desktop CTA */}
      <div className="navbar-right">
        <a href="mailto:barath@email.com">
          barath@email.com
        </a>
      </div>

      {/* Hamburger Toggle */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}