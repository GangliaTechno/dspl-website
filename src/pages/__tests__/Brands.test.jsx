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

  it('states ownership and the filed trademark status without overclaiming', () => {
    const { container } = renderBrands();
    const ownership = screen.getByText(/Raw Radicles is owned and developed by Dashapatmaja Solutions Pvt Ltd/i);
    const hero = container.querySelector('.brands-hero');

    expect(hero.compareDocumentPosition(ownership.closest('section')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText(/trademark application has been filed/i)).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/not described as registered|without implying ownership/i);
    expect(container).not.toHaveTextContent(/registered trademark/i);
    expect(container).not.toHaveTextContent(/FSSAI licensed/i);
  });

  it('explains the brand-owner and services-arm relationship with confirmed product facts', () => {
    renderBrands();

    expect(screen.getByRole('heading', { name: 'Brand owner and services operator' })).toBeInTheDocument();
    for (const fact of [
      'Six 60 g bars across three collections',
      'Real cacao with selected Ayurvedic botanicals',
      'Chocolate production partnership in Kerala',
      'Formulation partnership in Thrissur',
    ]) {
      expect(screen.getByText(fact)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: 'View the Raw Radicles project overview' }))
      .toHaveAttribute('href', '/brands/raw-radicles');
  });

  it('withholds unapproved packaging records and removes the vague pipeline', () => {
    renderBrands();

    expect(screen.queryByRole('heading', { name: /Approved packaging views/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Packaging imagery will be added/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Portfolio in development' })).not.toBeInTheDocument();
    expect(screen.queryByText(/additional consumer-brand concepts/i)).not.toBeInTheDocument();
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
