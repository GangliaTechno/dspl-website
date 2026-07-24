import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeft, Mail } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { trackEvent } from '../utils/analytics';

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    canonical: location.pathname
  });

  useEffect(() => {
    trackEvent({
      category: 'navigation',
      action: '404_not_found',
      label: location.pathname
    });
  }, [location.pathname]);

  return (
    <div className="not-found-container">
      <div className="not-found-content glass">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">
          The page <code className="missing-path">{location.pathname}</code> does not exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} style={{ marginRight: '8px' }} /> Return to Home
          </Link>
          <button 
            type="button"
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Go Back
          </button>
        </div>

        <div className="quick-links-section">
          <h3>Explore Popular Sections:</h3>
          <div className="quick-links-grid">
            <Link to="/about" className="quick-link-card">About Us</Link>
            <Link to="/brands" className="quick-link-card">Our Brands</Link>
            <Link to="/marketing" className="quick-link-card">Marketing</Link>
            <Link to="/branding" className="quick-link-card">Branding</Link>
            <Link to="/ecommerce" className="quick-link-card">E-Commerce</Link>
            <Link to="/contact" className="quick-link-card">
              <Mail size={14} style={{ marginRight: '4px' }} /> Contact Support
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .not-found-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
          background: var(--bg-primary);
        }

        .not-found-content {
          max-width: 680px;
          width: 100%;
          padding: 3.5rem 2.5rem;
          border-radius: 20px;
          text-align: center;
          border: 1px solid var(--border-color);
        }

        .not-found-code {
          font-size: 6rem;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .not-found-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .not-found-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .missing-path {
          background: rgba(255, 255, 255, 0.08);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          color: var(--accent);
          font-family: monospace;
        }

        .not-found-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .quick-links-section {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          text-align: left;
        }

        .quick-links-section h3 {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 0.75rem;
        }

        .quick-link-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .quick-link-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-border-alpha);
          color: var(--accent);
        }

        @media (max-width: 600px) {
          .not-found-code {
            font-size: 4.5rem;
          }

          .not-found-title {
            font-size: 1.5rem;
          }

          .not-found-content {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
