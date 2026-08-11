import brandingWorkshop01960 from '../assets/branding-workshop-01-960.webp';
import brandingWorkshop011440 from '../assets/branding-workshop-01-1440.webp';
import brandingWorkshop01Mobile from '../assets/branding-workshop-01-mobile.webp';
import brandingWorkshop02960 from '../assets/branding-workshop-02-960.webp';
import brandingWorkshop021440 from '../assets/branding-workshop-02-1440.webp';
import brandingWorkshop02Mobile from '../assets/branding-workshop-02-mobile.webp';
import ServicePage from '../components/ServicePage';
import { getRouteMetadata } from '../seo/routeMetadata';

const brandingCopy = {
  contextLabel: 'Branding services',
  heroTagline: 'Positioning, identity, and brand systems designed for consistent use.',
  scopeTitle: 'A brand system built for application',
  scopeText: 'The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, application rules, and assets that internal and external teams can use consistently.',
  offersTitle: 'Branding capabilities',
  offersDescription: 'The scope is shaped around the decisions and applications the business needs.',
};

const offers = [
  {
    title: 'Brand Identity and Visual Systems',
    text: 'Logo, colour, typography, packaging and application rules, with a practical system for consistent use across priority touchpoints.',
  },
  {
    title: 'Market Positioning',
    text: 'Audience, category, competitor, and offer analysis used to define a clear market position and decision framework.',
  },
  {
    title: 'Brand Story and Voice',
    text: 'A messaging framework covering the brand narrative, voice, core messages, and examples for common customer-facing contexts.',
  },
  {
    title: 'Design Systems and Brand Assets',
    text: 'Reusable templates, organised source files, and guidance that support day-to-day implementation by internal and partner teams.',
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

const heroImages = [
  {
    id: 'branding-primary',
    src: brandingWorkshop011440,
    desktopSrcSet: `${brandingWorkshop01960} 960w, ${brandingWorkshop011440} 1440w`,
    mobileSrc: brandingWorkshop01Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  {
    id: 'branding-02',
    src: brandingWorkshop021440,
    desktopSrcSet: `${brandingWorkshop02960} 960w, ${brandingWorkshop021440} 1440w`,
    mobileSrc: brandingWorkshop02Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const Branding = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/branding')}
    pageTypeClass="branding-page"
    heroTitle="Branding"
    heroImages={heroImages}
    {...brandingCopy}
    offers={offers}
    faqsTitle="Branding engagement questions"
    faqsDescription="Scope, existing brands, and handover."
    faqs={faqs}
  />
);

export default Branding;
