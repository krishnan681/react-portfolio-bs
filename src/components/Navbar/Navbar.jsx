import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarRef = useRef(null);

  

  return (
    <>
      <header className="navbar-wrapper">
        {/* Left */}
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>

        {/* Center */}
        <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#branding">Branding</a>
          <a href="#tools">Tools</a>
          <a href="#visual">Visuals</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right */}
        <div className="navbar-right">
          <a href="mailto:barath@email.com">
            barath@email.com
          </a>
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    </>
  );
}