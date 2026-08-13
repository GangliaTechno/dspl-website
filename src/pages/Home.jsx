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
import mutbiLogo from '../assets/supporter-mutbi-marquee.png';
import startupKarnatakaLogo from '../assets/supporter-startup-karnataka-marquee.png';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import './Home.css';

const supporters = [
  { src: dstNidhiLogo, alt: 'DST NIDHI', className: 'supporter-logo-dst', width: 186, height: 96 },
  { src: nidhiPrayasLogo, alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi', width: 113, height: 96 },
  {
    src: mutbiLogo,
    alt: 'Manipal Universal Technology Business Incubator',
    className: 'supporter-logo-mutbi',
    width: 300,
    height: 96,
  },
  {
    src: startupKarnatakaLogo,
    alt: 'Startup Karnataka',
    className: 'supporter-logo-startup',
    width: 260,
    height: 96,
  },
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
  {
    title: 'Compliance support',
    text: 'Practical coordination for packaging, labelling, listings, and commerce declarations, with regulated advice retained by qualified advisers.',
    links: [
      { label: 'Branding compliance', to: '/branding#compliance' },
      { label: 'E-commerce compliance', to: '/ecommerce#compliance' },
    ],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description:
      'We examine your positioning, audience, commercial context, and current constraints.',
    timing: 'Confirmed after the initial scope review',
    output: 'Discovery record and priority audit',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap',
    description:
      'We agree the priorities, responsibilities, sequence, and measurable milestones.',
    timing: 'Confirmed after discovery',
    output: 'Agreed roadmap and responsibility map',
  },
  {
    number: '03',
    title: 'Branding & Design',
    description:
      'We create the identity, packaging, content system, and customer-facing experience.',
    timing: 'Set by the approved roadmap',
    output: 'Approved brand and design system',
  },
  {
    number: '04',
    title: 'Campaign Launch',
    description:
      'We coordinate channels, creative, media, and the practical work needed to go live.',
    timing: 'Set by launch scope and dependencies',
    output: 'Launch-ready channel and asset plan',
  },
  {
    number: '05',
    title: 'E-commerce Scale',
    description:
      'We improve storefront, marketplace, checkout, and operational conversion points.',
    timing: 'Set by platform and integration scope',
    output: 'Configured commerce journey and operating checklist',
  },
  {
    number: '06',
    title: 'Measurement & Growth',
    description:
      'We review evidence, learn what is working, and focus the next cycle of investment.',
    timing: 'Agreed as part of the engagement',
    output: 'Measurement review and next-cycle priorities',
  },
];

const Home = () => {
  useSEO(getRouteMetadata('/'));

  return (
    <div className="home-page fade-in">
      <section className="home-hero">
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
        <div className="container home-hero-layout">
          <div className="home-hero-content">
            <h1 className="hero-title">
              <span>We build consumer brands.</span>{' '}
              <span className="hero-title-accent">
                We help businesses build theirs.
              </span>
            </h1>
            <p className="hero-subhead">
              Dashapatmaja Solutions Pvt Ltd develops its own consumer brands
              and supports businesses with coordinated branding, marketing,
              e-commerce, and compliance-support work.
            </p>
            <div className="home-hero-actions">
              <Link to="/start" className="btn btn-primary">Start a project</Link>
              <Link to="/brands/raw-radicles" className="btn btn-secondary hero-capabilities-link">
                See how we built Raw Radicles
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
              <span className="section-subtitle">Coordinated services</span>
              <h2 className="section-title" id="services-title">
                One growth system, not three disconnected vendors
              </h2>
            </div>
            <p className="section-title-description">
              Start with the capability you need now. Keep strategy, market
              activity, and commerce aligned as the business grows.
            </p>
          </div>

          <div className="service-evidence-grid">
            {services.map((service) => (
              <article className="service-evidence-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {service.links ? (
                  <div className="service-evidence-links">
                    {service.links.map((link) => (
                      <Link key={link.to} to={link.to}>
                        {link.label}<ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link to={service.link}>
                    Explore {service.title}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section owned-experience-proof bg-alt" aria-labelledby="owned-experience-title">
        <div className="container owned-experience-layout">
          <div>
            <span className="section-subtitle">Operator-led perspective</span>
            <h2 id="owned-experience-title" className="section-title">Owned experience informs the work</h2>
          </div>
          <p className="section-title-description">
            Building Raw Radicles means working through product, packaging,
            compliance coordination, photography, pricing, marketing, and
            commerce decisions inside one operating system. That experience
            shapes how we scope and coordinate client work.
          </p>
        </div>
      </section>

      <ProcessSteps steps={processSteps} />
      <TestimonialsSection testimonials={approvedTestimonials} />
      <OwnedBrandProof logoSrc={rawRadiclesLogo} />
    </div>
  );
};

export default Home;
