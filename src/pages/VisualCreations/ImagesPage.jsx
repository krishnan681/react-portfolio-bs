import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  X,
} from "lucide-react";
import { IMAGES_DATA } from "../../data/visualCreationsData";
import ImageWithSkeleton from "../../components/Common/ImageWithSkeleton";
import EmptyState from "../../components/Common/EmptyState";
import "./ImagesPage.css";

export default function ImagesPage() {
  const INITIAL_COUNT = 4;
  const STEP = 4;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasMore = visibleCount < IMAGES_DATA.length;
  const isExpanded = visibleCount > INITIAL_COUNT;
  const visibleImages = IMAGES_DATA.slice(0, visibleCount);
  const remainingCount = IMAGES_DATA.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, IMAGES_DATA.length));
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  const selectedImage =
    activeImageIndex !== null ? IMAGES_DATA[activeImageIndex] : null;

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev + 1) % IMAGES_DATA.length);
  };

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (prev) => (prev - 1 + IMAGES_DATA.length) % IMAGES_DATA.length
    );
  };

  useEffect(() => {
    if (activeImageIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  return (
    <main className="images-page">
      {/* TOP HEADER / NAV */}
      <header className="gallery-header-nav">
        <div className="gallery-header-container">
          <Link to="/" className="gallery-back-link">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
          <div className="gallery-header-badge">
            <Sparkles size={13} className="badge-sparkle" />
            <span>Visual Creations / Images</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="gallery-hero-section">
        <div className="gallery-hero-content">
          <span className="gallery-eyebrow">
            <Sparkles size={14} />
            Visual Creations
          </span>
          <h1 className="gallery-hero-title">Graphic & Visual Showcase</h1>
          <p className="gallery-hero-desc">
            A curated gallery of branding collaterals, digital key visuals, posters, and creative artworks.
          </p>

          <div className="gallery-stats-bar">
            <div className="stat-pill">
              <strong>{IMAGES_DATA.length}</strong>
              <span>Pieces</span>
            </div>
            <div className="stat-pill">
              <strong>High Definition</strong>
              <span>Render</span>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SHOWCASE DISPLAY */}
      <section className="gallery-showcase-container">
        {IMAGES_DATA.length === 0 ? (
          <EmptyState
            title="No Visuals Found"
            message="There are no creative designs currently available."
            actionText="Back to Home"
            onAction={() => window.location.href = "/"}
          />
        ) : (
          <>
            <div className="images-gallery-grid">
              {visibleImages.map((img, idx) => {
                const numStr = String(idx + 1).padStart(2, "0");
                return (
                  <article
                    key={img.id}
                    className="image-card-item"
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <div className="image-card-media-wrap">
                      <ImageWithSkeleton
                        src={img.src}
                        alt={`Visual Creation ${numStr}`}
                        className="image-card-img"
                        wrapperClassName="image-card-skeleton-wrap"
                      />
                      <div className="image-card-vignette" />
                      <span className="image-card-badge">#{numStr}</span>
                      <div className="image-card-hover-scrim">
                        <div className="image-card-zoom-pill">
                          <Maximize2 size={16} />
                          <span>View Fullscreen</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* LOAD MORE / VIEW LESS ACTION CONTROLS */}
            {(hasMore || isExpanded) && (
              <div className="gallery-load-controls">
                <div className="gallery-btn-group">
                  {hasMore && (
                    <button
                      type="button"
                      className="gallery-load-btn load-more-btn"
                      onClick={handleLoadMore}
                    >
                      <Plus size={16} />
                      <span>Load More</span>
                      <span className="gallery-count-badge">
                        +{Math.min(STEP, remainingCount)}
                      </span>
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      type="button"
                      className="gallery-load-btn view-less-btn"
                      onClick={handleViewLess}
                    >
                      <ChevronUp size={16} />
                      <span>View Less</span>
                    </button>
                  )}
                </div>
                <p className="gallery-status-text">
                  Showing {visibleImages.length} of {IMAGES_DATA.length} visuals
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* BOTTOM CTA BAR */}
      <footer className="gallery-bottom-bar">
        <div className="bottom-bar-inner">
          <Link to="/" className="back-home-button">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/videos" className="next-showcase-button">
            <span>Explore Videos Showcase</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setActiveImageIndex(null)}
        >
          <div
            className="gallery-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close Preview"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={handlePrevImage}
              aria-label="Previous visual"
            >
              <ChevronLeft size={26} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={handleNextImage}
              aria-label="Next visual"
            >
              <ChevronRight size={26} />
            </button>

            <div className="lightbox-image-stage">
              <img
                src={selectedImage.src}
                alt={`Visual Preview ${activeImageIndex + 1}`}
                className="lightbox-stage-img"
              />
              <div className="lightbox-counter-pill">
                {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                {String(IMAGES_DATA.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
