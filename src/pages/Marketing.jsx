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
    text: 'Technical audit, search intent research, on-page structure, internal linking and a content plan built around terms you can realistically win, not head terms that will never convert. Monthly reporting on rankings, qualified sessions and enquiries.',
  },
  {
    title: 'Paid campaign management',
    text: 'Google Search, Google Shopping, Meta and marketplace ads. Campaign structure, creative briefing, budget pacing and weekly optimisation, with spend reviewed against agreed cost-per-enquiry or ROAS targets.',
  },
  {
    title: 'Analytics and reporting',
    text: 'GA4 and conversion tracking configured before launch, not after. Traffic, spend, enquiries and revenue reported monthly against definitions agreed in writing at the start.',
  },
  {
    title: 'Content and copywriting',
    text: 'Landing pages, articles, product copy and campaign messaging written to search intent and to your brand voice, by people who have written for a product they had to sell themselves.',
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
    heroTagline="Search, paid media, content and reporting, run against a number you agree before we spend anything."
    heroImages={heroImages}
    scopeTitle="Marketing you can hold us to"
    scopeText="Every engagement starts with the same four questions: where does traffic come from today, what does it cost, what does it convert at, and what would a good month look like. We answer those in the audit, agree the measures, and report against them monthly. We market our own consumer brand in the same market you are competing in, which is why we will tell you when paid spend is the wrong answer."
    offersTitle="What we do"
    offersDescription="The mix is chosen against your brief. It is not a package."
    offers={offers}
    proof={proof}
    engagements={engagements}
    testimonials={approvedTestimonials}
    faqsTitle="Marketing engagement questions"
    faqsDescription="Scope, measurement, channels, and reporting."
    faqs={faqs}
  />
);

export default Marketing;
