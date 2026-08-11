import { useCallback, useEffect, useState } from 'react';
import './RotatingHeroMedia.css';

export const HERO_ROTATION_INTERVAL_MS = 20000;
export const HERO_TRANSITION_MS = 800;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getReducedMotion = () =>
  typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const RotatingHeroMedia = ({
  images,
  className,
  imageClassName,
  mobileBreakpoint = 767,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mountSecondary, setMountSecondary] = useState(false);
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set([0]));
  const [isVisible, setIsVisible] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotion);

  const markLoaded = useCallback((index) => {
    setLoadedIndexes((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(REDUCED_MOTION_QUERY);
    if (!mediaQuery) return undefined;
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return undefined;
    const mount = () => setMountSecondary(true);
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(mount);
      return () => window.cancelIdleCallback?.(idleId);
    }
    const timeoutId = window.setTimeout(mount, 0);
    return () => window.clearTimeout(timeoutId);
  }, [images.length, prefersReducedMotion]);

  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (
      prefersReducedMotion
      || !mountSecondary
      || !isVisible
      || images.length < 2
    ) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % images.length;
        return loadedIndexes.has(next) ? next : current;
      });
    }, HERO_ROTATION_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [images.length, isVisible, loadedIndexes, mountSecondary, prefersReducedMotion]);

  const displayedIndex = prefersReducedMotion ? 0 : activeIndex;

  return (
    <div
      className={`${className} rotating-hero-media`}
      aria-hidden="true"
      style={{ '--hero-transition-duration': `${HERO_TRANSITION_MS}ms` }}
    >
      {images.map((image, index) => {
        if (index > 0 && (!mountSecondary || prefersReducedMotion)) return null;
        const isActive = index === displayedIndex;
        return (
          <picture
            key={image.id}
            className={`rotating-hero-layer${isActive ? ' is-active' : ''}`}
            data-active={isActive ? 'true' : 'false'}
            data-hero-id={image.id}
          >
            <source
              media={`(max-width: ${mobileBreakpoint}px)`}
              srcSet={image.mobileSrc}
            />
            <source
              srcSet={image.desktopSrcSet}
              sizes={image.sizes ?? '100vw'}
            />
            <img
              className={imageClassName}
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
              decoding="async"
              onLoad={() => markLoaded(index)}
              data-testid={`hero-${image.id}`}
            />
          </picture>
        );
      })}
    </div>
  );
};

export default RotatingHeroMedia;
