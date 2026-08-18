import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  Layers,
  X,
  Eye,
} from "lucide-react";
import { IMAGES_DATA, IMAGE_THEMES } from "../../data/visualCreationsData";
import "./ImagesPage.css";

export default function ImagesPage() {
  const [activeTheme, setActiveTheme] = useState("all");
  const [viewMode, setViewMode] = useState("bento");
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const filmstripRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredImages = useMemo(() => {
    if (activeTheme === "all") return IMAGES_DATA;
    return IMAGES_DATA.filter((item) => item.theme === activeTheme);
  }, [activeTheme]);

  const selectedImage = activeImageIndex !== null ? filteredImages[activeImageIndex] : null;

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
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
  }, [activeImageIndex, filteredImages]);

  const handleCarouselScroll = (direction) => {
    if (!filmstripRef.current) return;
    const scrollAmount = 380;
    filmstripRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

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
            Art Direction & Graphic Systems
          </span>
          <h1 className="gallery-hero-title">Visual Creations & Imagery</h1>
          <p className="gallery-hero-desc">
            A curated anthology of branding collaterals, typography posters, advertising key visuals, and digital compositions crafted with bespoke scales and thematic resonance.
          </p>

          <div className="gallery-stats-bar">
            <div className="stat-pill">
              <strong>{filteredImages.length}</strong>
              <span>Pieces</span>
            </div>
            <div className="stat-pill">
              <strong>5</strong>
              <span>Disciplines</span>
            </div>
            <div className="stat-pill">
              <strong>Adaptive</strong>
              <span>Aspect Ratios</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLBAR CONTROLS */}
      <section className="gallery-toolbar-section">
        <div className="gallery-toolbar-inner">
          {/* THEME FILTERS */}
          <div className="gallery-filter-tabs">
            {IMAGE_THEMES.map((theme) => {
              const count =
                theme.id === "all"
                  ? IMAGES_DATA.length
                  : IMAGES_DATA.filter((i) => i.theme === theme.id).length;
              return (
                <button
                  key={theme.id}
                  type="button"
                  className={`filter-tab-btn ${activeTheme === theme.id ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveTheme(theme.id);
                    setActiveImageIndex(null);
                  }}
                >
                  <span>{theme.label}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* VIEW SWITCHER */}
          <div className="gallery-view-switcher">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "bento" ? "active" : ""}`}
              onClick={() => setViewMode("bento")}
              title="Curated Bento Showcase"
            >
              <LayoutGrid size={16} />
              <span>Bento Grid</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "filmstrip" ? "active" : ""}`}
              onClick={() => setViewMode("filmstrip")}
              title="Horizontal Filmstrip Carousel"
            >
              <Layers size={16} />
              <span>Filmstrip</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === "masonry" ? "active" : ""}`}
              onClick={() => setViewMode("masonry")}
              title="Compact Masonry"
            >
              <SlidersHorizontal size={16} />
              <span>Masonry</span>
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY SHOWCASE DISPLAY */}
      <section className="gallery-showcase-container">
        {/* MODE 1: BENTO GRID */}
        {viewMode === "bento" && (
          <div className="bento-gallery-grid">
            {filteredImages.map((img, idx) => (
              <article
                key={img.id}
                className={`bento-card ${img.aspect} ${img.span || ""}`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <div className="card-media-wrap">
                  <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                  <div className="card-overlay">
                    <div className="card-top-tags">
                      <span className="aspect-badge">{img.sizeLabel}</span>
                      <span className="year-badge">{img.year}</span>
                    </div>
                    <div className="card-bottom-info">
                      <span className="card-category">{img.category}</span>
                      <h3 className="card-title">{img.title}</h3>
                      <p className="card-client">{img.client}</p>
                    </div>
                    <button type="button" className="quick-preview-btn">
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* MODE 2: HORIZONTAL FILMSTRIP CAROUSEL (ZERO VERTICAL SCROLL FATIGUE) */}
        {viewMode === "filmstrip" && (
          <div className="filmstrip-showcase-wrap">
            <div className="filmstrip-nav-controls">
              <span className="filmstrip-hint">
                <Sparkles size={14} /> Swipe or scroll horizontally to explore collection
              </span>
              <div className="filmstrip-arrows">
                <button
                  type="button"
                  className="filmstrip-arrow-btn"
                  onClick={() => handleCarouselScroll("prev")}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="filmstrip-arrow-btn"
                  onClick={() => handleCarouselScroll("next")}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="filmstrip-track" ref={filmstripRef}>
              {filteredImages.map((img, idx) => (
                <article
                  key={img.id}
                  className={`filmstrip-card ${img.aspect}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <div className="filmstrip-media">
                    <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                    <div className="filmstrip-hover-curtain">
                      <Eye size={22} />
                      <span>Inspect Artwork</span>
                    </div>
                  </div>
                  <div className="filmstrip-caption">
                    <div className="filmstrip-meta">
                      <span className="meta-tag">{img.category}</span>
                      <span className="meta-size">{img.sizeLabel}</span>
                    </div>
                    <h4>{img.title}</h4>
                    <p>{img.client}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* MODE 3: MASONRY GRID */}
        {viewMode === "masonry" && (
          <div className="masonry-gallery-grid">
            {filteredImages.map((img, idx) => (
              <article
                key={img.id}
                className="masonry-card"
                onClick={() => setActiveImageIndex(idx)}
              >
                <div className="masonry-media-wrap">
                  <img src={img.src} alt={img.title} loading="lazy" decoding="async" />
                  <div className="masonry-overlay">
                    <span className="masonry-aspect-pill">{img.sizeLabel}</span>
                    <div className="masonry-text">
                      <span className="masonry-sub">{img.category}</span>
                      <h4>{img.title}</h4>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* BOTTOM CTA BAR */}
      <footer className="gallery-bottom-bar">
        <div className="bottom-bar-inner">
          <Link to="/" className="back-home-button">
            <ArrowLeft size={16} />
            <span>Return to Portfolio Home</span>
          </Link>
          <Link to="/videos" className="next-showcase-button">
            <span>Explore Videos Showcase</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </footer>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="gallery-lightbox-overlay" onClick={() => setActiveImageIndex(null)}>
          <div className="gallery-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActiveImageIndex(null)}
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="lightbox-content-grid">
              <div className="lightbox-image-stage">
                <img src={selectedImage.src} alt={selectedImage.title} />
              </div>

              <div className="lightbox-details-panel">
                <div className="lightbox-details-header">
                  <span className="lightbox-category-tag">{selectedImage.category}</span>
                  <span className="lightbox-index-badge">
                    {activeImageIndex + 1} / {filteredImages.length}
                  </span>
                </div>

                <h2 className="lightbox-title">{selectedImage.title}</h2>
                <p className="lightbox-desc">{selectedImage.description}</p>

                <div className="lightbox-info-table">
                  <div className="info-row">
                    <span className="info-label">Client</span>
                    <span className="info-value">{selectedImage.client}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Format / Aspect</span>
                    <span className="info-value">{selectedImage.sizeLabel}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Year</span>
                    <span className="info-value">{selectedImage.year}</span>
                  </div>
                </div>

                {selectedImage.tags && (
                  <div className="lightbox-tags-list">
                    {selectedImage.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="lightbox-tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
