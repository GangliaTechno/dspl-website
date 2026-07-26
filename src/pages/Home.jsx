import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OwnedBrandProof from '../components/home/OwnedBrandProof';
import ProcessSteps from '../components/home/ProcessSteps';
import SupporterStrip from '../components/home/SupporterStrip';
import '../components/home/homeSections.css';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import homeHeroDesktop from '../assets/dspl_banner.webp';
import homeHeroMobile from '../assets/dspl_banner-mobile.webp';
import mutbiLogo from '../assets/mutbi-normalized.png';
import startupKarnatakaLogo from '../assets/startup-karnataka-normalized.png';
import dstNidhiLogo from '../assets/dst-nidhi-normalized.png';
import nidhiPrayasLogo from '../assets/nidhi-prayas-normalized.png';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { openWorkModal } from '../utils/workModal';
import './Home.css';

const supporters = [
  { src: dstNidhiLogo, alt: 'DST NIDHI', className: 'supporter-logo-dst' },
  { src: nidhiPrayasLogo, alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi1' },
  {
    src: mutbiLogo,
    alt: 'Manipal Universal Technology Business Incubator',
    className: 'supporter-logo-1',
  },
  { src: startupKarnatakaLogo, alt: 'Startup Karnataka', className: 'supporter-logo-2' },
];

const services = [
  {
    title: 'Branding',
    text: 'We shape your name, identity, voice, and story so customers remember you and trust you. You stand apart on a crowded shelf.',
    link: '/branding',
    marker: '01',
  },
  {
    title: 'Marketing',
    text: 'We bring you customers through search, paid media, and content. You see the cost to acquire each customer and the return on every rupee.',
    link: '/marketing',
    marker: '02',
  },
  {
    title: 'E-commerce',
    text: 'We build and run online stores that load fast and convert. You sell across your own site, Amazon, and quick commerce, all from one place.',
    link: '/ecommerce',
    marker: '03',
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
          <source media="(max-width: 768px)" srcSet={homeHeroMobile} />
          <img
            src={homeHeroDesktop}
            alt=""
            width="1545"
            height="1018"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="container home-hero-layout">
          <div className="home-hero-content">
            <span className="home-hero-kicker">
              Brand systems for Indian consumer businesses
            </span>
            <h1 className="hero-title">
              We build brands.
              <br />
              <span className="accent-text">
                We help businesses grow.
              </span>
            </h1>
            <p className="hero-subhead">
              For Indian consumer businesses, Dasha Patmaja Services brings
              brand strategy, go-to-market execution, and e-commerce under one
              accountable team.
            </p>
            <div className="hero-ctas">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => openWorkModal('homepage-hero')}
                className="btn btn-primary"
              >
                Discuss your next stage
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <Link to="/brands" className="btn btn-secondary hero-secondary">
                See our owned brand
              </Link>
            </div>
          </div>

          <aside className="home-hero-proof" aria-label="How DSPL works">
            <p className="home-hero-proof-label">One accountable team</p>
            <ul>
              <li>Brand strategy and identity</li>
              <li>Go-to-market execution</li>
              <li>E-commerce systems</li>
            </ul>
          </aside>
        </div>
        
        <SupporterStrip supporters={supporters} />
      </section>

      <section
        className="section coordinated-services"
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
                <span className="service-marker" aria-hidden="true">
                  {service.marker}
                </span>
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

      <OwnedBrandProof
        logoSrc={rawRadiclesLogo}
        onEnquire={() => openWorkModal('homepage-owned-brand')}
      />

      <section className="section home-enquiry" aria-labelledby="enquiry-title">
        <div className="container home-enquiry-inner">
          <div>
            <span className="section-subtitle">Start with context</span>
            <h2 className="section-title" id="enquiry-title">
              Tell us where the business needs to move next.
            </h2>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openWorkModal('homepage-final-callout')}
            aria-haspopup="dialog"
          >
            Share your project
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
