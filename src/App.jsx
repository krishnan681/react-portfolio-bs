import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CreativeExpertise from "./components/CreativeExpertise/CreativeExpertise";
import CareerHighlights from "./components/CareerHighlights/CareerHighlights";
import Branding from "./components/Branding/Branding";
import VisualCreations from "./components/VisualCreations/VisualCreations";
import Tools from "./components/Tools/Tools";
import FontsColors from "./components/FontsColors/FontsColors";
import Contact from "./components/Contact/Contact";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ImagesPage from "./pages/VisualCreations/ImagesPage";
import VideosPage from "./pages/VisualCreations/VideosPage";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <CreativeExpertise />
        <CareerHighlights />
        <Branding />
        <VisualCreations />
        <Tools />
        {/* <InstagramPosts /> */}
        <FontsColors />
        <Contact />
      </main>

      {/* <Footer /> */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/images" element={<ImagesPage />} />
        <Route path="/visual-creations/images" element={<ImagesPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/visual-creations/videos" element={<VideosPage />} />
        <Route path="/branding/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;