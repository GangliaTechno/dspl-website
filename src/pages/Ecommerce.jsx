import ecommerceHero960 from '../assets/ecommerce-primary-960.webp';
import ecommerceHero1440 from '../assets/ecommerce-primary-1440.webp';
import ecommerceHeroMobile from '../assets/ecommerce-primary-mobile.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { ECOMMERCE_FAQS } from '../content/serviceFaqs';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Store setup and build',
    text: 'Shopify, WooCommerce or React-based commerce. Catalogue structure, content architecture, responsive build, and an admin your team can run without a developer for routine changes.',
  },
 
  {
    title: 'Conversion rate optimisation',
    text: 'Review of discovery, product detail, cart and checkout journeys to find measurable friction, then a prioritised list of changes with a test plan. We fix what the data supports, not what looks dated.',
  },
  {
    title: 'Marketplace and multi-channel selling',
    text: 'Amazon and Flipkart setup, catalogue preparation, listing content, variant structure, inventory and pricing workflow, plus quick-commerce and social channels where they fit.',
  },
  {
    title: 'Payments and delivery setup',
    text: 'Payment gateway and delivery integrations configured to your platform, providers, fulfilment model and internal process, with COD, prepaid and returns flows tested before launch.',
  },
];

const compliance = {
  title: 'Listing and marketplace compliance',
  intro: 'Marketplace listing rejections almost always come from the same place: the pack says one thing and the catalogue says another. Net quantity, ingredient statements, manufacturer details, country of origin, FSSAI licence number and expiry format all have to match between the physical label and the digital record. We prepare catalogue data from the approved label artwork so the two agree from the start, and we structure product information so it can be pushed to a new channel without re-entry. For food and nutraceutical sellers we handle FSSAI licence details, mandatory declarations and marketplace-specific category requirements.',
  items: [
    {
      title: 'Pack and catalogue consistency',
      text: 'Keeping information on the physical pack and digital catalogue aligned.',
    },
    {
      title: 'Catalogue data preparation',
      text: 'Preparing product records from approved packaging and product information.',
    },
    {
      title: 'Channel-ready product information',
      text: 'Structuring product data so it can be reused across agreed commerce channels.',
    },
    {
      title: 'Listing declarations',
      text: 'Coordinating the required approved declaration information across listings.',
    },
    {
      title: 'Marketplace requirements',
      text: 'Preparing listing information for the requirements of the marketplaces/channels included in scope.',
    },
  ],
  disclaimer: 'Regulated legal opinions stay with qualified advisers; the preparation and the paperwork sit with us.',
};

const faqs = ECOMMERCE_FAQS;

const heroImages = [
  {
    id: 'ecommerce-primary',
    src: ecommerceHero1440,
    desktopSrcSet: `${ecommerceHero960} 960w, ${ecommerceHero1440} 1440w`,
    mobileSrc: ecommerceHeroMobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const Ecommerce = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/ecommerce')}
    pageTypeClass="ecommerce-page"
    contextLabel="E-commerce services"
    heroTitle="E-commerce"
    heroTagline="Storefronts, marketplaces, payments and delivery, built to run on a normal Tuesday without anyone calling support."
    heroImages={heroImages}
    scopeTitle="Commerce built around how you actually operate"
    scopeText="A storefront is only as good as the operation behind it. We plan the build alongside catalogue ownership, payment setup, inventory, dispatch and reporting, so the customer journey and the internal workflow are designed at the same time by the same people. We list, price and ship our own product through these systems, which is why the questions we ask early are about your warehouse and your returns policy, not only your homepage."
    offersTitle="What we do"
    offersDescription="Built to the platforms, integrations and operating responsibilities agreed for your project."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Frequently asked questions about e-commerce"
    faqsDescription="Clear answers about platforms, marketplaces, timelines, payment setup and ongoing support."
    faqs={faqs}
  />
);

export default Ecommerce;
