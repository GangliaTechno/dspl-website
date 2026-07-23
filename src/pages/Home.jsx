import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Package, Users, TrendingUp } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import rawRadiclesLogo from '../assets/RR_logo embossed_tm.png';
import dsplBanner from '../assets/dspl_banner.png';
import helpGrow from '../assets/Help_grow.png';
import gangliaLogo1 from '../assets/ganglia_logo1.png';
import gangliaLogo2 from '../assets/ganglia_logo2.png';
import dstNidhi from '../assets/DST-NIDHI.png';
import nidhi1 from '../assets/nidhi_1.png';

const Home = () => {
  useSEO(
    'Dashapatmaja Solutions | Branding, Marketing & E-commerce',
    'Dashapatmaja Solutions helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.'
  );

  const supporterLogos = [
    { src: gangliaLogo1, alt: "Manipal Universal Technology Business Incubator", className: "supporter-logo-1" },
    { src: gangliaLogo2, alt: "Startup Karnataka", className: "supporter-logo-2" },
    { src: dstNidhi, alt: "DST NIDHI", className: "supporter-logo-dst" },
    { src: nidhi1, alt: "NIDHI PRAYAS", className: "supporter-logo-nidhi1" }
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
            Dashapatmaja Solutions helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.
          </p>

          <div className="hero-ctas">
            <button 
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
        <div className="supporter-band">
          <div className="supporter-track">
            {[...supporterLogos, ...supporterLogos, ...supporterLogos].map((logo, index) => {
              const isDuplicate = index >= supporterLogos.length;

              return (
                <img
                  key={`${logo.alt}-${index}`}
                  src={logo.src}
                  alt={isDuplicate ? '' : logo.alt}
                  aria-hidden={isDuplicate ? 'true' : undefined}
                  className={`supporter-logo ${logo.className}`}
                  loading="lazy"
                />
              );
            })}
          </div>
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
              <div key={idx} className="why-card glass">
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
              <div key={idx} className="service-card glass">
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
              <div key={idx} className="process-step-card glass">
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
            <div className="brand-showcase-card glass featured-brand">
              <div className="brand-badge-strip">
                <span className="featured-tag">FLAGSHIP BRAND</span>
              </div>
              <div className="brand-card-logo-wrapper">
                <img src={rawRadiclesLogo} alt="Raw Radicles premium chocolate bar packaging" className="brand-card-logo-img" />
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
            <div className="brand-showcase-card glass placeholder-brand">
              <div className="brand-badge-strip">
                <span className="coming-tag">EXPANSION PATH</span>
              </div>
              <h3 className="brand-name">More brands coming soon</h3>
              <p className="brand-tagline">Expanding our house-of-brands portfolio.</p>
              <p className="brand-desc">
                We are building brands for other customer segments. As each one launches, it will appear here. If you want to partner with us on a new brand, get in touch.
              </p>
              <button 
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

      <style>{`
        .home-page {
          padding-top: 4.5rem;
          position: relative;
        }

        .bg-canvas {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        /* 1. Hero Block */
        .hero-section {
          padding: 9.5rem 0 15.5rem; /* Increased padding to make the hero section taller and grander */
          text-align: center;
          position: relative;
          background-image: url(${dsplBanner});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65); /* 65% opacity dark overlay */
          z-index: 1;
        }

        /* Supporter Band Marquee */
        .supporter-band {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0 0 0; /* Removed bottom padding entirely to reduce gap under the track */
          position: absolute;
          bottom: -50px; /* Shift down slightly to compensate for empty transparent space at the bottom of logo images */
          left: 0;
          z-index: 2;
          border-top: none;
          background: transparent; /* Completely transparent background */
        }

        
        .supporter-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: scrollRightToLeft 25s linear infinite;
        }

        .supporter-logo {
          width: auto;
          margin: 0 3.5rem;
          object-fit: contain;
          filter: brightness(0) invert(1); /* Solid white logos */
          opacity: 0.45;
          transition: all 0.3s ease;
        }

        /* Custom logo heights exactly as requested by user */
        .supporter-logo.supporter-logo-1 { height: 48px; }
        .supporter-logo.supporter-logo-2 { height: 210px; }
        .supporter-logo.supporter-logo-dst { height: 60px; }
        .supporter-logo.supporter-logo-nidhi1 {
          height: 72px;
          transform: translateY(-6px);
        }

        .supporter-logo:hover {
          opacity: 0.95;
          /* Zoom effect not required on hover */
        }

        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .hero-section {
            padding: 7rem 0 10rem; /* Taller mobile padding */
          }
          .supporter-band {
            bottom: -25px; /* Shift down on mobile to offset transparent space */
          }
          .supporter-logo {
            margin: 0 1.5rem;
          }
          .supporter-logo.supporter-logo-1 { height: 36px; }
          .supporter-logo.supporter-logo-2 { height: 158px; }
          .supporter-logo.supporter-logo-dst { height: 45px; }
          .supporter-logo.supporter-logo-nidhi1 {
            height: 54px;
            transform: translateY(-4px);
          }
        }

        .hero-section .glow-bg {
          display: none;
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 850px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 2.5rem; /* Pushes the hero content slightly down */
        }

        .hero-badge-wrapper {
          margin-bottom: 2rem;
          animation: fadeIn 0.8s ease-out;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(245, 168, 0, 0.1);
          border: 1px solid rgba(245, 168, 0, 0.3);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 4px;
        }

        .badge-icon {
          color: var(--accent);
        }

        .hero-title {
          font-size: 4.25rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        }

        .accent-text {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
        }

        .hero-subhead {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 3rem;
          max-width: 720px;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .hero-ctas {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .hero-btn-primary {
          background: var(--accent);
          color: #111111;
        }

        .hero-btn-primary:hover {
          background: var(--accent-light);
          color: #111111;
        }

        .hero-btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.45);
          color: #ffffff;
        }


        /* Section Header */
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4.5rem;
        }

        .section-subtitle {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-light);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.03em;
          color: var(--text-heading);
          font-weight: 800;
        }

        .section-title-description {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* 3. Why Grid */
        .why-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .why-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 3rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .why-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border-alpha);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .why-card-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-heading);
        }

        .why-card-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* 4. Services Section */
        .services-section {
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${helpGrow});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.3;
          z-index: 1;
          pointer-events: none;
        }

        .services-section .container {
          position: relative;
          z-index: 2;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .service-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 3rem 2.5rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .service-card-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-heading);
        }

        .service-card-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .service-card-link {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: auto;
          transition: gap 0.2s ease;
        }

        .service-card-link:hover {
          gap: 0.75rem;
          color: var(--accent-light);
        }

        /* 5. Brands Section */
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
        }

        .brand-showcase-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 3.5rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-showcase-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .brand-badge-strip {
          margin-bottom: 1.5rem;
        }

        .featured-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          background: rgba(245, 168, 0, 0.08);
          color: var(--accent);
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .coming-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          background: rgba(141, 147, 101, 0.1);
          color: var(--accent-light);
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .brand-name {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 0.5rem;
        }

        .brand-card-logo-wrapper {
          margin-bottom: 1.25rem;
          height: 110px;
          display: flex;
          align-items: center;
          overflow: hidden;
          width: 100%;
        }

        .brand-card-logo-img {
          height: 182%;
          max-width: none;
          object-fit: contain;
        }

        .brand-tagline {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--accent-light);
          margin-bottom: 1.5rem;
        }

        .brand-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }

        .brand-link:hover {
          gap: 0.75rem;
          color: var(--accent-light);
        }

        /* Working Process Section Styles */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .process-step-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 2.5rem 2rem;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-step-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .step-number {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--accent);
          opacity: 0.85;
          margin-bottom: 0.75rem;
          line-height: 1;
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 0.75rem;
        }

        .step-text {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Responsive Layouts */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          .why-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
          }
          .services-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
          .brands-grid {
            grid-template-columns: 1fr;
            max-width: 600px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.75rem;
          }
          .hero-subhead {
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .why-card, .service-card, .brand-showcase-card {
            padding: 2rem;
          }
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
