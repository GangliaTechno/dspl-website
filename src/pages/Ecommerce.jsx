import ecommerceHero960 from '../assets/dspl-ecommerce-hero-960.webp';
import ecommerceHero1440 from '../assets/dspl-ecommerce-hero-1440.webp';
import ecommerceHero1600 from '../assets/dspl-ecommerce-hero-1600.webp';
import ecommerceHeroMobile from '../assets/dspl-ecommerce-hero-mobile.webp';
import ServicePage from '../components/ServicePage';
import { getRouteMetadata } from '../seo/routeMetadata';

const ecommerceCopy = {
  heroIntro: 'Storefront, marketplace, payment, and fulfilment systems planned around the selected platform and operating model.',
  scopeTitle: 'Commerce aligned with day-to-day operations',
  scopeText: 'Storefront and marketplace work is planned alongside catalogue ownership, payment setup, inventory, fulfilment, and reporting. This keeps the customer journey and operational responsibilities within one documented scope.',
  offersTitle: 'E-commerce capabilities',
  offersDescription: 'Implementation and support are scoped to the platforms, integrations, and operating responsibilities agreed for the project.',
};

const offers = [
  {
    title: 'Store Setup and Build',
    text: 'Storefront planning and implementation for Shopify, WooCommerce, or React-based commerce, with responsive behaviour and a clear catalogue and content structure.',
  },
  {
    title: 'Conversion Rate Optimisation (CRO)',
    text: 'Review of product discovery, product detail, cart, and checkout journeys to identify measurable friction and prioritise testable improvements.',
  },
  {
    title: 'Multi-Channel Selling',
    text: 'Marketplace setup and workflow planning for Amazon, Flipkart, and other agreed channels, including catalogue, inventory, and pricing responsibilities.',
  },
  {
    title: 'Payments and Delivery Setup',
    text: 'Payment and delivery integrations configured around the selected platform, providers, fulfilment model, and internal operating workflow.',
  },
];

const faqs = [
  {
    q: 'How do you select a platform?',
    a: 'We recommend a platform after reviewing catalogue complexity, integrations, internal capability, budget, and the expected operating model. Shopify, WooCommerce, and React-based builds are supported where appropriate.',
  },
  {
    q: 'Can you improve an existing store?',
    a: 'Yes. An audit can cover performance, catalogue structure, product journeys, checkout, analytics, and operating dependencies before improvement work is scoped.',
  },
  {
    q: 'Can marketplace and ongoing support be included?',
    a: 'Yes, when included in the scope. The engagement defines which channels, integrations, data owners, and ongoing responsibilities are covered.',
  },
];

const heroImage = {
  src: ecommerceHero1440,
  desktopSrcSet: `${ecommerceHero960} 960w, ${ecommerceHero1440} 1440w, ${ecommerceHero1600} 1600w`,
  mobileSrc: ecommerceHeroMobile,
  sizes: '100vw',
  width: 1600,
  height: 901,
};

const Ecommerce = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/ecommerce')}
    pageTypeClass="ecommerce-page"
    heroTitle="E-commerce"
    heroImage={heroImage}
    {...ecommerceCopy}
    offers={offers}
    faqsTitle="E-commerce engagement questions"
    faqsDescription="Platforms, existing stores, and ongoing support."
    faqs={faqs}
  />
);

export default Ecommerce;
