// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Branding.css";

// import brand1 from "../../assets/images/Brands/1.png";
// import brand2 from "../../assets/images/Brands/2.png";
// import brand3 from "../../assets/images/Brands/3.png";
// import brand4 from "../../assets/images/Brands/4.png";
// import brand5 from "../../assets/images/Brands/5.png";
// import brand6 from "../../assets/images/Brands/6.jpg";

// gsap.registerPlugin(ScrollTrigger);

// export default function Branding() {
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);

//   useEffect(() => {
//     // gsap.context handles scope and safe cleanup in React
//     const ctx = gsap.context(() => {
//       const section = sectionRef.current;
//       const track = trackRef.current;

//       if (!section || !track) return;

//       const getScrollAmount = () => {
//         const trackWidth = track.scrollWidth;
//         const viewportWidth = window.innerWidth;
//         // Total distance needed to pull the end of track into full view
//         return -(trackWidth - viewportWidth);
//       };

//       gsap.to(track, {
//         x: getScrollAmount,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "top top",
//           end: () => `+=${track.scrollWidth - window.innerWidth}`,
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true, // Recalculates dynamically on window resize or orientation change
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert(); // Cleanly removes GSAP animations & triggers
//   }, []);

//   const projects = [
//     { image: brand1, title: "Main Logo — Madras" },
//     { image: brand2, title: "Logo Badge" },
//     { image: brand3, title: "Typeface & Palette" },
//     { image: brand4, title: "TubeForge — Ad 1" },
//     { image: brand5, title: "TubeForge — Ad 2" },
//     { image: brand6, title: "TubeForge — Ad 3" },
//   ];

//   return (
//     <section id="h-projects" className="branding-section" ref={sectionRef}>
//       <div className="title">
//         <div className="bg-text">Brands</div>
//         <h1 className="main-title">Commercials</h1>
//       </div>

//       <div className="hs-wrap">
//         <div className="hs-track" ref={trackRef}>
//           {projects.map((project, index) => (
//             <div className="hs-card" key={index}>
//               <img src={project.image} alt={project.title} />
//               <div className="cap">{project.title}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Card from "./Card";
import "./Branding.css";

// Brand images
import brand1 from "../../assets/images/Brands/1.png";
import brand2 from "../../assets/images/Brands/2.png";
import brand3 from "../../assets/images/Brands/3.png";
import brand4 from "../../assets/images/Brands/4.png";
import brand5 from "../../assets/images/Brands/5.png";
import brand6 from "../../assets/images/Brands/6.jpg";

const BRANDS = [
  {
    id: "01",
    title: "Madras Co.",
    category: "Brand Identity & Logo System",
    year: "2025",
    src: brand1,
    description:
      "Crafted a distinctive, modern brand mark and scalable visual identity system for digital platforms.",
    deliverables: ["Logo Suite", "Brand Guidelines", "Typography"],
    color: "#BBACAF",
  },
  {
    id: "02",
    title: "TubeForge",
    category: "Social Ad Campaigns",
    year: "2025",
    src: brand2,
    description:
      "Designed high-converting promotional ad suites and social templates for multi-channel marketing.",
    deliverables: ["Ad Creatives", "Social Templates", "Motion Graphics"],
    color: "#977F6D",
  },
  {
    id: "03",
    title: "Aura Studio",
    category: "Packaging & Print Collateral",
    year: "2024",
    src: brand3,
    description:
      "Developed tactile packaging graphics and print system guidelines for high-end retail products.",
    deliverables: ["Packaging Mockups", "Print Collateral", "Color Palette"],
    color: "#C24914",
  },
  {
    id: "04",
    title: "Next Ventures",
    category: "Digital Asset System",
    year: "2024",
    src: brand4,
    description:
      "Built a comprehensive digital graphic library optimized for complex web and app user interfaces.",
    deliverables: ["UI Design", "Iconography", "Design System"],
    color: "#B6244F",
  },
  {
    id: "05",
    title: "Nova Mobile",
    category: "App Launch Marketing",
    year: "2024",
    src: brand5,
    description:
      "Created high-impact visual assets and digital promotional banners for mobile application rollouts.",
    deliverables: ["App Store Graphics", "Banner Suite", "Promo Video Assets"],
    color: "#88A28D",
  },
  {
    id: "06",
    title: "CyberMesh",
    category: "Corporate Design System",
    year: "2023",
    src: brand6,
    description:
      "Formulated a unified visual brand manual and corporate asset library for cross-platform usage.",
    deliverables: ["Brand Manual", "Vector Assets", "Digital Ads"],
    color: "#1C1C1C",
  },
];

export default function Branding() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className="branding-section">
      {/* Title */}
      <div className="title">
        <div className="bg-text">Creative</div>
        <h1 className="main-title">Expertise</h1>
      </div>

      <div ref={container} className="branding-main">
        {BRANDS.map((project, i) => {
          const targetScale = 1 - (BRANDS.length - i) * 0.05;

          return (
            <Card
              key={project.id}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}