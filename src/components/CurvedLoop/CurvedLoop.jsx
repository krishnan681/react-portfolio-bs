import { useRef, useEffect, useState, useMemo, useId, useCallback } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '✦  VIDEO EDITOR  ✦  GRAPHIC DESIGNER  ✦  MOTION GRAPHICS  ✦  VISUAL STORYTELLER  ✦  BRAND STRATEGIST  ✦  3D MOTION',
  speed = 1.8,
  className = '',
  curveAmount = 0, // 0 for straight line, >0 for curved
  direction = 'left',
  interactive = true,
}) => {
  // Ensure generous non-breaking space padding between repetitions so words never stick together
  const text = useMemo(() => {
    const clean = marqueeText.trim();
    return `${clean}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`;
  }, [marqueeText]);

  const jacketRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  
  const [containerWidth, setContainerWidth] = useState(1440);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  
  const uid = useId();
  const pathId = `curve-${uid.replace(/[^a-zA-Z0-9-_]/g, '')}`;

  const isStraight = !curveAmount || curveAmount === 0;

  // Measure text length in real-time
  const updateMetrics = useCallback(() => {
    if (jacketRef.current) {
      const { width } = jacketRef.current.getBoundingClientRect();
      if (width > 0) {
        setContainerWidth(Math.round(width));
      }
    }
    if (measureRef.current) {
      const measured = measureRef.current.getComputedTextLength();
      if (measured > 0) {
        // Add safety buffer to prevent any edge clipping
        setSpacing(Math.ceil(measured));
      }
    }
  }, []);

  // Path definition: Dynamic 1:1 pixel coordinate system
  const pathD = useMemo(() => {
    if (isStraight) {
      const span = Math.max(containerWidth * 3, 3000);
      return `M -${span / 2},35 L ${span},35`;
    }
    return `M-100,40 Q500,${40 + curveAmount} 1540,40`;
  }, [isStraight, containerWidth, curveAmount]);

  const viewBox = useMemo(() => {
    return isStraight ? `0 0 ${containerWidth} 70` : '0 0 1440 120';
  }, [isStraight, containerWidth]);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  // Compute how many repetitions are needed to fill the screen seamlessly
  const totalText = useMemo(() => {
    if (!spacing || spacing <= 0) return text;
    const count = Math.max(Math.ceil((containerWidth * 3) / spacing) + 3, 3);
    return Array(count).fill(text).join('');
  }, [text, spacing, containerWidth]);

  const ready = spacing > 0 && containerWidth > 0;

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  // Handle Resize and Font Loading
  useEffect(() => {
    updateMetrics();

    // Re-measure after custom web fonts load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateMetrics();
      });
    }

    const jacketEl = jacketRef.current;
    if (!jacketEl) return;

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateMetrics();
      }, 50);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(jacketEl);
    window.addEventListener('resize', handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateMetrics, text, className]);

  // Set initial startOffset
  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', `${initial}px`);
      setOffset(initial);
    }
  }, [spacing]);

  // Infinite Animation Loop
  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;

        textPathRef.current.setAttribute('startOffset', `${newOffset}px`);
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  // Pointer Drag Handlers
  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // Fallback if not supported
    }
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute('startOffset', `${newOffset}px`);
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      ref={jacketRef}
      className={`curved-loop-jacket ${isStraight ? 'straight-loop-jacket' : ''}`}
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      role="region"
      aria-label="Scrolling Highlights Banner"
    >
      <svg
        className="curved-loop-svg"
        viewBox={viewBox}
        preserveAspectRatio={isStraight ? 'xMidYMid slice' : 'none'}
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={`curved-loop-text ${className}`}
          style={{
            visibility: 'hidden',
            opacity: 0,
            position: 'absolute',
            pointerEvents: 'none',
          }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={`curved-loop-text ${className}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offset}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
