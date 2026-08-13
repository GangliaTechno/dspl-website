import ecommerceHero960 from '../assets/ecommerce-primary-960.webp';
import ecommerceHero1440 from '../assets/ecommerce-primary-1440.webp';
import ecommerceHeroMobile from '../assets/ecommerce-primary-mobile.webp';
import ecommerceDashboard960 from '../assets/ecommerce-dashboard-960.webp';
import ecommerceDashboard1440 from '../assets/ecommerce-dashboard-1440.webp';
import ecommerceDashboardMobile from '../assets/ecommerce-dashboard-mobile-hq.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Store Setup and Build',
    text: 'Storefront planning and implementation for Shopify, WooCommerce, or React-based commerce, with responsive behaviour and a clear content structure.',
  },
  {
    title: 'Catalogue and Product Content',
    text: 'Product data, collection structure, imagery requirements, and content ownership organised for the selected channels.',
  },
  {
    title: 'Conversion Journey Review',
    text: 'Product discovery, product detail, cart, and checkout journeys reviewed to identify measurable friction and testable improvements.',
  },
  {
    title: 'Marketplace Operations',
    text: 'Marketplace setup and workflow planning for agreed channels, including catalogue, inventory, pricing, and review responsibilities.',
  },
  {
    title: 'Payments, Delivery, and Returns',
    text: 'Payment, fulfilment, delivery, and returns workflows configured around the selected platform, providers, and operating model.',
  },
  {
    title: 'Commerce Analytics and Reconciliation',
    text: 'Tracking, channel reporting, settlement inputs, and operating checks designed around named data owners and review cadence.',
  },
];

const compliance = {
  title: 'Commerce compliance coordination',
  intro: 'Commerce implementation includes the practical configuration and declaration inputs agreed for the project.',
  items: [
    {
      title: 'GST configuration',
      text: 'Tax settings are configured from information approved by the client and their qualified tax adviser.',
    },
    {
      title: 'HSN mapping',
      text: 'Approved HSN mapping can be organised across catalogue and commerce records.',
    },
    {
      title: 'Settlement reconciliation',
      text: 'Marketplace and payment-settlement inputs can be mapped into a documented reconciliation workflow.',
    },
    {
      title: 'E-way-bill process',
      text: 'Operational handoffs for the e-way-bill process can be documented against the selected fulfilment flow.',
    },
    {
      title: 'Returns policies',
      text: 'Approved returns policies can be implemented consistently across storefront and marketplace touchpoints.',
    },
    {
      title: 'Listing declarations',
      text: 'Required listing declarations are coordinated from client-approved product and compliance records.',
    },
  ],
  disclaimer: "DSPL coordinates configuration and operating implementation. Tax and legal advice remains with the client's qualified tax and legal advisers.",
};

const faqs = [
  {
    q: 'How do you select a platform?',
    a: 'We recommend a platform after reviewing catalogue complexity, integrations, internal capability, budget, and the expected operating model. Shopify, WooCommerce, and React-based builds are supported where appropriate.',
  },
  {
    q: 'Can you improve an existing store?',
    a: 'Yes. An audit can cover performance, catalogue structure, product journeys, checkout, analytics, compliance inputs, and operating dependencies before improvement work is scoped.',
  },
  {
    q: 'Can marketplace and ongoing support be included?',
    a: 'Yes, when included in the scope. The engagement defines which channels, integrations, data owners, compliance inputs, and ongoing responsibilities are covered.',
  },
];

const heroImages = [
  {
    id: 'ecommerce-dashboard',
    src: ecommerceDashboard1440,
    desktopSrcSet: `${ecommerceDashboard960} 960w, ${ecommerceDashboard1440} 1440w`,
    mobileSrc: ecommerceDashboardMobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
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
    heroTagline="Connect storefront, marketplace, payment, fulfilment, and operating responsibilities."
    heroImages={heroImages}
    scopeTitle="Commerce aligned with day-to-day operations"
    scopeText="Storefront and marketplace work is planned alongside catalogue ownership, payment setup, inventory, fulfilment, compliance inputs, and reporting. This keeps the customer journey and operational responsibilities within one documented scope."
    offersTitle="E-commerce capabilities"
    offersDescription="Implementation and support are scoped to the platforms, integrations, and operating responsibilities agreed for the project."
    offers={offers}
    compliance={compliance}
    testimonials={approvedTestimonials}
    faqsTitle="E-commerce engagement questions"
    faqsDescription="Platforms, existing stores, and ongoing support."
    faqs={faqs}
  />
);

export default Ecommerce;
