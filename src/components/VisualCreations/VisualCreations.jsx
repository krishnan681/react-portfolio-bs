import { useEffect, useRef, useState } from "react";
import "./VisualCreations.css";

const IMAGE_FILES = [
  "🖼️ Hero Banner.webp",
  "🎨 Brand Identity.ai",
  "📸 Product Shoot.jpg",
  "📰 Campaign Poster.psd",
  "🌈 Social Creative.png",
];

const VIDEO_FILES = [
  "🎬 HyperX Launch.mp4",
  "🎞 Luxury Fashion.mp4",
  "📹 Instagram Reel.mp4",
  "🎥 Motion Graphics.mov",
  "🎬 Product Promo.mp4",
];

export default function VisualCreations() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // Auto-open when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stagger the open animation
          setTimeout(() => setImageOpen(true), 300);
          setTimeout(() => setVideoOpen(true), 600);
        }
      },
      {
        threshold: 0.35, // open when ~35% of section is visible
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="visual-creations"
      id="visual-creations"
      ref={sectionRef}
    >
      <div className="title">
        <div className="bg-text">Visual Creations</div>
        <h1 className="main-title">Visual Creations</h1>
      </div>

      <div className="container">
        <div className="section-heading text-center">
          <p>
            Explore my collection of creative work through two interactive
            folders. Browse premium image designs and motion graphics projects
            crafted for brands, campaigns, and digital experiences.
          </p>
        </div>

        <div className="folders-grid">
          {/* ========== IMAGE FOLDER ========== */}
          <div
            className={`folder-card ${imageOpen ? "is-open" : ""}`}
            onClick={() => setImageOpen((prev) => !prev)}
          >
            <div className="folder-container image-folder">
              {/* Folder Back */}
              <svg className="folder-back" viewBox="0 0 50 40" fill="none">
                <path d="M0 4C0 1.79 1.79 0 4 0H16.5C17.7 0 18.8.54 19.6 1.47L22.4 5.06C23.2 5.99 24.3 6.53 25.5 6.53H46C48.2 6.53 50 8.32 50 10.53V36C50 38.2 48.2 40 46 40H4C1.79 40 0 38.2 0 36V4Z" />
              </svg>

              {/* Badge */}
              <div className="folder-badge">
                <div className="status-dot"></div>
                <div>
                  <span>IMAGES</span>
                  <strong>120+</strong>
                </div>
              </div>

              {/* Files */}
              {IMAGE_FILES.map((file, i) => (
                <div key={i} className={`file file-${i + 1}`}>
                  {file}
                </div>
              ))}

              {/* Folder Front */}
              <div className="folder-front-wrapper">
                <svg className="folder-front" viewBox="0 0 50 34" fill="none">
                  <path d="M0 4C0 1.79 1.79 0 4 0H46C48.2 0 50 1.79 50 4V30C50 32.2 48.2 34 46 34H4C1.79 34 0 32.2 0 30V4Z" />
                </svg>

                <div className="folder-content">
                  <div className="folder-icon">🖼️</div>
                  <h3>Images</h3>
                  <p>
                    Posters, Branding,
                    <br />
                    Social Media & Photography
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========== VIDEO FOLDER ========== */}
          <div
            className={`folder-card ${videoOpen ? "is-open" : ""}`}
            onClick={() => setVideoOpen((prev) => !prev)}
          >
            <div className="folder-container video-folder">
              <svg className="folder-back" viewBox="0 0 50 40" fill="none">
                <path d="M0 4C0 1.79 1.79 0 4 0H16.5C17.7 0 18.8.54 19.6 1.47L22.4 5.06C23.2 5.99 24.3 6.53 25.5 6.53H46C48.2 6.53 50 8.32 50 10.53V36C50 38.2 48.2 40 46 40H4C1.79 40 0 38.2 0 36V4Z" />
              </svg>

              <div className="folder-badge">
                <div className="status-dot"></div>
                <div>
                  <span>VIDEOS</span>
                  <strong>25+</strong>
                </div>
              </div>

              {VIDEO_FILES.map((file, i) => (
                <div key={i} className={`file file-${i + 1}`}>
                  {file}
                </div>
              ))}

              <div className="folder-front-wrapper">
                <svg className="folder-front" viewBox="0 0 50 34" fill="none">
                  <path d="M0 4C0 1.79 1.79 0 4 0H46C48.2 0 50 1.79 50 4V30C50 32.2 48.2 34 46 34H4C1.79 34 0 32.2 0 30V4Z" />
                </svg>

                <div className="folder-content">
                  <div className="folder-icon">🎬</div>
                  <h3>Videos</h3>
                  <p>
                    Motion Graphics,
                    <br />
                    Reels & Commercials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}