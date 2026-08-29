import "./FontsColors.css";
import { ArrowUpRight } from "lucide-react";

const fontCards = [
  {
    id: "01",
    font: "Playfair Display",
    className: "playfair",
    aaColor: "#173952",
    colors: ["#173952", "#2B5876", "#4A7597", "#7D9CB6", "#F1EEE9"],
    hex: "#173952",
    rgb: "23, 57, 82",
    cmyk: "72, 31, 0, 68",
  },
  {
    id: "02",
    font: "Poppins",
    className: "poppins",
    aaColor: "#66615B",
    colors: ["#F1EEE9", "#DDD7CF", "#CFC8BD", "#AAA297", "#173952"],
    hex: "#F1EEE9",
    rgb: "241, 238, 233",
    cmyk: "0, 1, 3, 5",
  },
  {
    id: "03",
    font: "Cormorant Garamond",
    className: "cormorant",
    aaColor: "#BE3455",
    colors: ["#BE3455", "#D14A69", "#E46D88", "#F0B6C4", "#FFF3F6"],
    hex: "#BE3455",
    rgb: "190, 52, 85",
    cmyk: "0, 73, 55, 25",
  },
  {
    id: "04",
    font: "Space Grotesk",
    className: "space",
    aaColor: "#29415B",
    colors: ["#29415B", "#3E5E84", "#6D8FB6", "#B7D1EA", "#EEF6FF"],
    hex: "#29415B",
    rgb: "41, 65, 91",
    cmyk: "55, 29, 0, 64",
  },
  {
    id: "05",
    font: "DM Serif Display",
    className: "dmserif",
    aaColor: "#065F46",
    colors: ["#065F46", "#059669", "#34D399", "#A7F3D0", "#ECFDF5"],
    hex: "#065F46",
    rgb: "6, 95, 70",
    cmyk: "94, 0, 26, 63",
  },
  {
    id: "06",
    font: "Syne",
    className: "syne",
    aaColor: "#EA580C",
    colors: ["#EA580C", "#F97316", "#FB923C", "#FED7AA", "#FFF7ED"],
    hex: "#EA580C",
    rgb: "234, 88, 12",
    cmyk: "0, 62, 95, 8",
  },
];

export default function FontsColors() {
  return (
    <section className="fonts-colors-section" id="fonts-colors">
      

      <div className="fc-container">
        {/* Left Side */}

        <div className="fc-left-text">VISUAL IDENTITY</div>
 

        {/* Heading */}

        <div className="fc-heading">
          <div className="title " data-aos="fade-up">
            <div className="bg-text">Color</div>
            <h1 className="main-title">Palettes</h1>
          </div>

          <p className="fc-description" data-aos="fade-up" data-aos-delay="100">
            A curated collection of premium fonts paired with harmonious color
            palettes to create timeless visual identities.
          </p>
 
        </div>

        {/* Cards */}

        <div className="fc-grid">
          {fontCards.map((card) => (
            <article key={card.id} className="fc-card">
              <div className="fc-card-top">
                <span className="fc-number">{card.id}</span>

                <button className="fc-button">
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="fc-preview">
                <div
                  className={`fc-aa ${card.className}`}
                  style={{
                    color: card.aaColor,
                  }}
                >
                  Aa
                </div>

                <div className="fc-swatches">
                  {card.colors.map((color, index) => (
                    <span
                      key={index}
                      style={{
                        background: color,
                      }}
                    ></span>
                  ))}
                </div>
              </div>

              <h3>{card.font}</h3>

              <div className="fc-divider"></div>

              <div className="fc-meta">
                <div>
                  <small>HEX</small>

                  <b>{card.hex}</b>
                </div>

                <div>
                  <small>RGB</small>

                  <b>{card.rgb}</b>
                </div>

                <div>
                  <small>CMYK</small>

                  <b>{card.cmyk}</b>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}

        {/* <div className="fc-footer">
          <div className="fc-dot">✦</div>

          <p>CHOOSE YOUR PALETTE. DEFINE YOUR STORY.</p>
        </div> */}
      </div>
    </section>
  );
}
