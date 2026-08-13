import './Brands.css';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import RotatingHeroMedia from '../components/RotatingHeroMedia';
import rawRadiclesLogo from '../assets/raw-radicles-logo-cropped.webp';
import brandsPortfolio01960 from '../assets/brands-portfolio-01-960.webp';
import brandsPortfolio011440 from '../assets/brands-portfolio-01-1440.webp';
import brandsPortfolio01Mobile from '../assets/brands-portfolio-01-mobile.webp';
import brandsPortfolio02960 from '../assets/brands-portfolio-02-960.webp';
import brandsPortfolio021440 from '../assets/brands-portfolio-02-1440.webp';
import brandsPortfolio02Mobile from '../assets/brands-portfolio-02-mobile.webp';

const brandsHeroImages = [
  {
    id: 'brands-primary',
    src: brandsPortfolio011440,
    desktopSrcSet: `${brandsPortfolio01960} 960w, ${brandsPortfolio011440} 1440w`,
    mobileSrc: brandsPortfolio01Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  {
    id: 'brands-02',
    src: brandsPortfolio021440,
    desktopSrcSet: `${brandsPortfolio02960} 960w, ${brandsPortfolio021440} 1440w`,
    mobileSrc: brandsPortfolio02Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const Brands = () => {
  useSEO(getRouteMetadata('/brands'));
  const prefersReducedMotion = useReducedMotion();
  const mt = (base) => (prefersReducedMotion ? { duration: 0 } : base);

  return (
    <div className="brands-page fade-in">
      {/* Intro Section */}
      <section className="section brands-hero">
        <RotatingHeroMedia
          images={brandsHeroImages}
          className="brands-hero-bg"
          imageClassName="brands-hero-img"
          mobileBreakpoint={600}
        />
        <div className="container">
          <motion.div
            className="brands-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={mt({ duration: 0.8, ease: 'easeOut' })}
          >
            <span className="section-subtitle">DSPL Brands</span>
            <h1 className="brands-title">We develop and operate consumer brands.</h1>
            <p className="brands-tagline">From product development to market execution.</p>
          </motion.div>
        </div>
      </section>

      <section className="section brands-ownership-section" aria-labelledby="brands-ownership-title">
        <div className="container brands-ownership-grid">
          <div>
            <span className="section-subtitle">Ownership</span>
            <h2 id="brands-ownership-title" className="section-title">
              Raw Radicles is owned and developed by Dashapatmaja Solutions Pvt Ltd
            </h2>
          </div>
          <div className="brands-ownership-copy">
            <p>
              Raw Radicles is DSPL's first owned consumer brand. Its trademark
              application has been filed; the mark is not described as registered.
            </p>
            <p>
              Product, packaging, compliance coordination, photography, pricing,
              marketing, and route-to-market decisions are managed as part of the
              same operating system.
            </p>
          </div>
        </div>
      </section>

      <section className="section brands-architecture-section bg-alt" aria-labelledby="brands-architecture-title">
        <div className="container brands-ownership-grid">
          <div>
            <span className="section-subtitle">How the company is structured</span>
            <h2 id="brands-architecture-title" className="section-title">
              Brand owner and services operator
            </h2>
          </div>
          <p>
            DSPL develops and operates its own consumer brands. The same team also
            provides clearly scoped branding, marketing, e-commerce, and
            compliance-support services to other businesses, without implying
            ownership of client brands.
          </p>
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
                    <Link to="/brands/raw-radicles" className="btn btn-primary rr-cta-btn">
                      View the Raw Radicles project overview <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="rr-visual-panel">
                  <div className="brand-showcase-logo-wrapper">
                    <img src={rawRadiclesLogo} alt="Raw Radicles" className="brand-showcase-logo-img" width="748" height="692" loading="lazy" decoding="async" />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
