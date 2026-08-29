import { useState, useEffect, useCallback } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#creative-expertise" },
  { label: "Highlights", href: "#career" },
  { label: "Branding", href: "#branding" },
  { label: "Visuals", href: "#visual" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    // Shrink when scrolled past hero (roughly viewport height)
    const heroHeight = window.innerHeight * 0.85;
    setScrolled(window.scrollY > heroHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      <header className={`navbar-wrapper ${scrolled ? "navbar-compact" : ""}`}>
        {/* Center Nav Links */}
        <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}

          {/* Hire Me button - visible only in compact mode on desktop */}
          <a
            href="#contact"
            className="hire-me-btn"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            Hire Me
          </a>

          <div className="navbar-menu-mobile-cta">
            <a href="#contact" className="mobile-mail-btn" onClick={closeMenu}>
              Get in Touch ↗
            </a>
          </div>
        </nav>

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