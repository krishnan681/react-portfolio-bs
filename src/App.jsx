import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CreativeExpertise from "./components/CreativeExpertise/CreativeExpertise";
import CareerHighlights from "./components/CareerHighlights/CareerHighlights";
import Branding from "./components/Branding/Branding";
import VisualCreations from "./components/VisualCreations/VisualCreations.jsx";
import Tools from "./components/Tools/Tools.jsx";
import FontsColors from "./components/FontsColors/FontsColors.jsx";
import Contact from "./components/Contact/Contact.jsx";

import ProjectPage from "./pages/ProjectPage/ProjectPage";


/* =====================================================
   HOME PAGE
===================================================== */

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


/* =====================================================
   APP / ROUTER
===================================================== */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ============== BRANDING PROJECTS ============== */}

        <Route
          path="/branding/:slug"
          element={<ProjectPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;