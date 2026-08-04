import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Tools.css";

// Tool icons
import tool1 from "../../assets/images/Tools/1.png";
import tool2 from "../../assets/images/Tools/2.png";
import tool3 from "../../assets/images/Tools/3.png";
import tool4 from "../../assets/images/Tools/4.png";
import tool5 from "../../assets/images/Tools/5.png";
import tool6 from "../../assets/images/Tools/6.png";

// Expertise icons
import icon1 from "../../assets/images/icons/1.png";
import icon2 from "../../assets/images/icons/2.png";
import icon3 from "../../assets/images/icons/3.png";
import icon4 from "../../assets/images/icons/4.png";
import icon5 from "../../assets/images/icons/5.png";
import icon6 from "../../assets/images/icons/6.png";
import icon7 from "../../assets/images/icons/7.png";

const TOOLS = [
  tool1, tool2, tool3, tool4, tool5, tool6,
  tool3, tool5, tool4, tool3, tool2, tool1,
];

const EXPERTISE = [
  { icon: icon1, label: "Motion & Visual Design" },
  { icon: icon2, label: "Typography" },
  { icon: icon3, label: "Social Media Content" },
  { icon: icon4, label: "Product Photography" },
  { icon: icon5, label: "Cinematography" },
  { icon: icon6, label: "Color Theory" },
  { icon: icon7, label: "Creative Direction" },
];

export default function Tools() {
  const toolbarRef = useRef(null);
  const itemsRef = useRef([]);

useEffect(() => {
  // Only skip on real mobile / touch-primary devices
  const isNarrow = window.matchMedia("(max-width: 768px)").matches;
  const isTouchPrimary = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  if (isNarrow || isTouchPrimary) return;

  const dock = toolbarRef.current;
  const icons = itemsRef.current.filter(Boolean);
  if (!dock || icons.length === 0) return;

  const min = 48;
  const max = 120;
  const bound = min * Math.PI;

  gsap.set(icons, {
    transformOrigin: "50% 120%",
  });

  const updateIcons = (pointer) => {
    icons.forEach((icon, i) => {
      const distance = i * min + min / 2 - pointer;
      let x = 0;
      let scale = 1;

      if (-bound < distance && distance < bound) {
        const rad = (distance / min) * 0.5;
        scale = 1 + (max / min - 1) * Math.cos(rad);
        x = 2 * (max - min) * Math.sin(rad);
      } else {
        x = (-bound < distance ? 2 : -2) * (max - min);
      }

      gsap.to(icon, {
        duration: 0.3,
        x,
        scale,
        ease: "power2.out",
      });
    });
  };

  const onMouseMove = (event) => {
    const rect = dock.getBoundingClientRect();
    const firstIcon = icons[0];
    const offset = rect.left + firstIcon.offsetLeft;
    updateIcons(event.clientX - offset);
  };

  const onMouseLeave = () => {
    gsap.to(icons, {
      duration: 0.3,
      scale: 1,
      x: 0,
      ease: "power2.out",
    });
  };

  dock.addEventListener("mousemove", onMouseMove);
  dock.addEventListener("mouseleave", onMouseLeave);

  return () => {
    dock.removeEventListener("mousemove", onMouseMove);
    dock.removeEventListener("mouseleave", onMouseLeave);
  };
}, []);

  return (
    <section id="tools">
      <div className="container-fluid px-0">
        <div className="title ">
          <div className="bg-text">Tools</div>
          <h1 className="main-title">Expertise</h1>
        </div>

        <div className="toolbar-wrapper">
          <ul className="toolbar" ref={toolbarRef}>
            {TOOLS.map((src, i) => (
              <li
                key={i}
                className="toolbarItem"
                ref={(el) => (itemsRef.current[i] = el)}
              >
                <img className="toolbarImg" src={src} alt={`Tool ${i + 1}`} />
              </li>
            ))}
          </ul>
        </div>

        <div className="expertise">
          {EXPERTISE.map((item, i) => (
            <span className="tag" key={i}>
              <img src={item.icon} alt="" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}