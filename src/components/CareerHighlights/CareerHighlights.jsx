import { useMemo, useRef, useState, useEffect } from "react";
import "./CareerHighlights.css";

import { getR2Url } from "../../config/r2";

/* Images */
const profileIcon1 = getR2Url("production-house-icons/imax.webp");
const profileIcon2 = getR2Url("production-house-icons/wb.webp");
const profileIcon3 = getR2Url("production-house-icons/uni.webp");
const profileIcon4 = getR2Url("production-house-icons/ags.webp");
const profileIcon5 = getR2Url("production-house-icons/sk.webp");
const profileIcon6 = getR2Url("production-house-icons/epiq.webp");
const profileIcon7 = getR2Url("production-house-icons/dream.webp");
const profileIcon8 = getR2Url("production-house-icons/parvatha.webp");

const CHimg1 = getR2Url("career-highlights/images/1.webp");
const CHimg2 = getR2Url("career-highlights/images/2.webp");
const CHimg3 = getR2Url("career-highlights/images/3.webp");
const CHimg4 = getR2Url("career-highlights/images/4.webp ");

/* Videos */
const IMAX = getR2Url("career-highlights/videos/Stray Kids Promotion.mp4");
const Parvatha = getR2Url("career-highlights/videos/Youth.mp4");
const epiqandsk = getR2Url("career-highlights/videos/Thaai Kelavi Promotion Reel.mp4");
const F1 = getR2Url("career-highlights/videos/F1.mp4");
const hyperx = getR2Url("career-highlights/videos/hyperx.mp4");
const gandt = getR2Url("career-highlights/videos/gandt.mp4");

export default function CareerHighlights() {
  /* ===============================
      Modal State
  =============================== */

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const videoRef = useRef(null);

  const galleryImages = useMemo(() => [CHimg1, CHimg2, CHimg3, CHimg4], []);

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

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0
    );
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : 0
    );
  };

  /* ===============================
      Lock Scroll + Keyboard Nav
  =============================== */

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    if (selectedVideo || selectedImageIndex !== null) {
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

    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null) {
        if (e.key === "Escape") closeImageModal();
        if (e.key === "ArrowLeft") handlePrevImage();
        if (e.key === "ArrowRight") handleNextImage();
      } else if (selectedVideo) {
        if (e.key === "Escape") closeVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);

      if (navbar) {
        navbar.style.visibility = "visible";
      }
    };
  }, [selectedVideo, selectedImageIndex]);

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
        video: hyperx,
      },
      {
        id: 2,
        number: "02",
        title: "Giggles and Twirls",
        description:
          "Contributed to the successful launch of Giggles & Twirls by editing promotional videos, designing brand posters, and creating visually compelling campaign content that brought the brand's kids' and women's fashion collections to life with a cohesive visual identity.",
        video: gandt,
      },
    ],
    [],
  );

  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
              <img src={profileIcon1} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon2} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon3} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon4} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon5} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon6} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon7} alt="Production House" loading="lazy" decoding="async" />
              <img src={profileIcon8} alt="Production House" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {/* =====================================
            Infinite Video Slider with Arrow Controls
        ====================================== */}

        <div className="video-slider-wrap">
          <button
            type="button"
            className="video-slider-arrow left"
            onClick={() => scrollSlider("left")}
            aria-label="Previous videos"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="video-slider" ref={sliderRef}>
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
                    <img
                      src={item.icon}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectFit: "contain", background: "white" }}
                    />
                  </div>

                  {/* Video Preview Frame */}
                  <div className="video-preview-frame">
                    <video
                      autoPlay
                      muted
                      defaultMuted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedMetadata={(e) => {
                        e.target.muted = true;
                        e.target.play().catch(() => {});
                      }}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>

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

          <button
            type="button"
            className="video-slider-arrow right"
            onClick={() => scrollSlider("right")}
            aria-label="Next videos"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* =====================================
            Gallery Images (4 Images Responsive - 4:5 Aspect Ratio)
        ====================================== */}

        <div className="three-images row g-3 g-md-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="col-6 col-md-3">
              <div
                className={`gallery-image-box ${
                  index === 0
                    ? "imageone"
                    : index === 1
                      ? "imagetwo"
                      : index === 2
                        ? "imagethree"
                        : "imagefour"
                }`}
                onClick={() => openImageModal(index)}
                role="button"
                tabIndex={0}
                aria-label={`Open gallery image ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    openImageModal(index);
                  }
                }}
              >
                <img src={image} alt={`Gallery Image ${index + 1}`} loading="lazy" decoding="async" />
                <div className="gallery-hover-overlay">
                  <i className="fa-solid fa-expand"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            Featured Launches Title & Highlight Cards
        ====================================== */}

        <div className="featured-launches-header text-center">
          <div className="title">
            
            <h2 className="main-title">FEATURED LAUNCHES</h2>
          </div>
           
        </div>

        <div className="highlights-grid">
          {highlights.map((item) => (
            <div className="highlight-card vertical-reel" key={item.id}>
              <div
                className="highlight-video-frame"
                onClick={() => openVideo(item.video, item.title)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${item.title} video`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openVideo(item.video, item.title);
                }}
              >
                <div className="highlight-video">
                  <video
                    // autoPlay
                    muted
                    defaultMuted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      e.target.muted = true;
                      e.target.play().catch(() => {});
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <div className="highlight-play-overlay">
                  <div className="play-icon-circle">
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div>
              </div>

              <div className="highlight-content">
                {/* <div className="highlight-number">{item.number}</div> */}

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            Video Modal (Portrait Video Preserved)
        ====================================== */}

        {selectedVideo && (
          <div className="video-modal" onClick={closeVideo}>
            <div
              className="video-modal-content portrait-friendly-modal"
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

              <div className="modal-video-wrapper">
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
          </div>
        )}

        {/* =====================================
            Gallery Image Modal with Carousel Nav
        ====================================== */}

        {selectedImageIndex !== null && (
          <div className="video-modal image-modal" onClick={closeImageModal}>
            <div
              className="video-modal-content image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="video-close"
                onClick={closeImageModal}
                aria-label="Close Image Modal"
              >
                ×
              </button>

              {/* Prev Carousel Button */}
              <button
                type="button"
                className="image-carousel-btn prev"
                onClick={handlePrevImage}
                aria-label="Previous Image"
              >
                ‹
              </button>

              {/* Next Carousel Button */}
              <button
                type="button"
                className="image-carousel-btn next"
                onClick={handleNextImage}
                aria-label="Next Image"
              >
                ›
              </button>

              {/* Image Preview */}
              <div className="image-modal-body">
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={`Gallery Image ${selectedImageIndex + 1}`}
                  className="modal-image-preview"
                />
              </div>

              {/* Carousel Counter */}
              <div className="image-carousel-counter">
                <span>{selectedImageIndex + 1} / {galleryImages.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


