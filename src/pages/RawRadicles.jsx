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
    title: 'Formulation brief',
    text: 'Defined botanical targets, dosing levels and taste profiles for Holy Sin, Wrath Relief and Smart Sin, matching traditional Ayurvedic principles to consumer confectionery.',
  },
  {
    title: 'Packaging and identity',
    text: 'Designed six 60 g wrapper artworks, inner foil branding and outer display cartons, ensuring visual distinction across milk and dark variants while maintaining brand cohesion.',
  },
  {
    title: 'FSSAI and Legal Metrology labelling',
    text: 'Prepared complete label panels, nutritional tables, statutory declarations and allergen warnings to comply with FSSAI (Labelling and Display) Regulations and Legal Metrology (Packaged Commodities) Rules.',
  },
  {
    title: 'Commercial photography',
    text: 'Planned, directed and shot studio product photography, lifestyle imagery and packaging renders for e-commerce listings, marketing collateral and retail presentations.',
  },
  {
    title: 'Pricing and margins',
    text: 'Modelled cost of goods, distributor margins, marketplace commissions, logistics overheads and retail price points to build sustainable unit economics across all six SKUs.',
  },
  {
    title: 'Route to market',
    text: 'Designed channel strategy across direct-to-consumer storefront, Amazon India, quick-commerce platforms and selective retail distribution in South India.',
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
            <span className="section-subtitle">A {COMPANY_FACTS.shortName}-owned consumer brand</span>
            <h1 className="domain-title">Raw Radicles</h1>
            <p className="domain-subtitle">
              How we took an Ayurvedic chocolate range from a one-line idea to six compliant, production-ready SKUs.
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
              We own it, so we carry every decision
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              Raw Radicles is not a client case study. It is our brand. We funded the development, briefed the formulation, designed the packs, cleared the regulatory approvals, commissioned the photography, set the pricing and built the sales channels.
            </p>
            <p>
              When a packaging run has a defect, we pay for the reprint. When an FSSAI declaration is ambiguous, our launch is delayed. That direct exposure is what makes our advice practical: we only recommend what we have tested with our own money.
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
                Dedicated bean-to-bar chocolate manufacturing partner chosen for ability to handle botanical inclusions and maintain strict temperature controls.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="raw-work-title">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What the work involved</span>
            <h2 id="raw-work-title" className="section-title">
              Six workstreams, one product
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
            <span className="section-subtitle">What it gives us</span>
            <h2 id="raw-next-title" className="section-title">
              We learned this by doing it, not by reading about it
            </h2>
          </div>
          <div className="raw-radicles-copy">
            <p>
              Every recommendation we give clients on packaging, compliance, photography, pricing or marketplace setup comes from having solved the same problem on Raw Radicles.
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
