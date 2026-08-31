import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { BRANDS } from "../../data/brands";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";
import "./Branding.css";

const AUTOPLAY_DELAY = 3800; // 3.8s autoplay delay

export default function Branding() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const isPaused = useRef(false);
  const timerRef = useRef(null);
  const dragInfo = useRef({ startX: 0, startY: 0, isDragging: false });

  const total = BRANDS.length;

  const goTo = useCallback(
    (index) => {
      const next = ((index % total) + total) % total;
      setActive(next);
    },
    [total]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // ── Autoplay ──────────────────────────────────────────
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActive((prevIdx) => (prevIdx + 1) % total);
      }
    }, AUTOPLAY_DELAY);
  }, [total]);

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const pause = () => {
    isPaused.current = true;
  };

  const resume = () => {
    isPaused.current = false;
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay]);

  // ── Keyboard Navigation ──────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        pause();
        prev();
        setTimeout(resume, AUTOPLAY_DELAY);
      }
      if (e.key === "ArrowRight") {
        pause();
        next();
        setTimeout(resume, AUTOPLAY_DELAY);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ── 3D Coverflow Transform Calculation ───────────────
  const getSlideStyle = (index) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    const translateX = offset * 62; // Percentage offset
    const rotateY = offset * -6;    // Subtle 3D tilt
    const scale = abs === 0 ? 1 : Math.max(0.68, 1 - abs * 0.16);
    const zIndex = 100 - abs;
    const opacity = abs > 2 ? 0 : Math.max(0, 1 - abs * 0.25);

    return {
      transform: `
        translate(-50%, -50%)
        translateX(${translateX}%)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      zIndex,
      opacity: abs > 3 ? 0 : opacity,
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    pause();
    prev();
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    pause();
    next();
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  const handleDot = (e, i) => {
    e.stopPropagation();
    pause();
    goTo(i);
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  // Drag handling without swallowing clicks
  const handlePointerDown = (e) => {
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      isDragging: false,
    };
    pause();
  };

  const handlePointerMove = (e) => {
    const deltaX = Math.abs(e.clientX - dragInfo.current.startX);
    const deltaY = Math.abs(e.clientY - dragInfo.current.startY);
    if (deltaX > 10 || deltaY > 10) {
      dragInfo.current.isDragging = true;
    }
  };

  const handlePointerUp = (e) => {
    const deltaX = e.clientX - dragInfo.current.startX;
    if (Math.abs(deltaX) > 60) {
      if (deltaX > 0) prev();
      else next();
    }
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  const handleCardClick = (e, index, slug) => {
    // If the user performed a drag gesture, do not navigate
    if (dragInfo.current.isDragging) {
      e.preventDefault();
      return;
    }

    if (index === active) {
      navigate(`/branding/${slug}`);
    } else {
      pause();
      goTo(index);
      setTimeout(resume, AUTOPLAY_DELAY);
    }
  };

  return (
    <section className="branding-section" id="branding" aria-label="Branding Collaborations">
      <div className="container-fluid px-0">
        {/* ================= TITLE ================= */}
        <div className="title" data-aos="fade-up">
          <div className="bg-text">Branding</div>
          <h1 className="main-title">COLLABORATIONS</h1>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="BC-heading text-center" data-aos="fade-up" data-aos-delay="100">
          <p>
            Creative work delivered across diverse industries — entertainment, retail,
            <br />
            hospitality, and healthcare — showcasing versatile design and content expertise.
          </p>
        </div>

        {/* ================= 3D COVERFLOW STAGE ================= */}
        <div
          className="branding-cf-stage"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="branding-cf-deck">
            {BRANDS.map((brand, i) => {
              const isActive = i === active;
              return (
                <article
                  key={brand.slug}
                  className={`branding-cf-slide ${isActive ? "is-active" : ""}`}
                  style={{
                    ...getSlideStyle(i),
                    "--brand-accent": brand.color || "#0284c7",
                  }}
                  onClick={(e) => handleCardClick(e, i, brand.slug)}
                >
                  {/* Full-bleed Brand Cover / Logo Media */}
                  <div className="branding-cf-image-wrap">
                    <ImageWithSkeleton
                      src={brand.src || brand.logo}
                      alt={`${brand.title} Cover`}
                      wrapperClassName="w-100 h-100"
                    />
                  </div>

                  {/* Top Floating Badges */}
                  <div className="branding-cf-top-bar">
                    <div className="branding-cf-tag">
                      <Sparkles size={12} />
                      <span>{brand.category?.split("/")[0] || "Branding"}</span>
                    </div>
                    <span className="branding-cf-index">{brand.id || `0${i + 1}`}</span>
                  </div>

                  {/* Glassmorphic Bottom Overlay */}
                  <div className="branding-cf-glass-overlay">
                    <div className="branding-cf-meta">
                      <span className="branding-cf-cat-label">{brand.category}</span>
                      <h3 className="branding-cf-title">{brand.title}</h3>
                      <p className="branding-cf-desc">
                        {brand.headline || brand.description}
                      </p>
                    </div>

                    <div className="branding-cf-footer-action">
                      {isActive ? (
                        <Link
                          to={`/branding/${brand.slug}`}
                          className="branding-cf-cta-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>View Case Study</span>
                          <div className="branding-cf-arrow-circle">
                            <ArrowUpRight size={16} />
                          </div>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="branding-cf-cta-link-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            pause();
                            goTo(i);
                            setTimeout(resume, AUTOPLAY_DELAY);
                          }}
                        >
                          <span>Select Project</span>
                          <div className="branding-cf-arrow-circle">
                            <ArrowUpRight size={16} />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ================= CONTROLS & PAGINATION ================= */}
        <div className="branding-cf-controls">
          <button
            type="button"
            className="branding-cf-nav-btn"
            onClick={handlePrev}
            aria-label="Previous project"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="branding-cf-dots" role="tablist" aria-label="Brand projects">
            {BRANDS.map((brand, idx) => (
              <button
                key={brand.slug}
                type="button"
                className={`branding-cf-dot ${active === idx ? "is-active" : ""}`}
                onClick={(e) => handleDot(e, idx)}
                aria-label={`Go to project ${idx + 1}`}
                role="tab"
                aria-selected={active === idx}
              />
            ))}
          </div>

          <button
            type="button"
            className="branding-cf-nav-btn"
            onClick={handleNext}
            aria-label="Next project"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
