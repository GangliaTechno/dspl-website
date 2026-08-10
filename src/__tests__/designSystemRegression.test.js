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
      /\.brands-hero-content\s+\.section-subtitle\s*{[^}]*color:\s*var\(--accent\);/s,
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
    expect(brandsPage).toContain('brands-hero-editorial-1672.webp');
    expect(brandsPage).toContain('brands-hero-editorial-mobile.webp');
    expect(brandsCss).toMatch(
      /\.brands-hero-bg\s*{[^}]*width:\s*100%;/s,
    );
    expect(brandsCss).not.toMatch(/\.brands-hero-overlay\s*{/);
    expect(brandsCss).toMatch(
      /\.brands-hero\s*{[^}]*text-align:\s*center;[^}]*min-height:\s*32rem;[^}]*padding:\s*8rem 0 6rem;/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero::after\s*{[^}]*background:\s*rgba\(8,\s*8,\s*8,\s*0\.68\);/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero \.container\s*{[^}]*max-width:\s*50rem;[^}]*justify-content:\s*center;/s,
    );
    expect(brandsCss).toMatch(
      /\.brands-hero-content\s*{[^}]*max-width:\s*50rem;[^}]*margin-inline:\s*auto;[^}]*text-align:\s*center;/s,
    );
    expect(brandsCss).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.brands-hero\s*{[^}]*padding:\s*5\.5rem 0 4\.5rem;[\s\S]*?\.brands-hero-img\s*{[^}]*object-position:\s*56% 52%;/s,
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
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.header-container\s*{[^}]*min-height:\s*72px;[\s\S]*?\.logo-image\s*{[^}]*height:\s*44px;/s,
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

  it('keeps the About mission and vision cards equal in height', () => {
    const about = readSource('src/pages/About.css');

    expect(about).toMatch(
      /\.mission-vision-grid\s*>\s*div\s*{[^}]*height:\s*100%;/s,
    );
    expect(about).toMatch(
      /\.mv-card\s*{[^}]*height:\s*100%;[^}]*box-sizing:\s*border-box;/s,
    );
  });

  it('uses one Contact details panel and prioritizes the form on smaller screens', () => {
    const contactPage = readSource('src/pages/Contact.jsx');
    const contactCss = readSource('src/pages/Contact.css');

    expect(contactPage).toContain('className="contact-details-panel"');
    expect(contactPage.match(/className="contact-detail-row"/g)).toHaveLength(3);
    expect(contactPage).not.toContain('className="contact-detail-card glass"');
    expect(contactCss).toMatch(
      /\.contact-description\s*{[^}]*max-width:\s*58ch;[^}]*margin-inline:\s*auto;/s,
    );
    expect(contactCss).toMatch(
      /\.contact-subheading\s*{[^}]*margin-bottom:\s*0;/s,
    );
    expect(contactCss).toMatch(
      /\.contact-detail-info h3\s*{[^}]*font-size:\s*1\.1rem;[^}]*margin-bottom:\s*0\.5rem;/s,
    );
    expect(contactCss).not.toContain('.contact-detail-info h4');
    expect(contactCss).toMatch(
      /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.contact-form-column\s*{[^}]*order:\s*-1;/s,
    );
    expect(contactCss).toMatch(
      /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.contact-hero\s*{[^}]*padding:\s*4\.5rem 0 3rem;/s,
    );
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

  it('uses original responsive editorial imagery for Home and Marketing', () => {
    const homePage = readSource('src/pages/Home.jsx');
    const marketingPage = readSource('src/pages/Marketing.jsx');
    const pageShell = readSource('index.html');

    expect(homePage).toContain('dspl-home-editorial-960.webp');
    expect(homePage).toContain('dspl-home-editorial-1440.webp');
    expect(homePage).toContain('dspl-home-editorial-1920.webp');
    expect(homePage).toContain('dspl-home-editorial-mobile.webp');
    expect(homePage).not.toContain('dspl_banner.webp');
    expect(homePage).not.toContain('dspl_banner-mobile.webp');
    expect(marketingPage).toContain('dspl-marketing-editorial-960.webp');
    expect(marketingPage).toContain('dspl-marketing-editorial-1440.webp');
    expect(marketingPage).toContain('dspl-marketing-editorial-1920.webp');
    expect(marketingPage).toContain('dspl-marketing-editorial-mobile.webp');
    expect(marketingPage).not.toContain('Marketing_hero_section');
    expect(pageShell).toContain('dspl-home-editorial-1440.webp');
    expect(pageShell).toContain('dspl-home-editorial-mobile.webp');
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
      /\.supporter-logo\s*{[^}]*width:\s*auto;[^}]*height:\s*100%;[^}]*object-fit:\s*contain;[^}]*transform:\s*none;[^}]*opacity:\s*0\.6;/s,
    );
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
