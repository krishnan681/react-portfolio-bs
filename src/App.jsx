import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CreativeExpertise from "./components/CreativeExpertise/CreativeExpertise";
import CareerHighlights from "./components/CareerHighlights/CareerHighlights";
import Branding from "./components/Branding/Branding";
import VisualCreations from "./components/VisualCreations/VisualCreations";
import Tools from "./components/Tools/Tools";
import Contact from "./components/Contact/Contact";

import ErrorBoundary from "./components/Common/ErrorBoundary";
import NetworkStatus from "./components/Common/NetworkStatus";

// Code-split route-level lazy loading for sub-pages
const ProjectPage = lazy(() => import("./pages/ProjectPage/ProjectPage"));
const ImagesPage = lazy(() => import("./pages/VisualCreations/ImagesPage"));
const VideosPage = lazy(() => import("./pages/VisualCreations/VideosPage"));

function PageLoadingFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background:
          "radial-gradient(circle at 50% 30%, aliceblue 0%, #d9f2ff 60%, #b8e6ff 100%)",
        color: "#04193a",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          border: "3px solid rgba(27, 78, 245, 0.18)",
          borderTopColor: "#1b4ef5",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: "0.88rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          color: "#04193a",
        }}
      >
        Loading Showcase...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (window.__lenis) {
            window.__lenis.scrollTo(targetEl, { offset: -30, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 140);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <div className="content-layers">
          <About />
          <CreativeExpertise />
          <CareerHighlights />
          <Branding />
          <VisualCreations />
          <Tools />
          <Contact />
        </div>
      </main>
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 0,
    });

    // Initialize Lenis Smooth Scroll with high-FPS hardware tuning
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // Native fast touch on mobile
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NetworkStatus />
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/visual-creations/images" element={<ImagesPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/visual-creations/videos" element={<VideosPage />} />
            <Route path="/branding/:slug" element={<ProjectPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
