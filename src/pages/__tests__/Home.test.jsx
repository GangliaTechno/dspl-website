import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Home from '../Home';

const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

describe('Home page', () => {
  it('leads with owned brand-building experience and two durable actions', () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /we build consumer brands.*we help businesses build theirs/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '/start',
    );
    expect(
      screen.getByRole('link', { name: 'See how we built Raw Radicles' }),
    ).toHaveAttribute('href', '/brands/raw-radicles');
  });

  it('labels verified supporters and exposes four coordinated services', () => {
    const { container } = renderHome();
    const supporterRegion = screen.getByRole('region', {
      name: 'Recognised and supported by',
    });

    expect(
      within(supporterRegion).getByText('Recognised and supported by'),
    ).toBeVisible();
    expect(within(supporterRegion).getAllByRole('img')).toHaveLength(4);
    expect(within(supporterRegion).queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.service-evidence-card')).toHaveLength(4);
    expect(screen.getByRole('link', { name: /branding compliance/i }))
      .toHaveAttribute('href', '/branding#compliance');
    expect(screen.getByRole('link', { name: /e-commerce compliance/i }))
      .toHaveAttribute('href', '/ecommerce#compliance');
  });

  it('places owned experience before the six-step process with timing and outputs', () => {
    const { container } = renderHome();
    const ownedProof = screen.getByRole('heading', {
      level: 2,
      name: 'Owned experience informs the work',
    }).closest('section');
    const process = screen.getByRole('heading', {
      level: 2,
      name: 'How We Work With You',
    }).closest('section');

    expect(
      ownedProof.compareDocumentPosition(process) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(container.querySelectorAll('.process-step')).toHaveLength(6);
    expect(screen.getAllByText('Timing')).toHaveLength(6);
    expect(screen.getAllByText('Output')).toHaveLength(6);
    for (const step of container.querySelectorAll('.process-step')) {
      expect(step.querySelector('.process-step-timing dd')).not.toBeEmptyDOMElement();
      expect(step.querySelector('.process-step-output dd')).not.toBeEmptyDOMElement();
    }
  });

  it('expands Raw Radicles responsibilities without inventing testimonials', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(
      screen.getByText(/formulation briefing, packaging, compliance coordination, photography, pricing, and route to market/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('region', { name: /what collaborators say/i }),
    ).not.toBeInTheDocument();
  });

  it('keeps the selected Home artwork as one responsive hero', () => {
    const { container } = renderHome();
    const pictures = container.querySelectorAll('picture.home-hero-media');
    const image = container.querySelector('.home-hero-image');

    expect(pictures).toHaveLength(1);
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
  });
});
