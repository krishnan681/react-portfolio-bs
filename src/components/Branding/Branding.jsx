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
    title: "Broadway cinemas",
    // category: "Brand Identity & Logo System",
    // year: "2025",
    src: brand1,
    description:
      "Broadway Cinemas, Coimbatore is a premium multiplex featuring South India's first IMAX with Laser and Tamil Nadu's first EPIQ for an unmatched big-screen experience. HyperX and Vivid deliver enhanced visuals, vibrant colors, and immersive Dolby Atmos sound.",
    deliverables: [
      "Social media contents",
      "Imax Collectible cards",
      "Prints works",
      "Menu design",
      "Led wall designs",
    ],
    color: "#BBACAF",
  },
  {
    id: "02",
    title: "Aarthi Grand Cineplex (AGC)",
    // category: "Social Ad Campaigns",
    // year: "2025",
    src: brand2,
    description:
      "Aarthi Grand Cineplex (AGC) is a premium multiplex in Dindigul, offering 4K Barco Laser projection, Dolby Atmos sound, modern interiors, and comfortable seating for a high-quality movie experience.",
    deliverables: ["Social media contents", "Led wall designs"],
    color: "#977F6D",
  },
  {
    id: "03",
    title: "That's Y Food, On the Go (OTG), Café Totaram  ",
    // category: "Packaging & Print Collateral",
    // year: "2024",
    src: brand3,
    description:
      "That's Y Food  A premium multi-cuisine restaurant known for global flavors and fine dining. On the Go (OTG)  A casual café and restaurant serving quick meals, beverages, and comfort food. Café Totaram - A cozy café at Race Course, Coimbatore, popular for fusion food, desserts, coffee, and baked treats in a relaxed ambience.",
    deliverables: ["Social media contents ", "Video shoot", "Pla cards"],
    color: "#C24914",
  },
  {
    id: "04",
    title: "The Crimson",
    // category: "Digital Asset System",
    // year: "2024",
    src: brand4,
    description:
      "The Crimson is a premium restobar in Broadway Square, Coimbatore, known for its stylish ambience, handcrafted cocktails, multi-cuisine menu, and vibrant dining experience.",
    deliverables: ["Social media contents" ],
    color: "#B6244F",
  },
  {
    id: "05",
    title: "Giggles and twrils:",
    // category: "App Launch Marketing",
    // year: "2024",
    src: brand5,
    description:
      "Giggles & Twirls is a premium fashion brand offering luxury linen clothing for women and kids, combining elegant designs, breathable fabrics, and everyday comfort.",
    deliverables: ["Social media contents", "Website banner"],
    color: "#88A28D",
  },
  {
    id: "06",
    title: "New City Developers",
    // category: "Corporate Design System",
    // year: "2023",
    src: brand6,
    description:
      "New City Developers is a construction company specializing in residential construction, home renovation, and redevelopment, delivering quality craftsmanship and modern living spaces.",
    deliverables: ["Social media contents"],
    color: "#1C1C1C",
  },
  {
    id: "07",
    title: "Pavizham Jewellers",
    // category: "Corporate Design System",
    // year: "2023",
    src: brand6,
    description:
      "Pavizham Jewellers is a trusted jewellery brand in Coimbatore, offering gold, diamond, platinum, and silver jewellery with quality craftsmanship and elegant designs.",
    deliverables: ["Social media contents", "Jewelry product shoot"],
    color: "#868f45",
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
        <div className="bg-text">Branding</div>
        <h1 className="main-title">Collaborations</h1>
      </div>

      <div className="BC-heading text-center">
        <p>
          Creative work delivered across diverse industries — entertainment,
          retail, <br></br> hospitality, and healthcare — showcasing versatile
          design and content expertise.
        </p>
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
