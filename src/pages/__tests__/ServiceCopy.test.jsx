import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Marketing from '../Marketing';
import Branding from '../Branding';
import Ecommerce from '../Ecommerce';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

const routeCases = [
  {
    name: 'Marketing',
    Component: Marketing,
    contextLabel: 'Marketing services',
    heroTagline: 'Marketing built around clear audiences, disciplined execution, and measurable decisions.',
    heroDescription: 'We plan search, paid media, content, and measurement as one programme, with scope and priorities defined against your audience, objectives, and available evidence.',
    heroCtaLabel: 'Discuss a marketing project',
    scopeTitle: 'A coordinated marketing programme',
    scopeText: 'Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve performance over time.',
    offersTitle: 'Marketing capabilities',
    offersDescription: 'The mix is selected against the brief; it is not a fixed package.',
    faqsTitle: 'Marketing engagement questions',
    faqsDescription: 'Scope, measurement, and collaboration.',
    offers: [
      ['Search Engine Optimisation (SEO)', 'Technical review, search-intent research, on-page structure, and content planning designed to improve qualified organic visibility over time.', 'lucide-search'],
      ['Paid Campaign Management', 'Campaign planning and management across Google, Meta, and relevant commerce channels, with budgets reviewed against agreed performance measures.', 'lucide-megaphone'],
      ['Analytics and Performance Tracking', 'Tracking and reporting for traffic, campaign spend, enquiries, and commercial outcomes, with measurement definitions agreed before launch.', 'lucide-chart-no-axes-column-increasing'],
      ['Content and Copywriting', "Landing pages, articles, product copy, and campaign messaging aligned with search intent and the brand's voice.", 'lucide-file-text'],
    ],
    faqs: [
      ['How is the scope defined?', 'We begin with your objectives, audience, current channels, available data, and budget. The proposal then sets out priorities, responsibilities, deliverables, and reporting cadence.'],
      ['How are results assessed?', 'We agree the measures that fit the work before launch. These may include qualified traffic, enquiry volume, campaign efficiency, or sales data where reliable tracking is available.'],
      ['Can you work with existing teams or agencies?', 'Yes. Roles, access, review responsibilities, and hand-offs are documented so strategy, creative, media, and reporting remain coordinated.'],
    ],
    rejectedClaims: ['Get found. Get chosen. Get sales.', 'We did this for Raw Radicles. We can do it for you.', 'Paid ads can bring leads in the first week.'],
  },
  {
    name: 'Branding',
    Component: Branding,
    contextLabel: 'Branding services',
    heroTagline: 'Positioning, identity, and brand systems designed for consistent use.',
    heroDescription: 'We translate business context into a usable brand system: positioning, identity, voice, and the assets required for consistent execution.',
    heroCtaLabel: 'Discuss a branding project',
    scopeTitle: 'A brand system built for application',
    scopeText: 'The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, application rules, and assets that internal and external teams can use consistently.',
    offersTitle: 'Branding capabilities',
    offersDescription: 'The scope is shaped around the decisions and applications the business needs.',
    faqsTitle: 'Branding engagement questions',
    faqsDescription: 'Scope, existing brands, and handover.',
    offers: [
      ['Brand Identity and Visual Systems', 'Logo, colour, typography, packaging and application rules, with a practical system for consistent use across priority touchpoints.', 'lucide-palette'],
      ['Market Positioning', 'Audience, category, competitor, and offer analysis used to define a clear market position and decision framework.', 'lucide-compass'],
      ['Brand Story and Voice', 'A messaging framework covering the brand narrative, voice, core messages, and examples for common customer-facing contexts.', 'lucide-book-open'],
      ['Design Systems and Brand Assets', 'Reusable templates, organised source files, and guidance that support day-to-day implementation by internal and partner teams.', 'lucide-layout-template'],
    ],
    faqs: [
      ['What can a branding engagement include?', 'Scope can include positioning, naming, identity, voice, packaging or application guidelines, and reusable assets. The proposal identifies which are required.'],
      ['Can you work with an existing brand?', 'Yes. We first identify what should be retained, clarified, or replaced, then define the refresh scope against current business needs.'],
      ['What is included in the handover?', 'We provide the agreed source files, usage guidance, and templates, together with a handover for the people responsible for implementation.'],
    ],
    rejectedClaims: ['Build a name customers trust and remember.', 'We did this for Raw Radicles. We can do it for you.', 'A full identity takes four to six weeks'],
  },
  {
    name: 'E-commerce',
    Component: Ecommerce,
    contextLabel: 'E-commerce services',
    heroTagline: 'Storefront, marketplace, payment, and fulfilment systems designed for reliable day-to-day operation.',
    heroDescription: 'We plan and implement commerce systems that connect product presentation, checkout, payments, marketplaces, and fulfilment. Scope is defined around the selected platform, operating model, and support needs.',
    heroCtaLabel: 'Discuss an e-commerce project',
    scopeTitle: 'Commerce aligned with day-to-day operations',
    scopeText: 'Storefront and marketplace work is planned alongside catalogue ownership, payment setup, inventory, fulfilment, and reporting. This keeps the customer journey and operational responsibilities within one documented scope.',
    offersTitle: 'E-commerce capabilities',
    offersDescription: 'Implementation and support are scoped to the platforms, integrations, and operating responsibilities agreed for the project.',
    faqsTitle: 'E-commerce engagement questions',
    faqsDescription: 'Platforms, existing stores, and ongoing support.',
    offers: [
      ['Store Setup and Build', 'Storefront planning and implementation for Shopify, WooCommerce, or React-based commerce, with responsive behaviour and a clear catalogue and content structure.', 'lucide-shopping-cart'],
      ['Conversion Rate Optimisation (CRO)', 'Review of product discovery, product detail, cart, and checkout journeys to identify measurable friction and prioritise testable improvements.', 'lucide-mouse-pointer-click'],
      ['Multi-Channel Selling', 'Marketplace setup and workflow planning for Amazon, Flipkart, and other agreed channels, including catalogue, inventory, and pricing responsibilities.', 'lucide-layers'],
      ['Payments and Delivery Setup', 'Payment and delivery integrations configured around the selected platform, providers, fulfilment model, and internal operating workflow.', 'lucide-credit-card'],
    ],
    faqs: [
      ['How do you select a platform?', 'We recommend a platform after reviewing catalogue complexity, integrations, internal capability, budget, and the expected operating model. Shopify, WooCommerce, and React-based builds are supported where appropriate.'],
      ['Can you improve an existing store?', 'Yes. An audit can cover performance, catalogue structure, product journeys, checkout, analytics, and operating dependencies before improvement work is scoped.'],
      ['Can marketplace and ongoing support be included?', 'Yes, when included in the scope. The engagement defines which channels, integrations, data owners, and ongoing responsibilities are covered.'],
    ],
    rejectedClaims: ['Build a store that loads fast and converts.', 'We sell our own brand this way, so we know what holds up.', 'Your store loads quickly and looks right on every phone.'],
  },
];

describe.each(routeCases)('$name service copy', ({
  Component,
  contextLabel,
  heroTagline,
  heroDescription,
  heroCtaLabel,
  scopeTitle,
  scopeText,
  offersTitle,
  offersDescription,
  faqsTitle,
  faqsDescription,
  offers,
  faqs,
  rejectedClaims,
}) => {
  it('renders the approved route-specific messaging and icon mapping', () => {
    const { container } = render(<Component />);

    for (const text of [
      contextLabel,
      heroTagline,
      heroDescription,
      scopeTitle,
      scopeText,
      offersTitle,
      offersDescription,
      faqsTitle,
      faqsDescription,
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: heroCtaLabel })).toBeInTheDocument();

    const cards = container.querySelectorAll('article.offer-card');
    expect(cards).toHaveLength(4);
    offers.forEach(([title, text, iconClass], index) => {
      expect(cards[index]).toHaveTextContent(title);
      expect(cards[index]).toHaveTextContent(text);
      expect(cards[index].querySelector(`.${iconClass}`)).toBeInTheDocument();
    });

    faqs.flat().forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
    rejectedClaims.forEach((claim) => expect(screen.queryByText(claim, { exact: false })).not.toBeInTheDocument());
  });
});
