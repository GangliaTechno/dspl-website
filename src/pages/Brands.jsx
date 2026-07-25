import { ArrowRight, Sparkles, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import brandHeroImg from '../assets/brand_hero.jpg';
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
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-subtitle">House of Brands</span>
          <h1 className="brands-title">Our brands</h1>
          <p className="brands-description">
            We build consumer brands and grow them with our own team. We own them end to end, from product to packaging to sales. Raw Radicles is the first. More are in development.
          </p>
        </motion.div>
      </section>

      {/* Brands Showcase Grid */}
      <section className="section brands-showcase-section bg-alt" id="raw-radicles">
        <div className="container">
          <div className="showcase-container">
            {/* 1. Raw Radicles Card */}
            {/* 1. Raw Radicles Card */}
            <motion.div 
              className="brand-detail-card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="brand-accent-glow"></div>
              <div className="brand-content-grid">
                <div className="brand-info-side">
                  <motion.div 
                    className="brand-type-badge"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Cookie size={16} className="badge-icon" />
                    FLAGSHIP CONSUMER BRAND
                  </motion.div>
                  <motion.h2 
                    className="brand-showcase-name"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Raw Radicles
                  </motion.h2>
                  <motion.p 
                    className="brand-showcase-tagline"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Premium chocolate with Ayurveda inside.
                  </motion.p>
                  
                  <motion.div 
                    className="brand-body-paragraphs"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    <p>
                      Raw Radicles is chocolate first. Real cocoa, made in small batches, with herbs chosen to do real work. It is built for buyers who want a treat that also gives something back. The range covers three lines and six bars, each a 60 gram bar.
                    </p>
                    <p>
                      We built Raw Radicles end to end: the recipe, the packaging, the compliance, the story, and the route to market. Our manufacturing partners are Cacobean Chocolate Factory in Kerala and Ashtanga Vaidyam Ayurvedics in Thrissur.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="brand-meta-tags"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="brand-meta-tag">60g Standard Bars</span>
                    <span className="brand-meta-tag">Pure Ayurvedic Herbs</span>
                    <span className="brand-meta-tag">Kerala Cacobean Partner</span>
                    <span className="brand-meta-tag">Ashtanga Vaidyam MoU</span>
                  </motion.div>

                  <motion.div 
                    className="brand-cta-block"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <a href="mailto:director@dashapatmaja.in?subject=Raw%20Radicles%20Inquiry" className="btn btn-primary brand-btn">
                      Visit Raw Radicles <ArrowRight size={16} />
                    </a>
                  </motion.div>
                </div>

                <div className="brand-visual-side">
                  <motion.div 
                    className="brand-showcase-logo-wrapper"
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  >
                    <img src={rawRadiclesLogo} alt="Raw Radicles Logo" className="brand-showcase-logo-img" loading="lazy" decoding="async" />
                  </motion.div>
                  <div className="brand-visual-backdrop"></div>
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

        .brands-hero {
          text-align: center;
          padding: 8rem 0 6rem;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .brands-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${brandHeroImg});
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .brands-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(245, 158, 11, 0.65); /* Warm amber overlay at 65% opacity */
          z-index: 2;
        }

        .brands-hero .container {
          position: relative;
          z-index: 3;
          max-width: 800px;
          margin: 0 auto;
        }

        .brands-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
          color: #000000 !important; /* Keep heading text in black */
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.35); /* Subtle text shadow for crisp legibility */
          text-transform: capitalize;
        }

        .brands-description {
          font-size: 1.2rem;
          line-height: 1.75;
          color: #1a1a1a; /* Dark charcoal/black for strong legibility */
          font-weight: 600;
        }

        .showcase-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Raw Radicles Card */
        .brand-detail-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 4.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-detail-card:hover {
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .brand-accent-glow {
          position: absolute;
          top: -200px;
          right: -200px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(141, 147, 101, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        .brand-content-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .brand-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          background: var(--accent-glow);
          border: 1px solid var(--border-color);
          color: var(--accent);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }

        .brand-showcase-name {
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 0.25rem;
        }

        .brand-showcase-tagline {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--accent-dark);
          margin-bottom: 2rem;
        }

        .brand-body-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .brand-body-paragraphs p {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .brand-meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .brand-meta-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .brand-btn {
          padding: 0.85rem 2rem;
        }



        .brand-visual-side {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          min-height: 400px;
        }

        .brand-visual-backdrop {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(350px, 80vw);
          height: min(350px, 80vw);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(141, 147, 101, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 1;
        }

        .brand-showcase-logo-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15));
        }

        .brand-showcase-logo-img {
          width: 85%;
          max-width: 400px;
          object-fit: contain;
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
          background: rgba(0, 0, 0, 0.70); /* Dark overlay at 70% opacity */
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
          color: #ffffff; /* Changed black text to white */
          margin-bottom: 0.75rem;
        }

        .pipeline-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8); /* Changed dark text to light grey */
          margin-bottom: 2rem;
        }

        .pipeline-btn {
          padding: 0.75rem 1.75rem;
        }

        @media (max-width: 900px) {
          .brand-content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .brand-visual-side {
            order: -1;
          }
          .brand-detail-card {
            padding: 3rem;
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
          .brand-detail-card {
            padding: 2rem;
          }
          .pipeline-card {
            padding: 2rem;
          }
        }

        @media (max-width: 576px) {
          .pipeline-card-full-width .pipeline-card {
            padding: 4rem 1.5rem;
          }
          .brand-visual-side {
            min-height: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default Brands;
