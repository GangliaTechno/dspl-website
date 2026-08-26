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
    text: 'Plan and build the agreed storefront around the catalogue, content structure, customer journey and routine updates your team needs to manage.',
  },
  {
    title: 'Conversion journey review',
    text: 'Review discovery, product, cart and checkout journeys, identify supported points of friction and prioritise practical improvements.',
  },
  {
    title: 'Marketplace and multi-channel selling',
    text: 'Prepare catalogue structure, listing content and operating responsibilities for the marketplaces and channels included in scope.',
  },
  {
    title: 'Payments, delivery and returns',
    text: 'Coordinate the agreed payment, delivery and returns flows with the selected platform and providers, then verify the customer journey before launch.',
  },
];

const compliance = {
  title: 'Listing and marketplace compliance',
  intro: 'Product information on the physical pack and the digital catalogue needs to remain consistent. We prepare channel-ready records from client-approved product and packaging information, organise the fields required by agreed marketplaces and coordinate updates when approved source information changes.',
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
    heroTagline="Storefronts, marketplaces, payments and delivery, planned around the way your team operates."
    heroImages={heroImages}
    scopeTitle="Commerce built around the operating model"
    scopeText="We plan the customer journey alongside catalogue ownership, payments, delivery, returns and reporting. That keeps the storefront and the day-to-day operating process connected, with responsibilities and dependencies agreed before the build moves forward."
    offersTitle="What we do"
    offersDescription="Four connected areas, scoped to the selected platform, channels and operating responsibilities."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="Frequently asked questions about e-commerce"
    faqsDescription="Clear answers about platform choices, store operations, catalogue scope and ongoing support."
    faqs={faqs}
  />
);

export default Ecommerce;
