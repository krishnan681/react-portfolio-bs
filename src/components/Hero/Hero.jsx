import React, { useEffect, useRef } from "react";
import "./Hero.css";

// Assets
import heroArtworkImg from "../../assets/images/hero/hero-composite-artwork.png";
import notepadImg from "../../assets/images/hero/hero-notepad-ideas.png";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const intervals = [];
    const timeouts = [];

    const rotators = heroRef.current?.querySelectorAll(".rotating-text") || [];

    rotators.forEach((rotator) => {
      const words = rotator.querySelectorAll(".word");
      if (!words.length) return;

      let current = 0;
      const delay = Number(rotator.dataset.delay) || 0;

      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          const previous = current;

          words[previous].classList.remove("active");
          words[previous].classList.add("exit");

          current = (current + 1) % words.length;

          words[current].classList.remove("exit");
          words[current].classList.add("active");

          setTimeout(() => {
            words[previous].classList.remove("exit");
          }, 800);
        }, 2200);

        intervals.push(interval);
      }, delay);

      timeouts.push(timeout);
    });

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const scrollToVisuals = (e) => {
    e.preventDefault();
    document.getElementById("visual")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed Hero Section Background */}
      <div className="hero-fixed-background">
        <section className="hero" id="hero" ref={heroRef}>
          {/* decorative dot grid */}
          <div className="dots" aria-hidden="true">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>

          {/* dashed line top right */}
          <svg className="dashed-line" viewBox="0 0 90 190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M75 5C55 40 30 60 40 95C50 130 15 150 10 185" stroke="#04193a" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 12"/>
          </svg>

          {/* main content */}
          <div className="hero-content">
            <div className="copy">
              <p className="eyebrow">HI THERE, 👋</p>
              <h1 className="headline">
                <span className="line1">I'M BARATH</span>
                <span className="line2">SACHWIN</span>
              </h1>

              {/* Rotating Text */}
              <div className="rotating-text-wrapper">
                <div className="rotating-text" data-delay="0">
                  <span className="word active">Video Editor</span>
                  <span className="word">Graphic Designer</span>
                  <span className="word">Visual Creator</span>
                  <span className="word">Social Media Content Creator</span>
                </div>
                <svg className="script-underline" viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 12C50 4 160 4 238 14" stroke="#04193a" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              <p className="desc">
                I craft meaningful visuals that tell your story, build your brand, and leave a lasting impression.
              </p>

              <div className="cta-row">
                <a href="#visual" className="link-arrow" onClick={scrollToVisuals}>
                  View My Work
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#04193a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>

            <div className="caption">
              <p>Design is thinking<br/>made visual.</p>
              <svg viewBox="0 0 90 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 8C25 2 60 2 88 9" stroke="#04193a" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="portrait-wrap">
              <img src={heroArtworkImg} alt="Barath Sachwin portrait illustration" />
            </div>

            <div className="notepad">
              <img src={notepadImg} alt="Ideas notepad" />
            </div>
          </div>
        </section>
      </div>

      {/* Spacer so the page scroll reveals subsequent sections on top of hero */}
      <div className="hero-scroll-spacer" aria-hidden="true" />
    </>
  );
}
