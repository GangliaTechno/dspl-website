import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import About from '../About';

describe('About page', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}

      unobserve() {}

      disconnect() {}
    });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('presents the direction framework in its approved reading order', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    expect(screen.getByText('Our Corporate Profile')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'About Dashapatmaja Solutions Pvt Ltd',
    })).toBeInTheDocument();
    expect(screen.getByText(
      'A multidisciplinary company focused on brand development and commercial execution.',
    )).toHaveClass('about-subtitle');
    expect(container.querySelector('.about-hero .about-intro-text'))
      .not.toBeInTheDocument();
    expect(screen.queryByText(/Founded in 2023, Dashapatmaja Solutions Pvt Ltd/))
      .not.toBeInTheDocument();

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'What guides our work',
    });
    const section = heading.closest('section');

    expect(section).toBeInTheDocument();

    const directionSection = within(section);
    expect(directionSection.getAllByRole('article')).toHaveLength(3);
    expect(
      directionSection.getAllByRole('heading', { level: 3 }).map((card) => card.textContent),
    ).toEqual(['Vision', 'Mission', 'Values']);
    expect(directionSection.getAllByText(
      /^(Long-term direction|Our mandate|Operating principles)$/,
    ).map((label) => label.textContent)).toEqual([
      'Long-term direction',
      'Our mandate',
      'Operating principles',
    ]);
    expect(directionSection.queryByText(/^0[1-3]$/)).not.toBeInTheDocument();
    expect(directionSection.getByText(
      'To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.',
    )).toBeInTheDocument();
    expect(directionSection.getByText(
      'We develop our own brands and help businesses strengthen their branding, marketing, and e-commerce capabilities through practical, accountable execution.',
    )).toBeInTheDocument();
    expect(directionSection.getByText(
      'Evidence guides our recommendations. We define scope, responsibilities, and measures clearly, communicate decisions honestly, and execute agreed work with care.',
    )).toBeInTheDocument();
    expect(section.querySelector('.direction-values-list')).not.toBeInTheDocument();
    expect(section.querySelectorAll('svg')).toHaveLength(0);
  });

  it('mounts the approved About hero images in a fixed order', () => {
    vi.useFakeTimers();
    const rendered = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    act(() => vi.runOnlyPendingTimers());
    const layers = Array.from(
      rendered.container.querySelectorAll('.about-hero-bg picture'),
    );
    expect(layers.map((layer) => layer.dataset.heroId)).toEqual([
      'about-primary',
      'about-02',
    ]);
    expect(layers[0].querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('about-rotation-02-1440.webp'),
    );
    expect(layers[1].querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('dspl-about-hero-1440.webp'),
    );
    expect(layers[0].querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('about-rotation-02-1440.webp'),
    );
    expect(layers[1].querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('dspl-about-hero-1440.webp'),
    );

    rendered.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
