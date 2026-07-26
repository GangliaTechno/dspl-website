const SupporterStrip = ({ supporters }) => (
  <section className="supporter-proof" aria-label="Supported by">
    <div className="container supporter-proof-inner">
      <p className="supporter-proof-label">Supported by</p>
      <div className="supporter-proof-grid">
        {supporters.map((supporter) => (
          <div className="supporter-proof-item" key={supporter.alt}>
            <img
              src={supporter.src}
              alt={supporter.alt}
              className="supporter-proof-logo"
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SupporterStrip;
