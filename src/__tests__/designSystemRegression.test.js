import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readSource = (relativePath) =>
  readFileSync(resolve(relativePath), 'utf8');

const readPngSize = (relativePath) => {
  const image = readFileSync(resolve(relativePath));

  return {
    width: image.readUInt32BE(16),
    height: image.readUInt32BE(20),
  };
};

describe('approved design-system corrections', () => {
  it('keeps the project planner inside a fixed, bounded modal surface', () => {
    const css = readSource('src/components/WorkWithUsModal.css');

    expect(css).toMatch(
      /\.work-modal-overlay\s*{[^}]*position:\s*fixed;[^}]*inset:\s*0;[^}]*display:\s*flex;/s,
    );
    expect(css).toMatch(
      /\.work-modal-container\s*{[^}]*max-width:[^;]+;[^}]*max-height:[^;]+;[^}]*overflow:\s*hidden;/s,
    );
    expect(css).toMatch(
      /\.work-modal-body-scroll\s*{[^}]*overflow-y:\s*auto;[^}]*overscroll-behavior:\s*contain;/s,
    );
    expect(css).toMatch(
      /\.work-modal-container\.glass\s*{[^}]*background:\s*#ffffff;[^}]*backdrop-filter:\s*none;/s,
    );
  });

  it('uses readable gold tokens for light and dark surfaces', () => {
    const tokens = readSource('src/index.css');
    const brands = readSource('src/pages/Brands.css');
    const privacy = readSource('src/pages/PrivacyPolicy.css');

    expect(tokens).toContain('--accent-text: #8A5B00;');
    expect(brands).toMatch(
      /\.brands-title\s*{[^}]*color:\s*var\(--accent\);/s,
    );
    expect(privacy).toMatch(
      /\.privacy-section h2\s*{[^}]*color:\s*var\(--accent-text\);/s,
    );
    expect(privacy).toMatch(
      /\.contact-info-card a\s*{[^}]*color:\s*var\(--accent-text\);/s,
    );
  });

  it('uses a centered Brands hero with a flat contrast overlay', () => {
    const brandsPage = readSource('src/pages/Brands.jsx');
    const brandsCss = readSource('src/pages/Brands.css');

    expect(brandsPage).not.toContain('brands-hero-overlay');
    expect(brandsPage).toContain('const brandsHeroImages = [');
    expect(brandsPage.match(/id: 'brands-(?:primary|02)'/g)).toHaveLength(2);
    expect(brandsPage).toContain('<RotatingHeroMedia');
    expect(brandsPage).toContain('brands-portfolio-01-1440.webp');
    expect(brandsPage).toContain('brands-portfolio-01-mobile.webp');
    expect(brandsPage).toContain('brands-portfolio-02-1440.webp');
    expect(brandsPage).toContain('brands-portfolio-02-mobile.webp');
    expect(brandsCss).toMatch(
      /\.brands-hero-bg\s*{[^}]*width:\s*100%;/s,
    );
    expect(brandsCss).not.toMatch(/\.brands-hero-overlay\s*{/);
    expect(brandsCss).toMatch(
      /\.brands-hero\s*{[^}]*text-align:\s*center;[^}]*min-height:\s*38rem;/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero::after\s*{[^}]*background:\s*rgba\(8,\s*8,\s*8,\s*0\.55\);/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero \.container\s*{[^}]*max-width:\s*52rem;[^}]*justify-content:\s*center;/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero-content\s*{[^}]*max-width:\s*52rem;[^}]*margin-inline:\s*auto;[^}]*text-align:\s*center;/s,
    );
    expect(brandsCss).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.brands-hero\s*{[^}]*min-height:\s*34rem;[^}]*padding:\s*5\.5rem 0 4\.5rem;[\s\S]*?\.brands-hero-img\s*{[^}]*object-position:\s*56% 52%;/s,
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

  it('keeps shared FAQ controls on the design-system typeface', () => {
    const faq = readSource('src/components/FAQAccordion.css');

    expect(faq).toMatch(
      /\.faq-header-btn\s*{[^}]*font-family:\s*var\(--font-heading\);/s,
    );
  });

  it('uses the patched React Router package and supported runtime baseline', () => {
    const packageJson = JSON.parse(readSource('package.json'));
    const routerConsumers = [
      'src/App.jsx',
      'src/AppRoutes.jsx',
      'src/entry-prerender.jsx',
      'src/components/AnalyticsTracker.jsx',
      'src/components/Footer.jsx',
      'src/components/Header.jsx',
      'src/components/ScrollToTop.jsx',
      'src/components/home/OwnedBrandProof.jsx',
      'src/components/__tests__/Header.test.jsx',
      'src/hooks/__tests__/useSEO.test.jsx',
      'src/pages/About.jsx',
      'src/pages/Home.jsx',
      'src/pages/NotFound.jsx',
      'src/pages/__tests__/Home.test.jsx',
      'src/pages/__tests__/NotFound.test.jsx',
    ];

    expect(packageJson.dependencies).not.toHaveProperty('react-router-dom');
    expect(packageJson.dependencies['react-router']).toBe('^8.3.0');
    expect(packageJson.dependencies.react).toBe('^19.2.8');
    expect(packageJson.dependencies['react-dom']).toBe('^19.2.8');
    expect(packageJson.engines.node).toBe('>=22.22.0');

    routerConsumers.forEach((sourcePath) => {
      expect(readSource(sourcePath)).not.toContain('react-router-dom');
    });
  });

  it('keeps unreachable WebGL experiments out of the production repository', () => {
    [
      'src/components/Lightfall.jsx',
      'src/components/Lightfall.css',
      'src/components/LiquidEther.jsx',
      'src/components/LiquidEther.css',
    ].forEach((sourcePath) => {
      expect(existsSync(resolve(sourcePath))).toBe(false);
    });
  });

  it('keeps the shared header visible while lifting slightly on downward scroll', () => {
    const header = readSource('src/components/Header.css');
    const headerPage = readSource('src/components/Header.jsx');

    expect(header).toMatch(
      /\.header-container\s*{[^}]*min-height:\s*76px;[^}]*padding:\s*0 1\.5rem;/s,
    );
    expect(header).toMatch(
      /\.logo-image\s*{[^}]*height:\s*48px;/s,
    );
    expect(header).toMatch(
      /@media\s*\(max-width:\s*1039px\)\s*{[\s\S]*?\.header-container\s*{[^}]*min-height:\s*72px;[\s\S]*?\.logo-image\s*{[^}]*height:\s*44px;/s,
    );
    expect(header).not.toContain('.header-scrolled .header-container');
    expect(header).not.toContain('.header-scrolled .logo-image');
    expect(header).toMatch(
      /\.header-lifted\s*{[^}]*transform:\s*translate3d\(0,\s*-0\.5rem,\s*0\);/s,
    );
    expect(header).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.header-lifted\s*{[^}]*transform:\s*translate3d\(0,\s*-0\.375rem,\s*0\);/s,
    );
    expect(header).not.toContain('pointer-events: none');
    expect(header).toMatch(
      /\.header\s*{[^}]*transition:[^}]*transform 280ms cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\),/s,
    );
    expect(header).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.header,[\s\S]*?\.logo-image\s*{[^}]*transition:\s*none;/s,
    );
    expect(headerPage).toContain(
      "window.addEventListener('scroll', handleScroll, { passive: true })",
    );
    expect(headerPage).toContain("isLifted ? 'header-lifted' : ''");
    expect(headerPage).toContain('requestAnimationFrame');
  });

  it('uses one 1040px header navigation breakpoint in JavaScript and CSS', () => {
    const header = readSource('src/components/Header.css');
    const headerPage = readSource('src/components/Header.jsx');

    expect(headerPage).toContain('const DESKTOP_NAV_MIN_WIDTH = 1040;');
    expect(headerPage).toContain('window.innerWidth >= DESKTOP_NAV_MIN_WIDTH');
    expect(header).toMatch(
      /@media\s*\(max-width:\s*1039px\)\s*{[\s\S]*?\.desktop-nav,\s*\.desktop-right-controls\s*{[^}]*display:\s*none;[\s\S]*?\.mobile-controls\s*{[^}]*display:\s*flex;/s,
    );
  });

  it('uses numbers only for the named Home process sequence', () => {
    const homePage = readSource('src/pages/Home.jsx');
    const processSteps = readSource('src/components/home/ProcessSteps.jsx');

    expect(homePage).not.toContain("marker: '01'");
    expect(homePage).not.toContain('className="service-marker"');
    expect(homePage).not.toMatch(/return on every rupee/i);
    expect(processSteps).toContain('Step {Number(step.number)}');
  });

  it('uses a responsive, text-led direction framework on About', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).toContain('const directionCards = [');
    expect(aboutPage).not.toContain("number: '01'");
    expect(aboutPage).toContain("label: 'Long-term direction'");
    expect(aboutPage).toContain("label: 'Our mandate'");
    expect(aboutPage).toContain("label: 'Operating principles'");
    expect(aboutPage).toContain("title: 'Vision'");
    expect(aboutPage).toContain(
      'To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.',
    );
    expect(aboutPage).toContain(
      'Evidence guides our recommendations. We define scope, responsibilities, and measures clearly, communicate decisions honestly, and carry agreed work through with care.',
    );
    expect(aboutPage).toContain('directionCards.map((card, index)');
    expect(aboutPage).not.toContain('card.items');
    expect(aboutCss).not.toContain('.direction-values-');
    expect(aboutPage).not.toContain("from 'lucide-react'");
    expect(aboutCss).toMatch(
      /\.direction-grid\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\);/s,
    );
    expect(aboutCss).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.direction-grid\s*{[^}]*grid-template-columns:\s*1fr;/s,
    );
    expect(aboutCss).not.toContain('.direction-card:hover');
    expect(aboutPage).toContain('const aboutHeroImages = [');
    expect(aboutPage.match(/id: 'about-(?:primary|02)'/g)).toHaveLength(2);
    expect(aboutPage).toContain('<RotatingHeroMedia');
    expect(aboutCss).toMatch(/\.about-hero\s*{[^}]*min-height:\s*38rem;/s);
    expect(aboutCss).not.toContain('@keyframes subtleZoom');
    expect(aboutCss).toMatch(
      /\.direction-section\s*{[^}]*padding:\s*6\.5rem 0;/s,
    );
    expect(aboutCss).toMatch(
      /#direction-title\s*{[^}]*margin-bottom:\s*3rem;[^}]*font-size:\s*clamp\(2\.5rem,\s*4vw,\s*3\.25rem\);/s,
    );
    expect(aboutCss).toMatch(/\.direction-grid\s*{[^}]*gap:\s*1\.75rem;/s);
    expect(aboutCss).toMatch(/\.direction-card\s*{[^}]*padding:\s*2\.5rem;/s);
  });

  it('uses a spacious vertical Contact page with peer information cards', () => {
    const contactPage = readSource('src/pages/Contact.jsx');
    const contactCss = readSource('src/pages/Contact.css');
    const formMessages = readSource('src/utils/formMessages.js');
    const indexCss = readSource('src/index.css');

    expect(contactPage).toContain('className="contact-hero"');
    expect(contactPage).toContain('className="contact-hero-picture"');
    expect(contactPage).toContain('className="contact-hero-image"');
    expect(contactPage).toContain('className="section contact-information-section"');
    expect(contactPage).toContain('className="contact-info-grid"');
    expect(contactPage.match(/className="contact-info-card"/g)).toHaveLength(3);
    expect(contactPage).toContain('className="section contact-enquiry-section"');
    expect(contactPage).toContain('className="contact-enquiry-header"');
    expect(contactPage).toContain('>General enquiry</h2>');
    expect(contactPage).toContain('>Contact details</h2>');
    expect(contactPage).toContain('>Phone</h3>');
    expect(contactPage).toContain('>Email</h3>');
    expect(contactPage).toContain('Message received');
    expect(contactPage).toContain('FORM_SUBMISSION_ERROR');
    expect(contactPage).toContain('<span className="section-subtitle">Contact</span>');
    expect(contactPage).toContain('>Start a conversation.</h1>');
    expect(contactPage).not.toContain('contact-detail-icon');
    expect(contactPage).not.toContain('contact-enquiry-surface');
    expect(contactPage).toContain('className="contact-privacy-notice"');
    expect(contactPage).not.toContain('className="glow-bg"');
    expect(formMessages).toContain(
      "'We could not send your message right now. Please try again or contact us by email.'",
    );
    expect(formMessages).not.toMatch(/access key|Web3Forms|environment/i);
    expect(indexCss).not.toContain('.glow-bg');
    expect(indexCss).not.toContain('.glow-circle');
    expect(indexCss).not.toContain('pulseSlow');
    expect(contactCss).toMatch(/\.contact-hero\s*{[^}]*min-height:\s*22rem;[^}]*background:\s*var\(--text-heading\);/s);
    expect(contactCss).toMatch(/\.contact-hero-picture\s*{[^}]*position:\s*absolute;[^}]*inset:\s*0;/s);
    expect(contactCss).toMatch(/\.contact-hero::after\s*{[^}]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.56\);/s);
    expect(contactCss).toMatch(/\.contact-title\s*{[^}]*color:\s*var\(--accent\);/s);
    expect(contactCss).toMatch(/\.contact-information-section\s*{[^}]*padding:\s*5rem 0;/s);
    expect(contactCss).toMatch(/\.contact-info-grid\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);[^}]*gap:\s*1\.5rem;/s);
    expect(contactCss).toMatch(/\.contact-info-card\s*{[^}]*min-height:\s*14rem;[^}]*padding:\s*2\.5rem;[^}]*border:\s*1px solid var\(--border-color\);[^}]*border-top:\s*3px solid var\(--accent\);[^}]*background:\s*#ffffff;[^}]*box-shadow:\s*0 18px 50px rgba\(32,\s*24,\s*8,\s*0\.08\);/s);
    expect(contactCss).toMatch(/\.contact-info-summary\s*{[^}]*font-size:\s*clamp\(1\.25rem,\s*1\.8vw,\s*1\.5rem\);[^}]*font-weight:\s*800;/s);
    expect(contactCss).toMatch(/\.contact-enquiry-section\s*{[^}]*padding:\s*6rem 0;/s);
    expect(contactCss).toMatch(/\.contact-enquiry-layout\s*{[^}]*max-width:\s*800px;/s);
    expect(contactCss).toMatch(
      /\.contact-form-panel\s*{[^}]*padding:\s*2\.5rem;[^}]*border:\s*1px solid var\(--border-color\);[^}]*background:\s*#ffffff;[^}]*box-shadow:\s*var\(--shadow-surface\);/s,
    );
    expect(contactCss).toMatch(/\.contact-form-panel textarea\.form-input\s*{[^}]*min-height:\s*9rem;/s);
    expect(contactCss).not.toMatch(/max-height:\s*760px/);
    expect(contactCss).not.toContain('.contact-main-section');
    expect(contactCss).toMatch(/@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.contact-info-grid\s*{[^}]*grid-template-columns:\s*1fr;/s);
  });

  it('keeps interior hero copy to one supporting line with deliberate spacing', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const brandsPage = readSource('src/pages/Brands.jsx');
    const servicePage = readSource('src/components/ServicePage.jsx');
    const aboutCss = readSource('src/pages/About.css');
    const brandsCss = readSource('src/pages/Brands.css');
    const serviceCss = readSource('src/components/ServicePage.css');

    expect(aboutPage).not.toContain('className="about-intro-text"');
    expect(brandsPage).not.toContain('className="brands-description"');
    expect(servicePage).not.toContain('heroDescription');
    expect(servicePage).not.toContain('className="domain-description"');
    expect(aboutCss).toMatch(/\.about-subtitle\s*{[^}]*margin:\s*0 auto 3rem;/s);
    expect(brandsCss).toMatch(/\.brands-tagline\s*{[^}]*margin:\s*0 auto 3rem;/s);
    expect(serviceCss).toMatch(/\.domain-subtitle\s*{[^}]*margin:\s*0 auto 3rem;/s);
  });

  it('uses route-owned form layout and state class names', () => {
    const contactPage = readSource('src/pages/Contact.jsx');
    const modalPage = readSource('src/components/WorkWithUsModal.jsx');

    expect(contactPage).toContain('contact-form-row');
    expect(contactPage).toContain('contact-submit-btn');
    expect(modalPage).toContain('work-modal-form-row');
    expect(modalPage).toContain('work-modal-submit-btn');
  });

  it('presents four alternating About journey stories with original imagery', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    for (const year of ['2023', '2024', '2025', '2026']) {
      expect(aboutPage).toContain(`about-journey-${year}.webp`);
    }
    expect(aboutPage).toContain('const journeyMilestones = [');
    expect(aboutPage).toContain('journeyMilestones.map((milestone, index)');
    expect(aboutPage).toContain(
      "index % 2 === 1 ? 'journey-story--reverse' : ''",
    );
    expect(aboutPage).toContain('className="journey-story-media"');
    expect(aboutPage).toContain('className="journey-story-copy"');
    expect(aboutPage).not.toContain('timeline-badge');
    expect(aboutPage).not.toContain('timeline-container');
    expect(aboutCss).toMatch(
      /\.journey-story\s*{[^}]*display:\s*grid;[^}]*grid-template-areas:\s*"media copy";/s,
    );
    expect(aboutCss).toMatch(
      /\.journey-story--reverse\s*{[^}]*grid-template-areas:\s*"copy media";/s,
    );
    expect(aboutCss).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.journey-story,[\s\S]*?\.journey-story--reverse\s*{[^}]*grid-template-areas:\s*"media"\s*"copy";/s,
    );
  });

  it('keeps the desktop Home hero at least one available viewport tall', () => {
    const home = readSource('src/pages/Home.css');

    expect(home).toMatch(
      /\.home-page\s*{[^}]*padding-top:\s*4\.75rem;/s,
    );
    expect(home).toMatch(
      /\.home-hero\s*{[^}]*min-height:\s*max\(42rem,\s*calc\(100svh\s*-\s*4\.75rem\)\);/s,
    );
    expect(home).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.home-hero\s*{[^}]*min-height:\s*auto;/s,
    );
  });

  it('uses the approved Home hero hierarchy without a duplicate final CTA', () => {
    const home = readSource('src/pages/Home.css');
    const homePage = readSource('src/pages/Home.jsx');

    expect(home).toMatch(
      /\.home-hero::after\s*{[^}]*background:\s*transparent;/s,
    );
    expect(home).toMatch(
      /\.home-hero-layout\s*{[^}]*display:\s*flex;[^}]*justify-content:\s*center;[^}]*padding-block:\s*clamp\(4\.5rem,\s*8vw,\s*7rem\)\s+clamp\(7rem,\s*12vw,\s*9\.5rem\);/s,
    );
    expect(home).toMatch(
      /\.home-hero-content\s*{[^}]*position:\s*relative;[^}]*isolation:\s*isolate;[^}]*width:\s*min\(100%,\s*68rem\);[^}]*text-align:\s*center;[^}]*text-shadow:\s*0 2px 16px rgba\(0,\s*0,\s*0,\s*0\.88\);/s,
    );
    expect(home).toMatch(
      /\.home-hero-content::before\s*{[^}]*position:\s*absolute;[^}]*z-index:\s*-1;[^}]*inset:\s*-3\.5rem -5rem;[^}]*background:\s*radial-gradient\([^}]*content:\s*'';/s,
    );
    expect(home).toMatch(
      /\.hero-capabilities-link\s*{[^}]*background:\s*rgba\(8,\s*8,\s*8,\s*0\.26\);[^}]*backdrop-filter:\s*blur\(3px\);/s,
    );
    expect(home).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.home-hero-content::before\s*{[^}]*inset:\s*-2rem -0\.75rem;[^}]*background:\s*radial-gradient\(/s,
    );
    expect(home).toMatch(
      /\.hero-title\s*>\s*span\s*{[^}]*display:\s*block;/s,
    );
    expect(home).toMatch(
      /\.hero-subhead\s*{[^}]*max-width:\s*62ch;[^}]*margin:\s*0 auto 2\.75rem;[^}]*font-size:\s*clamp\(1\.125rem,\s*1\.65vw,\s*1\.375rem\);[^}]*line-height:\s*1\.65;/s,
    );
    expect(home).toMatch(/\.hero-title\s*{[^}]*color:\s*#fff;/s);
    expect(homePage).not.toContain(
      "import { openWorkModal } from '../utils/workModal';",
    );
    expect(homePage).not.toContain("openWorkModal('homepage-hero')");
    expect(homePage).toContain('We deliver disciplined market execution.');
    expect(homePage).toContain('href="#capabilities"');
    expect(homePage).toContain('id="capabilities"');
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

  it('uses original responsive editorial imagery for Home and Marketing', () => {
    const homePage = readSource('src/pages/Home.jsx');
    const marketingPage = readSource('src/pages/Marketing.jsx');
    const pageShell = readSource('index.html');

    expect(homePage).not.toContain('const homeHeroImages = [');
    expect(homePage).not.toContain('<RotatingHeroMedia');
    expect(homePage).toContain('className="home-hero-media"');
    expect(homePage).toContain('className="home-hero-image"');
    expect(homePage).toContain('home-rotation-03-960.webp');
    expect(homePage).toContain('home-rotation-03-1440.webp');
    expect(homePage).toContain('home-rotation-03-mobile.webp');
    expect(homePage).toContain('loading="eager"');
    expect(homePage).toContain('fetchPriority="high"');
    expect(homePage).not.toContain('dspl_banner.webp');
    expect(homePage).not.toContain('dspl_banner-mobile.webp');
    expect(marketingPage).toContain('marketing-primary-960.webp');
    expect(marketingPage).toContain('marketing-primary-1440.webp');
    expect(marketingPage).toContain('marketing-primary-mobile.webp');
    expect(marketingPage).not.toContain('Marketing_hero_section');
    expect(pageShell).toContain(
      'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
    );
    expect(pageShell).not.toContain('Indian consumer businesses');
    expect(pageShell).not.toContain('dspl-home-editorial-1440.webp');
    expect(pageShell).not.toContain('dspl-home-editorial-mobile.webp');
    expect(pageShell).not.toContain('dspl_banner.webp');
    expect(pageShell).not.toContain('dspl_banner-mobile.webp');
  });

  it('keeps the owned-brand section focused on its distinct brand action', () => {
    const ownedBrand = readSource('src/components/home/OwnedBrandProof.jsx');
    const homePage = readSource('src/pages/Home.jsx');

    expect(ownedBrand).toContain('See the brand');
    expect(ownedBrand).not.toContain('Build with us');
    expect(ownedBrand).not.toContain('onEnquire');
    expect(homePage).not.toContain('homepage-owned-brand');
  });

  it('reserves execution language for the primary Home proposition', () => {
    const homeAndAbout = [
      readSource('src/pages/Home.jsx'),
      readSource('src/pages/About.jsx'),
      readSource('src/components/home/ProcessSteps.jsx'),
    ].join('\n');

    expect(homeAndAbout.match(/\bexecution\b/gi)).toHaveLength(1);
    expect(homeAndAbout).toContain('We deliver disciplined market execution.');
    expect(homeAndAbout).toContain('Delivery framework');
  });

  it('keeps the About journey inside the approved editorial section', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).not.toContain("import dsplImg from '../assets/dspl_img.jpg'");
    expect(aboutPage).not.toContain("'--about-story-image'");
    expect(aboutCss).not.toContain('background-image: var(--about-story-image)');
    expect(aboutCss).not.toContain('.timeline-section::before');
    expect(aboutCss).toMatch(
      /#story,\s*#timeline,\s*#team\s*{[^}]*scroll-margin-top:\s*5\.25rem;/s,
    );
    expect(aboutCss).toMatch(
      /\.timeline-section\s*{[^}]*background:\s*var\(--bg-secondary\);[^}]*border-block:\s*1px solid var\(--border-color\);/s,
    );
    expect(aboutPage).toContain('className="journey-stories"');
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
      /\.supporter-track-running\s*{[^}]*animation:\s*supporter-marquee 28s linear infinite;[^}]*will-change:\s*transform;/s,
    );
    expect(homeSections).toMatch(
      /@keyframes supporter-marquee\s*{[\s\S]*?from\s*{[^}]*transform:\s*translate3d\(0,\s*0,\s*0\);[^}]*}[\s\S]*?to\s*{[^}]*transform:\s*translate3d\(var\(--supporter-shift\),\s*0,\s*0\);/s,
    );
    expect(homeSections).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.supporter-track-running\s*{[^}]*animation:\s*none;/s,
    );
    expect(homeSections).toContain('--supporter-gap: 7rem;');
    expect(homeSections).not.toContain('--supporter-slot-width');
    expect(homeSections).toMatch(
      /\.supporter-logo-slot\s*{[^}]*width:\s*auto;[^}]*height:\s*var\(--supporter-slot-height\);/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo\s*{[^}]*width:\s*auto;[^}]*height:\s*100%;[^}]*object-fit:\s*contain;[^}]*transform:\s*none;[^}]*filter:\s*none;[^}]*opacity:\s*1;/s,
    );
    expect(homeSections).not.toContain('drop-shadow(');
    expect(homeSections).not.toMatch(/\.supporter-logo\s*{[^}]*transition:/s);
    expect(homeSections).not.toContain('.supporter-logo:hover');
    expect(homeSections).not.toMatch(/\.supporter-logo-(?:dst|nidhi|mutbi|startup)\s*{/);
    expect(homeSections).not.toContain('--supporter-optical-trim');
    expect(homeSections).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?--supporter-gap:\s*5rem;/s,
    );
    expect(supporter).not.toContain('supporter-track-paused');
    expect(supporter).not.toContain('Pause supporter logos');
    expect(supporter).not.toContain('Resume supporter logos');
    expect(homeSections).not.toContain('.supporter-motion-control');
    expect(homeSections).toContain('--supporter-edge-guard:');
    expect(homePage).toContain(
      "alt: 'DST NIDHI', className: 'supporter-logo-dst'",
    );
    expect(homePage).toContain(
      "alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi'",
    );
    const marqueeSupporters = [
      ['supporter-dst-nidhi-marquee.png', 186],
      ['supporter-nidhi-prayas-marquee.png', 113],
      ['supporter-mutbi-marquee.png', 300],
      ['supporter-startup-karnataka-marquee.png', 260],
    ];
    marqueeSupporters.forEach(([asset, width]) => {
      expect(homePage).toContain(asset);
      expect(readPngSize(`src/assets/${asset}`)).toEqual({
        width,
        height: 96,
      });
    });
    expect(homePage).not.toContain(
      "from '../assets/supporter-nidhi-prayas.webp'",
    );
    expect(homePage).not.toContain(
      "from '../assets/supporter-mutbi.webp'",
    );
    expect(homePage).not.toContain(
      "from '../assets/supporter-startup-karnataka.webp'",
    );
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
    expect(brandsPage).toContain('to="/contact"');
    expect(brandsPage).toContain('Contact us about Raw Radicles');
    expect(brandsPage).not.toContain('Raw%20Radicles%20Inquiry');
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
    expect(aboutCss).not.toMatch(/\.team-card:hover\s*{/);
    expect(aboutCss).toMatch(
      /\.team-linkedin-link\s*{[^}]*top:\s*1rem;[^}]*right:\s*1rem;[^}]*width:\s*2\.25rem;[^}]*height:\s*2\.25rem;/s,
    );
    expect(aboutCss).toMatch(
      /\.team-linkedin-link:hover,\s*\.team-linkedin-link:focus-visible\s*{[^}]*transform:\s*translateY\(-2px\);/s,
    );
    expect(aboutCss).toMatch(
      /\.team-avatar-image\s*{[^}]*border-radius:\s*50%;[^}]*object-position:\s*var\(--avatar-position,\s*center\);[^}]*transform:\s*translateY\(var\(--avatar-y,\s*0\)\)\s*scale\(var\(--avatar-scale,\s*1\)\);[^}]*transform-origin:\s*var\(--avatar-origin,\s*center\);/s,
    );
    expect(aboutCss).toMatch(
      /\.team-avatar-container\s*{[^}]*background:\s*var\(--avatar-background,\s*#f3f1ec\);/s,
    );
  });

  it('uses one editorial hero statement and text-led capabilities on service pages', () => {
    const servicePage = readSource('src/components/ServicePage.jsx');
    const serviceCss = readSource('src/components/ServicePage.css');

    expect(servicePage).not.toContain('openWorkModal');
    expect(servicePage).not.toContain('heroCtaLabel');
    expect(servicePage).not.toContain('domain-cta');
    expect(servicePage).not.toContain('offer-icon-wrapper');
    expect(servicePage).toContain('{contextLabel}');
    expect(servicePage).toContain('{heroTagline}');
    expect(servicePage).not.toContain('{heroDescription}');
    expect(servicePage).toContain('className="container service-scope-layout"');
    expect(servicePage).toContain('<article key={offer.title} className="offer-entry">');
    expect(servicePage).not.toContain('<span className="section-subtitle">Services</span>');
    expect(servicePage).toContain('{faqsTitle}');
    expect(servicePage).toContain('{faqsDescription}');
    expect(servicePage).not.toContain('className="glow-bg"');
    expect(servicePage).not.toContain('matters-box');
    expect(servicePage).toContain('heroImages');
    expect(servicePage).toContain('<RotatingHeroMedia');
    expect(serviceCss).toMatch(
      /\.domain-hero\s*{[^}]*display:\s*grid;[^}]*min-height:\s*38rem;[^}]*place-items:\s*center;[^}]*padding:\s*5rem 0;/s,
    );
    expect(serviceCss).toMatch(
      /\.domain-title\s*{[^}]*color:\s*var\(--accent\);/s,
    );
    expect(serviceCss).toMatch(
      /\.domain-hero \.section-subtitle\s*{[^}]*color:\s*rgba\(255,\s*255,\s*255,\s*0\.72\);/s,
    );
    expect(serviceCss).toMatch(
      /\.domain-subtitle\s*{[^}]*color:\s*#ffffff;/s,
    );
    expect(serviceCss).toMatch(
      /\.offers-grid\s*{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);[^}]*border-top:\s*1px solid var\(--border-color\);/s,
    );
    expect(serviceCss).toMatch(
      /\.offer-entry\s*{[^}]*padding:\s*2rem 0;[^}]*border-bottom:\s*1px solid var\(--border-color\);/s,
    );
    expect(serviceCss).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.domain-hero\s*{[^}]*min-height:\s*34rem;[^}]*padding:\s*4rem 0;[\s\S]*?\.offers-grid\s*{[^}]*grid-template-columns:\s*1fr;/s,
    );
    expect(serviceCss).not.toMatch(/\.offer-card\s*\{/);
    expect(serviceCss).not.toContain('.offer-icon-wrapper');
  });

  it('keeps the Header as the sole global Work With Us modal owner', () => {
    const header = readSource('src/components/Header.jsx');
    const brands = readSource('src/pages/Brands.jsx');
    const home = readSource('src/pages/Home.jsx');
    const servicePage = readSource('src/components/ServicePage.jsx');

    expect(header).toContain("openWorkModal('header')");
    expect(brands).not.toContain('openWorkModal');
    expect(home).not.toContain('openWorkModal');
    expect(servicePage).not.toContain('openWorkModal');
    expect(brands).toContain('to="/contact"');
    expect(brands).toContain('Contact us about a brand partnership');
  });

  it('builds a noindex production 404 without a catch-all 200 rewrite', () => {
    const viteConfig = readSource('vite.config.js');
    const prerenderEntry = readSource('src/entry-prerender.jsx');
    const verifier = readSource('scripts/verify-prerender.mjs');
    const indexHtml = readSource('index.html');

    expect(viteConfig).toContain(
      "additionalPrerenderRoutes: ['/privacy', '/404.html']",
    );
    expect(prerenderEntry).toContain('NOT_FOUND_METADATA');
    expect(prerenderEntry).toContain("name: 'robots'");
    expect(verifier).toContain("path.join('dist', '404.html')");
    expect(verifier).toContain('prerendered public routes and a production 404 page.');
    // Audit improvement: index.html now has a robots meta as SEO fallback
    // The tag provides a static baseline before JS hydration, overridden per-route by useSEO
    expect(indexHtml).toContain('<meta name="robots" content="index, follow"');
    expect(existsSync(resolve('public/_redirects'))).toBe(false);
  });

  it('does not publish production source maps', () => {
    const viteConfig = readSource('vite.config.js');

    expect(viteConfig).toContain('sourcemap: false');
    expect(viteConfig).not.toContain("sourcemap: 'hidden'");
  });

  it('tiers About page motion for reduced-motion visitors', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');
    const rotatingHeroCss = readSource('src/components/RotatingHeroMedia.css');

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
    expect(aboutCss).not.toContain('@keyframes subtleZoom');
    expect(rotatingHeroCss).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.rotating-hero-layer\s*{[^}]*transition:\s*none;/s,
    );
  });

  it('removes the tertiary About hero paragraph and its obsolete layout rules', () => {
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutCss).not.toContain('.about-intro-grid');
    expect(aboutCss).not.toContain('.about-intro-text');
  });

  it('presents Brands as a restrained portfolio in development', () => {
    const brandsPage = readSource('src/pages/Brands.jsx');
    const brandsCss = readSource('src/pages/Brands.css');
    const prerenderVerification = readSource('scripts/verify-prerender.mjs');

    expect(brandsPage).toContain('DSPL Brands');
    expect(brandsPage).toContain('We develop and operate consumer brands.');
    expect(brandsPage).not.toContain(
      'We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.',
    );
    expect(brandsPage).toContain('Portfolio in development');
    expect(brandsPage).toContain(
      'Additional consumer-brand concepts are being evaluated and developed. We will publish them here when they are ready for market.',
    );
    expect(brandsPage).not.toContain('Sparkles');
    expect(brandsPage).not.toContain('Cookie');
    expect(brandsPage).not.toContain('HOUSE OF BRANDS');
    expect(brandsPage).not.toContain('inside out');
    expect(brandsPage).not.toContain('glow-bg');
    expect(brandsPage).not.toContain('pipeline-decorative-shape');
    expect(brandsCss).not.toContain('.pipeline-card:hover');
    expect(prerenderVerification).toContain(
      "{ route: 'brands', heading: 'We develop and operate consumer brands.' }",
    );
  });

  it('keeps one global pre-footer CTA above compact corporate information', () => {
    const footer = readSource('src/components/Footer.jsx');
    const footerCss = readSource('src/components/Footer.css');
    const homeCss = readSource('src/pages/Home.css');

    expect(footer).not.toContain('footer-banner');
    expect(footer).not.toContain('Ready to build something that lasts?');
    expect(footer).not.toContain('Innovating Today for a Smarter Tomorrow');
    expect(footer).not.toContain('ArrowUpRight');
    expect(footer).not.toContain('openWorkModal');
    expect(footer).not.toContain('Get in Touch');
    expect(footer).toContain('className="footer-cta-strip"');
    expect(footer).toContain('Ready to build with greater clarity?');
    expect(footer).toContain('Contact DSPL');
    expect(footer).toContain(
      'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
    );
    expect(footer).toContain('>Services</h2>');
    expect(footer).toContain('>Contact</h2>');
    expect(footer).toContain('>Privacy Policy</Link>');
    expect(footerCss).not.toContain('.footer-banner');
    expect(footerCss).not.toContain('.banner-content');
    expect(footerCss).not.toContain('.banner-title');
    expect(footerCss).not.toContain('.banner-text');
    expect(footerCss).not.toContain('.banner-btn');
    expect(homeCss).not.toContain('.home-mid-cta');
    expect(footerCss).toMatch(
      /\.footer\s*{[^}]*padding:\s*4rem 0 2rem;/s,
    );
    expect(footerCss).toMatch(
      /\.footer-grid\s*{[^}]*padding-bottom:\s*3rem;/s,
    );
    expect(footerCss).toMatch(
      /@media\s*\(max-width:\s*576px\)\s*{[\s\S]*?\.footer-bottom\s*{[^}]*flex-direction:\s*column;[^}]*align-items:\s*flex-start;[^}]*gap:\s*1rem;/s,
    );
  });

  it('references the generated icon set and optimized production assets', () => {
    const indexHtml = readSource('index.html');
    const header = readSource('src/components/Header.jsx');
    const footer = readSource('src/components/Footer.jsx');
    const about = readSource('src/pages/About.jsx');
    const manifest = JSON.parse(readSource('public/site.webmanifest'));

    expect(indexHtml).toContain('href="/favicon-16.png"');
    expect(indexHtml).toContain('href="/favicon-32.png"');
    expect(indexHtml).toContain('href="/apple-touch-icon.png"');
    expect(indexHtml).toContain('href="/site.webmanifest"');
    expect(indexHtml).toContain('<meta name="theme-color" content="#111111"');
    expect(indexHtml).not.toContain('href="/favicon.png"');
    expect(manifest).toMatchObject({
      name: 'Dashapatmaja Solutions Pvt Ltd',
      short_name: 'DSPL',
      start_url: '/',
      display: 'standalone',
    });
    expect(manifest.icons).toEqual([
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ]);
    for (const path of [
      'public/favicon-16.png',
      'public/favicon-32.png',
      'public/apple-touch-icon.png',
      'public/icon-192.png',
      'public/icon-512.png',
    ]) {
      expect(existsSync(resolve(path))).toBe(true);
    }
    expect(header).toContain("import logoImg from '../assets/icon_orange.webp';");
    expect(footer).toContain("import logoImg from '../assets/icon_orange.webp';");
    expect(about).toContain("import manuImg from '../assets/manu_pro_fixed.webp';");
    expect(about).not.toContain('manu_pro_fixed.jpg');
  });
});
