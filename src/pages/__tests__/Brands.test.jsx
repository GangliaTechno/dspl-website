import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Brands from '../Brands';

describe('Brands page', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}

      unobserve() {}

      disconnect() {}
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the approved portfolio context and preserved brand actions', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/brands']}>
        <Brands />
      </MemoryRouter>,
    );

    expect(screen.getByText('DSPL Brands')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'We develop and operate consumer brands.',
    })).toBeInTheDocument();
    expect(screen.getByText('From product development to market execution.'))
      .toHaveClass('brands-tagline');
    expect(screen.getByText(
      'We work across product development, packaging, compliance, market positioning, and commerce. Raw Radicles is our first flagship consumer brand, with additional concepts in development.',
    )).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Raw Radicles' }))
      .toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(screen.getByText('Chocolate, reimagined through Ayurveda.'))
      .toBeInTheDocument();
    for (const proof of [
      'Six 60 g bars across three collections',
      'Real cacao with selected Ayurvedic botanicals',
      'Chocolate production partnership in Kerala',
      'Formulation partnership in Thrissur',
    ]) {
      expect(screen.getByText(proof)).toBeInTheDocument();
    }

    const brandBadge = container.querySelector('.brand-type-badge');
    expect(brandBadge).toHaveTextContent('FLAGSHIP CONSUMER BRAND');
    expect(brandBadge.querySelector('svg')).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Contact us about Raw Radicles' }))
      .toHaveAttribute('href', '/contact');
    expect(container.querySelector('.rr-cta-btn[href^="mailto:"]'))
      .not.toBeInTheDocument();
    expect(screen.getByRole('link', {
      name: 'Contact us about a brand partnership',
    })).toHaveAttribute('href', '/contact');
    expect(screen.queryByRole('button', {
      name: /brand partnership/i,
    })).not.toBeInTheDocument();

    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Portfolio in development',
    })).toBeInTheDocument();
    expect(screen.getByText(
      'Additional consumer-brand concepts are being evaluated and developed. We will publish them here when they are ready for market.',
    )).toBeInTheDocument();

    for (const selector of [
      '.glow-bg',
      '.pipeline-icon-box',
      '.pipeline-decorative-shape-1',
      '.pipeline-decorative-shape-2',
    ]) {
      expect(container.querySelector(selector)).not.toBeInTheDocument();
    }
  });
});
