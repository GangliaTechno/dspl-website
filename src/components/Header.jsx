import './Header.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logoImg from '../assets/icon_orange.webp';
import { blogsEnabled } from '../content/publication';

const DESKTOP_NAV_MIN_WIDTH = 1040;
const SCROLLED_ENTER_Y = 36;
const SCROLLED_EXIT_Y = 12;

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Our Brands', to: '/brands' },
  { label: 'Marketing', to: '/marketing' },
  { label: 'Branding', to: '/branding' },
  { label: 'E-commerce', to: '/ecommerce' },
  ...(blogsEnabled ? [{ label: 'Blogs', to: '/blogs' }] : []),
  { label: 'Contact', to: '/contact' },
];

const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const animationFrameRef = useRef(null);
  const location = useLocation();
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const updateHeader = () => {
      animationFrameRef.current = null;
      const currentScrollY = Math.max(window.scrollY, 0);

      setScrolled((prev) => {
        if (currentScrollY > SCROLLED_ENTER_Y) return true;
        if (currentScrollY < SCROLLED_EXIT_Y) return false;
        return prev;
      });
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
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_NAV_MIN_WIDTH) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        drawerRef.current?.querySelector('.mobile-drawer-close')?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
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
        ].filter(Boolean).join(' ')}
      >
        <div className="header-container">
          <Link to="/" className="logo-link" onClick={() => setIsOpen(false)}>
            <img
              src={logoImg}
              alt="Dashapatmaja Solutions Pvt Ltd logo"
              className="logo-image"
              width="806"
              height="190"
              loading="eager"
              decoding="async"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((item) => {
              const currentPath = normalizePath(location.pathname);
              const active =
                currentPath === item.to ||
                (item.to === '/blogs' && currentPath.startsWith('/blogs/'));
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

          <div className="desktop-right-controls">
            <Link
              to="/start"
              className="btn btn-primary header-cta"
              data-umami-event="cta_start_project"
            >
              <span>Start a project</span>
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <div className="mobile-controls">
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

      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => {
            setIsOpen(false);
            menuBtnRef.current?.focus();
          }}
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
          {navItems.map((item) => {
            const currentPath = normalizePath(location.pathname);
            const active =
              currentPath === item.to ||
              (item.to === '/blogs' && currentPath.startsWith('/blogs/'));
            return (
              <Link
                key={item.to}
                to={item.to}
                className="mobile-nav-link"
                onClick={handleLinkClick}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/start"
            className="btn btn-primary mobile-cta"
            onClick={handleLinkClick}
            data-umami-event="cta_start_project"
          >
            <span>Start a project</span>
            <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
