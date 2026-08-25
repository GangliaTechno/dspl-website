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
    title: 'Naming and brand architecture',
    text: 'Naming criteria, shortlist development, portfolio relationships, and practical checks coordinated with the client and appointed advisers.',
  },
  {
    title: 'Visual identity system',
    text: 'Logo files, colour palette, typography hierarchy, icon style and graphic devices, organised in formats your team, agencies and vendors can use without asking for help.',
  },
  {
    title: 'Brand voice and messaging',
    text: 'Tone of voice rules, boilerplate copy, headline formulas, product descriptions and communication templates for web, social, email and customer support.',
  },
  {
    title: 'Packaging design and production',
    text: 'Primary packs, cartons, shipping boxes, labels and inserts. We design for the print process you are actually using and coordinate directly with your packaging vendor on proofs.',
  },
];

const compliance = {
  title: 'Packaging compliance for food and consumer products',
  intro: 'If you are launching a packaged product in India, the brand on the box is only half the job. The label has to comply with FSSAI regulations, Legal Metrology rules, and marketplace listing standards. We review your label content, coordinate nutritional analysis, and build compliance directly into your artwork files.',
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
    heroTagline="Positioning, identity, packaging and voice, built as a working system for Indian businesses."
    heroImages={heroImages}
    scopeTitle="A brand system your team can actually apply"
    scopeText="Most branding projects end with a 90-page PDF that nobody opens after the invoice is paid. We build brand systems that are designed to be applied: logo assets organised by use case, typography with clear digital fallbacks, colour palettes with exact CMYK and HEX values, and packaging dielines ready for your printer. We designed, packaged and launched our own consumer brand, so we know what happens when a label spec is wrong."
    offersTitle="What we deliver"
    offersDescription="Every deliverable is prepared as a production file or a written document. No placeholder decks."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Frequently asked questions about branding"
    faqsDescription="Clear answers about timelines, deliverables, files, naming and packaging."
    faqs={faqs}
  />
);

export default Branding;
