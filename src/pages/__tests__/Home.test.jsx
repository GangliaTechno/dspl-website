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
    expect(
      screen.getByText(
        'Dashapatmaja Solutions is a Manipal-based company that develops its own consumer brands and delivers branding, marketing, e-commerce and product compliance support to businesses across Karnataka and India.',
      ),
    ).toBeInTheDocument();
  });

  it('labels verified supporters and exposes three services and compliance strip', () => {
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
    expect(screen.getByText('Capabilities')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Brand, market, and commerceCoordinated as one system\./i,
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.service-evidence-card')).toHaveLength(3);
    expect(
      screen.getByText(
        'Positioning, naming, identity, voice, packaging and application assets organised into a clear system your team and partners can use consistently.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Audience planning, SEO, paid campaigns, content and analytics coordinated around agreed measures, responsibilities and reporting.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Storefronts, marketplaces, catalogue, payments, delivery, returns and analytics planned around the operating model behind the customer journey.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Packaging and commerce compliance coordination' }))
      .toBeInTheDocument();
    expect(
      screen.getByText(
        'For food and consumer-product projects, we can coordinate label inputs, pack declarations, claims review, marketplace listing declarations, and other implementation details within the agreed scope. Regulated advice and approvals remain with the appropriate qualified advisers.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /branding and packaging compliance/i }))
      .toHaveAttribute('href', '/branding#compliance');
    expect(screen.getByRole('link', { name: /marketplace and listing compliance/i }))
      .toHaveAttribute('href', '/ecommerce#compliance');
  });

  it('places three-step process with timing and outputs and integrated owned brand proof', () => {
    const { container } = renderHome();
    expect(screen.queryByRole('heading', { name: 'Owned experience informs the work' }))
      .not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'One accountable path from the first audit to measurement and iteration',
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.process-column')).toHaveLength(3);
    expect(screen.getAllByText('Timing')).toHaveLength(3);
    expect(screen.getAllByText('Output')).toHaveLength(3);
    expect(Array.from(container.querySelectorAll('.process-step-title'), (node) => node.textContent))
      .toEqual(['Audit', 'Build', 'Grow']);
    expect(Array.from(container.querySelectorAll('.process-big-numeral'), (node) => node.textContent))
      .toEqual(['01', '02', '03']);

    const steps = container.querySelectorAll('.process-column');
    expect(steps[0].querySelector('.process-step-description').textContent)
      .toBe(
        'We examine the current position, audience, channels, constraints and priorities before recommending scope.',
      );
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Confirmed after the initial scope review');
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Priority audit and agreed brief');

    expect(steps[1].querySelector('.process-step-description').textContent)
      .toBe(
        'We create and coordinate the agreed brand, market and commerce work, with review points and decision-makers defined in the roadmap.',
      );
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Set by the approved roadmap');
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Launch-ready system and operating handoffs');

    expect(steps[2].querySelector('.process-step-description').textContent)
      .toBe(
        'We launch, measure and improve the work against agreed evidence, then set the next priorities.',
      );
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Agreed as part of the engagement');
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Performance review and next priorities');

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(screen.getByText(/that operating experience shapes how we scope client work/i))
      .toBeInTheDocument();
  });

  it('expands Raw Radicles responsibilities without inventing testimonials', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(
      screen.getByText(/Raw Radicles is DSPL's first owned consumer brand: six 60 g bars across three collections/i),
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
