import { motion } from 'framer-motion';

const SupporterStrip = ({ supporters }) => (
  <div
    className="supporter-band"
    role="region"
    aria-label="Supported by"
  >
    <motion.div 
      className="supporter-track"
      animate={{ x: ["0%", "-33.333333%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
    >
      {[...supporters, ...supporters, ...supporters].map(
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

export default SupporterStrip;
