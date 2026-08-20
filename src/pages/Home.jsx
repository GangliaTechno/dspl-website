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
    text: 'Positioning, identity, voice, and reusable brand assets designed for consistent use across customer-facing channels.',
    link: '/branding',
  },
  {
    title: 'Marketing',
    text: 'Search, paid media, content, measurement, and reporting planned around defined audiences and commercial priorities.',
    link: '/marketing',
  },
  {
    title: 'E-commerce',
    text: 'Storefront, marketplace, payment, and delivery systems scoped around the selected platform and operating workflow.',
    link: '/ecommerce',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Audit',
    description: 'Understand the current position, priorities and constraints.',
    timing: 'Initial scope review',
    output: 'Priority audit and brief',
  },
  {
    number: '02',
    title: 'Build',
    description: 'Create and coordinate the agreed system.',
    timing: 'Approved roadmap',
    output: 'Launch-ready system',
  },
  {
    number: '03',
    title: 'Grow',
    description: 'Launch, measure and improve around evidence.',
    timing: 'Engagement cadence',
    output: 'Review and next priorities',
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
              DSPL builds its own consumer brands and helps businesses grow
              through coordinated branding, marketing, e-commerce and
              compliance support.
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
            <div>
              <h2 className="section-title" id="services-title">
                Brand, market, and commerce — coordinated as one system.
              </h2>
            </div>
            <p className="section-title-description">
              Start with the capability you need now, then connect strategy,
              market activity, and commerce as the business grows.
            </p>
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
              <h3 id="compliance-support-title">Compliance coordination</h3>
            </div>
            <p className="compliance-support-text">
              Packaging, labelling, listing, and commerce requirements coordinated
              into the work, with regulated advice retained by qualified advisers.
            </p>
            <div className="compliance-support-links">
              <Link to="/branding#compliance">Branding compliance <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link to="/ecommerce#compliance">E-commerce compliance <ArrowRight size={15} aria-hidden="true" /></Link>
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
