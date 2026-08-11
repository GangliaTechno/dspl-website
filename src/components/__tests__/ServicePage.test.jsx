import { act, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ServicePage from '../ServicePage';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

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
    expect(container.querySelector('.offer-icon-wrapper')).not.toBeInTheDocument();
    expect(screen.queryByText('Services')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: props.faqsTitle }))
      .toBeInTheDocument();
    expect(screen.getByText(props.faqsDescription)).toBeInTheDocument();
    expect(container.querySelector('.glow-bg')).not.toBeInTheDocument();
    expect(container.querySelector('.offer-card.glass')).not.toBeInTheDocument();
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
