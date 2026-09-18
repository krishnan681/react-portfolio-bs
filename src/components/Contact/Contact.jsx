import { useState } from "react";
import { CONTACT_CONFIG } from "../../services/contactService";
import "./Contact.css";

export default function Contact() {
  const [year] = useState(() => new Date().getFullYear());

  const handleBackToTop = (e) => {
    e?.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="portfolio-contact-card" data-aos="fade-up">
          {/* Giant PORTFOLIO Headline */}
          <h2 className="contact-hero-title">PORTFOLIO</h2>

          {/* 2-Column Content: Bio on Left, Contact Details on Right */}
          <div className="contact-content-grid">
            <div className="contact-col-bio">
              <p>
                Video Editor &amp; Graphic Designer focused on visual storytelling,
                motion graphics, cinematic editing, and creative brand design.
              </p>
            </div>

            <div className="contact-col-info">
              <h3 className="contact-info-heading">CONTACT:</h3>
              <div className="contact-details-list">
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="contact-link"
                >
                  {CONTACT_CONFIG.email}
                </a>
                <a
                  href={`tel:${CONTACT_CONFIG.rawPhone}`}
                  className="contact-link"
                >
                  {CONTACT_CONFIG.phone}
                </a>
                <span className="contact-location">{CONTACT_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Centered BACK TO Button */}
          <div className="contact-back-wrapper">
            <button
              type="button"
              onClick={handleBackToTop}
              className="contact-back-btn"
              aria-label="Back to top"
            >
              BACK TO
            </button>
          </div>

          {/* Horizontal Divider Line */}
          <hr className="contact-divider" />

          {/* Bottom Copyright */}
          <footer className="contact-bottom-bar">
            <p className="copyright-text">
              &copy; {year} {CONTACT_CONFIG.name}. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
