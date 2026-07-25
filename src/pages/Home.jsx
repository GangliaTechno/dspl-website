import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Package, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import gangliaLogo1 from '../assets/mutbi-normalized.png';
import gangliaLogo2 from '../assets/startup-karnataka-normalized.png';
import dstNidhi from '../assets/dst-nidhi-normalized.png';
import nidhi1 from '../assets/nidhi-prayas-normalized.png';
import './Home.css';

const Home = () => {
  useSEO(
    'Dasha Patmaja Services | Branding, Marketing & E-commerce',
    'Dasha Patmaja Services helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.'
  );

  const supporterLogos = [
    {
      src: dstNidhi,
      alt: "DST NIDHI",
      className: "supporter-logo-dst",
    },
    {
      src: nidhi1,
      alt: "NIDHI PRAYAS",
      className: "supporter-logo-nidhi1",
    },
    {
      src: gangliaLogo1,
      alt: "Manipal Universal Technology Business Incubator",
      className: "supporter-logo-1",
    },
    {
      src: gangliaLogo2,
      alt: "Startup Karnataka",
      className: "supporter-logo-2",
    },
  ];

  const whyUs = [
    {
      icon: <Layers size={24} />,
      title: 'One partner for three needs',
      text: 'Branding, marketing, and e-commerce sit under one roof. Your identity, your message, and your store stay aligned, with no gaps between separate agencies.'
    },
    {
      icon: <Package size={24} />,
      title: 'We run our own brand',
      text: 'We build and sell Raw Radicles, our own chocolate brand. We test our methods on our own product before we use them for you.'
    },
    {
      icon: <Users size={24} />,
      title: 'Built for Indian buyers',
      text: 'We work with D2C, marketplaces, and quick commerce every day. We build for how people in India search, shop, and pay.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Clear, measured work',
      text: 'Every plan comes with targets, timelines, and owners. You see what we do and what it returns, in plain numbers.'
    }
  ];

  const services = [
    {
      title: 'Marketing',
      text: 'We bring you customers through search, paid media, and content. You see the cost to acquire each customer and the return on every rupee.',
      link: '/marketing'
    },
    {
      title: 'Branding',
      text: 'We shape your name, identity, voice, and story so customers remember you and trust you. You stand apart on a crowded shelf.',
      link: '/branding'
    },
    {
      title: 'E-commerce',
      text: 'We build and run online stores that load fast and convert. You sell across your own site, Amazon, and quick commerce, all from one place.',
      link: '/ecommerce'
    }
  ];

  return (
    <div className="home-page fade-in">
      {/* 1. Hero Block */}
      <section className="hero-section">
        <div className="glow-bg">
          <div className="glow-circle glow-circle-1"></div>
          <div className="glow-circle glow-circle-2"></div>
        </div>

        <div className="container hero-container">
          <h1 className="hero-title">
            We build brands.<br />
            <span className="accent-text">We help businesses grow.</span>
          </h1>

          <p className="hero-subhead">
            Dasha Patmaja Services helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.
          </p>

          <div className="hero-ctas">
            <button 
              type="button"
              aria-label="Open contact form to work with us"
              aria-haspopup="dialog"
              onClick={() => window.dispatchEvent(new CustomEvent('open-work-modal'))} 
              className="btn btn-primary hero-btn-primary"
            >
              Work With Us <ArrowRight size={16} />
            </button>
            <Link to="/brands" className="btn btn-secondary hero-btn-secondary">
              See Our Brands
            </Link>
          </div>
        </div>

        {/* Supported Brand Track (Scrolling Marquee) */}
        <div className="supporter-band" aria-label="Supported by">
          <motion.div 
            className="supporter-track"
            animate={{ x: ["0%", "-33.333333%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
          >
            {[...supporterLogos, ...supporterLogos, ...supporterLogos].map(
              (logo, index) => {
                const isDuplicate = index >= supporterLogos.length;

                return (
                  <div
                    key={`${logo.alt}-${index}`}
                    className={`supporter-logo-slot ${logo.className}`}
                    aria-hidden={isDuplicate ? "true" : undefined}
                  >
                    <img
                      src={logo.src}
                      alt={isDuplicate ? "" : logo.alt}
                      className="supporter-logo"
                      loading="eager"
                      decoding="async"
                      draggable="false"
                    />
                  </div>
                );
              }
            )}
          </motion.div>
        </div>
      </section>


      {/* 2. Why Work With Us Section */}
      <section className="section why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Dashapatmaja</span>
            <h2 className="section-title">Why work with us</h2>
            <p className="section-title-description">
              We help businesses grow, and we run our own brand too. That mix keeps our advice practical and current.
            </p>
          </div>

          <div className="why-grid">
            {whyUs.map((card, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-box">
                  {card.icon}
                </div>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. What We Do (Our Services) Section */}
      <section className="section services-section bg-canvas">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title">Three ways we help you grow</h2>
            <p className="section-title-description">
              Use one. Use all three. We shape the work around your stage and your budget.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, idx) => (
              <div key={idx} className="service-card">
                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-text">{svc.text}</p>
                <Link to={svc.link} className="service-card-link">
                  See {svc.title} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5. Working Process Section */}
      <section className="section process-section bg-canvas">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Execution Framework</span>
            <h2 className="section-title">How We Work With You</h2>
            <p className="section-title-description">
              A structured 6-step path to take your brand from initial audit to sustainable growth and market scale.
            </p>
          </div>

          <div className="process-grid">
            {[
              { num: '01', title: 'Discovery & Audit', text: 'We analyze your current brand positioning, audience data, and market bottlenecks.' },
              { num: '02', title: 'Strategy & Roadmap', text: 'Define actionable deliverables, timelines, and measurable growth milestones.' },
              { num: '03', title: 'Branding & Design', text: 'Crafting responsive visual identities, packaging, and high-conversion web UI.' },
              { num: '04', title: 'Campaign Launch', text: 'Executing multi-channel marketing, performance ads, and customer acquisition.' },
              { num: '05', title: 'E-Commerce Scale', text: 'Optimizing store conversions, checkout UX, and fulfillment operations.' },
              { num: '06', title: 'Measurement & Growth', text: 'Tracking key metrics, ROAS, and iteratively improving customer retention.' }
            ].map((step, idx) => (
              <div key={idx} className="process-step-card">
                <span className="step-number">{step.num}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our Brands Section */}
      <section className="section brands-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">House of Brands</span>
            <h2 className="section-title">Brands we are building</h2>
            <p className="section-title-description">
              We are building a group of consumer brands, each made for a different buyer. Raw Radicles is the first. More will follow.
            </p>
          </div>

          <div className="brands-grid">
            {/* Raw Radicles Card */}
            <div className="brand-showcase-card featured-brand">
              <div className="rr-home-panel">
                <div className="rr-home-glow"></div>
                <img src={rawRadiclesLogo} alt="Raw Radicles premium chocolate bar packaging" className="brand-card-logo-img" loading="lazy" decoding="async" />
              </div>
              <div className="brand-badge-strip">
                <span className="featured-tag">FLAGSHIP BRAND</span>
              </div>
              <p className="brand-tagline">Premium chocolate with Ayurveda inside.</p>
              <p className="brand-desc">
                Premium chocolate with Ayurveda inside. Real cocoa, made in small batches, with herbs chosen to do real work. Built for buyers who want a treat that gives something back.
              </p>
              <Link to="/brands#raw-radicles" className="brand-link">
                Visit Raw Radicles <ArrowRight size={14} />
              </Link>
            </div>

            {/* Placeholder Card */}
            <div className="brand-showcase-card placeholder-brand">
              <div className="brand-badge-strip">
                <span className="coming-tag">EXPANSION PATH</span>
              </div>
              <h3 className="brand-name">More brands coming soon</h3>
              <p className="brand-tagline">Expanding our house-of-brands portfolio.</p>
              <p className="brand-desc">
                We are building brands for other customer segments. As each one launches, it will appear here. If you want to partner with us on a new brand, get in touch.
              </p>
              <button 
                type="button"
                aria-label="Open enquiry form to partner with us on a new brand"
                aria-haspopup="dialog"
                onClick={() => window.dispatchEvent(new CustomEvent('open-work-modal'))} 
                className="brand-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Partner with us <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
