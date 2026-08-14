import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, FolderOpen, Images, Video, Sparkles } from "lucide-react";
import "./VisualCreations.css";

const IMAGE_PREVIEWS = [
  "🖼️ Branding & Identity",
  "🎨 Posters & Typography",
  "📸 Commercial Visuals",
  "📰 Campaign Collaterals",
  "✨ 3D Digital Art",
];

const VIDEO_PREVIEWS = [
  "🎬 Commercial Trailers",
  "🎞 3D Motion Graphics",
  "📹 9:16 Vertical Reels",
  "🎥 Anamorphic Teasers",
  "⚡ Kinetic Visuals",
];

export default function VisualCreations() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setImageOpen(true), 350);
          setTimeout(() => setVideoOpen(true), 650);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleOpenImages = (e) => {
    e.stopPropagation();
    navigate("/images");
  };

  const handleOpenVideos = (e) => {
    e.stopPropagation();
    navigate("/videos");
  };

  return (
    <section className="visual-creations" id="visual" ref={sectionRef}>
      <div className="title">
        <div className="bg-text">Visual Creations</div>
        <h1 className="main-title">Visual Creations</h1>
      </div>

      <div className="container">
        <div className="section-heading text-center">
          <p>
            Explore my collection of creative work through two dedicated interactive folders.
            Open each folder to enter custom-crafted showcases of high-impact image designs and cinematic motion graphics.
          </p>
        </div>

        <div className="folders-grid">
          {/* ========== IMAGE FOLDER CARD ========== */}
          <div
            className={`folder-card image-card ${imageOpen ? "is-open" : ""}`}
            onMouseEnter={() => setImageOpen(true)}
            onClick={handleOpenImages}
            role="button"
            tabIndex={0}
            aria-label="Open Images Gallery"
            onKeyDown={(e) => e.key === "Enter" && handleOpenImages(e)}
          >
            <div className="folder-action-pill">
              <Sparkles size={13} className="pill-icon" />
              <span>Open to see the works</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </div>

            <div className="folder-container image-folder">
              <svg className="folder-back" viewBox="0 0 50 40" fill="none">
                <path d="M0 4C0 1.79 1.79 0 4 0H16.5C17.7 0 18.8.54 19.6 1.47L22.4 5.06C23.2 5.99 24.3 6.53 25.5 6.53H46C48.2 6.53 50 8.32 50 10.53V36C50 38.2 48.2 40 46 40H4C1.79 40 0 38.2 0 36V4Z" />
              </svg>

              <div className="folder-badge">
                <div className="status-dot"></div>
                <div>
                  <span>GALLERY</span>
                  <strong>16+ Works</strong>
                </div>
              </div>

              {IMAGE_PREVIEWS.map((file, i) => (
                <div
                  key={i}
                  className={`file file-${i + 1}`}
                  onClick={handleOpenImages}
                >
                  <span>{file}</span>
                  <ArrowUpRight size={13} className="file-arrow" />
                </div>
              ))}

              <div className="folder-front-wrapper">
                <svg className="folder-front" viewBox="0 0 50 34" fill="none">
                  <path d="M0 4C0 1.79 1.79 0 4 0H46C48.2 0 50 1.79 50 4V30C50 32.2 48.2 34 46 34H4C1.79 34 0 32.2 0 30V4Z" />
                </svg>

                <div className="folder-content">
                  <div className="folder-icon">
                    <Images size={28} />
                  </div>
                  <h3>Images</h3>
                  <p>
                    Posters, Typography,
                    <br />
                    Branding & 3D Visuals
                  </p>
                  <button
                    type="button"
                    className="folder-explore-btn"
                    onClick={handleOpenImages}
                  >
                    <FolderOpen size={15} />
                    <span>View Image Works</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========== VIDEO FOLDER CARD ========== */}
          <div
            className={`folder-card video-card ${videoOpen ? "is-open" : ""}`}
            onMouseEnter={() => setVideoOpen(true)}
            onClick={handleOpenVideos}
            role="button"
            tabIndex={0}
            aria-label="Open Videos Showcase"
            onKeyDown={(e) => e.key === "Enter" && handleOpenVideos(e)}
          >
            <div className="folder-action-pill video-pill">
              <Sparkles size={13} className="pill-icon" />
              <span>Open to see the works</span>
              <ArrowUpRight size={14} className="pill-arrow" />
            </div>

            <div className="folder-container video-folder">
              <svg className="folder-back" viewBox="0 0 50 40" fill="none">
                <path d="M0 4C0 1.79 1.79 0 4 0H16.5C17.7 0 18.8.54 19.6 1.47L22.4 5.06C23.2 5.99 24.3 6.53 25.5 6.53H46C48.2 6.53 50 8.32 50 10.53V36C50 38.2 48.2 40 46 40H4C1.79 40 0 38.2 0 36V4Z" />
              </svg>

              <div className="folder-badge">
                <div className="status-dot"></div>
                <div>
                  <span>SHOWCASE</span>
                  <strong>8+ Reels</strong>
                </div>
              </div>

              {VIDEO_PREVIEWS.map((file, i) => (
                <div
                  key={i}
                  className={`file file-${i + 1}`}
                  onClick={handleOpenVideos}
                >
                  <span>{file}</span>
                  <ArrowUpRight size={13} className="file-arrow" />
                </div>
              ))}

              <div className="folder-front-wrapper">
                <svg className="folder-front" viewBox="0 0 50 34" fill="none">
                  <path d="M0 4C0 1.79 1.79 0 4 0H46C48.2 0 50 1.79 50 4V30C50 32.2 48.2 34 46 34H4C1.79 34 0 32.2 0 30V4Z" />
                </svg>

                <div className="folder-content">
                  <div className="folder-icon video-icon">
                    <Video size={28} />
                  </div>
                  <h3>Videos</h3>
                  <p>
                    Motion Graphics, Reels,
                    <br />
                    Trailers & Commercials
                  </p>
                  <button
                    type="button"
                    className="folder-explore-btn video-explore-btn"
                    onClick={handleOpenVideos}
                  >
                    <FolderOpen size={15} />
                    <span>View Video Works</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}