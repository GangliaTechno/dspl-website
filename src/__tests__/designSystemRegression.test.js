import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readSource = (relativePath) =>
  readFileSync(resolve(relativePath), 'utf8');

describe('approved design-system corrections', () => {
  it('keeps the project planner inside a fixed, bounded modal surface', () => {
    const css = readSource('src/components/WorkWithUsModal.css');

    expect(css).toMatch(
      /\.modal-overlay\s*{[^}]*position:\s*fixed;[^}]*inset:\s*0;[^}]*display:\s*flex;/s,
    );
    expect(css).toMatch(
      /\.modal-container\s*{[^}]*max-width:[^;]+;[^}]*max-height:[^;]+;[^}]*overflow:\s*hidden;/s,
    );
    expect(css).toMatch(
      /\.modal-body-scroll\s*{[^}]*overflow-y:\s*auto;[^}]*overscroll-behavior:\s*contain;/s,
    );
    expect(css).toMatch(
      /\.modal-container\.glass\s*{[^}]*background:\s*#ffffff;[^}]*backdrop-filter:\s*none;/s,
    );
  });

  it('uses a readable gold token for text placed on light surfaces', () => {
    const tokens = readSource('src/index.css');
    const brands = readSource('src/pages/Brands.css');
    const privacy = readSource('src/pages/PrivacyPolicy.css');

    expect(tokens).toContain('--accent-text: #8A5B00;');
    expect(brands).toMatch(
      /\.brands-hero-content\s+\.section-subtitle\s*{[^}]*color:\s*var\(--accent-text\);/s,
    );
    expect(privacy).toMatch(
      /\.privacy-section h2\s*{[^}]*color:\s*var\(--accent-text\);/s,
    );
    expect(privacy).toMatch(
      /\.contact-info-card a\s*{[^}]*color:\s*var\(--accent-text\);/s,
    );
  });

  it('normalizes responsive display type, touch targets, and looping motion', () => {
    const home = readSource('src/pages/Home.css');
    const header = readSource('src/components/Header.css');
    const supporter = readSource('src/components/home/SupporterStrip.jsx');

    expect(home).toMatch(
      /\.hero-title\s*{[^}]*font-size:\s*clamp\(3rem,\s*5\.5vw,\s*4\.75rem\);/s,
    );
    expect(header).toMatch(
      /\.mobile-menu-btn\s*{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/s,
    );
    expect(supporter).toContain('useReducedMotion');
    expect(supporter).toContain(
      "'--supporter-shift': `${-sequenceWidth}px`",
    );
  });

  it('keeps the shared header geometry stable while scrolling', () => {
    const header = readSource('src/components/Header.css');
    const headerPage = readSource('src/components/Header.jsx');

    expect(header).toMatch(
      /\.header-container\s*{[^}]*min-height:\s*76px;[^}]*padding:\s*0 1\.5rem;/s,
    );
    expect(header).toMatch(
      /\.logo-image\s*{[^}]*height:\s*48px;/s,
    );
    expect(header).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.header-container\s*{[^}]*min-height:\s*72px;[\s\S]*?\.logo-image\s*{[^}]*height:\s*44px;/s,
    );
    expect(header).not.toContain('.header-scrolled .header-container');
    expect(header).not.toContain('.header-scrolled .logo-image');
    expect(header).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.header,[\s\S]*?\.logo-image\s*{[^}]*transition:\s*none;/s,
    );
    expect(headerPage).toContain(
      "window.addEventListener('scroll', handleScroll, { passive: true })",
    );
  });

  it('keeps the desktop Home hero at least one available viewport tall', () => {
    const home = readSource('src/pages/Home.css');

    expect(home).toMatch(
      /\.home-hero\s*{[^}]*min-height:\s*max\(42rem,\s*calc\(100svh\s*-\s*4\.5rem\)\);/s,
    );
    expect(home).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.home-hero\s*{[^}]*min-height:\s*auto;/s,
    );
  });

  it('uses the approved Home hero hierarchy without a duplicate final CTA', () => {
    const home = readSource('src/pages/Home.css');
    const homePage = readSource('src/pages/Home.jsx');

    expect(home).toMatch(
      /\.home-hero::after\s*{[^}]*background:\s*rgba\(8,\s*8,\s*8,\s*0\.72\);/s,
    );
    expect(home).toMatch(
      /\.home-hero-layout\s*{[^}]*display:\s*flex;[^}]*justify-content:\s*center;[^}]*padding-block:\s*clamp\(4\.5rem,\s*8vw,\s*7rem\)\s+clamp\(7rem,\s*12vw,\s*9\.5rem\);/s,
    );
    expect(home).toMatch(
      /\.home-hero-content\s*{[^}]*width:\s*min\(100%,\s*68rem\);[^}]*text-align:\s*center;/s,
    );
    expect(home).toMatch(
      /\.hero-title\s*>\s*span\s*{[^}]*display:\s*block;/s,
    );
    expect(home).toMatch(
      /\.hero-subhead\s*{[^}]*max-width:\s*66ch;[^}]*margin:\s*0 auto 2\.5rem;[^}]*font-size:\s*clamp\(1\.05rem,\s*1\.45vw,\s*1\.25rem\);[^}]*line-height:\s*1\.65;/s,
    );
    expect(home).toMatch(
      /\.hero-ctas\s*{[^}]*justify-content:\s*center;/s,
    );
    expect(homePage).toContain('Work With Us');
    expect(homePage).toContain('See Our Brands');
    expect(homePage).not.toContain(
      'Brand systems for Indian consumer businesses',
    );
    expect(homePage).not.toContain('One accountable team');
    expect(homePage).not.toContain('Brand strategy and identity');
    expect(homePage).not.toContain('className="section home-enquiry"');
    expect(homePage).not.toContain('Start with context');
    expect(homePage).not.toContain('Share your project');
    expect(home).not.toContain('.home-enquiry');
  });

  it('keeps the owned-brand section focused on its distinct brand action', () => {
    const ownedBrand = readSource('src/components/home/OwnedBrandProof.jsx');
    const homePage = readSource('src/pages/Home.jsx');

    expect(ownedBrand).toContain('See the brand');
    expect(ownedBrand).not.toContain('Build with us');
    expect(ownedBrand).not.toContain('onEnquire');
    expect(homePage).not.toContain('homepage-owned-brand');
  });

  it('aligns supporter logos and uses the approved warm Raw Radicles treatment', () => {
    const supporter = readSource('src/components/home/SupporterStrip.jsx');
    const homeSections = readSource('src/components/home/homeSections.css');
    const brandsCss = readSource('src/pages/Brands.css');
    const homePage = readSource('src/pages/Home.jsx');
    const brandsPage = readSource('src/pages/Brands.jsx');

    expect(supporter).toContain(
      'Math.ceil(bandWidth / sequenceWidth) + 1',
    );
    expect(supporter).toContain('new ResizeObserver(measure)');
    expect(supporter).toContain(
      "'--supporter-shift': `${-sequenceWidth}px`",
    );
    expect(supporter).toContain('supporter-track-running');
    expect(supporter).toContain('className="supporter-sequence"');
    expect(homeSections).toContain(
      '--supporter-sequence-min-width: max-content;',
    );
    expect(homeSections).toMatch(
      /\.supporter-sequence\s*{[^}]*min-width:\s*var\(--supporter-sequence-min-width\);/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-track-running\s*{[^}]*animation:\s*supporter-marquee 18s linear infinite;[^}]*will-change:\s*transform;/s,
    );
    expect(homeSections).toMatch(
      /@keyframes supporter-marquee\s*{[\s\S]*?from\s*{[^}]*transform:\s*translate3d\(0,\s*0,\s*0\);[^}]*}[\s\S]*?to\s*{[^}]*transform:\s*translate3d\(var\(--supporter-shift\),\s*0,\s*0\);/s,
    );
    expect(homeSections).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.supporter-track-running\s*{[^}]*animation:\s*none;/s,
    );
    expect(homeSections).toContain('--supporter-gap: 3.75rem;');
    expect(homeSections).toContain('--supporter-logo-height: 1.75rem;');
    expect(homeSections).toMatch(
      /\.supporter-logo-dst\s*{[^}]*--supporter-slot-width:\s*8rem;[^}]*--supporter-logo-height:\s*2rem;[^}]*--supporter-y:\s*-3px;/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo-nidhi\s*{[^}]*--supporter-slot-width:\s*5rem;[^}]*--supporter-logo-height:\s*2\.5rem;[^}]*--supporter-y:\s*-7px;/s,
    );
    expect(homeSections).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.supporter-logo-nidhi\s*{[^}]*--supporter-slot-width:\s*3\.75rem;[^}]*--supporter-logo-height:\s*1\.875rem;[^}]*--supporter-y:\s*-3px;/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo-mutbi\s*{[^}]*--supporter-slot-width:\s*13\.5rem;[^}]*--supporter-optical-trim:\s*-0\.5rem;[^}]*--supporter-logo-opacity:\s*0\.65;/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo-startup\s*{[^}]*--supporter-slot-width:\s*13rem;/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo\s*{[^}]*width:\s*auto;[^}]*height:\s*var\(--supporter-logo-height\);[^}]*transform:\s*translateY\(var\(--supporter-y,\s*0\)\);/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo\s*{[^}]*opacity:\s*var\(--supporter-logo-opacity,\s*0\.5\);/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo-slot\s*{[^}]*margin-inline:\s*var\(--supporter-optical-trim,\s*0rem\);/s,
    );
    expect(homeSections).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?--supporter-gap:\s*3rem;/s,
    );
    expect(homePage).toContain(
      "alt: 'DST NIDHI', className: 'supporter-logo-dst'",
    );
    expect(homePage).toContain(
      "alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi'",
    );
    expect(homePage).toContain('supporter-dst-nidhi.webp');
    expect(homePage).toContain('supporter-nidhi-prayas.webp');
    expect(homePage).toContain('supporter-mutbi.webp');
    expect(homePage).toContain('supporter-startup-karnataka.webp');
    expect(homeSections).toMatch(
      /\.owned-brand-section\s*{[^}]*background:\s*var\(--bg-secondary\);/s,
    );
    expect(brandsCss).toMatch(
      /\.rr-visual-panel\s*{[^}]*background:\s*var\(--bg-tertiary\);/s,
    );
    expect(homePage).toContain('raw-radicles-logo-cropped.webp');
    expect(brandsPage).toContain('raw-radicles-logo-cropped.webp');
    expect(brandsPage).toContain(
      'className="btn btn-primary rr-cta-btn"',
    );
  });

  it('normalizes leadership portraits without covering faces', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).toContain("transformOrigin: '50% 28%'");
    expect(aboutPage).toContain('scale: 1.9,');
    expect(aboutPage).toContain(
      "import sreeImg from '../assets/sree_pro_extended.webp';",
    );
    expect(aboutPage).toContain(
      "import balakrishnaImg from '../assets/balakrishna_pro_extended.webp';",
    );
    expect(aboutPage).toMatch(
      /name:\s*'Dr\. Shreepathy Rangabhatta R',[\s\S]*?scale:\s*1\.45,[\s\S]*?transformOrigin:\s*'50% 43%'/s,
    );
    expect(aboutPage).toMatch(
      /name:\s*'Dr\. Balakrishna S\. Maddodi',[\s\S]*?scale:\s*1\.45,[\s\S]*?transformOrigin:\s*'50% 37%'/s,
    );
    expect(aboutPage).toContain("'--avatar-position': member.objectPosition");
    expect(aboutPage).toContain("'--avatar-scale': member.scale");
    expect(aboutPage).toContain("'--avatar-origin': member.transformOrigin");
    expect(aboutPage).toContain("'--avatar-y': member.offsetY || '0px'");
    expect(aboutPage).toMatch(
      /'--avatar-background':\s*member\.background\s*\|\|\s*'#f3f1ec'/s,
    );
    expect(aboutPage).not.toContain('team-avatar-image-${idx + 1}');
    expect(aboutPage).toMatch(
      /className="team-card glass">[\s\S]*?\{member\.linkedin[\s\S]*?className="team-linkedin-link"[\s\S]*?<div className="team-avatar-wrapper">/s,
    );
    expect(aboutCss).toMatch(
      /\.team-card\s*{[^}]*position:\s*relative;[^}]*transition:\s*transform 180ms ease-out,\s*border-color 180ms ease-out,\s*box-shadow 180ms ease-out;/s,
    );
    expect(aboutCss).toMatch(
      /\.team-linkedin-link\s*{[^}]*top:\s*1rem;[^}]*right:\s*1rem;[^}]*width:\s*2\.25rem;[^}]*height:\s*2\.25rem;/s,
    );
    expect(aboutCss).toMatch(
      /\.team-avatar-image\s*{[^}]*border-radius:\s*50%;[^}]*object-position:\s*var\(--avatar-position,\s*center\);[^}]*transform:\s*translateY\(var\(--avatar-y,\s*0\)\)\s*scale\(var\(--avatar-scale,\s*1\)\);[^}]*transform-origin:\s*var\(--avatar-origin,\s*center\);/s,
    );
    expect(aboutCss).toMatch(
      /\.team-avatar-container\s*{[^}]*background:\s*var\(--avatar-background,\s*#f3f1ec\);/s,
    );
  });

  it('gives every shared service hero one contextual project CTA', () => {
    const servicePage = readSource('src/components/ServicePage.jsx');
    const serviceCss = readSource('src/components/ServicePage.css');

    expect(servicePage).toContain(
      "import { openWorkModal } from '../utils/workModal';",
    );
    expect(servicePage).toContain('className="btn btn-primary domain-cta"');
    expect(servicePage).toContain('Discuss your next stage');
    expect(servicePage).toContain(
      "openWorkModal(`${pageTypeClass}-hero`)",
    );
    expect(serviceCss).toMatch(
      /\.domain-cta\s*{[^}]*margin-top:\s*2rem;/s,
    );
  });

  it('tiers About page motion for reduced-motion visitors', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).toContain(
      "import { motion, useReducedMotion } from 'framer-motion';",
    );
    expect(aboutPage).toContain(
      'const prefersReducedMotion = useReducedMotion();',
    );
    expect(aboutPage).toContain(
      "prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }",
    );
    expect(aboutPage).toContain(
      "prefersReducedMotion ? { duration: 0.15, ease: 'easeOut' } : base",
    );
    expect(aboutPage).toContain(
      "behavior: prefersReducedMotion ? 'auto' : 'smooth'",
    );
    expect(aboutCss).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.about-hero-bg\s*{[^}]*animation:\s*none;/s,
    );
  });

  it('caps the About introduction at the documented reading measure', () => {
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutCss).toMatch(
      /\.about-intro-grid\s*{[^}]*max-width:\s*72ch;/s,
    );
  });
});
