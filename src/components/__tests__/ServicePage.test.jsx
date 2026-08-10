import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WORK_MODAL_EVENT } from '../../utils/workModal';
import ServicePage from '../ServicePage';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

const props = {
  seoMetadata: { title: 'Test service' },
  pageTypeClass: 'test-service',
  contextLabel: 'Test services',
  heroTitle: 'Test service',
  heroTagline: 'A clear, useful service tagline.',
  heroDescription: 'A description of the service engagement.',
  heroCtaLabel: 'Discuss a test project',
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
    icon: <svg aria-hidden="true" />,
  })),
  faqsTitle: 'Service questions',
  faqsDescription: 'Answers about the engagement.',
  faqs: [{ q: 'How does this work?', a: 'With a documented scope.' }],
};

describe('ServicePage', () => {
  it('renders the explicit service-page contract with semantic content groups', () => {
    const { container } = render(<ServicePage {...props} />);

    expect(screen.getByText(props.contextLabel)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: props.heroTitle }))
      .toBeInTheDocument();

    const tagline = screen.getByText(props.heroTagline);
    expect(tagline.tagName).toBe('P');
    expect(screen.getByText(props.heroDescription)).toBeInTheDocument();

    const scope = screen.getByRole('region', { name: props.scopeTitle });
    expect(scope).toHaveClass('service-scope-section');
    expect(within(scope).getByText(props.scopeText)).toBeInTheDocument();
    expect(scope.querySelector('.glass')).not.toBeInTheDocument();
    expect(scope.querySelector('.matters-box')).not.toBeInTheDocument();

    expect(container.querySelectorAll('article.offer-card')).toHaveLength(4);
    expect(container.querySelector('.glow-bg')).not.toBeInTheDocument();
    expect(container.querySelector('.offer-card.glass')).not.toBeInTheDocument();
  });

  it('keeps responsive hero media and opens the modal from the existing route source', () => {
    const modalSources = [];
    const captureModalSource = (event) => modalSources.push(event.detail.source);
    window.addEventListener(WORK_MODAL_EVENT, captureModalSource);

    const { container } = render(<ServicePage {...props} />);
    const heroImage = container.querySelector('.domain-hero-bg-img');
    const sources = container.querySelectorAll('.domain-hero-picture source');

    expect(sources[0]).toHaveAttribute('media', '(max-width: 767px)');
    expect(sources[0]).toHaveAttribute('srcset', props.heroImage.mobileSrc);
    expect(sources[1]).toHaveAttribute('srcset', props.heroImage.desktopSrcSet);
    expect(heroImage).toHaveAttribute('src', props.heroImage.src);
    expect(heroImage).toHaveAttribute('width', '1440');
    expect(heroImage).toHaveAttribute('height', '810');

    fireEvent.click(screen.getByRole('button', { name: props.heroCtaLabel }));
    expect(modalSources).toEqual(['test-service-hero']);

    window.removeEventListener(WORK_MODAL_EVENT, captureModalSource);
  });
});
