import { useState } from "react";
import "./Skeleton.css";

export default function ImageWithSkeleton({
  src,
  alt = "",
  className = "",
  wrapperClassName = "",
  style = {},
  imgStyle = {},
  aspectRatio,
  onClick,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`image-with-skeleton-wrap ${wrapperClassName}`}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style,
      }}
      onClick={onClick}
    >
      {/* Skeleton Shimmer Placeholder */}
      <div className={`skeleton-box image-skeleton-overlay ${isLoaded ? "is-hidden" : ""}`}>
        <div className="skeleton-shimmer" />
      </div>

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`image-with-skeleton-img ${isLoaded ? "is-loaded" : ""} ${className}`}
        style={imgStyle}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
