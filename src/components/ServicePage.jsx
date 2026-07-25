import useSEO from '../hooks/useSEO';
import FAQAccordion from './FAQAccordion';

const ServicePage = ({ 
  seoTitle, 
  seoDesc, 
  pageTypeClass, 
  heroTitle, 
  heroSubtitle, 
  heroDesc, 
  bgImg, 
  bgImgMobile,
  heroImage,
  mattersText, 
  offersTitle, 
  offersDesc, 
  offers, 
  faqsTitle, 
  faqsDesc, 
  faqs 
}) => {
  useSEO(seoTitle, seoDesc);

  return (
    <div className={`${pageTypeClass} fade-in`}>
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Header Block */}
      <section className={`section domain-hero${heroImage ? ' domain-hero--picture' : ''}`}>
        {heroImage && (
          <picture className="domain-hero-picture" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet={heroImage.mobileSrc} />
            <source srcSet={heroImage.desktopSrcSet} sizes={heroImage.sizes} />
            <img
              className="domain-hero-bg-img"
              src={heroImage.src}
              alt=""
              width={heroImage.width}
              height={heroImage.height}
              fetchpriority="high"
              decoding="async"
            />
          </picture>
        )}
        <div className="container">
          <span className="section-subtitle">Core Service</span>
          <h1 className="domain-title">{heroTitle}</h1>
          <h2 className="domain-subtitle">{heroSubtitle}</h2>
          <p className="domain-description">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section why-matters-section glass-top-border">
        <div className="container">
          <div className="matters-box glass">
            <h3 className="matters-title">Why It Matters</h3>
            <p className="matters-text">
              {mattersText}
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section offers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Services</span>
            <h2 className="section-title">{offersTitle}</h2>
            <p className="section-title-description">
              {offersDesc}
            </p>
          </div>

          <div className="offers-grid">
            {offers.map((offer, idx) => (
              <div key={idx} className="offer-card glass">
                <div className="offer-icon-wrapper">
                  {offer.icon}
                </div>
                <h3 className="offer-card-title">{offer.title}</h3>
                <p className="offer-card-text">{offer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Questions & Answers</span>
            <h2 className="section-title">{faqsTitle}</h2>
            <p className="section-title-description">
              {faqsDesc}
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <style>{`
        .${pageTypeClass} {
          padding-top: 5rem;
          position: relative;
        }

        .bg-alt {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .domain-hero {
          text-align: center;
          padding: 8rem 0 6rem;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .domain-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${bgImg});
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .domain-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.70);
          z-index: 2;
        }

        .domain-hero--picture::before {
          display: none;
        }

        /* New picture/img layer — sits below the overlay */
        .domain-hero-picture {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .domain-hero-bg-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        .domain-hero .container {
          position: relative;
          z-index: 3;
          max-width: 800px;
          margin: 0 auto;
        }

        .domain-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.04em;
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .domain-subtitle {
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--accent-light);
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        }

        .domain-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85) !important;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        }

        .glass-top-border {
          border-top: 1px solid var(--border-color);
        }

        .why-matters-section {
          padding-bottom: 2rem;
        }

        .offers-section {
          padding-top: 2rem;
        }

        /* Why it Matters */
        .matters-box {
          padding: 3rem;
          border-radius: 4px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid var(--border-color);
          transition: border-color 0.3s ease;
        }

        .matters-box:hover {
          border-color: var(--accent-border-alpha);
        }

        .matters-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-heading);
          font-weight: 700;
        }

        .matters-text {
          font-size: 1.075rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* What We Offer Grid */
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .offer-card {
          padding: 2.5rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border-color);
          background: #ffffff;
        }

        .offer-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .offer-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 4px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border-alpha);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .offer-card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .offer-card-text {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 4rem;
        }

        .section-subtitle {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-dark);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          color: var(--text-heading);
          font-weight: 800;
        }

        .section-title-description {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .domain-hero::before {
            background-image: url(${bgImgMobile || bgImg});
          }
          .domain-title {
            font-size: 2.25rem;
          }
          .section-title {
            font-size: 1.875rem;
          }
          .offers-grid {
            grid-template-columns: 1fr;
          }
          .matters-box {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicePage;
