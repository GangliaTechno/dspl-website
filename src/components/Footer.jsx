import './Footer.css';
import { Link, useLocation } from 'react-router';
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import logoImg from '../assets/icon_orange.webp';
import PhoneObfuscated from './PhoneObfuscated';
import { getFooterCta } from '../content/footerCtas';
import { COMPANY_FACTS } from '../content/companyFacts';

const Footer = () => {
  const { pathname } = useLocation();
  const cta = getFooterCta(pathname);

  const handleBackToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {cta && (
        <section
          className="footer-cta-strip"
          aria-labelledby="footer-cta-heading"
          aria-label="Closing call to action"
        >
          <div className="container footer-cta-inner">
            <div className="footer-cta-text">
              <p className="section-subtitle">{cta.eyebrow}</p>
              <h2 id="footer-cta-heading" className="footer-cta-heading">
                {cta.title}
              </h2>
              <p className="footer-cta-subtext">{cta.text}</p>
            </div>
            <Link to={cta.href} className="btn btn-primary footer-cta-btn">
              {cta.label}
            </Link>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col brand-col">
              <Link to="/" className="footer-logo">
                <img
                  src={logoImg}
                  alt="Dashapatmaja Solutions Pvt Ltd logo"
                  className="footer-logo-image"
                  width="806"
                  height="190"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="brand-description">
                Dashapatmaja Solutions Pvt Ltd develops consumer brands and
                provides branding, marketing, and e-commerce services.
              </p>
              <div className="social-links">
                <a
                  href="https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Dashapatmaja Solutions Pvt Ltd on LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Services</h2>
              <ul className="footer-links">
                <li><Link to="/marketing">Marketing</Link></li>
                <li><Link to="/branding">Branding</Link></li>
                <li><Link to="/ecommerce">E-commerce</Link></li>
                <li><Link to="/start">Start a Project</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Company</h2>
              <ul className="footer-links">
                <li><Link to="/about">About Our Company</Link></li>
                <li><Link to="/brands">Our Brands</Link></li>
                <li><Link to="/brands/raw-radicles">Raw Radicles</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Legal</h2>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Use</Link></li>
              </ul>
            </div>
          </div>

          <section className="footer-contact-panel" aria-labelledby="footer-contact-title">
            <ul className="footer-meta-rail" aria-label="Company registration and support details">
              <li><span>Incorporated</span><strong>{COMPANY_FACTS.incorporationDate}</strong></li>
              <li><span>CIN</span><strong>{COMPANY_FACTS.cin}</strong></li>
              <li><span>Incubated at</span><strong>MUTBI/MAHE</strong></li>
              <li><span>Supported through</span><strong>{COMPANY_FACTS.incubation.support}</strong></li>
            </ul>
            <h2 id="footer-contact-title" className="footer-contact-title">Contact details</h2>
            <ul className="footer-contact-list footer-contact-rail">
              <li>
                <a href={`mailto:${COMPANY_FACTS.contacts.directorEmail}`} className="contact-item">
                  <Mail size={16} className="contact-icon" aria-hidden="true" />
                  <span>{COMPANY_FACTS.contacts.directorEmail}</span>
                </a>
              </li>
              <li>
                <PhoneObfuscated
                  number={COMPANY_FACTS.contacts.primaryPhone}
                  className="contact-item"
                  icon={<Phone size={16} className="contact-icon" aria-hidden="true" />}
                />
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=MUTBI+Advanced+Research+Center+Manipal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <MapPin size={16} className="contact-icon" aria-hidden="true" />
                  <span>
                    Room No. 12, 4th Floor, MUTBI, Advanced Research Center,
                    Madhava Nagar, Manipal 576104
                  </span>
                </a>
              </li>
              <li className="contact-item footer-hours">
                <CalendarDays size={16} className="contact-icon" aria-hidden="true" />
                <span>Office days: Monday to Saturday</span>
              </li>
            </ul>
          </section>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {COMPANY_FACTS.legalName}. All rights reserved.</p>
            <div className="footer-legal-links">
              <button
                type="button"
                aria-label="Back to top of page"
                className="back-to-top"
                onClick={handleBackToTop}
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
