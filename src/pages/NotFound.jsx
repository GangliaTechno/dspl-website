import './NotFound.css';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, ArrowLeft, Mail } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { trackEvent } from '../utils/analytics';

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
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
            <Home size={18} className="not-found-action-icon" /> Return to Home
          </Link>
          <button 
            type="button"
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} className="not-found-action-icon" /> Go Back
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
              <Mail size={14} className="not-found-support-icon" /> Contact Support
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NotFound;
