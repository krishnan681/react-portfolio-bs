import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Maximize2,
  Sparkles,
  Image as ImageIcon,
  Film,
  Layers,
} from "lucide-react";
import { BRANDS } from "../../data/brands";
import ImageModal from "../../components/Modals/ImageModal";
import VideoModal from "../../components/Modals/VideoModal";
import ImageWithSkeleton from "../../components/Common/ImageWithSkeleton";
import "./ProjectDetail.css";

/* =========================================================
   MAIN PROJECT DETAIL COMPONENT
========================================================= */
export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Scroll to top on slug / route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Find the active project by prop or slug
  const project = useMemo(() => {
    if (data) return data;
    if (!slug) return BRANDS[0];
    return BRANDS.find((item) => item.slug === slug);
  }, [data, slug]);

  // Find index for Next/Previous project navigation
  const currentIndex = useMemo(() => {
    if (!project) return -1;
    return BRANDS.findIndex((b) => b.slug === project.slug);
  }, [project]);

  const prevProject =
    currentIndex > 0 ? BRANDS[currentIndex - 1] : BRANDS[BRANDS.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < BRANDS.length - 1
      ? BRANDS[currentIndex + 1]
      : BRANDS[0];

  // 404 Project Not Found State
  if (!project) {
    return (
      <main className="project-detail-page project-not-found-state">
        <div className="not-found-card">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">Project Not Found</h1>
          <p className="not-found-desc">
            The branding showcase you are looking for does not exist or has been moved.
          </p>
          <Link to="/" className="project-back-btn primary">
            <ArrowLeft size={16} />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </main>
    );
  }

  const hasCategories = project.categories && project.categories.length > 0;
  const imagesList = project.images || [];
  const hasImages = !hasCategories && imagesList.length > 0;
  const videosList = project.videos || [];
  const hasVideos = videosList.length > 0;

  return (
    <main
      className="project-detail-page"
      data-variant={project.designVariant || "showcase"}
      style={{
        "--project-accent": project.color || "#0284c7",
      }}
    >
      {/* ================= TOP FLOATING NAVIGATION ================= */}
      <nav className="project-top-nav">
        <div className="project-top-nav-inner">
          <Link to="/" className="project-back-btn" aria-label="Back to portfolio">
            <ArrowLeft size={15} />
            <span>Back</span>
          </Link>
          <div className="project-badge-pill">
            <span className="badge-num">Project {project.id || "01"}</span>
            <span className="badge-dot" />
            <span className="badge-title">{project.title}</span>
          </div>
        </div>
      </nav>

      {/* ================= HERO YOUTUBE-STYLE BANNER ================= */}
      <section className="project-hero-banner-section">
        <div className="project-banner-container">
          <ImageWithSkeleton
            src={project.banner || project.src}
            className="project-banner-media"
            wrapperClassName="w-100 h-100"
            alt={`${project.title} Banner`}
          />
          <div className="project-banner-vignette" />
        </div>
      </section>

      {/* ================= MAIN CONTAINER CONTENT ================= */}
      <div className="project-content-container">
        {/* Project Header Info */}
        <header className="project-header-info">
          {project.logo && (
            <div className="project-logo-wrap">
              <img
                src={project.logo}
                className="project-company-logo"
                alt={`${project.title} Logo`}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {project.category && (
            <div className="project-category-tag">
              <Sparkles size={14} />
              <span>{project.category}</span>
            </div>
          )}

          <h1 className="project-headline-title">
            {project.headline || project.title}
          </h1>

          {project.description && (
            <p className="project-lead-p">{project.description}</p>
          )}

          {project.details && (
            <p className="project-details-p">{project.details}</p>
          )}

          {/* Deliverables tags */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="project-tags-wrap">
              {project.deliverables.map((tag, idx) => (
                <span key={idx} className="project-tag-item">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ================= DISTINCT CATEGORY SECTIONS (FOR BRANDS WITH SUBFOLDERS LIKE BROADWAY) ================= */}
        {hasCategories &&
          project.categories.map((category) => {
            const catImages = category.images || [];
            if (catImages.length === 0) return null;

            return (
              <section
                key={category.id}
                className="project-media-section project-category-section"
              >
                <div className="section-title-wrap">
                  <div className="section-title-badge">
                    <Layers size={14} />
                    <span>Category</span>
                  </div>
                  <h2 className="section-heading">{category.title}</h2>
                  {category.subtext && (
                    <p className="section-subtext">{category.subtext}</p>
                  )}
                </div>

                {/* Compact, Eye-Catching Mosaic Masonry (See All at a Glance - No Scrolling Needed) */}
                <div className="project-mosaic-masonry-gallery">
                  {catImages.map((item, idx) => {
                    const isFeatured = idx === 0 && catImages.length >= 4;
                    return (
                      <article
                        key={item.id || `${category.id}-img-${idx}`}
                        className={`project-mosaic-item ${isFeatured ? "is-featured" : ""}`}
                        onClick={() => setSelectedImage(item)}
                      >
                        <div className="mosaic-thumb-card">
                          <ImageWithSkeleton
                            src={item.src}
                            alt={`${category.title} Visual ${idx + 1}`}
                            className="mosaic-img"
                            wrapperClassName="w-100 h-100"
                          />

                          <div className="mosaic-hover-overlay">
                            <div className="mosaic-zoom-pill">
                              <Maximize2 size={15} />
                              <span>View Fullscreen</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

        {/* ================= SINGLE IMAGES SECTION (FOR BRANDS WITHOUT SUBFOLDERS) ================= */}
        {hasImages && (
          <section className="project-media-section project-images-section">
            <div className="section-title-wrap">
              <div className="section-title-badge">
                <ImageIcon size={15} />
                <span>Gallery</span>
              </div>
              <h2 className="section-heading">Visual Showcase</h2>
            </div>

            {/* Compact Mosaic Masonry */}
            <div className="project-mosaic-masonry-gallery">
              {imagesList.map((item, idx) => {
                const isFeatured = idx === 0 && imagesList.length >= 4;
                return (
                  <article
                    key={item.id || `img-${idx}`}
                    className={`project-mosaic-item ${isFeatured ? "is-featured" : ""}`}
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="mosaic-thumb-card">
                      <ImageWithSkeleton
                        src={item.src}
                        alt={`${project.title} Visual ${idx + 1}`}
                        className="mosaic-img"
                        wrapperClassName="w-100 h-100"
                      />

                      <div className="mosaic-hover-overlay">
                        <div className="mosaic-zoom-pill">
                          <Maximize2 size={15} />
                          <span>View Fullscreen</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= VIDEOS SECTION (PURE VERTICAL REELS - NO TEXTS) ================= */}
        {hasVideos && (
          <section className="project-media-section project-videos-section">
            <div className="section-title-wrap">
              <div className="section-title-badge">
                <Film size={15} />
                <span>Motion</span>
              </div>
              <h2 className="section-heading">Vertical Video Reels</h2>
            </div>

            {/* Vertical Video 9:16 Grid (Pure Visuals) */}
            <div className="project-vertical-videos-grid">
              {videosList.map((item, idx) => (
                <article
                  key={item.id || `vid-${idx}`}
                  className="project-vertical-video-card"
                  onClick={() => setSelectedVideo(item)}
                >
                  <div className="vertical-video-thumb">
                    <video
                      src={item.src}
                      poster={item.poster}
                      preload="metadata"
                      playsInline
                      muted
                      loop
                      autoPlay
                      className="vertical-video-media"
                    />

                    <div className="video-play-badge">
                      <Play size={18} fill="#ffffff" />
                    </div>

                    <div className="video-hover-scrim">
                      <span className="video-action-pill">
                        <Play size={14} fill="currentColor" /> Play Reel
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ================= BOTTOM PROJECT NAVIGATION ================= */}
        <footer className="project-footer-navigation">
          {prevProject && (
            <Link
              to={`/branding/${prevProject.slug}`}
              className="project-nav-link prev"
            >
              <ArrowLeft size={16} />
              <div className="nav-link-texts">
                <span className="nav-direction">Previous Project</span>
                <span className="nav-name">{prevProject.title}</span>
              </div>
            </Link>
          )}

          <Link to="/" className="project-nav-link back-home">
            <Sparkles size={14} />
            <span>All Projects</span>
          </Link>

          {nextProject && (
            <Link
              to={`/branding/${nextProject.slug}`}
              className="project-nav-link next"
            >
              <div className="nav-link-texts text-end">
                <span className="nav-direction">Next Project</span>
                <span className="nav-name">{nextProject.title}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          )}
        </footer>
      </div>

      {/* ================= FULL-SCREEN LIGHTBOX MODALS ================= */}
      <ImageModal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src}
        title={selectedImage?.title || project.title}
        tag={selectedImage?.tag}
      />

      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        src={selectedVideo?.src}
        title={selectedVideo?.title || project.title}
        tag={selectedVideo?.tag}
      />
    </main>
  );
}
