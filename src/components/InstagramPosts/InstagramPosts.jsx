import { useEffect, useRef, useState, useCallback } from "react";
import "./InstagramPosts.css";

import { getR2Url } from "../../config/r2";

const IMAGES = [
  getR2Url("instagram/1.jpg"),
  getR2Url("instagram/2.jpg"),
  getR2Url("instagram/3.jpg"),
  getR2Url("instagram/4.jpg"),
  getR2Url("instagram/5.jpg"),
  getR2Url("instagram/6.jpg"),
  getR2Url("instagram/7.jpg"),
  getR2Url("instagram/8.jpg"),
];
const AUTOPLAY_DELAY = 3000; // 3 seconds

export default function InstagramPosts() {
  const [active, setActive] = useState(0);
  const deckRef = useRef(null);
  const dragRef = useRef({ startX: 0, dragging: false });
  const timerRef = useRef(null);
  const isPaused = useRef(false);

  const total = IMAGES.length;

  const goTo = useCallback(
    (index) => {
      const next = ((index % total) + total) % total;
      setActive(next);
    },
    [total]
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // ── Autoplay ──────────────────────────────────────────
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_DELAY);
  }, [total]);

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const pause = () => {
    isPaused.current = true;
  };

  const resume = () => {
    isPaused.current = false;
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay]);

  // ── Keyboard ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        pause();
        prev();
        setTimeout(resume, AUTOPLAY_DELAY);
      }
      if (e.key === "ArrowRight") {
        pause();
        next();
        setTimeout(resume, AUTOPLAY_DELAY);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ── Drag / swipe ──────────────────────────────────────
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onPointerDown = (e) => {
      pause();
      dragRef.current = { startX: e.clientX, dragging: true };
      deck.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e) => {
      if (!dragRef.current.dragging) return;
      const delta = e.clientX - dragRef.current.startX;
      dragRef.current.dragging = false;

      if (Math.abs(delta) > 50) {
        if (delta > 0) prev();
        else next();
      }
      // resume after a short delay
      setTimeout(resume, AUTOPLAY_DELAY);
    };

    deck.addEventListener("pointerdown", onPointerDown);
    deck.addEventListener("pointerup", onPointerUp);
    deck.addEventListener("pointercancel", onPointerUp);

    return () => {
      deck.removeEventListener("pointerdown", onPointerDown);
      deck.removeEventListener("pointerup", onPointerUp);
      deck.removeEventListener("pointercancel", onPointerUp);
    };
  }, [prev, next]);

  // ── Coverflow transform ───────────────────────────────
  const getSlideStyle = (index) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    const translateX = offset * 58;
    const rotateY = offset * -2;
    const scale = abs === 0 ? 1 : Math.max(0.55, 1 - abs * 0.18);
    const zIndex = 100 - abs;
    const opacity = abs > 3 ? 0 : 1 - abs * 0.15;

    return {
      transform: `
        translate(-50%, -50%)
        translateX(${translateX}%)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      zIndex,
      opacity: abs > 3 ? 0 : 1,
      filter: "none",
    };
  };

  // Manual nav helpers that pause + resume
  const handlePrev = () => {
    pause();
    prev();
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  const handleNext = () => {
    pause();
    next();
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  const handleDot = (i) => {
    pause();
    goTo(i);
    setTimeout(resume, AUTOPLAY_DELAY);
  };

  return (
    <section className="cf" aria-label="3D coverflow carousel" id="instagram">
      <header className="cf__head">
        <div className="title">
          <div className="bg-text">Instagram</div>
          <h1 className="main-title">Post's</h1>
        </div>
      </header>

      <div
        className="stage"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="deck" ref={deckRef}>
          {IMAGES.map((src, i) => (
            <figure
              key={i}
              className={`slide ${i === active ? "is-active" : ""}`}
              style={getSlideStyle(i)}
              onClick={() => handleDot(i)}
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="cf__controls">
        <button className="nav" onClick={handlePrev} aria-label="Previous">
          &#8249;
        </button>

        <div className="dots" role="tablist" aria-label="Slides">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === active ? "is-active" : ""}`}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              role="tab"
              aria-selected={i === active}
            />
          ))}
        </div>

        <button className="nav" onClick={handleNext} aria-label="Next">
          &#8250;
        </button>
      </div>

      <div className="instabtn">
        <button
          className="arrow-pill"
          onClick={() => window.open("https://instagram.com", "_blank")}
        >
          Follow on Instagram <span className="ar">→</span>
        </button>
      </div>
    </section>
  );
}