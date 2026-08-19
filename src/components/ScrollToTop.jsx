import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { getHashScrollBehavior } from '../pages/aboutMotion';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let targetId = '';
    try {
      targetId = decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
      targetId = hash.replace(/^#/, '');
    }

    if (!targetId) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    // Handle skip-link keyboard focus specifically (WCAG 2.4.1)
    if (targetId === 'main-content') {
      const mainElement = document.getElementById('main-content');
      if (mainElement) {
        if (!mainElement.hasAttribute('tabindex')) {
          mainElement.setAttribute('tabindex', '-1');
        }
        mainElement.focus({ preventScroll: true });
      }
      window.scrollTo(0, 0);
      return undefined;
    }

    let attempts = 0;
    const maxAttempts = 10;
    let rafId = null;
    let timerId = null;
    let isCancelled = false;

    const tryScroll = () => {
      if (isCancelled) return;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: getHashScrollBehavior(prefersReducedMotion),
          block: 'start',
        });
        return;
      }
      if (attempts < maxAttempts) {
        attempts += 1;
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
          rafId = window.requestAnimationFrame(tryScroll);
        }
      }
    };

    tryScroll();

    // Safety fallback timeout in case animation frames stall
    if (typeof window !== 'undefined') {
      timerId = window.setTimeout(() => {
        if (isCancelled) return;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: getHashScrollBehavior(prefersReducedMotion),
            block: 'start',
          });
        }
      }, 150);
    }

    const cleanup = () => {
      isCancelled = true;
      if (rafId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(rafId);
      }
      if (timerId && typeof window !== 'undefined') {
        window.clearTimeout(timerId);
      }
    };

    cleanupRef.current = cleanup;
    return cleanup;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
