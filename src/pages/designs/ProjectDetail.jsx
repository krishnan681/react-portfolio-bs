import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BRANDS } from "../../data/brands";
import "./AarthiDesign.css";

const FILTERS = ["all", "images", "videos"];

export default function ProjectDetail() {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const horizontalRef = useRef(null);

  const project = useMemo(() => {
    return BRANDS.find((item) => item.slug === slug) || BRANDS[0];
  }, [slug]);

  const filteredMedia = useMemo(() => {
    const mediaList = project.media || [];
    if (activeFilter === "all") return mediaList;
    if (activeFilter === "images") return mediaList.filter((item) => item.type === "image");
    if (activeFilter === "videos") return mediaList.filter((item) => item.type === "video");
    return mediaList;
  }, [project, activeFilter]);

  useEffect(() => {
    const container = horizontalRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [project]);

  if (!project) {
    return (
      <main className="aarthi-page" style={{ display: "grid", placeItems: "center" }}>
        <h1>Project Not Found</h1>
        <Link to="/" className="aarthi-back-btn">Back to Portfolio</Link>
      </main>
    );
  }

  return (
    <main className="aarthi-page">
      <nav className="aarthi-top-nav">
        <Link to="/" className="aarthi-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <span className="aarthi-project-badge">Project {project.id} / {project.title}</span>
      </nav>

      <section className="aarthi-hero">
        <div className="aarthi-logo">
          {project.logo && <img src={project.logo} alt={`${project.title} Logo`} />}
        </div>

        <div className="aarthi-hero-content">
          <div className="aarthi-title-area">
            <p className="aarthi-eyebrow">
              <Sparkles size={14} className="sparkle-icon" />
              {project.category}
            </p>

            <h1>{project.title}</h1>
          </div>

          <div className="aarthi-hero-image">
            <img src={project.src} alt={project.title} />
          </div>
        </div>
      </section>

      <section className="aarthi-description">
        <div className="aarthi-description-label">
          <span>01</span>
          <span>About the project</span>
        </div>

        <div className="aarthi-description-content">
          <h2>{project.headline || project.title}</h2>
          <p>{project.description}</p>
          {project.details && <p>{project.details}</p>}

          <div className="aarthi-tags-grid">
            {project.deliverables?.map((item, index) => (
              <div key={index} className="aarthi-tag-pill">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aarthi-media-section">
        <div className="aarthi-filter-bar">
          <div className="aarthi-filter-title">
            <span>02</span>
            <span>Selected Showcase ({filteredMedia.length})</span>
          </div>

          <div className="aarthi-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "all" && "All Works"}
                {filter === "images" && "Images"}
                {filter === "videos" && "Videos"}
              </button>
            ))}
          </div>
        </div>

        <div ref={horizontalRef} className="aarthi-horizontal-media">
          <div className="aarthi-media-track">
            {filteredMedia.map((item) => (
              <article className={`aarthi-media-card ${item.type}`} key={item.id}>
                {item.type === "image" && (
                  <img src={item.src} alt={item.title} loading="lazy" />
                )}

                {item.type === "video" && (
                  <div className="aarthi-video-wrapper">
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  </div>
                )}

                <div className="aarthi-media-info">
                  <span className="aarthi-media-tag">{item.tag || item.type.toUpperCase()}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="aarthi-bottom-footer">
        <Link to="/" className="aarthi-footer-back">
          <ArrowLeft size={18} />
          <span>Back to All Projects</span>
        </Link>
      </footer>
    </main>
  );
}
