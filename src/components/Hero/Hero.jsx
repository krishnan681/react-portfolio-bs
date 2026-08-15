import { useEffect, useRef } from "react";
import "./Hero.css";

import heroImage from "../../assets/images/BS.webp";

export default function Hero() {
  const heroRef = useRef(null);

useEffect(() => {
  const intervals = [];
  const timeouts = [];

  const rotators =
    heroRef.current?.querySelectorAll(".rotating-text") || [];

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

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-wrapper">
          {/* Blur Circles */}

          <div className="blur-circle blur-one"></div>
          <div className="blur-circle blur-two"></div>

          {/* Intro */}

          <div className="hero-intro">
            <span id="wave">👋</span>
            <span>Designed with purpose. Edited with Precision</span>
          </div>

          {/* Big Typography */}

          <div className="hero-title">
            <h1 className="title-fill">BARATH</h1>
            <h1 className="title-outline">SACHWIN</h1>
          </div>

          {/* Rotating Text */}

          <div className="hero-info">
            <div className="rotating-text" data-delay="0">
              <span className="word active">Video Editor</span>
              <span className="word">Graphic Designer</span>
              <span className="word">Visual Creator</span>
              <span className="word">Social Media Content Creator</span>
            </div>

            <div className="rotating-text" data-delay="500">
              <span className="word active">Social Media Content Creator</span>
              <span className="word">Visual Creator</span>
              <span className="word">Graphic Designer</span>
              <span className="word">Video Editor</span>
            </div>

            <div className="rotating-text" data-delay="1000">
              <span className="word active">Video Editor</span>
              <span className="word">Visual Creator</span>
              <span className="word">Social Media Content Creator</span>
              <span className="word">Graphic Designer</span>
            </div>

            <div className="rotating-text" data-delay="1500">
              <span className="word active">Visual Creator</span>
              <span className="word">Social Media Content Creator</span>
              <span className="word">Video Editor</span>
              <span className="word">Graphic Designer</span>
            </div>
          </div>

          {/* Hero Image */}

          <div className="hero-image">
            <img src={heroImage} id="portrait" alt="Barath Sachwin" />
          </div>
        </div>
      </div>
    </section>
  );
}
