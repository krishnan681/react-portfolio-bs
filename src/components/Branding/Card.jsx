import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import styles from "./Card.module.css";

export default function Card({ title, src, category, slug }) {
  return (
    <Link to={`/branding/${slug}`} className={styles.masonryCard}>
      <div className={styles.imageWrap}>
        <img src={src} alt={title} loading="lazy" />
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.metaText}>
          {category && <span className={styles.category}>{category}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>

        <div className={styles.arrowBtn} aria-label={`View ${title}`}>
          <ArrowUpRight size={18} className={styles.arrow} />
        </div>
      </div>
    </Link>
  );
}