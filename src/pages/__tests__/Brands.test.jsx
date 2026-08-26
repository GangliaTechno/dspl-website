import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Brands from '../Brands';

const renderBrands = () =>
  render(
    <MemoryRouter initialEntries={['/brands']}>
      <Brands />
    </MemoryRouter>,
  );

describe('Brands page', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('states ownership and brand development with exact Copy Deck text', () => {
    const { container } = renderBrands();
    expect(screen.getByRole('heading', { level: 1, name: 'We develop and operate our own consumer brands.' })).toBeInTheDocument();
    expect(screen.getByText(/From formulation brief to marketplace listing, we build the brands rather than advise on them/i)).toBeInTheDocument();
    expect(screen.getByText('Flagship consumer brand')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Raw Radicles' })).toBeInTheDocument();
    expect(screen.getByText('Chocolate, reimagined through Ayurveda.')).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/not described as registered|without implying ownership/i);
    expect(container).not.toHaveTextContent(/registered trademark/i);
  });

  it('renders exact four proof stats and the Raw Radicles detail CTA', () => {
    renderBrands();

    for (const fact of [
      'Six 60 g bars, three collections, milk and dark',
      'Real cacao with Ashwagandha, Brahmi and Chyawanprash',
      'Chocolate production partnership in Kerala',
      'Formulation partnership in Thrissur, Kerala',
    ]) {
      expect(screen.getByText(fact)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'Explore Raw Radicles' }))
      .toHaveAttribute('href', '/brands/raw-radicles');
  });

  it('includes the approved Portfolio in development section', () => {
    const { container } = renderBrands();

    const statusSection = container.querySelector('section.brands-status-section');
    expect(statusSection).toBeInTheDocument();
    expect(statusSection).toHaveAttribute('aria-labelledby', 'portfolio-dev-title');
    expect(statusSection?.querySelector('.brands-status-copy')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Portfolio in development' })).toBeInTheDocument();
    expect(screen.getByText(/A second consumer brand is in early development/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact us about a brand partnership/i }))
      .toHaveAttribute('href', '/contact');
  });

  it('mounts the selected portfolio hero images in order', () => {
    vi.useFakeTimers();
    const rendered = renderBrands();

    act(() => vi.runOnlyPendingTimers());
    const layers = Array.from(rendered.container.querySelectorAll('.brands-hero-bg picture'));
    expect(layers.map((layer) => layer.dataset.heroId)).toEqual(['brands-primary', 'brands-02']);

    rendered.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
