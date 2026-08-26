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
    title: 'Brand identity and visual systems',
    text: 'Logo, colour, typography, packaging architecture and application rules. You receive working source files, export-ready logo variants, a colour and type specification, and templates for the formats you use most.',
  },
  {
    title: 'Market positioning',
    text: 'Audience, category and competitor analysis, resolved into a position you can defend and a set of decisions your team can apply without asking permission each time.',
  },
  {
    title: 'Brand story and voice',
    text: 'A messaging document covering the brand narrative, tone, core messages and worked examples for the contexts you actually write in: product pages, ads, packaging, customer email, sales decks.',
  },
  {
    title: 'Packaging and brand assets',
    text: 'Print-ready artwork, reusable templates, organised source files and written guidance so internal and partner teams can produce on-brand work without a designer in the loop.',
  },
];

const compliance = {
  title: 'Packaging compliance for food and consumer products',
  intro:
    'If your pack carries a nutritional panel, an ingredient statement or a net quantity declaration, the design and the regulation are the same problem. We have taken six food SKUs through FSSAI labelling and Legal Metrology packaged commodity requirements, from lab reports through to print-ready artwork.',
  items: [
    {
      title: 'Label content preparation',
      text: 'Preparation and coordination of the approved information required on the pack.',
    },
    {
      title: 'Mandatory declarations',
      text: 'Organisation of the declaration inputs that need to appear within the approved artwork.',
    },
    {
      title: 'Declaration placement',
      text: 'Integrating required information into the packaging layout so compliance and design are handled together.',
    },
    {
      title: 'Artwork and revision coordination',
      text: 'Managing artwork revisions as approved label information and production requirements change.',
    },
    {
      title: 'Print-to-marketplace consistency',
      text: 'Keeping production artwork and marketplace-facing product information aligned.',
    },
  ],
  disclaimer:
    'Regulated legal opinions stay with qualified advisers; the preparation and the paperwork sit with us.',
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
    heroTagline="Positioning, identity and packaging that hold up in a print file, on a marketplace thumbnail and in a WhatsApp forward."
    heroImages={heroImages}
    scopeTitle="A brand system built to be used, not admired"
    scopeText="Most brand projects end with a PDF nobody opens again. We build the identity alongside the places it has to work: the pack that goes to print, the listing image that gets cropped to a square, the ad copy that a junior writes on a Tuesday. Work starts with your business, audience, category and competition. It ends with a system your team can apply without calling us. We designed and shipped our own consumer brand across six SKUs, so we build for the constraints we already know are coming."
    offersTitle="What we do"
    offersDescription="Scope is built around the decisions you need to make, not sold as a fixed package."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsEyebrow="Questions and Answers"
    faqsTitle="Branding engagement questions"
    faqsDescription=""
    faqs={faqs}
  />
);

export default Branding;