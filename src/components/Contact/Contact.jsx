import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Heart,
} from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [year] = useState(() => new Date().getFullYear());

  const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Creative Expertise", href: "#creative-expertise" },
    { label: "Career Highlights", href: "#career" },
    { label: "Branding", href: "#branding" },
    { label: "Visual Creations", href: "#visual" },
    { label: "Tools", href: "#tools" },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* ================= HEADER ================= */}
        <div className="contact-header" data-aos="fade-up">
          <div className="eyebrow">
            <div className="rings">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="rule"></div>
            <span className="eyebrow-text">GET IN TOUCH</span>
          </div>

          <div className="contact-title-group">
            <h2 className="contact-main-heading">
              Let's create something <br />
              <span className="gradient-highlight">extraordinary</span> together.
            </h2>
            <p className="contact-subheading">
              Whether you have a new brand identity in mind, need creative visual direction,
              or want to collaborate on high-impact motion graphics — my inbox is always open.
            </p>
          </div>
        </div>

        {/* ================= FOOTER GRID ================= */}
        <footer className="footer-container">
          <div className="footer-grid">
            {/* Column 1: Brand & Philosophy */}
            <div className="footer-col brand-col">
              <div className="brand-header">
                <span className="brand-dot">✦</span>
                <span className="brand-name">BARATH</span>
              </div>
              <p className="brand-tagline">
                Creative Designer &amp; Visual Storyteller crafting timeless brand identities,
                cinematic motion graphics, and premium digital experiences.
              </p>
              <div className="brand-quote">
                "Design can be art. Design can be aesthetics. Design is so simple, that's why it is so complicated."
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col links-col">
              <h4 className="col-title">Navigation</h4>
              <ul className="footer-nav-list">
                {NAV_LINKS.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info & Direct Links */}
            <div className="footer-col contact-col">
              <h4 className="col-title">Contact</h4>
              <ul className="contact-info-list">
                <li>
                  <a href="mailto:Barath@gmail.com" className="contact-info-item">
                    <div className="contact-icon-box">
                      <Mail size={16} />
                    </div>
                    <span>Barath@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+911234567890" className="contact-info-item">
                    <div className="contact-icon-box">
                      <Phone size={16} />
                    </div>
                    <span>+91 12345 67890</span>
                  </a>
                </li>
                <li>
                  <div className="contact-info-item static">
                    <div className="contact-icon-box">
                      <MapPin size={16} />
                    </div>
                    <span>Coimbatore, Tamil Nadu, India</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Profiles */}
            <div className="footer-col social-col">
              <h4 className="col-title">Connect</h4>
              <p className="social-desc">Follow my journey across social media &amp; design platforms:</p>
              <div className="social-pill-group">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  aria-label="Behance"
                >
                  <i className="fa-brands fa-behance"></i>
                  <span>Behance</span>
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                  aria-label="Dribbble"
                >
                  <i className="fa-brands fa-dribbble"></i>
                  <span>Dribbble</span>
                </a>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* ================= BOTTOM BAR ================= */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              &copy; {year} <strong>Barath</strong>. All rights reserved.
            </p>
            <div className="credits-text">
              <span>Crafted with</span>
              <Heart size={14} className="heart-icon" />
              <span>&amp; Modern Aesthetics</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}