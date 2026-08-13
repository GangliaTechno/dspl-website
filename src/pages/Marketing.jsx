import marketingHero960 from '../assets/marketing-primary-960.webp';
import marketingHero1440 from '../assets/marketing-primary-1440.webp';
import marketingMobile from '../assets/marketing-primary-mobile.webp';
import marketingRotation02960 from '../assets/marketing-dashboard-960.webp';
import marketingRotation021440 from '../assets/marketing-dashboard-1440.webp';
import marketingRotation02Mobile from '../assets/marketing-dashboard-mobile-hq.webp';
import ServicePage from '../components/ServicePage';
import { approvedTestimonials } from '../content/publication';
import { getRouteMetadata } from '../seo/routeMetadata';

const offers = [
  {
    title: 'Audience and Market Planning',
    text: 'Current position, customer context, channel evidence, and commercial priorities translated into an agreed marketing plan.',
  },
  {
    title: 'Search Engine Optimisation (SEO)',
    text: 'Technical review, search-intent research, on-page structure, and content planning designed to improve qualified organic visibility over time.',
  },
  {
    title: 'Paid Campaign Management',
    text: 'Campaign planning and management across Google, Meta, and relevant commerce channels, with budgets reviewed against agreed measures.',
  },
  {
    title: 'Content and Copywriting',
    text: 'Landing pages, articles, product copy, and campaign messaging aligned with search intent and the brand voice. Content is currently scoped in English.',
  },
  {
    title: 'Analytics and Performance Tracking',
    text: 'Tracking and reporting for traffic, campaign spend, enquiries, and commercial outcomes, with measurement definitions agreed before launch.',
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
  description: 'The proposal selects the engagement shape that matches the evidence, team, and operating need.',
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

const faqs = [
  {
    q: 'How is the scope defined?',
    a: 'We begin with your objectives, audience, current channels, available data, and budget. The proposal then sets out priorities, responsibilities, deliverables, and reporting cadence.',
  },
  {
    q: 'How are results assessed?',
    a: 'We agree measures before launch. These may include qualified traffic, enquiry volume, campaign efficiency, or sales data where reliable tracking is available.',
  },
  {
    q: 'Can you guarantee results?',
    a: 'No. We cannot guarantee rankings, leads, or sales. Outcomes depend on the offer, market, budget, timing, competition, operating follow-through, and data quality.',
  },
  {
    q: 'How long should an ongoing programme run?',
    a: 'Ongoing programmes use a minimum initial commitment of three months so there is time to establish the baseline, execute agreed work, and review evidence. The exact scope remains proposal-specific.',
  },
  {
    q: 'Can you work with existing teams or agencies?',
    a: 'Yes. Roles, access, review responsibilities, and hand-offs are documented so strategy, creative, media, and reporting remain coordinated.',
  },
];

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
    heroTagline="Build a measurable marketing programme around clear audiences and accountable execution."
    heroImages={heroImages}
    scopeTitle="A coordinated marketing programme"
    scopeText="Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve decisions over time."
    offersTitle="Marketing capabilities"
    offersDescription="The mix is selected against the brief; it is not a fixed package."
    offers={offers}
    proof={proof}
    engagements={engagements}
    testimonials={approvedTestimonials}
    faqsTitle="Marketing engagement questions"
    faqsDescription="Scope, measurement, commitments, and collaboration."
    faqs={faqs}
  />
);

export default Marketing;
