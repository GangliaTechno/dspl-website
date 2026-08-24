import { act, render, screen, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import ServicePage from '../ServicePage';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

const readSource = (relativePath) => readFileSync(resolve(relativePath), 'utf8');

const props = {
  seoMetadata: { title: 'Test service' },
  pageTypeClass: 'test-service',
  contextLabel: 'Test services',
  heroTitle: 'Test service',
  heroTagline: 'A precise service positioning statement.',
  heroImages: [
    {
      id: 'service-primary',
      src: '/service-1440.webp',
      desktopSrcSet: '/service-960.webp 960w, /service-1440.webp 1440w',
      mobileSrc: '/service-mobile.webp',
      sizes: '100vw',
      width: 1440,
      height: 810,
    },
    {
      id: 'service-02',
      src: '/service-02-1440.webp',
      desktopSrcSet: '/service-02-960.webp 960w, /service-02-1440.webp 1440w',
      mobileSrc: '/service-02-mobile.webp',
      sizes: '100vw',
      width: 1440,
      height: 810,
    },
  ],
  scopeTitle: 'A defined service scope',
  scopeText: 'The scope stays in the normal page flow.',
  offersTitle: 'Service capabilities',
  offersDescription: 'Four capabilities selected for the brief.',
  offers: Array.from({ length: 4 }, (_, index) => ({
    title: `Capability ${index + 1}`,
    text: `Capability ${index + 1} description.`,
  })),
  compliance: {
    title: 'Compliance coordination',
    intro: 'A careful compliance introduction.',
    items: [
      { title: 'Labels', text: 'Label coordination detail.' },
      { title: 'Listings', text: 'Listing coordination detail.' },
    ],
    disclaimer: 'Qualified advisers retain regulated advice.',
  },
  proof: {
    eyebrow: 'Owned experience',
    title: 'Proof without invented metrics',
    body: 'A factual proof statement.',
    points: ['Confirmed point one', 'Confirmed point two'],
  },
  engagements: {
    title: 'Ways to engage',
    description: 'Select the shape that fits the brief.',
    items: [
      { title: 'Audit and plan', text: 'A defined audit.' },
      { title: 'Ongoing programme', text: 'A coordinated programme.' },
    ],
  },
  testimonials: [],
  faqsTitle: 'Service questions',
  faqsDescription: 'Answers about the engagement.',
  faqs: [{ q: 'How does this work?', a: 'With a documented scope.' }],
};

describe('ServicePage', () => {
  it('renders the explicit service-page contract with semantic content groups', () => {
    const { container } = render(<ServicePage {...props} />);

    expect(screen.getByRole('heading', { level: 1, name: props.heroTitle }))
      .toBeInTheDocument();
    expect(screen.getByText(props.contextLabel)).toHaveClass('section-subtitle');
    expect(screen.getByText(props.heroTagline)).toHaveClass('domain-subtitle');
    expect(container.querySelector('.domain-description')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /discuss/i }))
      .not.toBeInTheDocument();
    expect(container.querySelector('.domain-hero .section-subtitle'))
      .toBeInTheDocument();

    const scope = screen.getByRole('region', { name: props.scopeTitle });
    expect(scope).toHaveClass('service-scope-section');
    expect(within(scope).getByText(props.scopeText)).toBeInTheDocument();
    expect(scope.querySelector('.glass')).not.toBeInTheDocument();
    expect(scope.querySelector('.matters-box')).not.toBeInTheDocument();

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(Array.from(container.querySelectorAll('.offer-sequence'), (node) => node.textContent))
      .toEqual(['01', '02', '03', '04']);
    expect(container.querySelector('.offer-icon-wrapper')).not.toBeInTheDocument();
    expect(screen.queryByText('Services')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: props.faqsTitle }))
      .toBeInTheDocument();
    expect(screen.getByText(props.faqsDescription)).toBeInTheDocument();
    expect(container.querySelector('.offers-grid')).toHaveClass('offers-grid--editorial');
    expect(screen.getByRole('region', { name: 'Compliance coordination' })
      .querySelector('.service-detail-grid')).toHaveClass('service-detail-grid--supporting');
    expect(screen.getByRole('heading', { name: 'Ways to engage' }).closest('section'))
      .toHaveClass('service-engagements-section');
    expect(screen.getByRole('region', { name: 'Compliance coordination' }))
      .toHaveAttribute('id', 'compliance');
    expect(screen.getByText('Qualified advisers retain regulated advice.'))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Proof without invented metrics' }))
      .toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ways to engage' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /what collaborators say/i }))
      .not.toBeInTheDocument();
    expect(screen.getByText('With a documented scope.')).toBeInTheDocument();
  });

  it('keeps responsive hero media without a page-level modal action', () => {
    vi.useFakeTimers();
    const rendered = render(<ServicePage {...props} />);
    act(() => vi.runOnlyPendingTimers());
    const heroImages = rendered.container.querySelectorAll('.domain-hero-bg-img');
    const pictures = rendered.container.querySelectorAll('.domain-hero-picture picture');
    const sources = pictures[0].querySelectorAll('source');

    expect(pictures).toHaveLength(2);
    expect(Array.from(pictures, (picture) => picture.dataset.heroId)).toEqual([
      'service-primary',
      'service-02',
    ]);
    expect(sources[0]).toHaveAttribute('media', '(max-width: 767px)');
    expect(sources[0]).toHaveAttribute('srcset', props.heroImages[0].mobileSrc);
    expect(sources[1]).toHaveAttribute('srcset', props.heroImages[0].desktopSrcSet);
    expect(heroImages[0]).toHaveAttribute('src', props.heroImages[0].src);
    expect(heroImages[0]).toHaveAttribute('width', '1440');
    expect(heroImages[0]).toHaveAttribute('height', '810');
    expect(rendered.container.querySelector('.domain-cta')).not.toBeInTheDocument();

    rendered.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});

describe('ServicePage responsive CSS contract', () => {
  const css = readSource('src/components/ServicePage.css');

  it('keeps desktop 5-item editorial balancing selectors', () => {
    expect(css).toMatch(
      /\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\)\s*\{[^}]*grid-column:\s*2 \/ span 2;/s,
    );
    expect(css).toMatch(
      /\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*4 \/ span 2;/s,
    );
  });

  it('uses a 769px lower bound for the tablet breakpoint to avoid overlap with mobile', () => {
    expect(css).toContain('@media (min-width: 769px) and (max-width: 900px)');
    expect(css).not.toContain('@media (max-width: 900px) and (min-width: 621px)');
  });

  it('overrides editorial placement at tablet with matching specificity', () => {
    expect(css).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*auto;/s,
    );
  });

  it('restores odd-item right borders before removing even-item borders at tablet', () => {
    // Guards against the desktop :nth-child(3n) rule leaving card 03 without a divider
    expect(css).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry:nth-child\(odd\)\s*\{[^}]*border-right:\s*1px solid var\(--border-color\);/s,
    );
    // Even-column items have no right border
    expect(css).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial \.offer-entry:nth-child\(even\)\s*\{[^}]*border-right:\s*0;/s,
    );
  });

  it('centres the 5th editorial item at 50% width with no right border at tablet', () => {
    expect(css).toMatch(
      /@media \(min-width: 769px\) and \(max-width: 900px\)[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :last-child\s*\{[^}]*grid-column:\s*1 \/ -1;[^}]*width:\s*50%;[^}]*justify-self:\s*center;[^}]*border-right:\s*0;/s,
    );
  });

  it('forces editorial capability grid to 1-column on mobile', () => {
    expect(css).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.offers-grid--editorial\s*\{[^}]*grid-template-columns:\s*1fr;/s,
    );
  });

  it('resets editorial items 4 and 5 to full row on mobile with correct specificity', () => {
    expect(css).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*grid-column:\s*1 \/ -1;[^}]*width:\s*100%;/s,
    );
  });

  it('removes right borders from all editorial capability items on mobile', () => {
    expect(css).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.offers-grid--editorial \.offer-entry,[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(4\),[\s\S]*?\.offers-grid--editorial\[data-count="5"\] > :nth-child\(5\)\s*\{[^}]*border-right:\s*0;/s,
    );
  });
});
