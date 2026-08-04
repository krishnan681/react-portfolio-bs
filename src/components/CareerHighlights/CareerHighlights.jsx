import { useMemo, useRef, useState, useEffect } from "react";
import "./CareerHighlights.css";

/* Images */
import profileIcon from "../../assets/images/icon/sk.jpg";
import aboutImage from "../../assets/images/about.webp";

/* Video */
import achievementVideo from "../../assets/videos/achievement/1.mp4";

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
        title: "HyperX Screen × VIVID",
        video: achievementVideo,
        icon: profileIcon,
      },

      {
        id: 2,
        title: "Luxury Fashion Launch",
        video: achievementVideo,
        icon: profileIcon,
      },

      {
        id: 3,
        title: "Brand Motion Reel",
        video: achievementVideo,
        icon: profileIcon,
      },

      {
        id: 4,
        title: "Cinema Campaign",
        video: achievementVideo,
        icon: profileIcon,
      },

      {
        id: 5,
        title: "Product Reveal",
        video: achievementVideo,
        icon: profileIcon,
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

        title: "HyperX launch:",

        description:
          "Contributed to the launch of HyperX and Vivid premium large-format (PLF) cinema screens at Broadway Cinemas, Tiruppur, India, delivering immersive visuals that showcased the enhanced brightness, vibrant colors, high contrast, and large-screen cinematic experience.",

        video: achievementVideo,
      },

      {
        id: 2,
        number: "02",

        title: "Giggles and twrils:",

        description:
          "Contributed to the successful launch of Giggles & Twirls by editing promotional videos, designing brand posters, and creating visually compelling campaign content that brought the brand's kids' and women's fashion collections to life with a cohesive visual identity.",

        video: achievementVideo,
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
            
Recognized for outstanding creative performance and industry acknowledgment from leading entertainment brands, delivering consistent quality and audience impact.
          </p>
        </div>
        {/* =====================================
            Infinite Video Slider
        ====================================== */}

        <div className="video-slider">
          <div className="slider-track" style={{ columnGap: "1%" }}>
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
                  <img src={item.icon} alt="" />
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
            Highlight Cards
        ====================================== */}

        <div className="highlights-grid">
          {highlights.map((item) => (
            <div className="highlight-card" key={item.id}>
              <div className="highlight-video">
                <video autoPlay muted loop playsInline controls>
                  <source src={item.video} type="video/mp4" />
                </video>
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
