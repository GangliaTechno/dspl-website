import marketingHero960 from '../assets/marketing-primary-960.webp';
import marketingHero1440 from '../assets/marketing-primary-1440.webp';
import marketingMobile from '../assets/marketing-primary-mobile.webp';
import marketingRotation02960 from '../assets/marketing-dashboard-960.webp';
import marketingRotation021440 from '../assets/marketing-dashboard-1440.webp';
import marketingRotation02Mobile from '../assets/marketing-dashboard-mobile-hq.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { MARKETING_FAQS } from '../content/serviceFaqs';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Search engine optimisation',
    text: 'Review technical foundations, search intent, page structure and internal links, then prioritise improvements against the agreed audience and business goals.',
  },
  {
    title: 'Paid campaign management',
    text: 'Plan and manage agreed search, social or marketplace campaigns, with account ownership, budgets and review measures made clear before activity begins.',
  },
  {
    title: 'Analytics and reporting',
    text: 'Check that agreed actions can be measured, keep definitions consistent and report what changed, what it may mean and what to review next.',
  },
  {
    title: 'Content and copywriting',
    text: 'Develop landing pages, articles, product copy and campaign messages around the audience, channel and approved brand voice.',
  },
];

const proof = {
  eyebrow: 'Owned operating experience',
  title: 'What Raw Radicles teaches us about marketing operations',
  body: 'Raw Radicles gives DSPL direct experience coordinating product information, photography, channel assets, campaign preparation, catalogue content, and measurement around an owned brand.',
  points: [
    'Campaign work depends on accurate product, pricing, availability, and fulfilment inputs.',
    'Creative and channel decisions work better when ownership and review points are explicit.',
    'Measurement definitions must be agreed before performance is interpreted.',
  ],
};

const engagements = {
  title: 'Ways to engage',
  description: 'Choose the engagement shape that matches the scope, evidence, and operating need.',
  items: [
    {
      title: 'Audit and plan',
      text: 'A defined review of market position, channels, tracking, content, and priorities, followed by an actionable plan.',
    },
    {
      title: 'Monthly programme',
      text: 'Ongoing coordination across agreed channels, content, campaigns, measurement, and review responsibilities.',
    },
    {
      title: 'Launch sprint',
      text: 'A focused programme for a named launch, with responsibilities and dependencies agreed before activity begins.',
    },
  ],
};

const faqs = MARKETING_FAQS;

const heroImages = [
  {
    id: 'marketing-primary',
    src: marketingHero1440,
    desktopSrcSet: `${marketingHero960} 960w, ${marketingHero1440} 1440w`,
    mobileSrc: marketingMobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  {
    id: 'marketing-02',
    src: marketingRotation021440,
    desktopSrcSet: `${marketingRotation02960} 960w, ${marketingRotation021440} 1440w`,
    mobileSrc: marketingRotation02Mobile,
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const Marketing = () => (
  <ServicePage
    seoMetadata={getRouteMetadata('/marketing')}
    pageTypeClass="marketing-page"
    contextLabel="Marketing services"
    heroTitle="Marketing"
    heroTagline="Search, paid media, content and reporting, planned around measures agreed before work begins."
    heroImages={heroImages}
    scopeTitle="Marketing with measures you can review"
    scopeText="We begin by understanding where traffic comes from, what is already being measured and what a useful result would look like. The agreed plan then defines the channels, responsibilities and reporting cadence. Because we also work on an owned consumer brand, we approach channel decisions with the same care we expect when spending our own budget."
    offersTitle="What we run"
    offersDescription="A focused channel mix, selected around the evidence, budget and responsibilities agreed for the engagement."
    offers={offers}
    proof={proof}
    engagements={engagements}
    testimonials={approvedTestimonials}
    faqsTitle="Frequently asked questions about marketing"
    faqsDescription="Clear answers about scope, measurement, ownership, collaboration, inputs and reporting."
    faqs={faqs}
  />
);

export default Marketing;
