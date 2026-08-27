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
        'Dashapatmaja Solutions is a Manipal-based company that develops its own consumer brands and delivers branding, marketing, e-commerce and product compliance support to businesses across India.',
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
        name: /Brand, market and commerce\.\s*Run as one system\./i,
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.service-evidence-card')).toHaveLength(3);
    expect(
      screen.getByText(
        'Positioning, identity, packaging and voice, delivered as a system your team can actually apply. You receive logo files, colour and type rules, packaging artwork templates and a written messaging guide.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'SEO, paid campaigns on Google and Meta, content and reporting, planned against a defined audience and a monthly number you agree before we start.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Shopify, WooCommerce and custom storefronts, plus Amazon and Flipkart listings, payments and delivery setup, built to run without daily hand-holding.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FSSAI and Legal Metrology support' }))
      .toBeInTheDocument();
    expect(
      screen.getByText(
        /We have taken six food SKUs through FSSAI labelling and Legal Metrology packaging requirements/i,
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
        name: 'One accountable path, from audit to launch',
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
        'We review where the business, brand and channels stand today, and what is actually blocking growth.',
      );
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Initial scope review');
    expect(steps[0].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Written audit and a prioritised project brief');

    expect(steps[1].querySelector('.process-step-description').textContent)
      .toBe(
        'We create the agreed system: identity, campaigns, storefront, packaging, or the combination you need.',
      );
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Approved roadmap');
    expect(steps[1].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Launch-ready assets and documented handover');

    expect(steps[2].querySelector('.process-step-description').textContent)
      .toBe(
        'We launch, measure against the numbers set in stage one, and improve on a fixed monthly cycle.',
      );
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(1) dd').textContent)
      .toBe('Engagement cadence');
    expect(steps[2].querySelector('.process-step-details .process-meta-row:nth-child(2) dd').textContent)
      .toBe('Monthly performance report and next-cycle priorities');

    expect(screen.queryByText(/2 to 3 weeks/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/6 to 12 weeks/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ongoing, monthly review/i)).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(screen.getByText(/that is what shapes how we scope client work/i))
      .toBeInTheDocument();
  });

  it('expands Raw Radicles responsibilities without inventing testimonials', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Raw Radicles' })).toBeInTheDocument();
    expect(
      screen.getByText(/Six 60 g bars across three collections, built with real cacao and Ayurvedic botanicals/i),
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
