// import React from "react";
// import "./Contact.css";

// export default function Contact() {
//   const year = new Date().getFullYear();

//   return (
//     <section className="contact-section" id="contact">
//       <div className="contact-container">
//         <header className="contact-header">
//           <p className="contact-kicker">LET'S CONNECT</p>

//           <svg
//             id="text-hover-svg"
//             className="contact-name-svg"
//             viewBox="0 0 1200 320"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <linearGradient id="textGradient">
//                 <stop id="stop-0" offset="0%" stopColor="#D4AF37" stopOpacity="0"/>
//                 <stop id="stop-1" offset="25%" stopColor="#F97316" stopOpacity="0"/>
//                 <stop id="stop-2" offset="50%" stopColor="#22C55E" stopOpacity="0"/>
//                 <stop id="stop-3" offset="75%" stopColor="#06B6D4" stopOpacity="0"/>
//                 <stop id="stop-4" offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
//               </linearGradient>
//               <radialGradient id="revealMask" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="20%">
//                 <stop offset="0%" stopColor="white"/>
//                 <stop offset="100%" stopColor="black"/>
//               </radialGradient>
//               <mask id="textMask">
//                 <rect width="100%" height="100%" fill="url(#revealMask)" />
//               </mask>
//             </defs>

//             <text x="50%" y="55%" textAnchor="middle" className="base-text">BARATH</text>
//             <text x="50%" y="55%" textAnchor="middle" className="draw-text">BARATH</text>
//             <text x="50%" y="55%" textAnchor="middle" className="gradient-text" fill="url(#textGradient)" mask="url(#textMask)">BARATH</text>
//           </svg>

//           <p className="contact-description">
//             Let's create something unforgettable together.
//           </p>
//         </header>

//         <footer className="contact-footer">
//           <div>
//             <h3>BARATH</h3>
//             <p>Design can be art. Design can be aesthetics.</p>
//           </div>
//           <div>
//             <h4>Contact</h4>
//             <p>barath@gmail.com</p>
//             <p>+91 12345 67890</p>
//             <p>Coimbatore, Tamil Nadu</p>
//           </div>
//           <div>
//             <h4>Follow</h4>
//             <a href="#">Instagram</a><br/>
//             <a href="#">Behance</a><br/>
//             <a href="#">LinkedIn</a>
//           </div>
//         </footer>

//         <div className="contact-bottom">
//           © {year} Barath. All rights reserved.
//         </div>
//       </div>
//     </section>
//   );
// }



import { useEffect, useRef, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const svgRef = useRef(null);
  const revealMaskRef = useRef(null);
  const baseTextRef = useRef(null);
  const stopRefs = useRef([]);
  const [year] = useState(() => new Date().getFullYear());
  const hovered = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    const revealMask = revealMaskRef.current;
    const baseText = baseTextRef.current;
    const stops = stopRefs.current.filter(Boolean);

    if (!svg || !revealMask || !baseText) return;

    const onEnter = () => {
      hovered.current = true;
      baseText.style.opacity = "0.7";
      stops.forEach((stop) => stop.setAttribute("stop-opacity", "1"));
    };

    const onLeave = () => {
      hovered.current = false;
      baseText.style.opacity = "0";
      stops.forEach((stop) => stop.setAttribute("stop-opacity", "0"));
    };

    const onMove = (e) => {
      if (!hovered.current) return;
      const rect = svg.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 100;
      const cy = ((e.clientY - rect.top) / rect.height) * 100;
      revealMask.setAttribute("cx", `${cx}%`);
      revealMask.setAttribute("cy", `${cy}%`);
    };

    svg.addEventListener("mouseenter", onEnter);
    svg.addEventListener("mouseleave", onLeave);
    svg.addEventListener("mousemove", onMove);

    return () => {
      svg.removeEventListener("mouseenter", onEnter);
      svg.removeEventListener("mouseleave", onLeave);
      svg.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="contact">
      <div className="container-fluid px-0">
        <div className="eyebrow">
          <div className="rings">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="rule"></div>
        </div>

        <h2>Let's Connect</h2>

        <footer>
          {/* Text hover effect */}
          <div className="text-hover-wrap">
            <svg
              ref={svgRef}
              id="text-hover-svg"
              viewBox="0 0 300 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="textGradient"
                  gradientUnits="userSpaceOnUse"
                  cx="50%"
                  cy="50%"
                  r="25%"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <stop
                      key={i}
                      id={`stop-${i}`}
                      ref={(el) => (stopRefs.current[i] = el)}
                      offset={`${i * 25}%`}
                      stopColor={
                        ["#eab308", "#ef4444", "#80eeb4", "#06b6d4", "#8b5cf6"][i]
                      }
                      stopOpacity="0"
                    />
                  ))}
                </linearGradient>

                <radialGradient
                  id="revealMask"
                  ref={revealMaskRef}
                  gradientUnits="userSpaceOnUse"
                  r="20%"
                  cx="50%"
                  cy="50%"
                >
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="black" />
                </radialGradient>

                <mask id="textMask">
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="url(#revealMask)"
                  />
                </mask>
              </defs>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="base-text"
                id="base-text"
                ref={baseTextRef}
              >
                Barath
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="draw-text"
              >
                Barath
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="gradient-text"
              >
                Barath
              </text>
            </svg>
          </div>

          <div className="footer-inner">
            <div className="footer-grid">
              {/* Brand */}
              <div className="brand">
                <div className="brand-row">
                  <span className="brand-heart">&hearts;</span>
                  <span className="brand-name">BARATH</span>
                </div>
                <p className="brand-desc">
                  "Design can be art. Design can be aesthetics. Design is so
                  simple, that's why it is so complicated."
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="col-title">Contact Me</h4>
                <ul className="contact-list">
                  <li>
                    <svg
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href="mailto:barath@gmail.com">Barath@gmail.com</a>
                  </li>

                  <li>
                    <svg
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                    <a href="tel:+918637373116">+91 123456789</a>
                  </li>

                  <li>
                    <svg
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Coimbatore, TamilNadu</span>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="divider" />

            <div className="footer-bottom">
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 2 12.9 2 9c1.5 1.6 3.7 2.5 6 2.5C6.5 9.4 6.2 4.5 9.1 3.2c2.4-1 5.3-.3 7 1.6C18 4.6 19.6 4 19.6 4c-.3 1.5-1.4 2.7-2.6 3.4 1.4 0 2.5-.4 3-1.4z" />
                  </svg>
                </a>
                <a href="#" aria-label="Dribbble">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                  </svg>
                </a>
                <a href="#" aria-label="Globe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              </div>

              <p className="copyright">
                &copy; {year} Barath. All rights reserved.
              </p>
            </div>
          </div>

          <div className="footer-bg-gradient"></div>
        </footer>
      </div>
    </section>
  );
}