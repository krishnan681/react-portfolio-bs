import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play, Maximize2, Sparkles } from "lucide-react";
import { BRANDS } from "../../data/brands";
import ImageModal from "../../components/Modals/ImageModal";
import VideoModal from "../../components/Modals/VideoModal";
import ImageWithSkeleton from "../../components/Common/ImageWithSkeleton";
import "./ProjectDetail.css";

const FILTERS = ["all", "images", "videos"];

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Scroll to top on page or slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find the active project by prop or slug
  const project = useMemo(() => {
    if (data) return data;
    if (!slug) return BRANDS[0];
    return BRANDS.find((item) => item.slug === slug) || BRANDS[0];
  }, [data, slug]);

  // Find index for Next/Previous project navigation
  const currentIndex = useMemo(() => {
    return BRANDS.findIndex((b) => b.slug === project?.slug);
  }, [project]);

  const prevProject = currentIndex > 0 ? BRANDS[currentIndex - 1] : BRANDS[BRANDS.length - 1];
  const nextProject = currentIndex < BRANDS.length - 1 ? BRANDS[currentIndex + 1] : BRANDS[0];

  // Filter media
  const filteredMedia = useMemo(() => {
    const mediaList = project?.media || [];
    if (activeFilter === "all") return mediaList;
    if (activeFilter === "images") return mediaList.filter((item) => item.type === "image");
    if (activeFilter === "videos") return mediaList.filter((item) => item.type === "video");
    return mediaList;
  }, [project, activeFilter]);

  if (!project) {
    return (
      <main className="project-detail-page d-flex flex-column align-items-center justify-content-center py-5">
        <h1 className="mb-4">Project Not Found</h1>
        <Link to="/" className="project-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
      </main>
    );
  }

  const handleMediaClick = (item) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedImage(item);
    }
  };

  return (
    <main className="project-detail-page">
      {/* ================= TOP NAVIGATION ================= */}
      <nav className="project-top-nav">
        <Link to="/" className="project-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <span className="project-badge-pill">
          Project {project.id || "01"} / {project.title}
        </span>
      </nav>

      {/* ================= HERO BANNER ================= */}
      <section className="project-hero-section">
        <div className="project-banner-wrapper">
          <ImageWithSkeleton
            src={project.banner || project.src}
            className="project-banner-img w-100"
            wrapperClassName="w-100 h-100"
            alt={`${project.title} Banner`}
          />
        </div>
      </section>

      {/* ================= MAIN CONTAINER CONTENT ================= */}
      <div className="container py-4">
        {/* Optional Company Logo */}
        {project.logo && (
          <div className="row justify-content-center pt-4">
            <div className="col-md-3 col-6 text-center">
              <div className="project-logo-wrap">
                <img
                  src={project.logo}
                  className="project-company-logo img-fluid"
                  alt={`${project.title} Logo`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        )}

        {/* Project Description & Headline */}
        <div className="row justify-content-center pt-2">
          <div className="col-lg-12 text-center">
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
          </div>
        </div>

        <hr className="my-4 project-divider" />

        {/* ================= INNER TITLE SECTION (SPECIFIED FORMAT) ================= */}
        <div className="row justify-content-center pt-4">
          <div className="col-12">
            <div className="inner__title">
              <div className="inner__title-text">
                {project.sectionTitle || "SHOWCASE"}
              </div>
              <div className="inner__title-line"></div>
            </div>
          </div>
        </div>

        {/* ================= MEDIA FILTER BAR ================= */}
        <div className="project-filter-bar">
          <div className="project-filter-count">
            Selected Works ({filteredMedia.length})
          </div>

          <div className="project-filter-buttons">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`project-filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "all" && "All Works"}
                {filter === "images" && "Images"}
                {filter === "videos" && "Videos"}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MEDIA GRID SHOWCASE ================= */}
        <div className="project-media-grid">
          {filteredMedia.map((item) => (
            <article
              key={item.id}
              className={`project-media-card ${item.type}`}
              onClick={() => handleMediaClick(item)}
            >
              <div className="project-media-thumb">
                {item.type === "image" && (
                  <ImageWithSkeleton
                    src={item.src}
                    alt={item.title}
                    wrapperClassName="w-100 h-100"
                  />
                )}

                {item.type === "video" && (
                  <>
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="video-play-indicator">
                      <Play size={16} fill="white" />
                    </div>
                  </>
                )}

                <div className="project-media-hover-overlay">
                  <span className="project-media-action-pill">
                    {item.type === "video" ? (
                      <>
                        <Play size={14} fill="currentColor" /> Play Video
                      </>
                    ) : (
                      <>
                        <Maximize2 size={14} /> View Image
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="project-media-meta">
                <span className="project-media-tag">
                  {item.tag || (item.type === "video" ? "VIDEO" : "IMAGE")}
                </span>
                <h3 className="project-media-title">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* ================= BOTTOM PROJECT NAVIGATION ================= */}
        <div className="project-bottom-nav-box">
          {prevProject && (
            <Link
              to={`/branding/${prevProject.slug}`}
              className="project-nav-link"
            >
              <ArrowLeft size={16} />
              <span>Prev: {prevProject.title}</span>
            </Link>
          )}

          <Link to="/" className="project-nav-link primary">
            <span>Back to All Projects</span>
          </Link>

          {nextProject && (
            <Link
              to={`/branding/${nextProject.slug}`}
              className="project-nav-link"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* ================= LIGHTBOX MODALS ================= */}
      <ImageModal
        isOpen={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src}
        title={selectedImage?.title}
        tag={selectedImage?.tag}
      />

      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        src={selectedVideo?.src}
        title={selectedVideo?.title}
        tag={selectedVideo?.tag}
      />
    </main>
  );
}
