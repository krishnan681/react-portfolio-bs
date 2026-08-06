import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import CreativeExpertise from "./components/CreativeExpertise/CreativeExpertise";
import CareerHighlights from "./components/CareerHighlights/CareerHighlights";
import Branding from "./components/Branding/Branding";
import VisualCreations from "./components/VisualCreations/VisualCreations.jsx";
import Tools from "./components/Tools/Tools.jsx";
import InstagramPosts from "./components/InstagramPosts/InstagramPosts.jsx";
import FontsColors from "./components/FontsColors/FontsColors.jsx";
import Contact from "./components/Contact/Contact.jsx";
function App() {
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

export default App;