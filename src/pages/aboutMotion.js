export const getHashScrollBehavior = (prefersReducedMotion) =>
  prefersReducedMotion ? 'auto' : 'smooth';

export const getAboutRevealInitial = (prefersReducedMotion, y) =>
  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y };

export const getAboutRevealTransition = (prefersReducedMotion, index = 0) => ({
  duration: prefersReducedMotion ? 0 : 0.5,
  ease: 'easeOut',
  delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.12),
});
