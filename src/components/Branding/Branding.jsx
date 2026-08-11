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

import { BRANDS } from "../../data/brands";


export default function Branding() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });


  /* =====================================================
     LENIS SMOOTH SCROLL
  ===================================================== */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,

      easing: (t) =>
        Math.min(
          1,
          1.001 - Math.pow(2, -10 * t)
        ),
    });

    let animationFrame;

    function raf(time) {
      lenis.raf(time);

      animationFrame =
        requestAnimationFrame(raf);
    }

    animationFrame =
      requestAnimationFrame(raf);


    return () => {
      cancelAnimationFrame(animationFrame);

      lenis.destroy();
    };
  }, []);


  /* =====================================================
     JSX
  ===================================================== */

  return (
    <section className="branding-section">

      {/* ================= TITLE ================= */}

      <div className="title">

        <div className="bg-text">
          Branding
        </div>

        <h1 className="main-title">
          Collaborations
        </h1>

      </div>


      {/* ================= DESCRIPTION ================= */}

      <div className="BC-heading text-center">

        <p>
          Creative work delivered across diverse
          industries — entertainment, retail,
          <br />
          hospitality, and healthcare —
          showcasing versatile design and
          content expertise.
        </p>

      </div>


      {/* ================= CARDS ================= */}

      <div
        ref={container}
        className="branding-main"
      >

        {BRANDS.map((project, i) => {

          const targetScale =
            1 -
            (BRANDS.length - i) *
              0.015;


          return (
            <Card
              key={project.id}

              i={i}

              {...project}

              progress={
                scrollYProgress
              }

              range={[
                i * 0.15,
                1,
              ]}

              targetScale={
                targetScale
              }
            />
          );

        })}

      </div>

    </section>
  );
}