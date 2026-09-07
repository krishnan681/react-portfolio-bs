import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import {
  CONTACT_CONFIG,
  copyToClipboard,
  getMailtoLink,
} from "../../services/contactService";
import "./Contact.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Creative Expertise", href: "#creative-expertise" },
  { label: "Career Highlights", href: "#career" },
  { label: "Branding", href: "#branding" },
  { label: "Visual Creations", href: "#visual" },
  { label: "Tools", href: "#tools" },
];

export default function Contact() {
  const [year] = useState(() => new Date().getFullYear());
  const [copied, setCopied] = useState(false);

  // Copy Email Handler with visual feedback
  const handleCopyEmail = async (e) => {
    if (e) e.preventDefault();
    const success = await copyToClipboard(CONTACT_CONFIG.email);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

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
            <span className="contactpageeybrow">GET IN TOUCH</span>
          </div>

          <div className="contact-title-group">
            <h2 className="contact-main-heading">
              Let's create something <br />
              <span className="gradient-highlight">extraordinary</span>{" "}
              together.
            </h2>
            <p className="contact-subheading">
              Have an upcoming project, commercial video edit, or creative
              branding vision? Feel free to reach out directly via email or
              call.
            </p>
          </div>
        </div>

        {/* ================= FOOTER GRID (3 BALANCED COLUMNS) ================= */}
        <footer className="footer-container" data-aos="fade-up">
          <div className="footer-grid">
            {/* Column 1: Brand & Philosophy */}
            <div className="footer-col brand-col">
              <div className="brand-header">
                <span className="brand-dot">✦</span>
                <span className="brand-name">BARATH</span>
              </div>
              <p className="brand-tagline">
                Video Editor &amp; Graphic Designer crafting high-impact visual
                narratives, motion graphics, and distinctive brand identities.
              </p>
              <div className="brand-quote">
                "Design can be art. Design can be aesthetics. Design is so
                simple, that's why it is so complicated."
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
                        const target = document.querySelector(link.href);
                        if (target) {
                          if (window.__lenis) {
                            window.__lenis.scrollTo(target, {
                              offset: -30,
                              duration: 1.2,
                            });
                          } else {
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Channels & Location */}
            <div className="footer-col contact-col">
              <h4 className="col-title">Get in Touch</h4>
              <ul className="contact-info-list">
                <li>
                  <a
                    href={getMailtoLink({
                      subject: "Project Inquiry - Barath Sachwin Portfolio",
                    })}
                    className="contact-info-item"
                  >
                    <div className="contact-icon-box">
                      <Mail size={16} />
                    </div>
                    <span>{CONTACT_CONFIG.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_CONFIG.rawPhone}`}
                    className="contact-info-item"
                  >
                    <div className="contact-icon-box">
                      <Phone size={16} />
                    </div>
                    <span>{CONTACT_CONFIG.phone}</span>
                  </a>
                </li>
                <li>
                  <div className="contact-info-item static">
                    <div className="contact-icon-box">
                      <MapPin size={16} />
                    </div>
                    <span>{CONTACT_CONFIG.location}</span>
                  </div>
                </li>
                <li className="copy-action-row">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="footer-copy-btn"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Email"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          {/* ================= BOTTOM BAR ================= */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              &copy; {year} <strong>Barath Sachwin</strong>. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
