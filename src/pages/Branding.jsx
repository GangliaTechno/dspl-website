import brandingWorkshop01960 from '../assets/branding-workshop-01-960.webp';
import brandingWorkshop011440 from '../assets/branding-workshop-01-1440.webp';
import brandingWorkshop01Mobile from '../assets/branding-workshop-01-mobile.webp';
import brandingWorkshop02960 from '../assets/branding-workshop-02-960.webp';
import brandingWorkshop021440 from '../assets/branding-workshop-02-1440.webp';
import brandingWorkshop02Mobile from '../assets/branding-workshop-02-mobile.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { BRANDING_FAQS } from '../content/serviceFaqs';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Brand positioning and strategy',
    text: 'Where the brand sits in the market, who it is for, why it exists, and how it differs from alternatives. We write the brand brief that guides every creative and commercial decision.',
  },
  {
    title: 'Visual identity system',
    text: 'Logo files, colour palette, typography hierarchy, icon style and graphic devices, organised in formats your team, agencies and vendors can use without asking for help.',
  },
  {
    title: 'Packaging design and production',
    text: 'Primary packs, cartons, shipping boxes, labels and inserts. We design for the print process you are actually using and coordinate directly with your packaging vendor on proofs.',
  },
  {
    title: 'Brand voice and messaging',
    text: 'Tone of voice rules, boilerplate copy, headline formulas, product descriptions and communication templates for web, social, email and customer support.',
  },
];

const compliance = {
  title: 'Packaging compliance for food and consumer products',
  intro: 'If you are launching a packaged product in India, the brand on the box is only half the job. The label has to comply with FSSAI regulations, Legal Metrology rules, and marketplace listing standards. We review your label content, coordinate nutritional analysis, and build compliance directly into your artwork files.',
  items: [],
  disclaimer: 'Regulated legal opinions stay with qualified advisers; the preparation and the paperwork sit with us.',
};

const faqs = BRANDING_FAQS;

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
    heroTagline="Brand positioning, identity, packaging and voice for Indian businesses, built for print, marketplaces, websites and WhatsApp."
    heroImages={heroImages}
    scopeTitle="A brand system built to be used, not admired"
    scopeText="Most brand projects end with a 100-page PDF that nobody opens after the invoice is paid. Your designer cannot find the vector logo, your ads agency uses the wrong colours, and your printer cannot work with the files. We build brand systems for application. You get production-ready packaging files, clear guidelines for your marketing team, and digital assets prepared for the formats you actually publish to."
    offersTitle="What we do"
    offersDescription="Scope is built around the decisions you need to make, not sold as a fixed package."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Branding engagement questions"
    faqsDescription="Scope, deliverables, timelines, and handover."
    faqs={faqs}
  />
);

export default Branding;
