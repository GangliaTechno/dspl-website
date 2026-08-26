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
    text: 'Define who the brand is for, what it stands for and how it should be understood. The result is a practical brief that guides identity, packaging and communication decisions.',
  },
  {
    title: 'Visual identity system',
    text: 'Create the core visual system—logo, colour, typography and supporting elements—with clear guidance for everyday use across print and digital channels.',
  },
  {
    title: 'Packaging design and production',
    text: 'Develop packaging around the selected format, approved product information and production requirements, then coordinate artwork revisions with the appointed vendor.',
  },
  {
    title: 'Brand voice and messaging',
    text: 'Set the tone, key messages and reusable copy patterns so websites, campaigns, product pages and customer communication sound like the same brand.',
  },
];

const compliance = {
  title: 'Packaging compliance for food and consumer products',
  intro: 'For packaged products, required information needs to be considered while the artwork is being developed. We organise client-approved label content, coordinate artwork revisions and help keep the production pack aligned with marketplace product information.',
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
    heroTagline="Positioning, identity, packaging and voice, developed as one practical brand system."
    heroImages={heroImages}
    scopeTitle="A brand system your team can use"
    scopeText="We bring positioning, identity, packaging and messaging into one clear system. The work is shaped around the people who will use it—from internal teams to printers and production partners—so approved decisions can move consistently from the brief into everyday brand communication."
    offersTitle="What we deliver"
    offersDescription="Four connected areas, adapted to the decisions and production needs of the project."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Frequently asked questions about branding"
    faqsDescription="Answers about scope, collaboration, production artwork and handover."
    faqs={faqs}
  />
);

export default Branding;
