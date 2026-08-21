import { useState } from "react";
import "./Tools.css";

import { getR2Url } from "../../config/r2";

const TOOLS = [
  { id: "tool-1", name: "Premiere Pro", src: getR2Url("tools/1.png"), delay: "0s" },
  { id: "tool-2", name: "After Effects", src: getR2Url("tools/2.png"), delay: "0.2s" },
  { id: "tool-3", name: "Photoshop", src: getR2Url("tools/3.png"), delay: "0.4s" },
  { id: "tool-4", name: "Illustrator", src: getR2Url("tools/4.png"), delay: "0.1s" },
  { id: "tool-5", name: "DaVinci Resolve", src: getR2Url("tools/5.png"), delay: "0.3s" },
  { id: "tool-6", name: "Lightroom", src: getR2Url("tools/6.png"), delay: "0.5s" },
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