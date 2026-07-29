import './Header.css';
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
            <img src={logoImg} alt="Dashapatmaja Solutions Pvt Ltd logo" className="logo-image" loading="eager" decoding="async" />
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

    </>
  );
};

export default Header;
