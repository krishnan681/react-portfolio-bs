import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
// import HeroOld from "./components/Hero/HeroOld"; // Original Hero component preserved
import About from "./components/About/About";
import CreativeExpertise from "./components/CreativeExpertise/CreativeExpertise";
import CareerHighlights from "./components/CareerHighlights/CareerHighlights";
import Branding from "./components/Branding/Branding";
import VisualCreations from "./components/VisualCreations/VisualCreations";
import Tools from "./components/Tools/Tools";
import Contact from "./components/Contact/Contact";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ImagesPage from "./pages/VisualCreations/ImagesPage";
import VideosPage from "./pages/VisualCreations/VideosPage";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import NetworkStatus from "./components/Common/NetworkStatus";

function Home() {
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

      {/* <Footer /> */}
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      delay: 0,
    });
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NetworkStatus />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/visual-creations/images" element={<ImagesPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/visual-creations/videos" element={<VideosPage />} />
          <Route path="/branding/:slug" element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;