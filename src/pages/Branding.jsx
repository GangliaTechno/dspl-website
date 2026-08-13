import brandingWorkshop01960 from '../assets/branding-workshop-01-960.webp';
import brandingWorkshop011440 from '../assets/branding-workshop-01-1440.webp';
import brandingWorkshop01Mobile from '../assets/branding-workshop-01-mobile.webp';
import brandingWorkshop02960 from '../assets/branding-workshop-02-960.webp';
import brandingWorkshop021440 from '../assets/branding-workshop-02-1440.webp';
import brandingWorkshop02Mobile from '../assets/branding-workshop-02-mobile.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Positioning and Brand Strategy',
    text: 'Audience, category, competitor, offer, and business context translated into a clear position and decision framework.',
  },
  {
    title: 'Naming and Brand Architecture',
    text: 'Naming criteria, shortlist development, portfolio relationships, and practical checks coordinated with the client and appointed advisers.',
  },
  {
    title: 'Visual Identity Systems',
    text: 'Logo, colour, typography, image direction, and application rules designed for consistent use across priority touchpoints.',
  },
  {
    title: 'Brand Story and Voice',
    text: 'Narrative, voice, core messages, and examples for common customer-facing contexts without unsupported product claims.',
  },
  {
    title: 'Packaging and Application Assets',
    text: 'Packaging systems, templates, organised source files, and handover guidance for internal and partner teams.',
  },
];

const compliance = {
  title: 'Packaging and brand compliance coordination',
  intro: 'We coordinate practical brand and packaging inputs while regulated advice, approvals, and filings remain with the appropriate qualified parties.',
  items: [
    {
      title: 'Food labelling coordination',
      text: 'Packaging work can be checked against inputs required under the Food Safety and Standards (Labelling and Display) Regulations, 2020.',
    },
    {
      title: 'Pack declarations',
      text: 'Required declaration inputs can be coordinated with reference to the Legal Metrology (Packaged Commodities) Rules, 2011.',
    },
    {
      title: 'Claims review',
      text: 'Marketing and pack claims are routed for evidence review so the artwork does not outrun the available support.',
    },
    {
      title: 'Trademark coordination',
      text: 'Naming and identity files can be organised for review and filing by the appointed trademark professional.',
    },
    {
      title: 'Barcode and GTIN coordination',
      text: 'SKU, barcode and GTIN inputs can be mapped into the packaging and catalogue workflow.',
    },
  ],
  disclaimer: 'DSPL coordinates implementation and does not act as a regulator, licensing authority, or legal adviser.',
};

const faqs = [
  {
    q: 'What can a branding engagement include?',
    a: 'Scope can include positioning, naming, identity, voice, packaging or application guidelines, compliance coordination, and reusable assets. The proposal identifies which are required.',
  },
  {
    q: 'Can you work with an existing brand?',
    a: 'Yes. We first identify what should be retained, clarified, or replaced, then define the refresh scope against current business needs.',
  },
  {
    q: 'What is included in the handover?',
    a: 'We provide the agreed source files, usage guidance, templates, and a handover for the people responsible for implementation.',
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
    contextLabel="Branding services"
    heroTitle="Branding"
    heroTagline="Build a clear brand system that people can apply consistently."
    heroImages={heroImages}
    scopeTitle="A brand system built for application"
    scopeText="The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, packaging, application rules, and assets that internal and external teams can use consistently."
    offersTitle="Branding capabilities"
    offersDescription="The scope is shaped around the decisions and applications the business needs."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Branding engagement questions"
    faqsDescription="Scope, existing brands, and handover."
    faqs={faqs}
  />
);

export default Branding;
