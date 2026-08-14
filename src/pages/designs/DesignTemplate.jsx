import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Maximize2 } from "lucide-react";
import ImageModal from "../../components/Modals/ImageModal";
import VideoModal from "../../components/Modals/VideoModal";
import "./AarthiDesign.css";

const FILTERS = ["all", "images", "videos"];

export default function DesignTemplate({ data }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const horizontalRef = useRef(null);

  const filteredMedia = useMemo(() => {
    const list = data?.media || [];
    if (activeFilter === "all") return list;
    if (activeFilter === "images") return list.filter((m) => m.type === "image");
    if (activeFilter === "videos") return list.filter((m) => m.type === "video");
    return list;
  }, [data, activeFilter]);

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
  }, [data]);

  if (!data) return null;

  const handleMediaClick = (item) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedImage(item);
    }
  };

  return (
    <main className="aarthi-page">
      <nav className="aarthi-top-nav">
        <Link to="/" className="aarthi-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <span className="aarthi-project-badge">Project {data.id} / {data.title}</span>
      </nav>

      <section className="aarthi-hero">
        <div className="aarthi-logo">
          {data.logo && <img src={data.logo} alt={`${data.title} Logo`} />}
        </div>

        <div className="aarthi-hero-content">
          <div className="aarthi-title-area">
            <p className="aarthi-eyebrow">
              <Sparkles size={14} className="sparkle-icon" />
              {data.category}
            </p>
            <h1>{data.title}</h1>
          </div>

          <div
            className="aarthi-hero-image clickable-media"
            onClick={() => setSelectedImage({ src: data.src, title: data.title, tag: "Key Visual" })}
          >
            <img src={data.src} alt={data.title} />
            <div className="media-expand-hint">
              <Maximize2 size={18} />
            </div>
          </div>
        </div>
      </section>

      <section className="aarthi-description">
        <div className="aarthi-description-label">
          <span>01</span>
          <span>About the project</span>
        </div>

        <div className="aarthi-description-content">
          <h2>{data.headline || data.title}</h2>
          <p>{data.description}</p>
          {data.details && <p>{data.details}</p>}

          <div className="aarthi-tags-grid">
            {data.deliverables?.map((item, index) => (
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
              <article
                className={`aarthi-media-card ${item.type} clickable-media`}
                key={item.id}
                onClick={() => handleMediaClick(item)}
              >
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
                    />
                  </div>
                )}

                <div className="media-expand-hint">
                  <Maximize2 size={16} />
                </div>

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
