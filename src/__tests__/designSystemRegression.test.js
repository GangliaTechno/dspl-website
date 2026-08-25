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

  it('normalizes responsive display type, touch targets, and proof rail', () => {
    const home = readSource('src/pages/Home.css');
    const header = readSource('src/components/Header.css');
    const supporter = readSource('src/components/home/SupporterStrip.jsx');

    expect(home).toMatch(
      /\.hero-title-main\s*{[^}]*font-size:\s*clamp\(3\.25rem,\s*5\.8vw,\s*6\.25rem\);/s,
    );
    expect(header).toMatch(
      /\.mobile-menu-btn\s*{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/s,
    );
    expect(supporter).toContain('className="supporter-rail"');
  });

  it('does not move shared buttons when touch devices emulate hover', () => {
    const tokens = readSource('src/index.css');
    const pointerHoverStart = tokens.indexOf('@media (hover: hover) and (pointer: fine)');
    const pointerHoverEnd = tokens.indexOf('/* Forms */', pointerHoverStart);
    const touchSafeCss = tokens.slice(0, pointerHoverStart);
    const pointerHoverCss = tokens.slice(pointerHoverStart, pointerHoverEnd);

    expect(pointerHoverStart).toBeGreaterThan(-1);
    expect(touchSafeCss).not.toContain('.btn-primary:hover');
    expect(touchSafeCss).not.toContain('.btn-secondary:hover');
    expect(pointerHoverCss).toContain('.btn-primary:hover');
    expect(pointerHoverCss).toContain('.btn-secondary:hover');
    expect(pointerHoverCss).toContain('transform: translateY(-2px);');
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

  it('keeps the shared header full size at top and morphs into a floating compact shell on scroll', () => {
    const header = readSource('src/components/Header.css');
    const headerPage = readSource('src/components/Header.jsx');

    expect(header).toMatch(
      /\.header-container\s*{[^}]*min-height:\s*76px;[^}]*padding:\s*0 1\.5rem;/s,
    );
    expect(header).toMatch(
      /\.logo-image\s*{[^}]*height:\s*48px;/s,
    );
    expect(header).toMatch(
      /\.header-scrolled \.header-container\s*{[^}]*width:\s*min\(calc\(100% - 2rem\),\s*var\(--max-width\)\);[^}]*min-height:\s*64px;[^}]*border-radius:\s*14px;/s,
    );
    expect(header).toMatch(
      /@media\s*\(max-width:\s*1039px\)\s*{[\s\S]*?\.header-container\s*{[^}]*min-height:\s*72px;[^}]*padding:\s*0 1\.25rem;[\s\S]*?\.logo-image\s*{[^}]*height:\s*44px;/s,
    );
    expect(header).toMatch(
      /\.header-scrolled \.logo-image\s*{[^}]*transform:\s*scale\(0\.92\);/s,
    );
    expect(header).toMatch(
      /\.header\s*{[^}]*transition:[^}]*transform 360ms cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\),/s,
    );
    expect(header).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.header,[\s\S]*?\.header-container,[\s\S]*?\.logo-image,[\s\S]*?\.mobile-drawer\s*{[^}]*transition:\s*none;/s,
    );
    expect(headerPage).toContain(
      "window.addEventListener('scroll', handleScroll, { passive: true })",
    );
    expect(headerPage).toContain("scrolled ? 'header-scrolled' : ''");
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

  it('keeps the rebuilt header navigation semantic, compact, and motion restrained', () => {
    const navigation = readSource('src/content/headerNavigation.js');
    const header = readSource('src/components/Header.jsx');
    const css = readSource('src/components/Header.css');
    const design = readSource('DESIGN.md');
    const panelBlock = css.match(/\.desktop-disclosure-panel\s*{[^}]*}/s)?.[0] ?? '';

    expect(navigation).toContain("label: 'Company'");
    expect(navigation).toContain("label: 'Capabilities'");
    expect(navigation).toContain("label: 'Insights'");
    expect(header).not.toMatch(/role\s*=\s*["']menu/);
    expect(header).not.toMatch(/onMouse(?:Enter|Over)/);
    expect(panelBlock).toMatch(/width:\s*360px;/);
    expect(panelBlock).toMatch(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.988\)/);
    expect(panelBlock).not.toContain('backdrop-filter');
    expect(css).toContain('animation: desktop-disclosure-enter 160ms');
    expect(css).toMatch(/@keyframes desktop-disclosure-enter\s*{[\s\S]*?opacity:\s*0;[\s\S]*?translateY\(-6px\)/);
    expect(css).toMatch(/\.nav-panel-description\s*{[^}]*white-space:\s*nowrap;/s);
    expect(css).toMatch(/\.nav-disclosure-button:hover\s*{[^}]*color:\s*var\(--accent-text\);/s);
    expect(css).toMatch(/\.nav-panel-link:hover\s*{[^}]*background-color:/s);
    expect(css).toMatch(/\.mobile-group-button\s*{[^}]*min-height:\s*44px;/s);
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.desktop-disclosure-panel,[\s\S]*?\.mobile-sublist[\s\S]*?animation:\s*none;/s,
    );
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\.nav-disclosure-caret[\s\S]*?transition:\s*none;/s,
    );
    expect(design).not.toContain('"Work With Us" primary CTA');
    expect(design).toContain('Company/Capabilities click disclosures');
    expect(design).toContain('direct Insights/Contact');
    expect(design).toContain('360px opaque editorial panels');
    expect(design).toContain('shared mobile accordions');
    expect(design).toContain('hierarchical current states');
    expect(design).toContain('160ms');
  });

  it('uses numbers only for the named Home process sequence', () => {
    const homePage = readSource('src/pages/Home.jsx');
    const processSteps = readSource('src/components/home/ProcessSteps.jsx');

    expect(homePage).not.toContain("marker: '01'");
    expect(homePage).not.toContain('className="service-marker"');
    expect(homePage).not.toMatch(/return on every rupee/i);
    expect(processSteps).toContain('{step.number}');
  });

  it('uses a responsive, text-led direction framework on About', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).toContain('const directionCards = [');
    expect(aboutPage).not.toContain("number: '01'");
    expect(aboutPage).toContain("title: 'Vision'");
    expect(aboutPage).toContain("title: 'Mission'");
    expect(aboutPage).toContain("title: 'Values'");
    expect(aboutPage).toContain("label: 'Long-term direction'");
    expect(aboutPage).toContain("label: 'Our mandate'");
    expect(aboutPage).toContain("label: 'Operating principles'");
    expect(aboutPage).toContain(
      'To build a portfolio of Indian consumer brands that earn shelf space on quality',
    );
    expect(aboutPage).toContain(
      'We quote what the work costs, not what the client hopes it costs',
    );
    expect(aboutPage).toContain('directionCards.map((card, index)');
    expect(aboutPage).not.toContain('card.items');
    expect(aboutCss).not.toContain('.direction-values-');
    expect(aboutPage).not.toContain("from 'lucide-react'");
    expect(aboutCss).toMatch(
      /\.direction-grid\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/s,
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
      /\.direction-section\s*{[^}]*padding-block:\s*4\.5rem 2rem;/s,
    );
    expect(aboutCss).toMatch(
      /#direction-title\s*{[^}]*margin-bottom:\s*2\.5rem;[^}]*font-size:\s*clamp\(2\.25rem,\s*3\.5vw,\s*3rem\);/s,
    );
    expect(aboutCss).toMatch(/\.direction-grid\s*{[^}]*gap:\s*0;/s);
    expect(aboutCss).toMatch(/\.direction-card\s*{[^}]*padding:\s*2\.4rem 1\.75rem 2\.25rem;/s);
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
    expect(contactPage).toContain('>Office</span>');
    expect(contactPage).toContain('>New enquiries</span>');
    expect(contactPage).toContain('>Existing projects</span>');
    expect(contactPage).toContain('Message received');
    expect(contactPage).toContain('FORM_SUBMISSION_ERROR');
    expect(contactPage).toContain('<span className="section-subtitle">Contact</span>');
    expect(contactPage).toContain('>Start a conversation.</h1>');
    expect(contactPage).not.toContain('contact-detail-icon');
    expect(contactPage).not.toContain('contact-info-icon');
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
    expect(contactCss).toMatch(/\.contact-info-grid\s*{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);[^}]*gap:\s*0;/s);
    expect(contactCss).toMatch(/\.contact-info-card\s*{[^}]*min-height:\s*14rem;[^}]*padding:\s*2\.5rem 2rem;[^}]*border:\s*0;[^}]*background:\s*transparent;[^}]*box-shadow:\s*none;/s);
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
    const plannerForm = readSource('src/components/ProjectPlannerForm.jsx');

    expect(contactPage).toContain('contact-form-row');
    expect(contactPage).toContain('contact-submit-btn');
    expect(plannerForm).toContain('work-modal-form-row');
    expect(plannerForm).toContain('work-modal-submit-btn');
  });

  it('ensures no production source imports legacy WorkWithUsModal or workModal', () => {
    const appRoutes = readSource('src/AppRoutes.jsx');
    const errorBoundary = readSource('src/components/ErrorBoundary.jsx');

    expect(appRoutes).not.toContain('WorkWithUsModal');
    expect(appRoutes).not.toContain('workModal');
    expect(errorBoundary).not.toContain('WorkWithUsModal');
    expect(errorBoundary).not.toContain('workModal');
  });

  it('presents five alternating About journey stories with unique original imagery', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutCss = readSource('src/pages/About.css');

    for (const year of ['2022', '2023', '2024', '2025', '2026']) {
      expect(aboutPage).toContain(`about-journey-v2-${year}.webp`);
      expect(aboutPage).toContain(`year: '${year}'`);
      expect(aboutPage).toMatch(
        new RegExp(
          `year:\\s*'${year}'[\\s\\S]{0,160}?image:\\s*journey${year}Img`,
        ),
      );
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

  it('shapes the desktop Home hero with full-bleed photographic proportions', () => {
    const home = readSource('src/pages/Home.css');

    expect(home).toMatch(
      /\.home-page\s*{[^}]*padding-top:\s*4\.75rem;/s,
    );
    expect(home).toMatch(
      /\.home-hero\s*{[^}]*min-height:\s*max\(42\.5rem,\s*calc\(100svh\s*-\s*var\(--header-height/s,
    );
    expect(home).toMatch(
      /@media\s*\(max-width:\s*1039px\)\s*{[\s\S]*?\.home-hero\s*{[^}]*min-height:\s*auto;/s,
    );
  });

  it('keeps Home readable and separated across phone and tablet widths', () => {
    const home = readSource('src/pages/Home.css');
    const homePage = readSource('src/pages/Home.jsx');
    const homeSections = readSource('src/components/home/homeSections.css');

    expect(homePage).toContain('<source media="(max-width: 600px)"');
    expect(home).toMatch(
      /@media\s*\(max-width:\s*576px\)\s*{[\s\S]*?\.home-hero-actions\s*{[^}]*flex-direction:\s*column;[^}]*width:\s*min\(100%,\s*20rem\);[\s\S]*?\.home-hero-actions\s+\.btn\s*{[^}]*width:\s*100%;/s,
    );
    expect(homeSections).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.supporter-rail-inner\s*{[^}]*padding-block:\s*0\.15rem/s,
    );
    expect(home).toMatch(
      /\.compliance-support-links\s+a\s*{[^}]*min-height:\s*44px;[^}]*padding:\s*0\.5rem\s+0;/s,
    );
  });

  it('uses the approved full-bleed photographic editorial hero hierarchy without a duplicate final CTA', () => {
    const home = readSource('src/pages/Home.css');
    const homePage = readSource('src/pages/Home.jsx');

    expect(home).toMatch(
      /\.home-hero\s*{[^}]*display:\s*grid;[^}]*grid-template-rows:\s*minmax\(0,\s*1fr\)\s*auto;/s,
    );
    expect(home).toMatch(
      /\.home-hero-layout\s*{[^}]*display:\s*flex;[^}]*align-items:\s*center;[^}]*justify-content:\s*center;/s,
    );
    expect(home).toMatch(
      /\.hero-title-main\s*{[^}]*font-family:\s*var\(--font-heading\);/s,
    );
    expect(home).toMatch(
      /\.hero-title-secondary\s*{[^}]*font-family:\s*var\(--font-heading\);[^}]*font-size:\s*clamp\(2\.5rem,\s*4\.2vw,\s*4\.4rem\);/s,
    );
    expect(home).toMatch(
      /radial-gradient\(\s*ellipse at center,\s*rgba\(4,\s*7,\s*10,\s*0\.18\)/s,
    );
    expect(home).not.toContain('.hero-eyebrow');
    expect(homePage).not.toContain('className="hero-eyebrow"');
    expect(home).toMatch(
      /\.hero-subhead\s*{[^}]*max-width:\s*min\(92vw,\s*78ch\);/s,
    );
    expect(homePage).not.toContain(
      "import { openWorkModal } from '../utils/workModal';",
    );
    expect(homePage).not.toContain("openWorkModal('homepage-hero')");
    expect(homePage).toContain('We build');
    expect(homePage).toContain('consumer brands.');
    expect(homePage).toContain('We help businesses build theirs.');
    expect(homePage).toContain('product compliance support to businesses across');
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
    const routeMetadata = readSource('src/seo/routeMetadata.js');

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
    expect(routeMetadata).toContain(
      'We build our own consumer brands and help Indian businesses build theirs. Branding, marketing, e-commerce and FSSAI compliance support from Manipal.',
    );
    expect(routeMetadata).not.toContain('Indian consumer businesses');
  });

  it('keeps the homepage social-preview asset deterministic and versioned', () => {
    const generator = readSource('scripts/generate-og-card.mjs');
    const packageJson = JSON.parse(readSource('package.json'));
    const siteConfig = readSource('src/content/siteConfig.js');
    const prerenderVerifier = readSource('scripts/verify-prerender.mjs');

    expect(packageJson.scripts['generate:og']).toBe('node scripts/generate-og-card.mjs');
    expect(packageJson.scripts['verify:og']).toBe('node scripts/generate-og-card.mjs --check');
    expect(packageJson.scripts['verify:html']).toContain('npm run verify:og');
    expect(generator).toContain('home-rotation-03-1440.webp');
    expect(generator).toContain("'public', 'logo.png'");
    expect(generator).toContain('og-home-2026.jpg');
    expect(generator).toContain('geist-latin-wght-normal.woff2');
    expect(packageJson.devDependencies.fontkit).toBe('2.0.4');
    expect(generator).toContain("import * as fontkit from 'fontkit'");
    expect(generator).toContain('fontkit.create');
    expect(generator).toContain('font.layout');
    expect(generator).toContain('<path');
    expect(generator).not.toContain('<text');
    expect(generator).not.toContain('Segoe UI');
    expect(generator).not.toContain('Arial');
    expect(generator).toContain("process.argv.includes('--check')");
    expect(generator).toContain('sharp');
    expect(siteConfig).toContain('https://dashapatmaja.in/og-home-2026.jpg');
    expect(prerenderVerifier).toContain('https://dashapatmaja.in/og-home-2026.jpg');
    expect(prerenderVerifier).toContain('og:image:width');
    expect(prerenderVerifier).toContain('og:image:height');
    expect(prerenderVerifier).toContain('twitter:image:alt');
  });


  it('keeps the owned-brand section focused on its distinct brand action', () => {
    const ownedBrand = readSource('src/components/home/OwnedBrandProof.jsx');
    const homePage = readSource('src/pages/Home.jsx');

    expect(ownedBrand).toContain('Explore our brands');
    expect(ownedBrand).toContain('to="/brands"');
    expect(ownedBrand).not.toContain('Build with us');
    expect(ownedBrand).not.toContain('onEnquire');
    expect(homePage).not.toContain('homepage-owned-brand');
  });

  it('uses execution language as descriptive scope rather than a performance promise', () => {
    const homeAndAbout = [
      readSource('src/pages/Home.jsx'),
      readSource('src/pages/About.jsx'),
      readSource('src/components/home/ProcessSteps.jsx'),
    ].join('\n');

    expect(homeAndAbout).not.toContain('We deliver disciplined market execution.');
    expect(homeAndAbout).toContain('One accountable path, from audit to launch');
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

  it('aligns supporter logos in the proof rail and uses the approved warm Raw Radicles treatment', () => {
    const supporter = readSource('src/components/home/SupporterStrip.jsx');
    const homeSections = readSource('src/components/home/homeSections.css');
    const brandsCss = readSource('src/pages/Brands.css');
    const homePage = readSource('src/pages/Home.jsx');
    const brandsPage = readSource('src/pages/Brands.jsx');

    expect(supporter).toContain('className="supporter-rail"');
    expect(supporter).toContain('className="supporter-marquee-track"');
    expect(homeSections).toMatch(
      /\.supporter-marquee-track\s*{[^}]*animation:\s*supporter-marquee-anim\s*28s\s*linear\s*infinite;/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo-dst\s*{[^}]*height:\s*clamp\(54px,\s*6\.2vw,\s*66px\);/s,
    );
    expect(homeSections).toMatch(
      /\.supporter-logo\s*{[^}]*width:\s*auto;[^}]*height:\s*100%;[^}]*object-fit:\s*contain;/s,
    );
    expect(homeSections).not.toContain('.supporter-logo-mutbi');
    expect(homeSections).not.toContain('--supporter-optical-trim');
    expect(homeSections).not.toContain('.supporter-motion-control');
    expect(homePage).toContain(
      "alt: 'DST NIDHI', className: 'supporter-logo-dst'",
    );
    expect(homePage).toContain(
      "alt: 'NIDHI PRAYAS', className: 'supporter-logo-nidhi'",
    );
    expect(homePage).toContain(
      "alt: 'Startup Karnataka', className: 'supporter-logo-startup'",
    );
    expect(homePage).not.toContain('supporter-mutbi-marquee.png');
    const staticSupporters = [
      ['supporter-dst-nidhi-marquee.png', 186],
      ['supporter-nidhi-prayas-marquee.png', 113],
      ['supporter-startup-karnataka-marquee.png', 260],
    ];
    staticSupporters.forEach(([asset, width]) => {
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
    const aboutPage =
      readSource('src/pages/About.jsx') +
      '\n' +
      readSource('src/content/teamMembers.js');
    const aboutCss = readSource('src/pages/About.css');

    expect(aboutPage).toContain("transformOrigin: '50% 28%'");
    expect(aboutPage).toContain('scale: 1.9,');
    expect(aboutPage).toContain(
      "import sreeImg from '../assets/sree_pro_extended.webp';",
    );
    expect(aboutPage).not.toContain(
      "import balakrishnaImg from '../assets/balakrishna_pro_extended.webp';",
    );
    expect(aboutPage).toMatch(
      /name:\s*'Dr\. Shreepathy Rangabhatta B',[\s\S]*?scale:\s*1\.45,[\s\S]*?transformOrigin:\s*'50% 43%'/s,
    );
    expect(aboutPage).not.toContain('Dr. Balakrishna S. Maddodi');
    expect(aboutPage).toContain("'--avatar-position': member.objectPosition");
    expect(aboutPage).toContain("'--avatar-scale': member.scale");
    expect(aboutPage).toContain("'--avatar-origin': member.transformOrigin");
    expect(aboutPage).toContain("'--avatar-y': member.offsetY || '0px'");
    expect(aboutPage).toMatch(
      /'--avatar-background':\s*member\.background\s*\|\|\s*'#f3f1ec'/s,
    );
    expect(aboutPage).not.toContain('team-avatar-image-${idx + 1}');
    expect(aboutPage).toMatch(
      /className="team-card">[\s\S]*?\{member\.linkedin[\s\S]*?className="team-linkedin-link"[\s\S]*?<div className="team-card-header">[\s\S]*?<div className="team-avatar-wrapper">[\s\S]*?<div className="team-identity">/s,
    );
    expect(aboutCss).not.toMatch(/\.team-card:hover\s*{/);
    expect(aboutCss).toMatch(
      /\.team-linkedin-link\s*{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/s,
    );
    expect(aboutCss).toMatch(
      /\.team-linkedin-link:hover,\s*\.team-linkedin-link:focus-visible\s*{[^}]*transform:\s*translateY\(-1px\);/s,
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
      /\.offers-grid\s*{[^}]*grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\);[^}]*gap:\s*1rem;/s,
    );
    expect(serviceCss).toMatch(
      /\.offer-entry\s*{[^}]*grid-column:\s*span 2;[^}]*min-height:\s*13rem;[^}]*border:\s*1px solid var\(--border-color\);/s,
    );
    expect(serviceCss).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.domain-hero\s*{[^}]*min-height:\s*34rem;[^}]*padding:\s*4rem 0;[\s\S]*?\.offers-grid\s*{[^}]*grid-template-columns:\s*1fr;/s,
    );
    expect(serviceCss).not.toMatch(/\.offer-card\s*\{/);
    expect(serviceCss).not.toContain('.offer-icon-wrapper');
    expect(serviceCss).toContain('.offer-sequence');
  });

  it('routes global project actions through the dedicated Start page', () => {
    const header = readSource('src/components/Header.jsx');
    const brands = readSource('src/pages/Brands.jsx');
    const home = readSource('src/pages/Home.jsx');
    const servicePage = readSource('src/components/ServicePage.jsx');

    expect(header).toContain('to="/start"');
    expect(header).toContain('Start a project');
    expect(header).not.toContain('openWorkModal');
    expect(brands).not.toContain('openWorkModal');
    expect(home).not.toContain('openWorkModal');
    expect(servicePage).not.toContain('openWorkModal');
    expect(brands).toContain('to="/contact"');
    expect(brands).toContain('Contact us about Raw Radicles');
  });

  it('balances incomplete service-card rows instead of leaving accidental gaps', () => {
    const serviceCss = readSource('src/components/ServicePage.css');

    // Desktop: 5-item row-balancing selectors must exist
    expect(serviceCss).toMatch(
      /\.offers-grid\[data-count="5"\] > :nth-child\(4\)\s*\{[^}]*grid-column:\s*2 \/ span 2;/s,
    );
    expect(serviceCss).toMatch(
      /\.offers-grid\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*4 \/ span 2;/s,
    );
    expect(serviceCss).toMatch(
      /\.service-detail-grid\s*\{[^}]*grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\);/s,
    );
    expect(serviceCss).toMatch(
      /\.service-detail-grid\[data-count="5"\] > :nth-child\(4\)\s*\{[^}]*grid-column:\s*2 \/ span 2;/s,
    );

    // Tablet (769px–900px): editorial grid gets matching-specificity overrides;
    // breakpoint must NOT start at 621px (that would overlap with mobile ≤768px)
    expect(serviceCss).toContain('@media (min-width: 769px) and (max-width: 900px)');
    expect(serviceCss).not.toContain('@media (max-width: 900px) and (min-width: 621px)');
    expect(serviceCss).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*auto;/s,
    );
    // Desktop :nth-child(3n) border rule must not leak: odd items get border back at tablet
    expect(serviceCss).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry:nth-child\(odd\)\s*\{[^}]*border-right:\s*1px solid var\(--border-color\);/s,
    );
    expect(serviceCss).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry:nth-child\(even\)\s*\{[^}]*border-right:\s*0;/s,
    );

    // Mobile (≤768px): editorial items 4 and 5 must occupy the full row
    expect(serviceCss).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*1 \/ -1;/s,
    );
    expect(serviceCss).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*border-right:\s*0;/s,
    );
  });

  it('keeps informational route typography independent from service hero styles', () => {
    const start = readSource('src/pages/StartProject.jsx');
    const terms = readSource('src/pages/TermsOfUse.jsx');
    const blogs = readSource('src/pages/Blogs.jsx');
    const blogPost = readSource('src/pages/BlogPost.jsx');

    for (const source of [start, terms, blogs, blogPost]) {
      expect(source).not.toContain('className="domain-title"');
      expect(source).not.toContain('className="domain-subtitle"');
    }
  });

  it('builds a noindex production 404 without a catch-all 200 rewrite', () => {
    const viteConfig = readSource('vite.config.js');
    const prerenderEntry = readSource('src/entry-prerender.jsx');
    const verifier = readSource('scripts/verify-prerender.mjs');
    const redirects = readSource('public/_redirects');
    const headers = readSource('public/_headers');

    for (const route of [
      '/brands/raw-radicles',
      '/start',
      '/privacy',
      '/terms',
      '/404.html',
    ]) {
      expect(viteConfig).toContain(`'${route}'`);
    }
    expect(viteConfig).toContain('dynamicBlogRoutes');
    expect(prerenderEntry).toContain('resolveMetadataForPath');
    expect(prerenderEntry).toContain("name: 'robots'");
    expect(verifier).toContain("path.join('dist', '404.html')");
    expect(verifier).toContain('prerendered public routes and a production 404 page.');
    expect(verifier).toContain('verifyHeadUniqueness');
    expect(redirects).toContain('/*  /404.html  404');
    expect(redirects).not.toContain('200');
    expect(headers).toContain('Strict-Transport-Security');
    expect(headers).toContain('Content-Security-Policy');
  });


  it('does not publish production source maps', () => {
    const viteConfig = readSource('vite.config.js');

    expect(viteConfig).toContain('sourcemap: false');
    expect(viteConfig).not.toContain("sourcemap: 'hidden'");
  });

  it('tiers About page motion for reduced-motion visitors', () => {
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutMotion = readSource('src/pages/aboutMotion.js');
    const aboutCss = readSource('src/pages/About.css');
    const rotatingHeroCss = readSource('src/components/RotatingHeroMedia.css');

    expect(aboutPage).toContain(
      "import { motion, useReducedMotion } from 'framer-motion';",
    );
    expect(aboutPage).toContain(
      'const prefersReducedMotion = useReducedMotion();',
    );
    expect(aboutMotion).toContain(
      "prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }",
    );
    expect(aboutMotion).toContain('duration: prefersReducedMotion ? 0 : 0.5');
    expect(aboutMotion).toContain('Math.min(index * 0.04, 0.12)');
    expect(readSource('src/components/ScrollToTop.jsx')).toContain(
      'behavior: getHashScrollBehavior(prefersReducedMotion)',
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

  it('presents only the confirmed owned-brand portfolio', () => {
    const brandsPage = readSource('src/pages/Brands.jsx');
    const brandsCss = readSource('src/pages/Brands.css');
    const prerenderVerification = readSource('scripts/verify-prerender.mjs');

    expect(brandsPage).toContain('Our Brands');
    expect(brandsPage).toContain('We develop and operate our own consumer brands.');
    expect(brandsPage).not.toContain(
      'We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.',
    );
    expect(brandsPage).toContain('Portfolio in development');
    expect(brandsPage).toContain('A second consumer brand is in early development');
    expect(brandsPage).not.toContain('Packaging record');
    expect(brandsPage).not.toContain('Sparkles');
    expect(brandsPage).not.toContain('Cookie');
    expect(brandsPage).not.toContain('HOUSE OF BRANDS');
    expect(brandsPage).not.toContain('inside out');
    expect(brandsPage).not.toContain('glow-bg');
    expect(brandsPage).not.toContain('pipeline-decorative-shape');
    expect(brandsCss).not.toContain('.pipeline-card:hover');
    expect(prerenderVerification).toContain(
      "{ route: '', heading: 'We build consumer brands.' }",
    );
  });

  it('keeps one global pre-footer CTA above compact corporate information', () => {
    const footer = readSource('src/components/Footer.jsx');
    const footerCtas = readSource('src/content/footerCtas.js');
    const footerCss = readSource('src/components/Footer.css');
    const homeCss = readSource('src/pages/Home.css');

    expect(footer).not.toContain('footer-banner');
    expect(footer).not.toContain('Ready to build something that lasts?');
    expect(footer).not.toContain('Innovating Today for a Smarter Tomorrow');
    expect(footer).not.toContain('ArrowUpRight');
    expect(footer).not.toContain('openWorkModal');
    expect(footer).not.toContain('Get in Touch');
    expect(footer).toContain('className="footer-cta-strip"');
    expect(footerCtas).toContain('Turn a promising idea into a working project.');
    expect(footerCtas).toContain('Ready to build with fewer unknowns?');
    expect(footerCtas).toContain('Contact DSPL');
    expect(footerCtas).toContain('Start a project');
    expect(footer).toMatch(
      /Dashapatmaja Solutions Pvt Ltd develops consumer brands and\s+provides branding, marketing, and e-commerce services\./,
    );
    expect(footer).toContain('>Services</h2>');
    expect(footer).toContain('>Company</h2>');
    expect(footer).toContain('>Legal</h2>');
    expect(footer).toMatch(/\{new Date\(\)\.getFullYear\(\)\}\s*(\{COMPANY_FACTS\.legalName\}|Dashapatmaja Solutions Pvt Ltd)\.\s*All rights reserved\./);
    expect(footer).not.toMatch(/Â|Ã|â€|â€”/);
    expect(footer).toContain('className="footer-contact-rail"');
    expect(footer).not.toContain('className="footer-meta-rail"');
    expect(footer).toContain('>Privacy Policy</Link>');
    expect(footerCss).not.toContain('.footer-banner');
    expect(footerCss).not.toContain('.banner-content');
    expect(footerCss).not.toContain('.banner-title');
    expect(footerCss).not.toContain('.banner-text');
    expect(footerCss).not.toContain('.banner-btn');
    expect(homeCss).not.toContain('.home-mid-cta');
    expect(footerCss).toMatch(
      /\.footer\s*{[^}]*padding:\s*3\.25rem 0 1\.5rem;/s,
    );
    expect(footerCss).toMatch(
      /\.footer-grid\s*{[^}]*padding-bottom:\s*2\.5rem;/s,
    );
    expect(footerCss).toMatch(
      /\.footer-contact-rail\s*{[^}]*grid-template-columns:\s*1\.1fr 1fr 1\.6fr 1\.1fr;/s,
    );
    expect(footerCss).not.toContain('.footer-meta-rail');
    expect(footerCss).toMatch(
      /@media\s*\(max-width:\s*576px\)\s*{[\s\S]*?\.footer-bottom\s*{[^}]*flex-direction:\s*column;[^}]*align-items:\s*flex-start;[^}]*gap:\s*1rem;/s,
    );
  });

  it('references the generated icon set and optimized production assets', () => {
    const indexHtml = readSource('index.html');
    const header = readSource('src/components/Header.jsx');
    const footer = readSource('src/components/Footer.jsx');
    const about = readSource('src/pages/About.jsx') + '\n' + readSource('src/content/teamMembers.js');
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
    expect(about).toContain("import drImg from '../assets/dr_pro.webp';");
    expect(about).toContain("import anushaImg from '../assets/Anusha-mam_pro.webp';");
    expect(about).toContain("import nameshImg from '../assets/ceo_pro.webp';");
    expect(about).not.toContain('manu_pro_fixed.jpg');
    expect(about).not.toContain("from '../assets/dr_pro.png'");
    expect(about).not.toContain("from '../assets/Anusha-mam_pro.png'");
    expect(about).not.toContain("from '../assets/ceo_pro.png'");
  });

  it('limits transitions to the properties each interaction changes', () => {
    const styleSources = [
      'src/index.css',
      'src/components/FAQAccordion.css',
      'src/components/Footer.css',
      'src/pages/NotFound.css',
    ].map(readSource);

    for (const css of styleSources) {
      expect(css).not.toMatch(/transition:\s*all\b/);
    }
  });

  it('reserves intrinsic space for every production image', () => {
    const imageSources = [
      'src/components/Header.jsx',
      'src/components/Footer.jsx',
      'src/components/home/SupporterStrip.jsx',
      'src/components/home/OwnedBrandProof.jsx',
      'src/components/PackagingGallery.jsx',
      'src/components/RotatingHeroMedia.jsx',
      'src/pages/Home.jsx',
      'src/pages/About.jsx',
      'src/pages/Brands.jsx',
      'src/pages/Contact.jsx',
      'src/pages/RawRadicles.jsx',
    ].map(readSource).join('\n');
    const images = imageSources.match(/<img\b[\s\S]*?\/>/g) ?? [];

    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image).toMatch(/\bwidth=/);
      expect(image).toMatch(/\bheight=/);
    }
  });

  it('keeps normal page scrolling native and reduces About scroll-motion noise', () => {
    const globalCss = readSource('src/index.css');
    const aboutPage = readSource('src/pages/About.jsx');
    const aboutMotion = readSource('src/pages/aboutMotion.js');

    expect(globalCss).not.toMatch(/html\s*{[^}]*scroll-behavior:\s*smooth;/s);
    expect(aboutPage).toContain('viewport={{ once: true, amount: 0.2 }}');
    expect(aboutPage).not.toContain("viewport={{ once: true, margin: '-50px' }}");
    expect(aboutPage).not.toContain('viewport={{ once: true, margin: "-50px" }}');
    expect(aboutMotion).toContain('duration: prefersReducedMotion ? 0 : 0.5');
    expect(aboutMotion).toContain('Math.min(index * 0.04, 0.12)');
  });

  it('keeps the polished routes on native scroll with mobile-safe grids', () => {
    const about = readSource('src/pages/About.jsx');
    const homeCss = readSource('src/pages/Home.css');
    const serviceCss = readSource('src/components/ServicePage.css');
    const faqCss = readSource('src/components/FAQAccordion.css');

    expect([about, homeCss, serviceCss, faqCss].join('\n'))
      .not.toMatch(/scroll-behavior:\s*smooth|ScrollSmoother|wheel\s*\(/i);
    expect(homeCss).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*?\.service-evidence-grid\s*{[^}]*grid-template-columns:\s*1fr;/);
    expect(faqCss).toMatch(/\.faq-header-btn\s*{[^}]*min-height:\s*4\.5rem;/s);
  });
});
