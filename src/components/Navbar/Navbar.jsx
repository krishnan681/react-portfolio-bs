import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {menuOpen && (
        <div
          className="navbar-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className="navbar-wrapper">
        {/* Left Nav Links */}
        <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <a href="#hero" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#creative-expertise" onClick={closeMenu}>Expertise</a>
          <a href="#career" onClick={closeMenu}>Highlights</a>
          <a href="#branding" onClick={closeMenu}>Branding</a>
          <a href="#visual" onClick={closeMenu}>Visuals</a>
          <a href="#tools" onClick={closeMenu}>Tools</a>
          <a href="#fonts-colors" onClick={closeMenu}>Palettes</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>

          <div className="navbar-menu-mobile-cta">
            <a href="mailto:barath@gmail.com" className="mobile-mail-btn" onClick={closeMenu}>
              Get in Touch ↗
            </a>
          </div>
        </nav>

        {/* Right Desktop CTA */}
        {/* <div className="navbar-right">
          <a href="mailto:barath@gmail.com">
            barath@gmail.com
          </a>
        </div> */}

        {/* Hamburger Toggle */}
        <button
          type="button"
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </>
  );
}