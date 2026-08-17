import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import styles from "./Card.module.css";

export default function Card({ id, title, src, category, slug, color }) {
  return (
    <Link
      to={`/branding/${slug}`}
      className={styles.masonryCard}
      style={{ "--card-accent": color || "#1b4ef5" }}
    >
      <div className={styles.imageWrap}>
        <img src={src} alt={title} loading="lazy" />
        {id && <span className={styles.indexBadge}>{id}</span>}
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