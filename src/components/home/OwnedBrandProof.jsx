import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

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
          width="748"
          height="692"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="owned-brand-content">
        <span className="section-subtitle">Built and operated by DSPL</span>
        <h2 className="section-title" id="owned-brand-title">
          Raw Radicles
        </h2>
        <p className="owned-brand-tagline">
          Chocolate, reimagined through Ayurveda.
        </p>
        <p className="owned-brand-description">
          Six 60 g bars across three collections, built with real cacao and
          Ayurvedic botanicals. We wrote the formulation brief, designed the
          packs, organised compliance inputs, shot the product, set the
          pricing and planned the route to market. We own the brand, so we
          carry the consequences of every one of those decisions. That is
          what shapes how we scope client work.
        </p>
        <div className="owned-brand-actions">
          <Link to="/brands" className="btn btn-primary">
            Explore our brands <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default OwnedBrandProof;
