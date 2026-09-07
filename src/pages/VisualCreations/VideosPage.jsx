import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const INITIAL_COUNT = 4; // 1 row (4 columns grid)
  const STEP = 4;
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
    <section
      key={section.id || sIdx}
      className="video-folder-group"
      data-aos="fade-up"
      data-aos-delay={sIdx * 80}
    >
      <div className="folder-header-row">
        <div className="folder-title-pill">
          <Layers size={14} />
          <h2 className="folder-title">{section.title}</h2>
        </div>
        <span className="folder-badge-total">
          {videos.length} {videos.length === 1 ? "Video" : "Videos"}
        </span>
      </div>

      <div className="video-folder-grid">
        {visibleVideos.map((item, idx) => (
          <article
            key={item.id || `video-${sIdx}-${idx}`}
            className="video-card-vertical"
            onClick={() => onSelectVideo(item)}
            tabIndex={0}
          >
            <div className="video-thumb-container">
              <video
                src={item.src}
                poster={item.poster}
                preload="metadata"
                playsInline
                muted
                loop
                autoPlay
                className="video-thumb-media"
              />

              <div className="video-play-center-btn" aria-hidden="true">
                <Play size={20} fill="#ffffff" />
              </div>

              <div className="video-card-scrim">
                <span className="video-scrim-action">
                  <Play size={13} fill="currentColor" /> Watch Video
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* LOAD MORE / VIEW LESS ACTION CONTROLS */}
      {(hasMore || isExpanded) && (
        <div className="video-folder-load-controls">
          <div className="video-btn-group">
            {hasMore && (
              <button
                type="button"
                className="video-load-btn load-more-btn"
                onClick={handleLoadMore}
                aria-label={`Load more videos for ${section.title}`}
              >
                <Plus size={16} />
                <span>Load More</span>
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
                aria-label={`View less videos for ${section.title}`}
              >
                <ChevronUp size={16} />
                <span>View Less</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default function VideosPage() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleBackToVisuals = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/#visual");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="videos-page">
      {/* TOP NAV */}
      <header className="video-header-nav">
        <div className="video-header-container">
          <button
            type="button"
            onClick={handleBackToVisuals}
            className="video-back-link"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>
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
          <button
            type="button"
            onClick={handleBackToVisuals}
            className="back-home-button"
            aria-label="Return to portfolio"
          >
            <ArrowLeft size={16} />
            <span>Return to Visuals</span>
          </button>
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
