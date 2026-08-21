import './Header.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import logoImg from '../assets/icon_orange.webp';
import {
  HEADER_NAVIGATION,
  HEADER_PRIMARY_ACTION,
  getHeaderNavigationState,
  getNavigationMatch,
} from '../content/headerNavigation';

const DESKTOP_NAV_MIN_WIDTH = 1040;
const SCROLLED_ENTER_Y = 36;
const SCROLLED_EXIT_Y = 12;
const MENU_CLOSE_SCROLL_DELTA = 12;

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState(null);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const animationFrameRef = useRef(null);
  const location = useLocation();
  const headerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const drawerRef = useRef(null);
  const desktopTriggerRefs = useRef({});
  const openDesktopGroupRef = useRef(null);
  const desktopMenuOpenedScrollYRef = useRef(0);
  const previousPathRef = useRef(location.pathname);
  const activeState = getHeaderNavigationState(location.pathname, HEADER_NAVIGATION);

  const closeDesktopGroup = useCallback(() => {
    openDesktopGroupRef.current = null;
    setOpenDesktopGroup(null);
  }, []);

  const toggleDesktopGroup = useCallback((groupId) => {
    setOpenDesktopGroup((current) => {
      const next = current === groupId ? null : groupId;
      openDesktopGroupRef.current = next;
      if (next) {
        desktopMenuOpenedScrollYRef.current = Math.max(window.scrollY, 0);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const updateHeader = () => {
      animationFrameRef.current = null;
      const currentScrollY = Math.max(window.scrollY, 0);

      if (
        openDesktopGroupRef.current &&
        Math.abs(currentScrollY - desktopMenuOpenedScrollYRef.current) >=
          MENU_CLOSE_SCROLL_DELTA
      ) {
        openDesktopGroupRef.current = null;
        setOpenDesktopGroup(null);
      }

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
        setOpenMobileGroup(null);
      } else {
        closeDesktopGroup();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeDesktopGroup]);

  useEffect(() => {
    if (!openDesktopGroup) return undefined;

    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeDesktopGroup();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      const opener = desktopTriggerRefs.current[openDesktopGroup];
      closeDesktopGroup();
      opener?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeDesktopGroup, openDesktopGroup]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) return undefined;
    previousPathRef.current = location.pathname;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setIsOpen(false);
      setOpenMobileGroup(null);
      closeDesktopGroup();
    });

    return () => {
      cancelled = true;
    };
  }, [closeDesktopGroup, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        setOpenMobileGroup(null);
        menuBtnRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusables = Array.from(
          drawerRef.current.querySelectorAll(FOCUSABLE_SELECTORS),
        ).filter((element) =>
          !element.closest('[aria-hidden="true"], [hidden]'),
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          last.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === last) {
          first.focus();
          event.preventDefault();
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
    setOpenMobileGroup(null);
    menuBtnRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((current) => {
      if (current) {
        setOpenMobileGroup(null);
        setTimeout(() => menuBtnRef.current?.focus(), 0);
      } else {
        closeDesktopGroup();
        setOpenMobileGroup(activeState.parentId);
      }
      return !current;
    });
  }, [activeState.parentId, closeDesktopGroup]);

  const toggleMobileGroup = useCallback((groupId) => {
    setOpenMobileGroup((current) => (current === groupId ? null : groupId));
  }, []);

  const renderMobileGroup = (entry) => {
    const expanded = openMobileGroup === entry.id;
    const groupActive = activeState.parentId === entry.id;

    return (
      <div className="mobile-nav-group" key={entry.id}>
        <button
          type="button"
          className={groupActive ? 'mobile-group-button mobile-group-button-active' : 'mobile-group-button'}
          aria-expanded={expanded}
          aria-controls={`mobile-nav-${entry.id}-panel`}
          aria-current={groupActive ? 'location' : undefined}
          onClick={() => toggleMobileGroup(entry.id)}
        >
          <span>{entry.label}</span>
          <ChevronDown className="mobile-group-caret" aria-hidden="true" />
        </button>
        <div
          id={`mobile-nav-${entry.id}-panel`}
          className="mobile-sublist"
          hidden={!expanded}
          aria-hidden={!expanded}
        >
          <ul>
            {entry.children.map((item) => {
              const match = getNavigationMatch(location.pathname, item);
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className="mobile-nav-link"
                    onClick={handleLinkClick}
                    aria-current={match || undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const renderDesktopGroup = (entry) => {
    const expanded = openDesktopGroup === entry.id;
    const groupActive = activeState.parentId === entry.id;

    return (
      <li className="nav-group" key={entry.id}>
        <button
          ref={(node) => {
            desktopTriggerRefs.current[entry.id] = node;
          }}
          type="button"
          className={groupActive ? 'nav-disclosure-button nav-disclosure-active' : 'nav-disclosure-button'}
          aria-expanded={expanded}
          aria-controls={`desktop-nav-${entry.id}-panel`}
          aria-current={groupActive ? 'location' : undefined}
          onClick={() => toggleDesktopGroup(entry.id)}
        >
          <span>{entry.label}</span>
          <ChevronDown className="nav-disclosure-caret" aria-hidden="true" />
        </button>
        <div
          id={`desktop-nav-${entry.id}-panel`}
          className="desktop-disclosure-panel"
          hidden={!expanded}
        >
          <ul className="desktop-disclosure-list">
            {entry.children.map((item) => {
              const match = getNavigationMatch(location.pathname, item);
              const descriptionId = `desktop-nav-${entry.id}-${item.id}-description`;
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={match ? 'nav-panel-link nav-panel-link-active' : 'nav-panel-link'}
                    aria-label={item.label}
                    aria-current={match || undefined}
                    aria-describedby={item.description ? descriptionId : undefined}
                  >
                    <span className="nav-panel-copy">
                      <span className="nav-panel-title">{item.label}</span>
                      <span id={descriptionId} className="nav-panel-description">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight className="nav-panel-arrow" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'header',
          scrolled ? 'header-scrolled' : '',
          openDesktopGroup ? 'header-navigation-open' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="header-container">
          <Link
            to="/"
            className="logo-link"
            onClick={() => {
              setIsOpen(false);
              closeDesktopGroup();
            }}
          >
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
            <ul className="desktop-nav-list">
              {HEADER_NAVIGATION.map((entry) => {
                if (entry.kind === 'group') return renderDesktopGroup(entry);

                const match = getNavigationMatch(location.pathname, entry);
                return (
                  <li key={entry.id}>
                    <Link
                      to={entry.to}
                      className={match ? 'nav-link nav-link-active' : 'nav-link'}
                      aria-current={match || undefined}
                    >
                      {entry.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="desktop-right-controls">
            <Link
              to="/start"
              className="btn btn-primary header-cta"
              data-umami-event="cta_start_project"
              aria-current={getNavigationMatch(location.pathname, HEADER_PRIMARY_ACTION) || undefined}
            >
              <span>Start a project</span>
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <div className="mobile-controls">
            <button
              ref={menuBtnRef}
              type="button"
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
            setOpenMobileGroup(null);
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
          {HEADER_NAVIGATION.map((entry) => {
            if (entry.kind === 'group') return renderMobileGroup(entry);

            const match = getNavigationMatch(location.pathname, entry);
            return (
              <Link
                key={entry.id}
                to={entry.to}
                className="mobile-nav-link mobile-direct-link"
                onClick={handleLinkClick}
                aria-current={match || undefined}
              >
                {entry.label}
              </Link>
            );
          })}
          <Link
            to="/start"
            className="btn btn-primary mobile-cta"
            onClick={handleLinkClick}
            data-umami-event="cta_start_project"
            aria-current={getNavigationMatch(location.pathname, HEADER_PRIMARY_ACTION) || undefined}
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
