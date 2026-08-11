import './Brands.css';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import rawRadiclesLogo from '../assets/raw-radicles-logo-cropped.webp';
import brandHero768 from '../assets/brands-hero-editorial-768.webp';
import brandHero1200 from '../assets/brands-hero-editorial-1200.webp';
import brandHero1672 from '../assets/brands-hero-editorial-1672.webp';
import brandHeroMobile from '../assets/brands-hero-editorial-mobile.webp';
import { openWorkModal } from '../utils/workModal';

const Brands = () => {
  useSEO(getRouteMetadata('/brands'));
  const prefersReducedMotion = useReducedMotion();
  const mt = (base) => (prefersReducedMotion ? { duration: 0 } : base);

  return (
    <div className="brands-page fade-in">
      {/* Intro Section */}
      <section className="section brands-hero">
        <picture className="brands-hero-bg" aria-hidden="true">
          <source media="(max-width: 600px)" srcSet={brandHeroMobile} />
          <source
            srcSet={`${brandHero768} 768w, ${brandHero1200} 1200w, ${brandHero1672} 1672w`}
            sizes="100vw"
          />
          <img
            src={brandHero1672}
            alt=""
            className="brands-hero-img"
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="container">
          <motion.div
            className="brands-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={mt({ duration: 0.8, ease: 'easeOut' })}
          >
            <span className="section-subtitle">DSPL Brands</span>
            <h1 className="brands-title">We develop and operate consumer brands.</h1>
            <p className="brands-description">
              We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands Showcase Grid */}
      <section className="section brands-showcase-section bg-alt" id="raw-radicles">
        <div className="container">
          <div className="showcase-container">
            {/* 1. Raw Radicles Card */}
            <motion.div
              className="brand-detail-card raw-radicles-card"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={mt({ duration: 0.7, ease: 'easeOut' })}
            >
              <div className="brand-content-grid">
                <div className="brand-info-side">
                  <div className="brand-type-badge">FLAGSHIP CONSUMER BRAND</div>

                  <h2 className="brand-showcase-name">
                    Raw Radicles
                  </h2>
                  <p className="brand-showcase-tagline">
                    Chocolate, reimagined through Ayurveda.
                  </p>

                  <div className="brand-body-paragraphs">
                    <p>
                      Raw Radicles brings together real cacao and carefully selected Ayurvedic botanicals.
                    </p>
                    <p>
                      Built end to end by Dashapatmaja Solutions Pvt Ltd—from formulation and packaging to compliance, storytelling and route to market.
                    </p>
                  </div>

                  <div className="rr-contribution-line">
                    STRATEGY · PRODUCT DEVELOPMENT · PACKAGING · COMPLIANCE · GO-TO-MARKET
                  </div>

                  <div className="rr-proof-grid">
                    <div className="proof-item">
                      <span className="proof-label">PRODUCT</span>
                      <span className="proof-desc">Six 60 g bars across three collections</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">FORMULATION</span>
                      <span className="proof-desc">Real cacao with selected Ayurvedic botanicals</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">MANUFACTURING</span>
                      <span className="proof-desc">Chocolate production partnership in Kerala</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">AYURVEDIC EXPERTISE</span>
                      <span className="proof-desc">Formulation partnership in Thrissur</span>
                    </div>
                  </div>

                  <div className="brand-cta-block">
                    <Link to="/contact" className="btn btn-primary rr-cta-btn">
                      Contact us about Raw Radicles <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="rr-visual-panel">
                  <div className="brand-showcase-logo-wrapper">
                    <img src={rawRadiclesLogo} alt="Raw Radicles" className="brand-showcase-logo-img" loading="lazy" decoding="async" />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Portfolio in development */}
      <section className="section pipeline-section bg-alt">
        <div className="container">
          <motion.div
            className="pipeline-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={mt({ duration: 0.7 })}
          >
            <h2 className="pipeline-title">Portfolio in development</h2>
            <p className="pipeline-text">
              Additional consumer-brand concepts are being evaluated and developed. We will publish them here when they are ready for market.
            </p>
            <button
              type="button"
              aria-label="Open enquiry form to discuss a brand partnership"
              onClick={() => openWorkModal('brands-page')}
              className="btn btn-primary pipeline-btn"
            >
              Discuss a brand partnership <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
