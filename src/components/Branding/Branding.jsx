import { BRANDS } from "../../data/brands";
import Card from "./Card";
import "./Branding.css";

export default function Branding() {
  return (
    <section className="branding-section" id="branding">
      {/* ================= TITLE ================= */}
      <div className="title">
        <div className="bg-text">Branding</div>
        <h1 className="main-title">Collaborations</h1>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="BC-heading text-center">
        <p>
          Creative work delivered across diverse industries — entertainment, retail,
          <br />
          hospitality, and healthcare — showcasing versatile design and content expertise.
        </p>
      </div>

      {/* ================= MASONRY GRID ================= */}
      <div className="branding-main">
        <div className="branding-masonry-grid">
          {BRANDS.map((project, i) => (
            <Card key={project.id || i} i={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}