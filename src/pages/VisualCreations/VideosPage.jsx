import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Play,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Tv,
  Film,
  Smartphone,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import { VIDEOS_DATA, VIDEO_THEMES } from "../../data/visualCreationsData";
import "./VideosPage.css";

export default function VideosPage() {
  const [activeTheme, setActiveTheme] = useState("all");
  const [spotlightVideo, setSpotlightVideo] = useState(VIDEOS_DATA[0]);
  const [modalVideo, setModalVideo] = useState(null);
  const [isSpotlightMuted, setIsSpotlightMuted] = useState(true);
  const reelsTrackRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredVideos = useMemo(() => {
    if (activeTheme === "all") return VIDEOS_DATA;
    return VIDEOS_DATA.filter((item) => item.theme === activeTheme);
  }, [activeTheme]);

  const verticalReels = useMemo(() => {
    return VIDEOS_DATA.filter((v) => v.aspect === "vertical");
  }, []);

  const motionShowcase = useMemo(() => {
    if (activeTheme === "reels") return [];
    if (activeTheme === "all") return VIDEOS_DATA.filter((v) => v.aspect !== "vertical");
    return filteredVideos.filter((v) => v.aspect !== "vertical");
  }, [activeTheme, filteredVideos]);

  const handleReelsScroll = (dir) => {
    if (!reelsTrackRef.current) return;
    const scrollAmount = 280;
    reelsTrackRef.current.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <main className="videos-page">
      {/* TOP NAV */}
      <header className="video-header-nav">
        <div className="video-header-container">
          <Link to="/" className="video-back-link">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
          <div className="video-header-badge">
            <Sparkles size={13} className="badge-sparkle" />
            <span>Visual Creations / Motion & Videos</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="video-hero-section">
        <div className="video-hero-content">
          <span className="video-eyebrow">
            <Film size={14} />
            Motion Design & Video Production
          </span>
          <h1 className="video-hero-title">Cinematic Motion & Video Works</h1>
          <p className="video-hero-desc">
            Commercial trailers, 3D motion graphics, brand identity teasers, and high-energy 9:16 vertical reels crafted with dynamic pacing and color grading.
          </p>
        </div>
      </section>

      {/* STAGE 1: FEATURED CINEMA THEATRE (Eliminates endless scrolling by putting playback right in view) */}
      <section className="cinema-theatre-section">
        <div className="cinema-theatre-container">
          <div className="theatre-stage-grid">
            {/* MAIN STAGE PLAYER */}
            <div className="theatre-main-player">
              <div className="theatre-video-wrap">
                <video
                  key={spotlightVideo.id}
                  src={spotlightVideo.src}
                  poster={spotlightVideo.poster}
                  autoPlay
                  loop
                  muted={isSpotlightMuted}
                  playsInline
                  controls
                />
                <button
                  type="button"
                  className="theatre-sound-toggle"
                  onClick={() => setIsSpotlightMuted(!isSpotlightMuted)}
                  title={isSpotlightMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isSpotlightMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              <div className="theatre-video-meta">
                <div className="theatre-meta-left">
                  <div className="theatre-tags-row">
                    <span className="theatre-tag">{spotlightVideo.category}</span>
                    <span className="theatre-format-badge">{spotlightVideo.sizeLabel}</span>
                    <span className="theatre-duration-badge">{spotlightVideo.duration}</span>
                  </div>
                  <h2 className="theatre-title">{spotlightVideo.title}</h2>
                  <p className="theatre-desc">{spotlightVideo.description}</p>
                </div>
                <div className="theatre-meta-right">
                  <button
                    type="button"
                    className="theatre-fullscreen-btn"
                    onClick={() => setModalVideo(spotlightVideo)}
                  >
                    <Maximize2 size={16} />
                    <span>Watch Fullscreen</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK PLAYLIST QUEUE */}
            <aside className="theatre-queue-panel">
              <div className="queue-header">
                <Tv size={16} />
                <span>Featured Motion Queue ({VIDEOS_DATA.length})</span>
              </div>
              <div className="queue-list">
                {VIDEOS_DATA.map((video) => {
                  const isActive = spotlightVideo.id === video.id;
                  return (
                    <div
                      key={video.id}
                      className={`queue-item ${isActive ? "is-active" : ""}`}
                      onClick={() => setSpotlightVideo(video)}
                    >
                      <div className="queue-thumb">
                        <img src={video.poster} alt={video.title} />
                        <div className="queue-play-indicator">
                          <Play size={12} fill="#ffffff" />
                        </div>
                        <span className="queue-dur">{video.duration}</span>
                      </div>
                      <div className="queue-info">
                        <h4>{video.title}</h4>
                        <div className="queue-sub">
                          <span>{video.client}</span>
                          <span className="queue-aspect-pill">{video.sizeLabel}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FILTER CONTROLS */}
      <section className="video-filter-section">
        <div className="video-filter-inner">
          <div className="video-theme-tabs">
            {VIDEO_THEMES.map((theme) => {
              const count =
                theme.id === "all"
                  ? VIDEOS_DATA.length
                  : VIDEOS_DATA.filter((v) => v.theme === theme.id).length;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`video-tab-btn ${activeTheme === theme.id ? "is-active" : ""}`}
                  onClick={() => setActiveTheme(theme.id)}
                >
                  <span>{theme.label}</span>
                  <span className="tab-counter">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STAGE 2: 9:16 VERTICAL REELS SHOWCASE (Horizontal Snap Carousel) */}
      {(activeTheme === "all" || activeTheme === "reels") && (
        <section className="reels-showcase-section">
          <div className="reels-section-header">
            <div className="reels-title-wrap">
              <span className="reels-eyebrow">
                <Smartphone size={14} />
                Mobile First Experience
              </span>
              <h3>9:16 Vertical Video Reels & Shorts</h3>
            </div>
            <div className="reels-nav-arrows">
              <button
                type="button"
                className="reels-arrow-btn"
                onClick={() => handleReelsScroll("prev")}
                aria-label="Previous reels"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="reels-arrow-btn"
                onClick={() => handleReelsScroll("next")}
                aria-label="Next reels"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="reels-horizontal-track" ref={reelsTrackRef}>
            {verticalReels.map((reel) => (
              <article
                key={reel.id}
                className="reel-card"
                onClick={() => setModalVideo(reel)}
              >
                <div className="reel-media-box">
                  <img src={reel.poster} alt={reel.title} className="reel-poster" />
                  <div className="reel-play-overlay">
                    <div className="reel-play-icon">
                      <Play size={20} fill="#ffffff" />
                    </div>
                  </div>
                  <span className="reel-aspect-tag">9:16 Vertical</span>
                  <span className="reel-time-badge">{reel.duration}</span>
                </div>
                <div className="reel-caption">
                  <h4>{reel.title}</h4>
                  <p>{reel.client}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* STAGE 3: 16:9 WIDESCREEN MOTION & COMMERCIALS BENTO */}
      {motionShowcase.length > 0 && (
        <section className="motion-bento-section">
          <div className="motion-section-header">
            <h3>Widescreen Commercials & 3D Motion</h3>
            <span className="motion-subtitle">
              Interactive video cards with hover preview and adaptive dimensions
            </span>
          </div>

          <div className="motion-cards-grid">
            {motionShowcase.map((video) => (
              <article
                key={video.id}
                className="motion-card"
                onClick={() => setModalVideo(video)}
              >
                <div className="motion-video-container">
                  <img src={video.poster} alt={video.title} className="motion-fallback-img" />
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="motion-overlay-badge">
                    <span className="format-chip">{video.formatTag}</span>
                    <span className="duration-chip">{video.duration}</span>
                  </div>
                  <div className="motion-hover-play">
                    <Play size={24} fill="#ffffff" />
                  </div>
                </div>

                <div className="motion-card-body">
                  <div className="motion-card-meta">
                    <span className="motion-card-cat">{video.category}</span>
                    <span className="motion-card-year">{video.year}</span>
                  </div>
                  <h4 className="motion-card-title">{video.title}</h4>
                  <p className="motion-card-desc">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* BOTTOM ACTION BAR */}
      <footer className="video-bottom-bar">
        <div className="video-bottom-inner">
          <Link to="/" className="video-back-home">
            <ArrowLeft size={16} />
            <span>Return to Portfolio Home</span>
          </Link>
          <Link to="/images" className="video-next-images">
            <span>Explore Images Gallery</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </footer>

      {/* FULLSCREEN VIDEO LIGHTBOX MODAL */}
      {modalVideo && (
        <div className="video-modal-overlay" onClick={() => setModalVideo(null)}>
          <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setModalVideo(null)}
            >
              <X size={20} />
            </button>

            <div className="video-modal-player-wrap">
              <video
                src={modalVideo.src}
                poster={modalVideo.poster}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="video-modal-footer">
              <div>
                <span className="modal-cat-tag">{modalVideo.category} • {modalVideo.sizeLabel}</span>
                <h3 className="modal-video-title">{modalVideo.title}</h3>
                <p className="modal-video-desc">{modalVideo.description}</p>
              </div>
              <div className="modal-tags">
                {modalVideo.tags?.map((t, idx) => (
                  <span key={idx} className="modal-tag-pill">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
