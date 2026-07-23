import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/icon_orange.png';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Banner Section */}
        <div className="footer-banner">
          <div className="banner-content">
            <h3 className="banner-title">Ready to build something that lasts?</h3>
            <p className="banner-text">
              Tell us what you are working on. A new brand, a brand that needs a refresh, or a store that should sell more. We will show you a clear way forward.
            </p>
          </div>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-work-modal'))} 
            className="btn btn-primary banner-btn"
          >
            Get in Touch <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Links & Details Section */}
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <img src={logoImg} alt="Dashapatmaja Logo" className="footer-logo-image" />
            </Link>
            <p className="brand-description">
              Innovating Today for a Smarter Tomorrow. We help businesses grow through branding, marketing, and e-commerce.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Our Domains</h4>
            <ul className="footer-links">
              <li>
                <Link to="/marketing">Marketing</Link>
              </li>
              <li>
                <Link to="/branding">Branding</Link>
              </li>
              <li>
                <Link to="/ecommerce">E-commerce</Link>
              </li>
              <li>
                <Link to="/brands">Brands</Link>
              </li>
              <li>
                <Link to="/about">About Our Company</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Solutions</h4>
            <ul className="footer-contact-list">
              <li>
                <a href="mailto:director@dashapatmaja.in" className="contact-item">
                  <Mail size={16} className="contact-icon" />
                  <span>director@dashapatmaja.in</span>
                </a>
              </li>
              <li>
                <a href="mailto:dsplmanipal@gmail.com" className="contact-item">
                  <Mail size={16} className="contact-icon" />
                  <span>dsplmanipal@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+918861942440" className="contact-item">
                  <Phone size={16} className="contact-icon" />
                  <span>+91 88619 42440</span>
                </a>
              </li>
              <li>
                <a href="tel:+919072556665" className="contact-item">
                  <Phone size={16} className="contact-icon" />
                  <span>+91 90725 56665</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <p>© 2026 Dashapatmaja Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/privacy" className="legal-link">Privacy Policy & Terms</Link>
            <button className="back-to-top" onClick={handleBackToTop}>
              Back to top
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 6rem 0 2rem;
          margin-top: auto;
          position: relative;
          color: var(--text-primary);
        }

        .footer-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.5rem 3rem;
          border-radius: 4px;
          margin-bottom: 5rem;
          gap: 2rem;
          background: #ffffff;
          border: 1px solid var(--border-color);
        }

        .banner-content {
          max-width: 60%;
        }

        .banner-title {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
          color: var(--text-heading);
        }

        .banner-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .banner-btn {
          background: var(--accent) !important;
          color: #111111 !important;
          box-shadow: 0 4px 14px rgba(245, 168, 0, 0.15) !important;
        }

        .banner-btn:hover {
          background: var(--accent-light) !important;
          color: #111111 !important;
          box-shadow: 0 6px 20px rgba(245, 168, 0, 0.25) !important;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr;
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .footer-logo-image {
          height: 64px;
          width: auto;
          object-fit: contain;
          transition: transform 0.2s ease;
        }

        .footer-logo-image:hover {
          transform: scale(1.05);
        }

        .footer-logo-text {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--text-heading);
        }

        .brand-description {
          font-size: 0.925rem;
          max-width: 300px;
          color: var(--text-secondary);
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--accent-glow);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }

        .social-link:hover {
          color: #111111;
          background: var(--accent);
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .footer-title {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
          color: var(--text-heading);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-links a {
          font-size: 0.925rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .footer-links a:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.925rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .contact-item:hover {
          color: var(--accent);
        }

        .contact-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .back-to-top {
          background: none;
          border: none;
          color: var(--accent);
          cursor: pointer;
          font-weight: 600;
        }

        .back-to-top:hover {
          color: var(--accent-light);
          text-decoration: underline;
        }

        @media (max-width: 992px) {
          .footer-banner {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }
          .banner-content {
            max-width: 100%;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .brand-description {
            max-width: 100%;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
