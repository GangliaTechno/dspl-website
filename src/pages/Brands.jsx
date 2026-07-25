import { ArrowRight, Sparkles, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import brandHeroStudio from '../assets/brands-hero-studio.webp';
import upcomingBrandsImg from '../assets/Upcoming_brands.jpeg';

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
                      Raw Radicles brings together real cacao, small-batch chocolate making and carefully selected Ayurvedic botanicals.
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
                  <div className="rr-background-wordmark" aria-hidden="true">
                    RAW<br/>RADICLES
                  </div>
                  <div className="rr-glow-ring"></div>
                  
                  <div className="brand-showcase-logo-wrapper">
                    <img src={rawRadiclesLogo} alt="Raw Radicles" className="brand-showcase-logo-img" loading="lazy" decoding="async" />
                  </div>
                  
                  <div className="rr-bottom-descriptor">
                    CACAO · AYURVEDA · SMALL BATCH
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Full-Width Placeholder Pipeline Banner */}
      <section className="pipeline-card-full-width">
        <motion.div 
          className="pipeline-card glass"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="pipeline-content">
            <div className="pipeline-icon-box">
              <Sparkles size={24} />
            </div>
            <h3 className="pipeline-title">More brands coming</h3>
            <p className="pipeline-text">
              We are building brands for other customer segments. As each one launches, it will appear here. If you want to partner with us on a new brand, get in touch.
            </p>
            <button 
              type="button"
              aria-label="Open enquiry form to get in touch"
              onClick={() => window.dispatchEvent(new CustomEvent('open-work-modal'))} 
              className="btn btn-secondary pipeline-btn"
            >
              Get in Touch <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      <style>{`
        .brands-page {
          padding-top: 5rem;
          position: relative;
        }

        .bg-alt {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .brands-showcase-section {
          padding-top: 4rem;
        }

        .brands-hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 480px;
          padding: 8rem 0;
          overflow: hidden;
          background-color: #F6F0E4;
        }

        .brands-hero-bg {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 55%;
          z-index: 1;
        }

        .brands-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
        }

        .brands-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, #F6F0E4 0%, rgba(246, 240, 228, 0.4) 30%, transparent 100%);
        }

        .brands-hero .container {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
        }

        .brands-hero-content {
          max-width: 500px;
          text-align: left;
        }
        
        .brands-hero-content .section-subtitle {
          color: #C49A3A;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .brands-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #111A2E !important;
          text-shadow: none;
        }

        .brands-description {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #211C18;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .brands-sub-description {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #625B53;
          font-weight: 500;
        }

        .showcase-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Raw Radicles Card Redesign */
        .raw-radicles-card {
          background: #F6F0E4;
          border: 1px solid #E5D9C6;
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          position: relative;
        }

        .brand-content-grid {
          display: grid;
          grid-template-columns: 46% 54%;
          gap: 0;
          align-items: stretch;
          min-height: 620px;
        }

        .brand-info-side {
          padding: 4.5rem 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8A5B00;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
        }

        .brand-showcase-name {
          font-size: 2.75rem;
          font-weight: 800;
          color: #211C18;
          margin-bottom: 0.5rem;
        }

        .brand-showcase-tagline {
          font-size: 1.2rem;
          font-weight: 600;
          color: #8A5B00;
          margin-bottom: 2rem;
        }

        .brand-body-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .brand-body-paragraphs p {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #625B53;
          margin: 0;
        }

        .rr-contribution-line {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8A5B00;
          margin-bottom: 2.5rem;
          text-transform: uppercase;
        }

        .rr-proof-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .proof-item {
          border-top: 1px solid rgba(138, 91, 0, 0.15);
          padding-top: 0.75rem;
        }

        .proof-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #8A5B00;
          margin-bottom: 0.25rem;
        }

        .proof-desc {
          display: block;
          font-size: 0.9rem;
          line-height: 1.4;
          color: #211C18;
          font-weight: 500;
        }

        .rr-cta-btn {
          background-color: #111A2E;
          color: #F6F0E4;
          border: 1px solid #C49A3A;
          padding: 0.85rem 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border-radius: 4px;
          text-decoration: none;
        }

        .rr-cta-btn:hover, .rr-cta-btn:focus-visible {
          background-color: #C49A3A;
          color: #111A2E;
          outline: 2px solid #C49A3A;
          outline-offset: 2px;
        }

        /* Right Visual Panel */
        .rr-visual-panel {
          position: relative;
          background: linear-gradient(145deg, #172037 0%, #111A2E 52%, #090F1F 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 3rem;
        }

        .rr-background-wordmark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(80px, 12vw, 200px);
          font-weight: 800;
          line-height: 0.8;
          color: #C49A3A;
          opacity: 0.06;
          text-align: center;
          letter-spacing: 0.08em;
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
        }

        .rr-glow-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          padding-bottom: 70%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%);
          pointer-events: none;
          z-index: 2;
        }

        .brand-showcase-logo-wrapper {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 520px;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
        }

        .brand-showcase-logo-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .rr-bottom-descriptor {
          position: absolute;
          bottom: 2.5rem;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: rgba(196, 154, 58, 0.7);
          z-index: 3;
        }

        /* Pipeline Card */
        .pipeline-card-full-width {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .pipeline-card-full-width .pipeline-card {
          border: none;
          border-radius: 0;
          padding: 6rem 2rem;
          width: 100%;
        }

        .pipeline-card {
          position: relative;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 4rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          background: #0d0d0d;
        }

        .pipeline-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${upcomingBrandsImg});
          background-size: cover;
          background-position: center;
          filter: blur(6px) scale(1.05);
          opacity: 0.85;
          z-index: 1;
          pointer-events: none;
        }

        .pipeline-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.70);
          z-index: 2;
          pointer-events: none;
        }

        .pipeline-card:hover {
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .pipeline-content {
          position: relative;
          z-index: 3;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pipeline-icon-box {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--accent-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .pipeline-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .pipeline-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .pipeline-btn {
          padding: 0.75rem 1.75rem;
        }

        /* Responsive Media Queries */
        @media (max-width: 900px) {
          .brands-hero-bg {
            width: 100%;
            height: 100%;
            opacity: 0.15;
          }
          
          .brands-hero-overlay {
            background: linear-gradient(to bottom, rgba(246, 240, 228, 0.9) 0%, rgba(246, 240, 228, 1) 100%);
          }

          .brands-hero {
            padding: 6rem 0;
            min-height: auto;
          }

          .brands-hero-content {
            max-width: 100%;
          }

          .brand-content-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          
          .rr-visual-panel {
            aspect-ratio: 4/3;
            padding: 2rem;
          }

          .brand-info-side {
            padding: clamp(2rem, 5vw, 4rem);
          }
          
          .pipeline-card {
            padding: 3rem;
          }
        }

        @media (max-width: 768px) {
          .brands-title {
            font-size: 2.25rem;
          }
          
          .brand-showcase-name {
            font-size: 2rem;
          }
          
          .pipeline-card {
            padding: 2rem;
          }
        }

        @media (max-width: 600px) {
          .rr-proof-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 576px) {
          .pipeline-card-full-width .pipeline-card {
            padding: 4rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Brands;
