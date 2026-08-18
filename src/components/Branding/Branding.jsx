import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { BRANDS } from "../../data/brands";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";
import "./Branding.css";

export default function Branding() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(BRANDS.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const startIndex = currentPage * CARDS_PER_PAGE;
  const visibleBrands = BRANDS.slice(startIndex, startIndex + CARDS_PER_PAGE);

  return (
    <section className="branding-section" id="branding" aria-label="Branding Collaborations">
      <div className="container">
        {/* ================= TITLE ================= */}
        <div className="title">
          <div className="bg-text">Branding</div>
          <h1 className="main-title">COLLABORATIONS</h1>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="BC-heading text-center">
          <p>
            Creative work delivered across diverse industries — entertainment, retail,
            <br />
            hospitality, and healthcare — showcasing versatile design and content expertise.
          </p>
        </div>

        {/* ================= NORMAL CARDS GRID (100% OPACITY • ZERO LAG) ================= */}
        <div className="branding-normal-grid">
          {visibleBrands.map((brand) => (
            <article
              key={brand.slug}
              className="branding-normal-card"
              style={{ "--brand-accent": brand.color || "#0284c7" }}
              onClick={() => navigate(`/branding/${brand.slug}`)}
            >
              {/* Card Image Banner with Skeleton */}
              <div className="branding-normal-media">
                <ImageWithSkeleton
                  src={brand.banner || brand.src}
                  alt={brand.title}
                  wrapperClassName="w-100 h-100"
                />

                {/* Category Pill Tag */}
                <div className="branding-normal-tag">
                  <Sparkles size={13} />
                  <span>{brand.category?.split("/")[0] || "Branding"}</span>
                </div>

                {/* Hover Action Overlay */}
                <div className="branding-normal-hover-overlay">
                  <span className="branding-normal-view-btn">
                    <span>View Project</span>
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              {/* Card Content Footer */}
              <div className="branding-normal-body">
                <div className="branding-normal-meta">
                  <span className="branding-normal-cat-label">{brand.category}</span>
                  <h3 className="branding-normal-title">{brand.title}</h3>
                  <p className="branding-normal-desc">
                    {brand.headline || brand.description}
                  </p>
                </div>

                <div className="branding-normal-footer-action">
                  <span className="branding-normal-cta-link">Explore Showcase</span>
                  <div className="branding-normal-arrow-circle">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= CONTROLS & PAGINATION ================= */}
        <div className="branding-normal-controls">
          <button
            type="button"
            className="branding-nav-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="branding-pagination-dots">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`branding-page-dot ${currentPage === idx ? "active" : ""}`}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="branding-nav-arrow-btn"
            onClick={handleNext}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
