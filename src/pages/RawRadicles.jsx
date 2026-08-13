import './RawRadicles.css';
import { Link } from 'react-router';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
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
          <img src={rawHero1600} alt="" width="1600" height="900" fetchPriority="high" />
        </picture>
        <div className="container raw-radicles-hero-grid">
          <div className="raw-radicles-hero-copy">
            <span className="section-subtitle">A DSPL-owned consumer brand</span>
            <h1 className="domain-title">Raw Radicles</h1>
            <p className="domain-subtitle">
              A project overview of how Dashapatmaja Solutions Pvt Ltd is
              developing a focused chocolate portfolio from formulation brief to
              route to market.
            </p>
          </div>
          <div className="raw-radicles-hero-products">
            <img className="raw-radicles-hero-pack" src={holySinPack} alt="Holy Sin Raw Radicles milk chocolate pack" width="475" height="1100" />
            <img className="raw-radicles-hero-pack raw-radicles-hero-pack--primary" src={wrathReliefPack} alt="Wrath Relief Raw Radicles milk chocolate pack" width="550" height="1100" />
            <img className="raw-radicles-hero-pack" src={smartSinPack} alt="Smart Sin Raw Radicles milk chocolate pack" width="477" height="1100" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-overview-title">
        <div className="container raw-radicles-split">
          <div>
            <span className="section-subtitle">Overview</span>
            <h2 id="raw-overview-title" className="section-title">
              Owned by Dashapatmaja Solutions Pvt Ltd
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              DSPL was incorporated on 28 July 2022 and owns Raw Radicles. The
              brand provides the company with direct operating experience across
              product, packaging, compliance coordination, market presentation,
              and commerce decisions.
            </p>
            <p>
              This overview records confirmed facts only and can be expanded as
              approved evidence becomes available.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="raw-product-title">
        <div className="container raw-radicles-split">
          <div>
            <span className="section-subtitle">Product system</span>
            <h2 id="raw-product-title" className="section-title">
              Six 60 g bars across three collections
            </h2>
          </div>
          <p className="raw-radicles-lead">
            The portfolio brings together real cacao and selected Ayurvedic
            botanicals. The published description does not claim medical effects
            or quantified product outcomes.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="raw-partners-title">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Specialist partnerships</span>
            <h2 id="raw-partners-title" className="section-title">
              Product development and production
            </h2>
          </div>
          <div className="raw-radicles-partners">
            <article>
              <h3>Formulation partnership in Thrissur</h3>
              <p>
                Selected Ayurvedic botanicals and the formulation brief are
                coordinated with specialist expertise in Thrissur.
              </p>
            </article>
            <article>
              <h3>Manufacturing partnership in Kerala</h3>
              <p>
                Chocolate production is carried out through a manufacturing
                partnership in Kerala.
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

      <section className="section" aria-labelledby="raw-boundary-title">
        <div className="container raw-radicles-split">
          <div>
            <span className="section-subtitle">Evidence boundary</span>
            <h2 id="raw-boundary-title" className="section-title">
              What this overview does not claim
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              No quantified commercial results, licence details, non-public
              operating information, or regulatory approvals are published
              without documentary evidence and owner approval.
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
