import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import OwnedBrandProof from '../components/home/OwnedBrandProof';
import ProcessSteps from '../components/home/ProcessSteps';
import SupporterStrip from '../components/home/SupporterStrip';
import TestimonialsSection from '../components/TestimonialsSection';
import { approvedTestimonials } from '../content/publication';
import '../components/home/homeSections.css';
import rawRadiclesLogo from '../assets/raw-radicles-logo-cropped.webp';
import homeRotation03960 from '../assets/home-rotation-03-960.webp';
import homeRotation031440 from '../assets/home-rotation-03-1440.webp';
import homeRotation03Mobile from '../assets/home-rotation-03-mobile.webp';
import dstNidhiLogo from '../assets/supporter-dst-nidhi-marquee.png';
import nidhiPrayasLogo from '../assets/supporter-nidhi-prayas-marquee.png';
import startupKarnatakaLogo from '../assets/supporter-startup-karnataka-marquee.png';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import './Home.css';

const supporters = [
  { src: dstNidhiLogo, alt: 'DST NIDHI', className: 'supporter-logo-dst', width: 186, height: 96 },
  { src: nidhiPrayasLogo, alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi', width: 113, height: 96 },
  { src: startupKarnatakaLogo, alt: 'Startup Karnataka', className: 'supporter-logo-startup', width: 260, height: 96 },
];

const services = [
  {
    title: 'Branding',
    text: 'Positioning, identity, packaging and voice, delivered as a system your team can actually apply. You receive logo files, colour and type rules, packaging artwork templates and a written messaging guide.',
    link: '/branding',
  },
  {
    title: 'Marketing',
    text: 'SEO, paid campaigns on Google and Meta, content and reporting, planned against a defined audience and a monthly number you agree before we start.',
    link: '/marketing',
  },
  {
    title: 'E-commerce',
    text: 'Shopify, WooCommerce and custom storefronts, plus Amazon and Flipkart listings, payments and delivery setup, built to run without daily hand-holding.',
    link: '/ecommerce',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Audit',
    description:
      'We review where the business, brand and channels stand today, and what is actually blocking growth.',
    timing: '2 to 3 weeks',
    output: 'Written audit and a prioritised project brief',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'We create the agreed system: identity, campaigns, storefront, packaging, or the combination you need.',
    timing: '6 to 12 weeks, depending on scope',
    output: 'Launch-ready assets and documented handover',
  },
  {
    number: '03',
    title: 'Grow',
    description:
      'We launch, measure against the numbers set in stage one, and improve on a fixed monthly cycle.',
    timing: 'Ongoing, monthly review',
    output: 'Monthly performance report and next-cycle priorities',
  },
];

const Home = () => {
  useSEO(getRouteMetadata('/'));

  return (
    <div className="home-page fade-in">
      <section className="home-hero" aria-label="Introduction">
        <picture className="home-hero-media" aria-hidden="true">
          <source media="(max-width: 600px)" srcSet={homeRotation03Mobile} />
          <source
            srcSet={`${homeRotation03960} 960w, ${homeRotation031440} 1440w`}
            sizes="100vw"
          />
          <img
            className="home-hero-image"
            src={homeRotation031440}
            alt=""
            width="1440"
            height="810"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        <div className="home-hero-overlay" aria-hidden="true" />

        <div className="container home-hero-layout">
          <div className="home-hero-content">
            <h1 className="hero-title">
              <span className="hero-title-main">We build consumer brands.</span>
              <span className="hero-title-secondary">
                We help businesses build theirs.
              </span>
            </h1>
            <p className="hero-subhead">
              Dashapatmaja Solutions is a Manipal-based company that develops
              its own consumer brands and delivers branding, marketing,
              e-commerce and product compliance support to businesses across
              Karnataka and India.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/start">
                Start a project
              </Link>
              <Link
                className="hero-secondary-action"
                to="/brands/raw-radicles"
              >
                <span>See how we built Raw Radicles</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <SupporterStrip supporters={supporters} />
      </section>

      <section
        className="section coordinated-services"
        id="capabilities"
        aria-labelledby="services-title"
      >
        <div className="container">
          <div className="services-intro">
            <span className="section-subtitle services-eyebrow">Capabilities</span>
            <h2 className="services-title" id="services-title">
              <span className="services-title-primary">Brand, market and commerce.</span>
              <span className="services-title-secondary">
                Run as one system.
              </span>
            </h2>
          </div>

          <div className="service-evidence-grid">
            {services.map((service) => (
              <Link
                to={service.link}
                className="service-evidence-card"
                key={service.title}
              >
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-evidence-link">
                  Explore {service.title}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <aside className="compliance-support-strip" aria-labelledby="compliance-support-title">
            <div className="compliance-support-header">
              <span className="section-subtitle">Supporting capability</span>
              <h3 id="compliance-support-title">FSSAI and Legal Metrology support</h3>
            </div>
            <p className="compliance-support-text">
              We have taken six food SKUs through FSSAI labelling and Legal Metrology
              packaging requirements, from lab reports to production-ready artwork. If
              you are launching a food, nutraceutical or personal care product in India,
              we prepare the label content, run the artwork revisions and get your pack
              ready for print and for marketplace listing. Regulated legal opinions
              stay with qualified advisers; the preparation and the paperwork sit with
              us.
            </p>
            <div className="compliance-support-links">
              <Link to="/branding#compliance">Branding and packaging compliance <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link to="/ecommerce#compliance">Marketplace and listing compliance <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </aside>
        </div>
      </section>

      <ProcessSteps steps={processSteps} />
      <TestimonialsSection testimonials={approvedTestimonials} />
      <OwnedBrandProof logoSrc={rawRadiclesLogo} />
    </div>
  );
};

export default Home;
