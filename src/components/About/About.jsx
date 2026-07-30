import { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";
import aboutImage from "../../assets/images/about.webp";

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const counters = aboutRef.current?.querySelectorAll(".counter");

    if (!counters || !counters.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = parseFloat(el.dataset.target) || 0;
          const suffix = el.dataset.suffix || "";

          // GSAP Animation (if GSAP is loaded)
          if (gsap) {
            const obj = { value: 0 };

            gsap.to(obj, {
              value: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent =
                  (target % 1 === 0
                    ? Math.floor(obj.value)
                    : obj.value.toFixed(1)) + suffix;
              },
            });
          }

          // Vanilla JS Fallback
          else {
            let start = 0;

            const duration = 1500;
            const interval = 30;
            const steps = duration / interval;
            const increment = target / steps;

            const timer = setInterval(() => {
              start += increment;

              if (start >= target) {
                el.textContent =
                  (target % 1 === 0
                    ? Math.floor(target)
                    : target.toFixed(1)) + suffix;

                clearInterval(timer);
              } else {
                el.textContent =
                  (target % 1 === 0
                    ? Math.floor(start)
                    : start.toFixed(1)) + suffix;
              }
            }, interval);
          }

          obs.unobserve(el);
        });
      },
      {
        threshold: 0.3,
      }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="about sc_py"
      id="about"
      ref={aboutRef}
    >
      <div className="container">
        <div className="row justify-content-center row-gap-4 align-items-center">
          {/* Left Side */}

          <div className="col-8 col-lg-4">
            <div className="about__image">
              <div className="text-center">
                <img
                  src={aboutImage}
                  className="w-100"
                  alt="About Barath Sachwin"
                />
              </div>

              <div className="exe">
                <div className="experience">
                  <span>2+</span>
                  <small>Experience</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="offset-lg-1 col-lg-7">
            <div className="sub__title">
              <span>About Me</span>
            </div>

            <div className="main__title mb-4">
              Solving Problems With
              <br />
              <span>Intuitive Design</span>
            </div>

            <p>
              Creative Graphic Designer & Video Editor with 2 years of
              professional experience creating motion graphics,
              promotional videos, and digital marketing content across
              diverse industries.
              <br />
              <br />
              Skilled in graphic design, motion design, video editing,
              visual storytelling, color grading and post-production
              workflows, delivering high-impact creative solutions that
              strengthen brand identity and audience engagement.
            </p>

            {/* Stats */}

            <div className="stats">
              <div className="stat">
                <b
                  className="counter"
                  data-target="150"
                  data-suffix="+"
                >
                  0
                </b>

                <span>VIDEOS PRODUCED</span>
              </div>

              <div className="stat">
                <b
                  className="counter"
                  data-target="200"
                  data-suffix="+"
                >
                  0
                </b>

                <span>SOCIAL CREATIVES</span>
              </div>

              <div className="stat">
                <b
                  className="counter"
                  data-target="5.5"
                  data-suffix="M+"
                >
                  0
                </b>

                <span>TOTAL VIEWS</span>
              </div>
            </div>

            {/* Industries */}

            <div className="industries">
              <span className="tag">🎓 Education</span>

              <span className="tag">🏥 Healthcare</span>

              <span className="tag">🏠 Real Estate</span>

              <span className="tag">🏨 Hospitality</span>

              <span className="tag">🎬 Entertainment</span>

              <span className="tag">👗 Fashion</span>

              <span className="tag">🧘 Wellness</span>

              <span className="tag">🍽️ Food & Beverage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}