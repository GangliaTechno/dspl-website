import './Brands.css';
import { ArrowRight, Sparkles, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import brandHeroStudio from '../assets/brands-hero-studio.webp';
import pipelineBgImg from '../assets/brands_pipeline_bg.jpg';
import { openWorkModal } from '../utils/workModal';

const Brands = () => {
  useSEO(
    'Our Brands | Dasha Patmaja Services',
    'Dasha Patmaja Services is a house of brands. Raw Radicles, our premium chocolate brand with Ayurveda inside, is the first. More consumer brands are in development.'
  );

  return (
    <div className="brands-page fade-in">
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Intro Section */}
      <section className="section brands-hero">
        <div className="brands-hero-bg">
          <img src={brandHeroStudio} alt="" className="brands-hero-img" loading="eager" decoding="sync" />
          <div className="brands-hero-overlay"></div>
        </div>
        <div className="container">
          <motion.div 
            className="brands-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="section-subtitle">HOUSE OF BRANDS</span>
            <h1 className="brands-title">We build brands from the inside out.</h1>
            <p className="brands-description">
              From product development and packaging to compliance, storytelling and route to market.
            </p>
            <p className="brands-sub-description">
              Raw Radicles is our first flagship consumer brand, with more in development.
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
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="brand-content-grid">
                <div className="brand-info-side">
                  <div className="brand-type-badge">
                    <Cookie size={16} className="badge-icon" />
                    FLAGSHIP CONSUMER BRAND
                  </div>
                  
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
                      Built end to end by Dasha Patmaja—from formulation and packaging to compliance, storytelling and route to market.
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
                    <a href="mailto:director@dashapatmaja.in?subject=Raw%20Radicles%20Inquiry" className="btn rr-cta-btn">
                      Enquire about Raw Radicles <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="rr-visual-panel">
                  
                  <div className="rr-glow-ring"></div>
                  
                  <div className="brand-showcase-logo-wrapper">
                    <img src={rawRadiclesLogo} alt="Raw Radicles" className="brand-showcase-logo-img" loading="lazy" decoding="async" />
                  </div>
                  
                  
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Pipeline Banner */}
      <section className="section pipeline-section bg-alt" style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 248, 231, 0.85), rgba(255, 248, 231, 0.95)), url(${pipelineBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container">
          <motion.div 
            className="pipeline-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="pipeline-decorative-shape-1" aria-hidden="true"></div>
            <div className="pipeline-decorative-shape-2" aria-hidden="true"></div>
            
            <div className="pipeline-content">
              <div className="pipeline-icon-box">
                <Sparkles size={24} />
              </div>
              <h3 className="pipeline-title">More brands in development</h3>
              <p className="pipeline-text">
                We are developing consumer brands for additional customer segments. New launches will be added here as they progress.
              </p>
              <button 
                type="button"
                aria-label="Open enquiry form to discuss a brand partnership"
                onClick={() => openWorkModal('brands-page')}
                className="btn btn-primary pipeline-btn"
              >
                Discuss a brand partnership <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Brands;
