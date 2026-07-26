import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/icon_orange.png';
import { openWorkModal } from '../utils/workModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleOpenWorkModal = (e) => {
    e.preventDefault();
    openWorkModal('header');
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Left Side: Logo */}
          <Link to="/" className="logo-link" onClick={handleLinkClick}>
            <img src={logoImg} alt="Dashapatmaja Logo" className="logo-image" loading="eager" decoding="async" />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined}>
              Home
            </Link>

            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/about' ? 'page' : undefined}>
              About
            </Link>

            <Link to="/brands" className={`nav-link ${location.pathname === '/brands' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/brands' ? 'page' : undefined}>
              Brands
            </Link>

            <Link to="/marketing" className={`nav-link ${location.pathname === '/marketing' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/marketing' ? 'page' : undefined}>
              Marketing
            </Link>

            <Link to="/branding" className={`nav-link ${location.pathname === '/branding' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/branding' ? 'page' : undefined}>
              Branding
            </Link>

            <Link to="/ecommerce" className={`nav-link ${location.pathname === '/ecommerce' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/ecommerce' ? 'page' : undefined}>
              E-commerce
            </Link>

            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'nav-link-active' : ''}`} aria-current={location.pathname === '/contact' ? 'page' : undefined}>
              Contact
            </Link>
          </nav>

          {/* Right Side: Action Button */}
          <div className="desktop-right-controls">
            <button type="button" onClick={handleOpenWorkModal} className="btn btn-primary header-cta" aria-label="Open Work With Us enquiry form">
              Work With Us
            </button>
          </div>

          {/* Mobile controls wrapper */}
          <div className="mobile-controls">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div id="mobile-navigation" className={`mobile-drawer ${isOpen ? 'mobile-drawer-open' : ''}`} aria-hidden={!isOpen}>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <Link to="/" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/' ? 'page' : undefined}>Home</Link>
          <Link to="/about" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/about' ? 'page' : undefined}>About</Link>
          <Link to="/brands" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/brands' ? 'page' : undefined}>Brands</Link>
          <Link to="/marketing" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/marketing' ? 'page' : undefined}>Marketing</Link>
          <Link to="/branding" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/branding' ? 'page' : undefined}>Branding</Link>
          <Link to="/ecommerce" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/ecommerce' ? 'page' : undefined}>E-commerce</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={handleLinkClick} aria-current={location.pathname === '/contact' ? 'page' : undefined}>Contact</Link>
          <button 
            type="button"
            className="btn btn-primary mobile-cta" 
            aria-label="Open Work With Us enquiry form"
            onClick={(e) => { handleLinkClick(); handleOpenWorkModal(e); }}
          >
            Work With Us
          </button>
        </nav>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: background 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        
        .header-scrolled {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }
        
        .header-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-scrolled .header-container {
          padding: 0.6rem 1.5rem; /* Shrunk padding when scrolled */
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-image {
          height: 56px; /* Larger logo size at top */
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.6));
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .header-scrolled .logo-image {
          height: 44px; /* Shrunk logo size when scrolled */
        }

        .logo-image:hover {
          transform: scale(1.02);
          filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.8));
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .desktop-right-controls {
          display: flex;
          align-items: center;
        }

        .nav-link {
          font-size: 0.925rem;
          font-weight: 600;
          color: var(--text-secondary);
          position: relative;
          padding: 0.5rem 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: color 0.2s ease;
        }

        .nav-link:hover, .nav-link-active {
          color: var(--accent);
        }

        .header-cta {
          padding: 0.5rem 1.25rem;
          font-size: 0.875rem;
          border-radius: 4px;
        }

        .mobile-controls {
          display: none;
        }

        .mobile-menu-btn {
          background: none;
          border: none;
          color: var(--text-heading);
          cursor: pointer;
          z-index: 110;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          background: #ffffff;
          border-left: 1px solid var(--border-color);
          z-index: 95;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 6rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.03);
          overflow-y: auto;
          visibility: hidden;
        }

        .mobile-drawer-open {
          transform: translateX(0);
          visibility: visible;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .mobile-cta {
          margin-top: 1rem;
          width: 100%;
          text-align: center;
        }

        @media (max-width: 900px) {
          .desktop-nav, .desktop-right-controls {
            display: none;
          }
          .mobile-controls {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
