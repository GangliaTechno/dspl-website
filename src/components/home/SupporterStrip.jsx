const SupporterStrip = ({ supporters }) => (
  <aside
    className="supporter-rail"
    role="region"
    aria-label="Recognised and supported by"
  >
    <div className="supporter-rail-inner">
      <div className="supporter-rail-header">
        <span className="supporter-rail-label">Recognised and supported by</span>
      </div>

      <div className="supporter-marquee-viewport">
        <div className="supporter-marquee-track">
          {/* Primary Sequence (Accessible) */}
          <div className="supporter-marquee-sequence">
            {supporters.map((logo) => (
              <div
                className={`supporter-logo-slot ${logo.className || ''}`}
                key={`primary-${logo.alt}`}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="supporter-logo"
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {/* Duplicate Sequence 1 for CSS Marquee Continuity (Aria-Hidden) */}
          <div className="supporter-marquee-sequence" aria-hidden="true">
            {supporters.map((logo) => (
              <div
                className={`supporter-logo-slot ${logo.className || ''}`}
                key={`dup1-${logo.alt}`}
              >
                <img
                  src={logo.src}
                  alt=""
                  className="supporter-logo"
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {/* Duplicate Sequence 2 for Wide Screen Coverage (Aria-Hidden) */}
          <div className="supporter-marquee-sequence" aria-hidden="true">
            {supporters.map((logo) => (
              <div
                className={`supporter-logo-slot ${logo.className || ''}`}
                key={`dup2-${logo.alt}`}
              >
                <img
                  src={logo.src}
                  alt=""
                  className="supporter-logo"
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {/* Duplicate Sequence 3 for Ultra-Wide / 4K Screen Coverage (Aria-Hidden) */}
          <div className="supporter-marquee-sequence" aria-hidden="true">
            {supporters.map((logo) => (
              <div
                className={`supporter-logo-slot ${logo.className || ''}`}
                key={`dup3-${logo.alt}`}
              >
                <img
                  src={logo.src}
                  alt=""
                  className="supporter-logo"
                  width={logo.width}
                  height={logo.height}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </aside>
);

export default SupporterStrip;
