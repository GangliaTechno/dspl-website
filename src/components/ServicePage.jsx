import './ServicePage.css';
import useSEO from '../hooks/useSEO';
import FAQAccordion from './FAQAccordion';
import RotatingHeroMedia from './RotatingHeroMedia';
import TestimonialsSection from './TestimonialsSection';

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
  compliance,
  proof,
  engagements,
  testimonials = [],
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

          <div className="offers-grid offers-grid--editorial" data-count={offers.length}>
            {offers.map((offer) => (
              <article key={offer.title} className="offer-entry">
                <h3 className="offer-card-title">{offer.title}</h3>
                <p className="offer-card-text">{offer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {compliance && (
        <section
          id="compliance"
          className="section service-detail-section bg-alt"
          aria-labelledby={`${pageTypeClass}-compliance-title`}
        >
          <div className="container">
            <div className="section-header">
              <h2 id={`${pageTypeClass}-compliance-title`} className="section-title">
                {compliance.title}
              </h2>
              <p className="section-title-description">{compliance.intro}</p>
            </div>
            {compliance.items && compliance.items.length > 0 && (
              <div className="service-detail-grid service-detail-grid--supporting" data-count={compliance.items.length}>
                {compliance.items.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            )}
            {compliance.disclaimer && (
              <p className="service-detail-disclaimer">{compliance.disclaimer}</p>
            )}
          </div>
        </section>
      )}

      {proof && (
        <section className="section service-proof-section" aria-labelledby={`${pageTypeClass}-proof-title`}>
          <div className="container service-proof-layout">
            <div>
              <span className="section-subtitle">{proof.eyebrow}</span>
              <h2 id={`${pageTypeClass}-proof-title`} className="section-title">{proof.title}</h2>
              <p className="section-title-description">{proof.body}</p>
            </div>
            <ul className="service-proof-points">
              {proof.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </section>
      )}

      {engagements && (
        <section className="section service-engagements-section bg-alt" aria-labelledby={`${pageTypeClass}-engagements-title`}>
          <div className="container">
            <div className="section-header">
              <h2 id={`${pageTypeClass}-engagements-title`} className="section-title">{engagements.title}</h2>
              <p className="section-title-description">{engagements.description}</p>
            </div>
            <div className="service-detail-grid" data-count={engagements.items.length}>
              {engagements.items.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection testimonials={testimonials} />

      <section className="section faq-section bg-alt">
        <div className="container">
          <div className="section-header">
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
