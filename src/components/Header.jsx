import './Header.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/icon_orange.webp';
import { blogsEnabled } from '../content/publication';

const DESKTOP_NAV_MIN_WIDTH = 1040;

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Brands', to: '/brands' },
  { label: 'Marketing', to: '/marketing' },
  { label: 'Branding', to: '/branding' },
  { label: 'E-commerce', to: '/ecommerce' },
  ...(blogsEnabled ? [{ label: 'Blogs', to: '/blogs' }] : []),
  { label: 'Contact', to: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const lastScrollYRef = useRef(0);
  const animationFrameRef = useRef(null);
  const location = useLocation();
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    lastScrollYRef.current = Math.max(window.scrollY, 0);

    const updateHeader = () => {
      animationFrameRef.current = null;

      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      setScrolled(currentScrollY > 20);

      if (isOpen || currentScrollY <= 80) {
        setIsLifted(false);
      } else if (scrollDelta > 4) {
        setIsLifted(true);
      } else if (scrollDelta < -4) {
        setIsLifted(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_MIN_WIDTH) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus trap + Escape key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        menuBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = Array.from(
          drawerRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
        ).filter((el) => !el.closest('[aria-hidden="true"]'));

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Body scroll lock + focus management on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Move focus into drawer after transition starts
      setTimeout(() => {
        drawerRef.current?.querySelector('.mobile-drawer-close')?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Drawer closes via handleLinkClick on each nav link \u2014 no effect needed here.

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        // Closing — restore focus to button
        setTimeout(() => menuBtnRef.current?.focus(), 0);
      }
      return !prev;
    });
  }, []);

  return (
    <>
      <header
        className={[
          'header',
          scrolled ? 'header-scrolled' : '',
          isLifted ? 'header-lifted' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="header-container">
          {/* Left Side: Logo */}
          <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
            <img src={logoImg} alt="Dashapatmaja Solutions Pvt Ltd logo" className="logo-image" width="806" height="190" loading="eager" decoding="async" />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link ${active ? 'nav-link-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Action Button */}
          <div className="desktop-right-controls">
            <Link to="/start" className="btn btn-primary header-cta">
              Start a Project
            </Link>
          </div>

          {/* Mobile controls wrapper */}
          <div className="mobile-controls">
            {/* Mobile Menu Button */}
            <button
              ref={menuBtnRef}
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              tabIndex={isOpen ? -1 : 0}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => { setIsOpen(false); menuBtnRef.current?.focus(); }}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        id="mobile-navigation"
        className={`mobile-drawer ${isOpen ? 'mobile-drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="mobile-drawer-close"
          aria-label="Close navigation menu"
          onClick={handleLinkClick}
        >
          <X size={24} aria-hidden="true" />
        </button>
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="mobile-nav-link"
              onClick={handleLinkClick}
              aria-current={location.pathname === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/start"
            className="btn btn-primary mobile-cta"
            onClick={handleLinkClick}
          >
            Start a Project
          </Link>
        </nav>
      </div>

    </>
  );
};

export default Header;
