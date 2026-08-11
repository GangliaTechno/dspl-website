import './ServicePage.css';
import useSEO from '../hooks/useSEO';
import FAQAccordion from './FAQAccordion';
import RotatingHeroMedia from './RotatingHeroMedia';

const ServicePage = ({
  seoMetadata,
  pageTypeClass,
  contextLabel,
  heroTitle,
  heroTagline,
  heroImages,
  scopeTitle,
  scopeText,
  offersTitle,
  offersDescription,
  offers,
  faqsTitle,
  faqsDescription,
  faqs,
}) => {
  useSEO(seoMetadata);

  return (
    <div className={`${pageTypeClass} service-page fade-in`}>
      <section className={`section domain-hero${heroImages?.length ? ' domain-hero--picture' : ''}`}>
        {heroImages?.length > 0 && (
          <RotatingHeroMedia
            images={heroImages}
            className="domain-hero-picture"
            imageClassName="domain-hero-bg-img"
            mobileBreakpoint={767}
          />
        )}
        <div className="container">
          <span className="section-subtitle">{contextLabel}</span>
          <h1 className="domain-title">{heroTitle}</h1>
          <p className="domain-subtitle">{heroTagline}</p>
        </div>
      </section>

      <section className="section service-scope-section" aria-labelledby={`${pageTypeClass}-scope-title`}>
        <div className="container service-scope-layout">
          <h2 id={`${pageTypeClass}-scope-title`} className="service-scope-title">{scopeTitle}</h2>
          <p className="service-scope-text">{scopeText}</p>
        </div>
      </section>

      <section className="section offers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{offersTitle}</h2>
            <p className="section-title-description">
              {offersDescription}
            </p>
          </div>

          <div className="offers-grid">
            {offers.map((offer) => (
              <article key={offer.title} className="offer-entry">
                <h3 className="offer-card-title">{offer.title}</h3>
                <p className="offer-card-text">{offer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Questions & Answers</span>
            <h2 className="section-title">{faqsTitle}</h2>
            <p className="section-title-description">
              {faqsDescription}
            </p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
