import './Footer.css';
import { Link } from 'react-router';
import { Phone, Mail, MapPin } from 'lucide-react';
import logoImg from '../assets/icon_orange.webp';
import PhoneObfuscated from './PhoneObfuscated';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="footer-cta-strip" aria-labelledby="footer-cta-heading">
        <div className="container footer-cta-inner">
          <div className="footer-cta-text">
            <p className="section-subtitle">Start a conversation</p>
            <h2 id="footer-cta-heading" className="footer-cta-heading">
              Ready to build with greater clarity?
            </h2>
            <p className="footer-cta-subtext">
              Tell us what you are building, where you need support, and what a successful next step looks like.
            </p>
          </div>
          <Link to="/contact" className="btn btn-primary footer-cta-btn">
            Contact DSPL
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
        {/* Links & Details Section */}
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img src={logoImg} alt="Dashapatmaja Solutions Pvt Ltd logo" className="footer-logo-image" loading="lazy" decoding="async" />
            </Link>
            <p className="brand-description">
              Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.
            </p>
            <p className="brand-registration">
              CIN: U74999KA2022PTC163810<br />
              Incubated at MUTBI &amp; DST-NIDHI Prayas
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Dashapatmaja Solutions Pvt Ltd on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Services</h2>
            <ul className="footer-links">
              <li><Link to="/marketing">Marketing</Link></li>
              <li><Link to="/branding">Branding</Link></li>
              <li><Link to="/ecommerce">E-commerce</Link></li>
              <li><Link to="/brands">Our Brands</Link></li>
              <li><Link to="/about">About Our Company</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">Contact</h2>
            <ul className="footer-contact-list">
              <li>
                <a href="mailto:director@dashapatmaja.in" className="contact-item">
                  <Mail size={16} className="contact-icon" aria-hidden="true" />
                  <span>director@dashapatmaja.in</span>
                </a>
              </li>
              <li>
                <PhoneObfuscated
                  digits="+918861942440"
                  display="+91 88619 42440"
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
                  <span>Room 12, 4F, MUTBI,<br />Madhava Nagar, Manipal — 576104</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>© 2026 Dashapatmaja Solutions Pvt Ltd. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <button type="button" aria-label="Back to top of page" className="back-to-top" onClick={handleBackToTop}>
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
