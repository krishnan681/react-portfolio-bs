import { useState } from "react";
import "./Tools.css";

// Tool icons
import tool1 from "../../assets/images/Tools/1.png";
import tool2 from "../../assets/images/Tools/2.png";
import tool3 from "../../assets/images/Tools/3.png";
import tool4 from "../../assets/images/Tools/4.png";
import tool5 from "../../assets/images/Tools/5.png";
import tool6 from "../../assets/images/Tools/6.png";

const TOOLS = [
  { id: "tool-1", name: "Premiere Pro", src: tool1, delay: "0s" },
  { id: "tool-2", name: "After Effects", src: tool2, delay: "0.2s" },
  { id: "tool-3", name: "Photoshop", src: tool3, delay: "0.4s" },
  { id: "tool-4", name: "Illustrator", src: tool4, delay: "0.1s" },
  { id: "tool-5", name: "DaVinci Resolve", src: tool5, delay: "0.3s" },
  { id: "tool-6", name: "Lightroom", src: tool6, delay: "0.5s" },
];

export default function Tools() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="tools">
      <div className="container-fluid px-0">
        <div className="title">
          <div className="bg-text">Tools</div>
          <h1 className="main-title">Expertise</h1>
        </div>

        <div className="TE-heading text-center">
          <p>
            The ability to conceptualize, design, and produce visually engaging content that communicates a brand's message and resonates with target audiences.
          </p>
        </div>

        <div className="toolbar-wrapper">
          <div className="dock-container">
            <ul className="toolbar">
              {TOOLS.map((tool, i) => (
                <li
                  key={tool.id}
                  className={`toolbarItem ${hoveredIdx === i ? "is-hovered" : ""}`}
                  style={{ animationDelay: tool.delay }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Floating Tooltip badge */}
                  <div className="tool-tooltip">
                    <span>{tool.name}</span>
                  </div>

                  <div className="tool-icon-box">
                    <img
                      className="toolbarImg"
                      src={tool.src}
                      alt={tool.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}