import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import OwnedBrandProof from '../components/home/OwnedBrandProof';
import ProcessSteps from '../components/home/ProcessSteps';
import SupporterStrip from '../components/home/SupporterStrip';
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
  { src: dstNidhiLogo, alt: 'DST NIDHI', className: 'supporter-logo-dst' },
  { src: nidhiPrayasLogo, alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi' },
  {
    src: mutbiLogo,
    alt: 'Manipal Universal Technology Business Incubator',
    className: 'supporter-logo-mutbi',
  },
  {
    src: startupKarnatakaLogo,
    alt: 'Startup Karnataka',
    className: 'supporter-logo-startup',
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
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description:
      'We examine your positioning, audience, commercial context, and current constraints.',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap',
    description:
      'We agree the priorities, responsibilities, sequence, and measurable milestones.',
  },
  {
    number: '03',
    title: 'Branding & Design',
    description:
      'We create the identity, packaging, content system, and customer-facing experience.',
  },
  {
    number: '04',
    title: 'Campaign Launch',
    description:
      'We coordinate channels, creative, media, and the practical work needed to go live.',
  },
  {
    number: '05',
    title: 'E-commerce Scale',
    description:
      'We improve storefront, marketplace, checkout, and operational conversion points.',
  },
  {
    number: '06',
    title: 'Measurement & Growth',
    description:
      'We review evidence, learn what is working, and focus the next cycle of investment.',
  },
];

const Home = () => {
  useSEO(getRouteMetadata('/'));

  return (
    <div className="home-page fade-in">
      <section className="home-hero">
        <picture className="home-hero-media" aria-hidden="true">
          <source media="(max-width: 768px)" srcSet={homeRotation03Mobile} />
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
              <span>We develop brands.</span>{' '}
              <span className="hero-title-accent">
                We deliver disciplined market execution.
              </span>
            </h1>
            <p className="hero-subhead">
              Dashapatmaja Solutions Pvt Ltd develops and operates consumer
              brands while helping businesses coordinate branding, marketing,
              and e-commerce through clearly defined, accountable execution.
            </p>
            <a
              href="#capabilities"
              className="btn btn-secondary hero-capabilities-link"
            >
              Explore our capabilities
            </a>
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
              execution, and commerce aligned as the business grows.
            </p>
          </div>

          <div className="service-evidence-grid">
            {services.map((service) => (
              <article className="service-evidence-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={service.link}>
                  Explore {service.title}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps steps={processSteps} />

      <OwnedBrandProof logoSrc={rawRadiclesLogo} />
    </div>
  );
};

export default Home;
