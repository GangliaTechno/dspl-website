import { Palette, Compass, BookOpen, LayoutTemplate } from 'lucide-react';
import brandingHero960 from '../assets/dspl-branding-hero-960.webp';
import brandingHero1440 from '../assets/dspl-branding-hero-1440.webp';
import brandingHero1600 from '../assets/dspl-branding-hero-1600.webp';
import brandingHeroMobile from '../assets/dspl-branding-hero-mobile.webp';
import ServicePage from '../components/ServicePage';
import { getRouteMetadata } from '../seo/routeMetadata';

const brandingCopy = {
  contextLabel: 'Branding services',
  heroTagline: 'Positioning, identity, and brand systems designed for consistent use.',
  heroDescription: 'We translate business context into a usable brand system: positioning, identity, voice, and the assets required for consistent execution.',
  heroCtaLabel: 'Discuss a branding project',
  scopeTitle: 'A brand system built for application',
  scopeText: 'The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, application rules, and assets that internal and external teams can use consistently.',
  offersTitle: 'Branding capabilities',
  offersDescription: 'The scope is shaped around the decisions and applications the business needs.',
};

const offers = [
  {
    title: 'Brand Identity and Visual Systems',
    text: 'Logo, colour, typography, packaging and application rules, with a practical system for consistent use across priority touchpoints.',
    icon: <Palette size={22} />,
  },
  {
    title: 'Market Positioning',
    text: 'Audience, category, competitor, and offer analysis used to define a clear market position and decision framework.',
    icon: <Compass size={22} />,
  },
  {
    title: 'Brand Story and Voice',
    text: 'A messaging framework covering the brand narrative, voice, core messages, and examples for common customer-facing contexts.',
    icon: <BookOpen size={22} />,
  },
  {
    title: 'Design Systems and Brand Assets',
    text: 'Reusable templates, organised source files, and guidance that support day-to-day implementation by internal and partner teams.',
    icon: <LayoutTemplate size={22} />,
  },
];

const faqs = [
  {
    q: 'What can a branding engagement include?',
    a: 'Scope can include positioning, naming, identity, voice, packaging or application guidelines, and reusable assets. The proposal identifies which are required.',
  },
  {
    q: 'Can you work with an existing brand?',
    a: 'Yes. We first identify what should be retained, clarified, or replaced, then define the refresh scope against current business needs.',
  },
  {
    q: 'What is included in the handover?',
    a: 'We provide the agreed source files, usage guidance, and templates, together with a handover for the people responsible for implementation.',
  },
];

const heroImage = {
  src: brandingHero1440,
  desktopSrcSet: `${brandingHero960} 960w, ${brandingHero1440} 1440w, ${brandingHero1600} 1600w`,
  mobileSrc: brandingHeroMobile,
  sizes: '100vw',
  width: 1600,
  height: 901,
};

const Branding = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/branding')}
    pageTypeClass="branding-page"
    heroTitle="Branding"
    heroImage={heroImage}
    {...brandingCopy}
    offers={offers}
    faqsTitle="Frequently Asked Questions"
    faqsDescription="Common questions about our brand identity design and visual strategies."
    faqs={faqs}
  />
);

export default Branding;
