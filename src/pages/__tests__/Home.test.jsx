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
      screen.getByRole('link', { name: /see how we built raw radicles/i }),
    ).toHaveAttribute('href', '/brands/raw-radicles');
  });

  it('labels verified supporters and exposes three coordinated services and compliance strip', () => {
    const { container } = renderHome();
    const supporterRegion = screen.getByRole('region', {
      name: 'Recognised and supported by',
    });

    expect(
      within(supporterRegion).getByText('Recognised and supported by'),
    ).toBeVisible();
    expect(within(supporterRegion).getAllByRole('img')).toHaveLength(3);
    expect(within(supporterRegion).getByAltText('DST NIDHI')).toBeInTheDocument();
    expect(within(supporterRegion).getByAltText('NIDHI PRAYAS')).toBeInTheDocument();
    expect(within(supporterRegion).getByAltText('Startup Karnataka')).toBeInTheDocument();
    expect(within(supporterRegion).queryByAltText(/manipal universal technology business incubator|mutbi/i)).not.toBeInTheDocument();

    const duplicateSequences = supporterRegion.querySelectorAll(
      '.supporter-marquee-sequence[aria-hidden="true"]',
    );
    expect(duplicateSequences).toHaveLength(3);
    duplicateSequences.forEach((seq) => {
      const dupImages = seq.querySelectorAll('img');
      expect(dupImages).toHaveLength(3);
      dupImages.forEach((img) => expect(img).toHaveAttribute('alt', ''));
    });

    expect(within(supporterRegion).queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.service-evidence-card')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Compliance coordination' }))
      .toBeInTheDocument();
    expect(screen.getByRole('link', { name: /branding compliance/i }))
      .toHaveAttribute('href', '/branding#compliance');
    expect(screen.getByRole('link', { name: /e-commerce compliance/i }))
      .toHaveAttribute('href', '/ecommerce#compliance');
  });

  it('places three-step process with timing and outputs and integrated owned brand proof', () => {
    const { container } = renderHome();
    expect(screen.queryByRole('heading', { name: 'Owned experience informs the work' }))
      .not.toBeInTheDocument();
    expect(container.querySelectorAll('.process-column')).toHaveLength(3);
    expect(screen.getAllByText('Timing')).toHaveLength(3);
    expect(screen.getAllByText('Output')).toHaveLength(3);
    expect(Array.from(container.querySelectorAll('.process-step-title'), (node) => node.textContent))
      .toEqual(['Audit', 'Build', 'Grow']);
    expect(Array.from(container.querySelectorAll('.process-big-numeral'), (node) => node.textContent))
      .toEqual(['01', '02', '03']);

    const steps = container.querySelectorAll('.process-column');
    expect(steps[0].querySelector('.process-step-description').textContent)
      .toBe('Understand the current position, priorities and constraints.');
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Initial scope review');
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Priority audit and brief');

    expect(steps[1].querySelector('.process-step-description').textContent)
      .toBe('Create and coordinate the agreed system.');
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Approved roadmap');
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Launch-ready system');

    expect(steps[2].querySelector('.process-step-description').textContent)
      .toBe('Launch, measure and improve around evidence.');
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Engagement cadence');
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Review and next priorities');

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(screen.getByText(/informs how we plan and structure client work/i))
      .toBeInTheDocument();
  });

  it('expands Raw Radicles responsibilities without inventing testimonials', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(
      screen.getByText(/formulation briefing, packaging, compliance inputs, photography, pricing, and route to market/i),
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
