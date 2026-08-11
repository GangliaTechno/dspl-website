import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ServicePage from '../ServicePage';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

const props = {
  seoMetadata: { title: 'Test service' },
  pageTypeClass: 'test-service',
  heroTitle: 'Test service',
  heroIntro: 'One concise service positioning paragraph.',
  heroImage: {
    src: '/service-1440.webp',
    desktopSrcSet: '/service-960.webp 960w, /service-1440.webp 1440w',
    mobileSrc: '/service-mobile.webp',
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
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
    expect(screen.getByText(props.heroIntro)).toHaveClass('domain-description');
    expect(screen.queryByRole('button', { name: /discuss/i }))
      .not.toBeInTheDocument();
    expect(container.querySelector('.domain-hero .section-subtitle'))
      .not.toBeInTheDocument();
    expect(container.querySelector('.domain-subtitle')).not.toBeInTheDocument();

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
    const { container } = render(<ServicePage {...props} />);
    const heroImage = container.querySelector('.domain-hero-bg-img');
    const sources = container.querySelectorAll('.domain-hero-picture source');

    expect(sources[0]).toHaveAttribute('media', '(max-width: 767px)');
    expect(sources[0]).toHaveAttribute('srcset', props.heroImage.mobileSrc);
    expect(sources[1]).toHaveAttribute('srcset', props.heroImage.desktopSrcSet);
    expect(heroImage).toHaveAttribute('src', props.heroImage.src);
    expect(heroImage).toHaveAttribute('width', '1440');
    expect(heroImage).toHaveAttribute('height', '810');
    expect(container.querySelector('.domain-cta')).not.toBeInTheDocument();
  });
});
