import './ServicePage.css';
import useSEO from '../hooks/useSEO';
import FAQAccordion from './FAQAccordion';

const ServicePage = ({ 
  seoMetadata,
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
  useSEO(seoMetadata);

  return (
    <div
      className={`${pageTypeClass} service-page fade-in`}
      style={{
        '--service-hero-image': `url("${bgImg}")`,
        '--service-hero-mobile-image': `url("${bgImgMobile || bgImg}")`,
      }}
    >
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

    </div>
  );
};

export default ServicePage;
