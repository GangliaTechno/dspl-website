import { useState } from 'react';
import { Search, Megaphone, BarChart, FileText, ChevronDown } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import marketingBgImg from '../assets/Marketing_hero_section.jpg';

const Marketing = () => {
  useSEO(
    'Marketing Services | SEO, Paid Ads & Content | Dashapatmaja',
    'Grow with marketing that pays back. SEO, paid campaigns, analytics, and content for businesses in India. Built by a team that markets its own brands.'
  );

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const offers = [
    {
      title: 'Search Engine Optimisation (SEO)',
      text: 'We help the right people find you on Google. We fix your site, target the words your buyers use, and build content that ranks and brings free traffic month after month.',
      icon: <Search size={22} />
    },
    {
      title: 'Paid Campaign Management',
      text: 'We plan and run paid ads on Google, Meta, and quick commerce platforms. We review spend daily and move budget to what works, so you get more leads and sales for less.',
      icon: <Megaphone size={22} />
    },
    {
      title: 'Analytics and Performance Tracking',
      text: 'We set up clean tracking across your site and ads. You get clear reports on traffic, cost per customer, and return, so every decision rests on real numbers.',
      icon: <BarChart size={22} />
    },
    {
      title: 'Content and Copywriting',
      text: 'We write landing pages, blogs, and product copy that read well and sell. Each piece is built to rank on search and move readers to act.',
      icon: <FileText size={22} />
    }
  ];

  const faqs = [
    {
      q: 'How soon will I see results?',
      a: 'SEO builds over three to six months. Paid ads can bring leads in the first week. We usually run both, so you get early wins while the long-term traffic grows.'
    },
    {
      q: 'Do I need a large budget?',
      a: 'No. We start at a level that fits you and raise spend only as the numbers improve.'
    },
    {
      q: 'Will I know what I am paying for?',
      a: 'Yes. You get a monthly report with traffic, leads, cost per customer, and return.'
    }
  ];

  return (
    <div className="marketing-page fade-in">
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Header Block */}
      <section className="section domain-hero">
        <div className="container">
          <span className="section-subtitle">Core Service</span>
          <h1 className="domain-title">Marketing</h1>
          <h2 className="domain-subtitle">Reach the right buyers. Lower your cost per customer.</h2>
          <p className="domain-description">
            We bring you customers and keep the cost honest. We run search, paid media, analytics, and content, and we set up tracking so you can see what every channel returns. These are the same systems we use to grow our own brands.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="section why-matters-section glass-top-border">
        <div className="container">
          <div className="matters-box glass">
            <h3 className="matters-title">Why It Matters</h3>
            <p className="matters-text">
              Most buyers start with a search or a scroll. If you are not there, a competitor is. Good marketing puts you in front of the right people, lowers what you pay to win a customer, and gives you a steady source of sales you can measure and grow.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section offers-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Services</span>
            <h2 className="section-title">What we offer</h2>
            <p className="section-title-description">
              Choose the services you need now. Add more as you grow.
            </p>
          </div>

          <div className="offers-grid">
            {offers.map((offer, idx) => (
              <div key={idx} className="offer-card glass">
                <div className="offer-icon-wrapper">
                  {offer.icon}
                </div>
                <h3 className="offer-card-title">{offer.title}</h3>
                <p className="offer-card-text">{offer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section bg-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Questions & Answers</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-title-description">
              Common questions about our marketing deliverables and performance workflows.
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="faq-item glass">
                  <button 
                    className="faq-trigger" 
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <ChevronDown size={18} className={`faq-arrow ${isOpen ? 'arrow-open' : ''}`} />
                  </button>
                  <div className={`faq-content-wrapper ${isOpen ? 'wrapper-open' : ''}`}>
                    <div className="faq-content">
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .marketing-page {
          padding-top: 5rem;
          position: relative;
        }

        .bg-alt {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .domain-hero {
          text-align: center;
          padding: 8rem 0 6rem;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .domain-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(${marketingBgImg});
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .domain-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.70);
          z-index: 2;
        }

        .domain-hero .container {
          position: relative;
          z-index: 3;
          max-width: 800px;
          margin: 0 auto;
        }

        .domain-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.04em;
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .domain-subtitle {
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--accent-light);
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        }

        .domain-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85) !important;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        }

        .glass-top-border {
          border-top: 1px solid var(--border-color);
        }

        .why-matters-section {
          padding-bottom: 2rem;
        }

        .offers-section {
          padding-top: 2rem;
        }

        /* Why it Matters */
        .matters-box {
          padding: 3rem;
          border-radius: 4px;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid var(--border-color);
          transition: border-color 0.3s ease;
        }

        .matters-box:hover {
          border-color: var(--accent-border-alpha);
        }

        .matters-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-heading);
          font-weight: 700;
        }

        .matters-text {
          font-size: 1.075rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        /* What We Offer Grid */
        .offers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .offer-card {
          padding: 2.5rem;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid var(--border-color);
          background: #ffffff;
        }

        .offer-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .offer-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 4px;
          background: var(--accent-glow);
          border: 1px solid var(--accent-border-alpha);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .offer-card-title {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .offer-card-text {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 4rem;
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

        /* FAQ Section styling */
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border: 1px solid var(--border-color);
          background: #ffffff;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-item:hover {
          border-color: var(--accent-border-alpha);
        }

        .faq-trigger {
          width: 100%;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text-heading);
        }

        .faq-question {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
        }

        .faq-arrow {
          color: var(--accent-light);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .arrow-open {
          transform: rotate(180deg);
          color: var(--accent);
        }

        .faq-content-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 250ms ease, opacity 200ms ease;
        }

        .faq-content-wrapper > div {
          min-height: 0;
          overflow: hidden;
        }

        .wrapper-open {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .faq-content {
          padding: 0 2rem 1.5rem;
        }

        .faq-answer {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .domain-title {
            font-size: 2.25rem;
          }
          .section-title {
            font-size: 1.875rem;
          }
          .offers-grid {
            grid-template-columns: 1fr;
          }
          .matters-box {
            padding: 2rem;
          }
          .faq-trigger {
            padding: 1.25rem 1.5rem;
          }
          .faq-content {
            padding: 0 1.5rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Marketing;
