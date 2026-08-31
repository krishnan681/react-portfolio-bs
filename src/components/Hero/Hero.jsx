import React, { useState, useEffect } from "react";
import "./Hero.css";

// Assets
import sky3Img from "../../assets/sky3.webp";
import heroGif from "../../assets/background removed gif.gif";

const ROLES = [
  "Video Editor",
  "Graphic Designer",
  "Visual Creator",
  "Content Creator",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      {/* Fixed Hero Section Background */}
      <div className="hero-fixed-background">
        <section className="hero" id="hero">
          {/* Main Content Area */}
          <div className="hero-content">
            <div className="hero-main-typography">
              {/* Eyebrow greeting */}
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                <span className="eyebrow-text" style={{color:"whitesmoke"}}>HI THERE,</span>
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

                {/* Line 2: Background Removed GIF + Rotating Roles & Underline on Same Line */}
                <span className="title-line-2">
                  <div className="hero-gif-slot" id="hero-gif-slot">
                    <img
                      src={heroGif}
                      alt="Animated element"
                      className="hero-gif-image"
                    />
                  </div>

                  {/* Rotating Roles with SVG Underline */}
                  <div className="rotating-text-with-underline">
                    <span className="rotator-slot role-slot">
                      {ROLES.map((role, index) => (
                        <span
                          key={role}
                          className={`rotating-word ${
                            index === currentIndex
                              ? "active"
                              : index === prevIndex
                              ? "exit"
                              : ""
                          }`}
                        >
                          {role.split("").map((char, i) => (
                            <span key={i} className="interactive-letter">
                              {char === " " ? "\u00A0" : char}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>

                    {/* SVG Underline Line */}
                    <svg
                      className="rotator-underline-svg"
                      viewBox="0 0 260 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 12C60 4 190 4 257 14"
                        stroke="#ffd026"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </span>
              </h1>
            </div>
          </div>

          {/* Clouds / wave bottom layer */}
          <div className="hero-clouds-layer" aria-hidden="true">
            <img src={sky3Img} alt="" className="hero-sky-clouds" />
          </div>
        </section>
      </div>

      {/* Spacer so the page scroll reveals subsequent sections on top of hero */}
      <div className="hero-scroll-spacer" aria-hidden="true" />
    </>
  );
}
