import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

const SupporterStrip = ({ supporters }) => {
  const prefersReducedMotion = useReducedMotion();
  const bandRef = useRef(null);
  const sequenceRef = useRef(null);
  const [marqueeMetrics, setMarqueeMetrics] = useState({
    sequenceWidth: 0,
    sequenceCount: 2,
  });
  const [isPaused, setIsPaused] = useState(false);

  useLayoutEffect(() => {
    const band = bandRef.current;
    const sequence = sequenceRef.current;

    if (!band || !sequence) {
      return undefined;
    }

    const measure = () => {
      const bandWidth = band.getBoundingClientRect().width;
      const sequenceWidth = sequence.getBoundingClientRect().width;

      if (bandWidth <= 0 || sequenceWidth <= 0) {
        return;
      }

      const sequenceCount = Math.max(
        2,
        Math.ceil(bandWidth / sequenceWidth) + 1,
      );

      setMarqueeMetrics((current) => {
        if (
          current.sequenceWidth === sequenceWidth
          && current.sequenceCount === sequenceCount
        ) {
          return current;
        }

        return { sequenceWidth, sequenceCount };
      });
    };

    measure();

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(band);
    observer.observe(sequence);

    return () => observer.disconnect();
  }, [supporters]);

  const sequenceWidth = marqueeMetrics.sequenceWidth;
  const sequenceCount = prefersReducedMotion
    ? 1
    : marqueeMetrics.sequenceCount;
  const shouldAnimate = !prefersReducedMotion && sequenceWidth > 0;
  const trackClassName = [
    'supporter-track',
    prefersReducedMotion ? 'supporter-track-static' : '',
    shouldAnimate ? 'supporter-track-running' : '',
    isPaused ? 'supporter-track-paused' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={bandRef}
      className="supporter-band"
      role="region"
      aria-label="Supported by"
    >
      <div className="supporter-viewport">
        <div
          className={trackClassName}
          style={
            shouldAnimate
              ? { '--supporter-shift': `${-sequenceWidth}px` }
              : undefined
          }
        >
          {Array.from({ length: sequenceCount }, (_, sequenceIndex) => (
            <div
              ref={sequenceIndex === 0 ? sequenceRef : undefined}
              className="supporter-sequence"
              key={`supporter-sequence-${sequenceIndex}`}
              aria-hidden={sequenceIndex > 0 ? 'true' : undefined}
            >
              {supporters.map((logo) => (
                <div
                  className={`supporter-logo-slot ${logo.className || ''}`}
                  key={`${logo.alt}-${sequenceIndex}`}
                >
                  <img
                    src={logo.src}
                    alt={sequenceIndex > 0 ? '' : logo.alt}
                    className="supporter-logo"
                    loading="eager"
                    decoding="async"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {!prefersReducedMotion && (
        <button
          type="button"
          className="supporter-motion-control"
          aria-label={isPaused ? 'Resume supporter logos' : 'Pause supporter logos'}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused
            ? <Play size={16} aria-hidden="true" />
            : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
};

export default SupporterStrip;
