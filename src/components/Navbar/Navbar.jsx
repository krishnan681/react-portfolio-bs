import React, { useState, useEffect, useCallback } from "react";
import "./Navbar.css";
import avatarImg from "../../assets/images/BS.webp";

const SECTIONS = [
  { id: "about", label: "About", href: "#about" },
  { id: "creative-expertise", label: "Expertise", href: "#creative-expertise" },
  { id: "career", label: "Highlights", href: "#career" },
  { id: "branding", label: "Branding", href: "#branding" },
  { id: "visual", label: "Visuals", href: "#visual" },
  { id: "tools", label: "Tools", href: "#tools" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollPos = window.scrollY + 200;
    const heroHeight = window.innerHeight * 0.65;
    setIsScrolled(window.scrollY > heroHeight);

    let current = "hero";
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPos >= top) {
          current = SECTIONS[i].id;
          break;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentSectionObj = SECTIONS.find((s) => s.id === activeSection);
  const activeLabel = currentSectionObj ? currentSectionObj.label : "Home";
  const isCompactMode = isScrolled && activeSection !== "hero";

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Glassmorphism Capsule Header */}
      <header
        className={`navbar-capsule-wrapper ${
          isCompactMode ? "capsule-compact" : "capsule-expanded"
        }`}
        id="navbar"
      >
        {/* Left: Avatar Photo */}
        <a
          href="#hero"
          className="nav-avatar-link"
          onClick={(e) => handleNavClick(e, "#hero")}
          aria-label="Go to home section"
        >
          <img
            src={avatarImg}
            alt="Barath Sachwin"
            className="nav-avatar-img"
          />
        </a>

        {/* Center Desktop Mode 1: All Section Links (Expanded when at Hero) */}
        <nav className="nav-links-desktop">
          {SECTIONS.filter((s) => s.id !== "contact").map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link-item ${
                activeSection === link.id ? "active-link" : ""
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Center Mode 2: Single Active Section Name (Compact when scrolled past Hero) */}
        <div className="nav-active-pill">
          <a
            href={`#${activeSection}`}
            className="nav-active-link"
            onClick={(e) => handleNavClick(e, `#${activeSection}`)}
          >
            <span key={activeLabel} className="nav-active-text">
              {activeLabel}
            </span>
          </a>
        </div>

        {/* Right: Yellow Pill Button "Hire me" */}
        <a
          href="#contact"
          className="nav-hire-btn"
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          <svg
            className="nav-mail-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>Hire me</span>
        </a>

        {/* Mobile menu hamburger toggle button */}
        <button
          type="button"
          className={`nav-mobile-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Drawer (Only visible on mobile when hamburger is clicked) */}
      <div className={`nav-mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>
        <div className="drawer-header">
          <span className="drawer-title">Navigation</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="drawer-links">
          {SECTIONS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`drawer-link-item ${
                activeSection === link.id ? "active-drawer-link" : ""
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}