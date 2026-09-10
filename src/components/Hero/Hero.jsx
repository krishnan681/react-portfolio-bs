import React, { useState, useEffect } from "react";
import "./Hero.css";
import { getR2Url } from "../../config/r2";
import SplitFlapText from "../SplitFlapText/SplitFlapText";

// R2 Assets
const sky3Img = getR2Url("profile/sky3.webp");
const heroGif = getR2Url("profile/background removed gif.gif");

const ROLES = [
  "VIDEO EDITOR",
  "GRAPHIC DESIGNER",
  "VISUAL CREATOR",
  "CONTENT CREATOR",
];

export default function Hero() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const threshold = window.innerHeight * 1.05;
          const visible = window.scrollY < threshold;
          setIsHeroVisible(visible);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Hero Section Background */}
      <div
        className="hero-fixed-background"
        style={{
          visibility: isHeroVisible ? "visible" : "hidden",
          pointerEvents: isHeroVisible ? "auto" : "none",
        }}
      >
        <section className="hero" id="hero">
          {/* Main Content Area */}
          <div className="hero-content">
            <div className="hero-main-typography">
              {/* Eyebrow greeting */}
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                <span className="eyebrow-text" style={{ color: "whitesmoke" }}>
                  HI THERE,
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="hero-editorial-title">
                {/* Line 1: The Name with vertical badge & letter-by-letter hover animation */}
                <div className="title-name-container">
                  <div className="hero-vertical-tag" aria-hidden="true">
                    <span>DESIGN / DETAILS / create</span>
                  </div>
                  <span className="title-line-1 title-name">
                    {"Barath Sachwin".split("").map((char, i) => (
                      <span key={i} className="interactive-letter">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Line 2: Background Removed GIF + SplitFlapText Roles on Same Line */}
                <span className="title-line-2">
                  <div className="hero-gif-slot" id="hero-gif-slot">
                    <img
                      src={heroGif}
                      alt="Animated element"
                      className="hero-gif-image"
                      decoding="async"
                      loading="eager"
                    />
                  </div>

                  {/* SplitFlapText Mechanical Flap Display */}
                  <div className="hero-split-flap-wrapper">
                    <SplitFlapText
                      words={ROLES}
                      flipDuration={0.12}
                      stagger={0.05}
                      cycleDelay={2400}
                      charset="alphanumeric"
                      flipsPerChar={6}
                      tileColor="#04193a"
                      textColor="#ffd026"
                      tileRadius={6}
                      loop={true}
                      padTo={16}
                    />
                  </div>
                </span>
              </h1>
            </div>
          </div>

          {/* Clouds / wave bottom layer */}
          <div className="hero-clouds-layer" aria-hidden="true">
            <img
              src={sky3Img}
              alt=""
              className="hero-sky-clouds"
              decoding="async"
              loading="eager"
            />
          </div>
        </section>
      </div>

      {/* Spacer so the page scroll reveals subsequent sections on top of hero */}
      <div className="hero-scroll-spacer" aria-hidden="true" />
    </>
  );
}