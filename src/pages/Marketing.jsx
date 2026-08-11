import marketingHero960 from '../assets/dspl-marketing-editorial-960.webp';
import marketingHero1440 from '../assets/dspl-marketing-editorial-1440.webp';
import marketingHero1920 from '../assets/dspl-marketing-editorial-1920.webp';
import marketingMobile from '../assets/dspl-marketing-editorial-mobile.webp';
import ServicePage from '../components/ServicePage';
import { getRouteMetadata } from '../seo/routeMetadata';

const marketingCopy = {
  heroIntro: 'Search, paid media, content, and measurement coordinated around defined audiences, commercial priorities, and available evidence.',
  scopeTitle: 'A coordinated marketing programme',
  scopeText: 'Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve performance over time.',
  offersTitle: 'Marketing capabilities',
  offersDescription: 'The mix is selected against the brief; it is not a fixed package.',
};

const offers = [
  {
    title: 'Search Engine Optimisation (SEO)',
    text: 'Technical review, search-intent research, on-page structure, and content planning designed to improve qualified organic visibility over time.',
  },
  {
    title: 'Paid Campaign Management',
    text: 'Campaign planning and management across Google, Meta, and relevant commerce channels, with budgets reviewed against agreed performance measures.',
  },
  {
    title: 'Analytics and Performance Tracking',
    text: 'Tracking and reporting for traffic, campaign spend, enquiries, and commercial outcomes, with measurement definitions agreed before launch.',
  },
  {
    title: 'Content and Copywriting',
    text: "Landing pages, articles, product copy, and campaign messaging aligned with search intent and the brand's voice.",
  },
];

const faqs = [
  {
    q: 'How is the scope defined?',
    a: 'We begin with your objectives, audience, current channels, available data, and budget. The proposal then sets out priorities, responsibilities, deliverables, and reporting cadence.',
  },
  {
    q: 'How are results assessed?',
    a: 'We agree the measures that fit the work before launch. These may include qualified traffic, enquiry volume, campaign efficiency, or sales data where reliable tracking is available.',
  },
  {
    q: 'Can you work with existing teams or agencies?',
    a: 'Yes. Roles, access, review responsibilities, and hand-offs are documented so strategy, creative, media, and reporting remain coordinated.',
  },
];

const heroImage = {
  src: marketingHero1440,
  desktopSrcSet: `${marketingHero960} 960w, ${marketingHero1440} 1440w, ${marketingHero1920} 1920w`,
  mobileSrc: marketingMobile,
  sizes: '100vw',
  width: 1440,
  height: 810,
};

const Marketing = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/marketing')}
    pageTypeClass="marketing-page"
    heroTitle="Marketing"
    heroImage={heroImage}
    {...marketingCopy}
    offers={offers}
    faqsTitle="Marketing engagement questions"
    faqsDescription="Scope, measurement, and collaboration."
    faqs={faqs}
  />
);

export default Marketing;
