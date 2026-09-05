import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Play,
  Film,
  ChevronRight,
  ChevronUp,
  Plus,
  Layers,
} from "lucide-react";
import { VIDEO_SECTIONS } from "../../data/visualCreationsData";
import VideoModal from "../../components/Modals/VideoModal";
import "./VideosPage.css";

/* =========================================================
   VIDEO FOLDER SECTION COMPONENT (2 Rows Initial + Load More)
========================================================= */
function VideoFolderSection({ section, sIdx, onSelectVideo }) {
  const INITIAL_COUNT = 8; // 2 rows (4 columns grid)
  const STEP = 8;
  const videos = section.videos || [];
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const hasMore = visibleCount < videos.length;
  const isExpanded = visibleCount > INITIAL_COUNT;
  const visibleVideos = videos.slice(0, visibleCount);
  const remainingCount = videos.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, videos.length));
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <section className="video-folder-section">
      <div className="video-section-header">
        <div className="video-section-badge">
          <Layers size={14} />
          <span>Folder 0{sIdx + 1}</span>
        </div>
        <h2 className="video-section-title">{section.title}</h2>
      </div>

      <div className="video-gallery-grid">
        {visibleVideos.map((vid, vIdx) => {
          const numStr = String(vIdx + 1).padStart(2, "0");
          return (
            <article
              key={vid.id || `vid-${sIdx}-${vIdx}`}
              className="video-card-item"
              onClick={() => onSelectVideo(vid)}
            >
              <div className="video-card-thumb">
                <video
                  src={vid.src}
                  preload="metadata"
                  playsInline
                  muted
                  loop
                  autoPlay
                  className="video-card-media"
                />
                <div className="video-card-vignette" />
                <span className="video-card-badge">#{numStr}</span>

                <div className="video-card-play-btn">
                  <Play size={18} fill="#ffffff" />
                </div>

                <div className="video-card-hover-scrim">
                  <div className="video-card-action-pill">
                    <Play size={14} fill="currentColor" />
                    <span>Play Reel</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* LOAD MORE / VIEW LESS CONTROLS */}
      {(hasMore || isExpanded) && (
        <div className="video-load-controls">
          <div className="video-btn-group">
            {hasMore && (
              <button
                type="button"
                className="video-load-btn load-more-btn"
                onClick={handleLoadMore}
              >
                <Plus size={16} />
                <span>Load More Videos</span>
                <span className="video-count-badge">
                  +{Math.min(STEP, remainingCount)}
                </span>
              </button>
            )}
            {isExpanded && (
              <button
                type="button"
                className="video-load-btn view-less-btn"
                onClick={handleViewLess}
              >
                <ChevronUp size={16} />
                <span>View Less</span>
              </button>
            )}
          </div>
          <p className="video-status-text">
            Showing {visibleVideos.length} of {videos.length} videos
          </p>
        </div>
      )}
    </section>
  );
}

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalVideos = VIDEO_SECTIONS.reduce(
    (acc, sec) => acc + (sec.videos?.length || 0),
    0
  );

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
            <span>Visual Creations / Videos</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="video-hero-section">
        <div className="video-hero-content">
          <span className="video-eyebrow">
            <Film size={14} />
            Visual Creations
          </span>
          <h1 className="video-hero-title">Motion & Video Showcase</h1>
          <p className="video-hero-desc">
            A curated showcase of commercial edits, 3D motion graphics, brand teasers, and vertical video reels.
          </p>

          <div className="video-stats-bar">
            <div className="stat-pill">
              <strong>{totalVideos}</strong>
              <span>Reels & Videos</span>
            </div>
            <div className="stat-pill">
              <strong>2</strong>
              <span>Collections</span>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO FOLDER SECTIONS */}
      <div className="video-sections-container">
        {VIDEO_SECTIONS.map((section, sIdx) => (
          <VideoFolderSection
            key={section.id || sIdx}
            section={section}
            sIdx={sIdx}
            onSelectVideo={setSelectedVideo}
          />
        ))}
      </div>

      {/* BOTTOM NAVIGATION */}
      <footer className="video-bottom-bar">
        <div className="bottom-bar-inner">
          <Link to="/" className="back-home-button">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/images" className="next-showcase-button">
            <span>Explore Images Showcase</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </footer>

      {/* FULLSCREEN VIDEO MODAL */}
      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        src={selectedVideo?.src}
        title="Visual Creation Video"
      />
    </main>
  );
}
