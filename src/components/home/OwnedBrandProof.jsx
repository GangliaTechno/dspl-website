import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OwnedBrandProof = ({ logoSrc }) => (
  <section
    className="section owned-brand-section"
    aria-labelledby="owned-brand-title"
  >
    <div className="container owned-brand-layout">
      <div className="owned-brand-visual" aria-hidden="true">
        <div className="owned-brand-glow" />
        <img
          src={logoSrc}
          alt=""
          className="owned-brand-logo"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="owned-brand-content">
        <span className="section-subtitle">Owned-brand proof</span>
        <h2 className="section-title" id="owned-brand-title">
          Raw Radicles
        </h2>
        <p className="owned-brand-tagline">
          Chocolate, reimagined through Ayurveda.
        </p>
        <p className="owned-brand-description">
          DSPL applies brand strategy, packaging, market presentation, and
          e-commerce thinking to a consumer brand it operates itself.
        </p>
        <div className="owned-brand-actions">
          <Link to="/brands#raw-radicles" className="btn btn-primary">
            See the brand <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default OwnedBrandProof;
