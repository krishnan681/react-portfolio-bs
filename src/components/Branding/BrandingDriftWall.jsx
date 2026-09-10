import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import DriftWall from '../DriftWall/DriftWall';
import { BRANDS } from '../../data/brands';
import './BrandingDriftWall.css';

export default function BrandingDriftWall() {
  const navigate = useNavigate();

  // Exactly the 10 brand items from brands.js using their covers (covers/1.webp to 10.webp)
  const items = useMemo(() => {
    return BRANDS.map((brand) => ({
      id: brand.id,
      slug: brand.slug,
      title: brand.title,
      image: brand.logo || brand.src,
      color: brand.color || '#ffd026',
      cardBg: brand.cardBg || '#ffffff',
      cardTextColor: brand.cardTextColor || '#04193a',
    }));
  }, []);

  const handleTileClick = (item) => {
    if (item.slug) {
      navigate(`/branding/${item.slug}`);
    }
  };

  return (
    <section className="branding-section branding-drift-section" id="branding" aria-label="Branding Collaborations">
      <div className="container-fluid px-0">
        {/* ================= TITLE ================= */}
        <div className="title" data-aos="fade-up">
          <div className="bg-text">Branding</div>
          <h1 className="main-title">COLLABORATIONS</h1>
        </div>

        {/* ================= DESCRIPTION & INTERACTION HINT ================= */}
        <div className="BC-heading text-center" data-aos="fade-up" data-aos-delay="100">
          <p>
            <span>Creative work delivered across diverse industries — entertainment, retail,</span>
            <span>hospitality, and healthcare showcasing versatile design and content expertise.</span>
          </p>

          <div className="drift-interaction-pill">
            <Sparkles size={14} className="drift-pill-sparkle" />
            <span>Interactive 3D Drift Wall • Click Any Project to View Case Study</span>
          </div>
        </div>

        {/* ================= DRIFT WALL STAGE ================= */}
        <div className="branding-drift-stage" data-aos="fade-up" data-aos-delay="150">
          <DriftWall
            items={items}
            columns={5}
            tileWidth={240}
            tileHeight={320}
            gap={20}
            tilt={14}
            turn={-12}
            perspective={1200}
            depth={110}
            speed={38}
            direction="up"
            variance={0.45}
            parallax={0.65}
            lift={64}
            fade={0.55}
            dim={0.7}
            overlayColor="#04193a"
            radius={18}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
            onTileClick={handleTileClick}
          />
        </div>
      </div>
    </section>
  );
}
