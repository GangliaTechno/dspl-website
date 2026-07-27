import { motion, useReducedMotion } from 'framer-motion';

const SupporterStrip = ({ supporters }) => {
  const prefersReducedMotion = useReducedMotion();
  const visibleSupporters = prefersReducedMotion
    ? supporters
    : [...supporters, ...supporters, ...supporters];

  return (
    <div
      className="supporter-band"
      role="region"
      aria-label="Supported by"
    >
      <motion.div
        className={`supporter-track${prefersReducedMotion ? ' supporter-track-static' : ''}`}
        animate={prefersReducedMotion ? undefined : { x: ["0%", "-33.333333%"] }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, ease: "linear", duration: 12 }}
      >
        {visibleSupporters.map(
        (logo, index) => {
          const isDuplicate = index >= supporters.length;

          return (
            <div
              key={`${logo.alt}-${index}`}
              className={`supporter-logo-slot ${logo.className || ''}`}
              aria-hidden={isDuplicate ? "true" : undefined}
            >
              <img
                src={logo.src}
                alt={isDuplicate ? "" : logo.alt}
                className="supporter-logo"
                loading="eager"
                decoding="async"
                draggable="false"
              />
            </div>
          );
        }
        )}
      </motion.div>
    </div>
  );
};

export default SupporterStrip;
