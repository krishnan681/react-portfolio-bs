import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import styles from "./Card.module.css";

const Card = ({
  i,
  title,
  description,
  src,
  category,
  year,
  deliverables,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.header}>
          <span className={styles.year}>{year}</span>
          <h2>{title}</h2>
          <p className={styles.category}>{category}</p>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>

            <div className={styles.deliverables}>
              <span className={styles.label}>Deliverables</span>
              <div className={styles.tags}>
                {deliverables.map((item, idx) => (
                  <span key={idx} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <img src={src} alt={title} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;