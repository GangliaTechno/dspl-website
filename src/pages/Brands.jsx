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
            <span className="section-subtitle">Our Brands</span>
            <h1 className="brands-title">We develop and operate our own consumer brands.</h1>
            <p className="brands-tagline">
              From formulation brief to marketplace listing, we build the brands rather than advise on them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brands Showcase Grid */}
      <section className="section brands-showcase-section" id="raw-radicles">
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
                  <div className="brand-type-badge">Flagship consumer brand</div>

                  <h2 className="brand-showcase-name">
                    Raw Radicles
                  </h2>
                  <p className="brand-showcase-tagline">
                    Chocolate, reimagined through Ayurveda.
                  </p>

                  <div className="brand-body-paragraphs">
                    <p>
                      Raw Radicles pairs real cacao with Ayurvedic botanicals across three collections: Holy Sin with Chyawanprash, Wrath Relief with Ashwagandha, and Smart Sin with Brahmi. Each comes in a milk and a dark variant, six SKUs in all, at 60 g.
                    </p>
                    <p>
                      Dashapatmaja Solutions built it end to end. We wrote the formulation brief, ran the nutritional analysis through a certified lab, designed the packs, cleared FSSAI and Legal Metrology labelling, filed the trademark, set the price and planned the route to market.
                    </p>
                  </div>

                  <div className="rr-contribution-line">
                    Strategy · Product Development · Packaging · Compliance · Go to Market
                  </div>

                  <div className="rr-proof-grid">
                    <div className="proof-item">
                      <span className="proof-label">Product</span>
                      <span className="proof-desc">Six 60 g bars, three collections, milk and dark</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">Formulation</span>
                      <span className="proof-desc">Real cacao with Ashwagandha, Brahmi and Chyawanprash</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">Manufacturing</span>
                      <span className="proof-desc">Chocolate production partnership in Kerala</span>
                    </div>
                    <div className="proof-item">
                      <span className="proof-label">Ayurvedic expertise</span>
                      <span className="proof-desc">Formulation partnership in Thrissur, Kerala</span>
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
                    <img src={rawRadiclesLogo} alt="Raw Radicles" className="brand-showcase-logo-img" width="748" height="692" loading="lazy" decoding="async" />
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Portfolio in Development Section */}
      <section className="section brands-portfolio-dev-section bg-alt" aria-labelledby="portfolio-dev-title">
        <div className="container brands-ownership-grid">
          <div>
            <h2 id="portfolio-dev-title" className="section-title">
              Portfolio in development
            </h2>
          </div>
          <div className="brands-ownership-copy">
            <p>
              A second consumer brand is in early development. We publish brands here once they are through formulation and compliance, not before.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/contact" className="btn btn-secondary">
                Contact us about a brand partnership <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
