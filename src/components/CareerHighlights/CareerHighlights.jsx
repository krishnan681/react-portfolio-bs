import { useMemo, useRef, useState, useEffect } from "react";
import "./CareerHighlights.css";

/* Images */
import profileIcon1 from "../../assets/images/icon/imax.png";
import profileIcon2 from "../../assets/images/icon/wb.jpeg";
import profileIcon3 from "../../assets/images/icon/uni.jpeg";
import profileIcon4 from "../../assets/images/icon/ags.jpeg";
import profileIcon5 from "../../assets/images/icon/sk.jpg";
import profileIcon6 from "../../assets/images/icon/epiq.png";
import profileIcon7 from "../../assets/images/icon/dream.jpeg";
import profileIcon8 from "../../assets/images/icon/parvatha.jpeg";

import aboutImage from "../../assets/images/about.webp";

/* Video */
import IMAX from "../../assets/videos/C-H/Stray Kids Promotion.mp4";
import Parvatha from "../../assets/videos/C-H/Youth.mp4";
import epiqandsk from "../../assets/videos/C-H/Thaai Kelavi Promotion Reel.mp4";
import F1 from "../../assets/videos/C-H/F1.mp4";
// import achievementVideo from "../../assets/videos/achievement/1.mp4";

export default function CareerHighlights() {
  /* ===============================
      Modal State
  =============================== */

  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);

  const openVideo = (video, title) => {
    setSelectedVideo({ video, title });
  };

  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setSelectedVideo(null);
  };

  /* ===============================
      Lock Scroll + Hide Navbar
  =============================== */

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    if (selectedVideo) {
      document.body.style.overflow = "hidden";

      if (navbar) {
        navbar.style.visibility = "hidden";
      }
    } else {
      document.body.style.overflow = "";

      if (navbar) {
        navbar.style.visibility = "visible";
      }
    }

    return () => {
      document.body.style.overflow = "";

      if (navbar) {
        navbar.style.visibility = "visible";
      }
    };
  }, [selectedVideo]);

  /* ===============================
      Slider Data
  =============================== */

  const sliderVideos = useMemo(
    () => [
      {
        id: 1,
        title: "Stray Kids Promotion (Final Out)",
        video: IMAX,
        icon: profileIcon1,
      },

      {
        id: 2,
        title: "F1",
        video: F1,
        icon: profileIcon2,
      },

      // {
      //   id: 3,
      //   title: "ags photo",
      //   // video: achievementVideo,
      //   icon: profileIcon3,
      // },

      // {
      //   id: 4,
      //   title: "Cinema Campaign",
      //   // video: achievementVideo,
      //   icon: profileIcon4,
      // },

      {
        id: 5,
        title: "Thaai Kelavi Promotion Reel",
        video: epiqandsk,
        icon: profileIcon5,
      },
      {
        id: 6,
        title: "Thaai Kelavi Promotion Reel",
        video: epiqandsk,
        icon: profileIcon6,
      },
      // {
      //   id: 7,
      //   title: "Thaai Kelavi Promotion Reel",
      //   video: epiqandsk,
      //   icon: profileIcon6,
      // },
      {
        id: 8,
        title: "Parvatha",
        video: Parvatha,
        icon: profileIcon8,
      },
    ],
    [],
  );

  /* =====================================
      Duplicate for Infinite Slider
  ====================================== */

  const infiniteVideos = useMemo(
    () => [...sliderVideos, ...sliderVideos],
    [sliderVideos],
  );

  /* ===============================
      Gallery Images
  =============================== */

  const galleryImages = useMemo(() => [aboutImage, aboutImage, aboutImage], []);

  /* ===============================
      Highlight Cards
  =============================== */

  const highlights = useMemo(
    () => [
      {
        id: 1,
        number: "01",
        title: "HyperX Launch",
        description:
          "Contributed to the launch of HyperX and Vivid premium large-format (PLF) cinema screens at Broadway Cinemas, Tiruppur, India, delivering immersive visuals that showcased the enhanced brightness, vibrant colors, high contrast, and large-screen cinematic experience.",
        video: epiqandsk,
      },
      {
        id: 2,
        number: "02",
        title: "Giggles and Twirls",
        description:
          "Contributed to the successful launch of Giggles & Twirls by editing promotional videos, designing brand posters, and creating visually compelling campaign content that brought the brand's kids' and women's fashion collections to life with a cohesive visual identity.",
        video: IMAX,
      },
    ],
    [],
  );

  return (
    <section className="career__highlights sc_py" id="career__highlights">
      <div className="container">
        {/* ===============================
            Section Title
        =============================== */}

        <div className="title">
          <div className="bg-text">Career</div>

          <h1 className="main-title">HIGHLIGHTS</h1>
        </div>

        <div className="CH-heading text-center">
          <p>
            Recognized for outstanding creative performance and industry
            acknowledgment from leading entertainment brands, delivering
            consistent quality and audience impact.
          </p>
        </div>
        {/* =====================================
            Production House 
        ====================================== */}
        <div className="production-house-section">
          <div className="production-house">
            <div className="production-house-heading">
              <span>PRODUCTION HOUSE</span>
              <span className="colon">:</span>
            </div>

            <div className="production-house-images">
              <img src={profileIcon1} alt="Production House"  style={{objectFit:"contain"}}/>
              <img src={profileIcon2} alt="Production House" />
              <img src={profileIcon3} alt="Production House" />
              <img src={profileIcon4} alt="Production House" />
              <img src={profileIcon5} alt="Production House" />
              <img src={profileIcon6} alt="Production House" />
              <img src={profileIcon7} alt="Production House" />
              <img src={profileIcon8} alt="Production House" />
            </div>
          </div>
        </div>

        {/* =====================================
            Infinite Video Slider
        ====================================== */}

        <div className="video-slider">
          <div className="slider-track">
            {infiniteVideos.map((item, index) => (
              <div
                className="video-card"
                key={`${item.id}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => openVideo(item.video, item.title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openVideo(item.video, item.title);
                  }
                }}
              >
                {/* Profile Icon */}

                <div className="video-icon">
                  <img src={item.icon} alt=""  style={{objectFit:"contain", background:"white"}}/>
                </div>

                {/* Video */}

                <video muted autoPlay loop playsInline>
                  <source src={item.video} type="video/mp4" />
                </video>

                {/* Overlay */}

                <div className="video-overlay"></div>

                {/* Play Button */}

                <div className="play-btn"></div>

                {/* Title */}

                <div className="video-title">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================
            Three Images
        ====================================== */}

        <div className="three-images">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "imageone"
                  : index === 1
                    ? "imagetwo"
                    : "imagethree"
              }
            >
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* =====================================
            Highlight Cards (Vertical Videos)
        ====================================== */}

        <div className="highlights-grid">
          {highlights.map((item) => (
            <div className="highlight-card vertical-reel" key={item.id}>
              <div className="highlight-video-frame">
                <div className="highlight-video">
                  <video autoPlay muted loop playsInline controls>
                    <source src={item.video} type="video/mp4" />
                  </video>
                  <div className="reel-badge">
                    <span className="reel-dot"></span>
                    <span>Reel</span>
                  </div>
                </div>
              </div>

              <div className="highlight-content">
                <div className="highlight-number">{item.number}</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* =====================================
            Video Modal
        ====================================== */}

        {selectedVideo && (
          <div className="video-modal" onClick={closeVideo}>
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="video-close"
                onClick={closeVideo}
                aria-label="Close Video"
              >
                ×
              </button>

              <h4 className="modal-title">{selectedVideo.title}</h4>

              <video
                ref={videoRef}
                className="modal-video"
                controls
                autoPlay
                playsInline
              >
                <source src={selectedVideo.video} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
