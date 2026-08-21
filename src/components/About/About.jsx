import { useEffect, useState, useRef } from "react";
import "./About.css";
import { getR2Url } from "../../config/r2";
import ImageWithSkeleton from "../Common/ImageWithSkeleton";

const aboutImage = getR2Url("profile/about.webp");

function StatCounter({ target, suffix = "", label, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      const duration = 1600;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 60px 0px",
      },
    );

    observer.observe(el);

    const fallbackTimer = setTimeout(() => {
      if (!animatedRef.current) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
          startAnimation();
        }
      }
    }, 400);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [target]);

  const formattedValue =
    decimals > 0
      ? count.toFixed(decimals) + suffix
      : Math.round(count) + suffix;

  return (
    <div className="stat" ref={ref}>
      <b>{formattedValue}</b>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section className="about sc_py" id="about">
      <div className="container">
        <div className="row justify-content-center row-gap-4">
          {/* Left Side */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="about__image">
              <div className="text-center">
                <ImageWithSkeleton
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
            {/* Hey Title */}
            <div className="hey" aria-label="Hey!">
              <span className="letter h">h</span>
              <span className="letter e">E</span>
              <span className="letter y">y</span>
              <span className="letter exclamation">!</span>
            </div>

            <p>
              I'm a creative Graphic Designer &amp; Video Editor with 2 years of
              professional experience creating motion graphics, promotional
              videos, and digital marketing content across diverse industries.
              <br />
              Skilled in graphic design, motion design, video editing, visual
              storytelling, color grading and post-production workflows,
              delivering high-impact creative solutions that strengthen brand
              identity and audience engagement.
            </p>

            {/* Stats */}
            <div className="stats">
              <StatCounter
                target={150}
                suffix="+"
                label="VIDEOS PRODUCED"
                decimals={0}
              />
              <StatCounter
                target={200}
                suffix="+"
                label="SOCIAL CREATIVES"
                decimals={0}
              />
              <StatCounter
                target={5.5}
                suffix="M+"
                label="TOTAL VIEWS"
                decimals={1}
              />
            </div>

            {/* Industries */}
            {/* <div className="industries">
              <span className="tag">🎓 Education</span>
              <span className="tag">🏥 Healthcare</span>
              <span className="tag">🏠 Real Estate</span>
              <span className="tag">🏨 Hospitality</span>
              <span className="tag">🎬 Entertainment</span>
              <span className="tag">👗 Fashion</span>
              <span className="tag">🧘 Wellness</span>
              <span className="tag">🍽️ Food & Beverage</span>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
