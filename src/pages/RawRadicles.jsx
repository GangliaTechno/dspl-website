import './RawRadicles.css';
import { Link } from 'react-router';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { COMPANY_FACTS } from '../content/companyFacts';
import rawHero1600 from '../assets/raw-radicles-hero-1600.webp';
import rawHero960 from '../assets/raw-radicles-hero-960.webp';
import wrathReliefPack from '../assets/raw-radicles-wrath-relief.webp';
import holySinPack from '../assets/raw-radicles-holy-sin.webp';
import smartSinPack from '../assets/raw-radicles-smart-sin.webp';

const workstreams = [
  {
    title: 'Formulation briefing',
    text: 'Defining the product brief and coordinating it with the formulation partner.',
  },
  {
    title: 'Packaging',
    text: 'Developing the pack system and the information required for production-ready artwork.',
  },
  {
    title: 'Compliance coordination',
    text: 'Coordinating labelling and packaging inputs with the relevant qualified partners.',
  },
  {
    title: 'Photography',
    text: 'Planning product imagery for brand, retail, and digital-commerce use.',
  },
  {
    title: 'Pricing',
    text: 'Bringing product, channel, and operating inputs into the commercial decision.',
  },
  {
    title: 'Route to market',
    text: 'Preparing how the product is presented and made available through selected channels.',
  },
];

const RawRadicles = () => {
  useSEO(getRouteMetadata('/brands/raw-radicles'));

  return (
    <div className="raw-radicles-page fade-in">
      <section className="section raw-radicles-hero">
        <picture className="raw-radicles-hero-background" aria-hidden="true">
          <source media="(max-width: 700px)" srcSet={rawHero960} />
          <img src={rawHero1600} alt="" width="1600" height="900" fetchPriority="high" decoding="async" />
        </picture>
        <div className="container raw-radicles-hero-grid">
          <div className="raw-radicles-hero-copy">
            <span className="section-subtitle">A DSPL-owned consumer brand</span>
            <h1 className="domain-title">Raw Radicles</h1>
            <p className="domain-subtitle">
              How Dashapatmaja Solutions Pvt Ltd developed a focused chocolate
              portfolio from formulation brief to route to market.
            </p>
          </div>
          <div className="raw-radicles-hero-products">
            <img className="raw-radicles-hero-pack" src={holySinPack} alt="Holy Sin Raw Radicles milk chocolate pack" width="475" height="1100" decoding="async" />
            <img className="raw-radicles-hero-pack raw-radicles-hero-pack--primary" src={wrathReliefPack} alt="Wrath Relief Raw Radicles milk chocolate pack" width="550" height="1100" decoding="async" />
            <img className="raw-radicles-hero-pack" src={smartSinPack} alt="Smart Sin Raw Radicles milk chocolate pack" width="477" height="1100" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-overview-title">
        <div className="container raw-radicles-split">
          <div>
            <h2 id="raw-overview-title" className="section-title">
              Owned by {COMPANY_FACTS.legalName}
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              {COMPANY_FACTS.shortName} was incorporated on {COMPANY_FACTS.incorporationDate} and owns Raw Radicles. The
              brand provides the company with direct operating experience across
              product, packaging, compliance inputs, market presentation,
              and commerce decisions.
            </p>
            <p>
              That direct operating experience shapes how DSPL scopes branding,
              marketing, e-commerce, and compliance-support work for clients.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="raw-product-title">
        <div className="container raw-radicles-split">
          <div>
            <h2 id="raw-product-title" className="section-title">
              Six 60 g bars across three collections
            </h2>
          </div>
          <div className="raw-radicles-range-copy">
            <p className="raw-radicles-lead">
              Each collection pairs real cacao with one Ayurvedic botanical and
              is developed in milk and dark variants.
            </p>
            <div className="raw-radicles-range-grid">
              <article>
                <h3>Holy Sin</h3>
                <p>Holy Sin, with Chyawanprash. A familiar Ayurvedic preparation reworked into the Raw Radicles chocolate format.</p>
              </article>
              <article>
                <h3>Wrath Relief</h3>
                <p>Wrath Relief, with Ashwagandha. The botanical is paired with real cacao as part of the collection&apos;s chocolate formulation.</p>
              </article>
              <article>
                <h3>Smart Sin</h3>
                <p>Smart Sin, with Brahmi. The formulation balances the selected botanical with the flavour requirements of the finished chocolate.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-partners-title">
        <div className="container">
          <div className="section-header">
            <h2 id="raw-partners-title" className="section-title">
              Product development and production
            </h2>
          </div>
          <div className="raw-radicles-partners">
            <article>
              <h3>Formulation partnership in Thrissur, Keralam</h3>
              <p>
                The botanical selection and formulation brief were developed with
                Ayurvedic specialists in Thrissur, working from traditional
                preparations rather than an extract supplier&apos;s catalogue.
              </p>
            </article>
            <article>
              <h3>Manufacturing partnership in Ernakulam, Keralam</h3>
              <p>
                Chocolate production is carried out through a manufacturing
                partnership in Keralam.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="raw-work-title">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">DSPL workstreams</span>
            <h2 id="raw-work-title" className="section-title">
              Coordinating the work around the product
            </h2>
          </div>
          <div className="raw-radicles-workstreams">
            {workstreams.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-next-title">
        <div className="container raw-radicles-split">
          <div>
            <span className="section-subtitle">Owned operating experience</span>
            <h2 id="raw-next-title" className="section-title">
              Built through direct operating experience
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              Raw Radicles gives DSPL first-hand experience of the decisions and
              handoffs involved in taking a consumer brand from product brief to
              customer-facing channels.
            </p>
            <div className="raw-radicles-actions">
              <Link className="btn btn-secondary" to="/brands">Explore our brands</Link>
              <Link className="btn btn-primary" to="/start">Start a project</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RawRadicles;
