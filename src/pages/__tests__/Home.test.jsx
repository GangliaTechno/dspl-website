import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Home from '../Home';

describe('Home page', () => {
  it('presents institutional, process, and owned-brand proof without duplicate logos', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /we develop brands.*we deliver disciplined market execution/i,
      }),
    ).toBeInTheDocument();

    const supporterRegion = screen.getByRole('region', {
      name: 'Supported by',
    });
    expect(within(supporterRegion).getAllByRole('img')).toHaveLength(4);
    expect(
      screen.getByRole('heading', { name: 'How We Work With You' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 6')).toBeInTheDocument();
    expect(container.querySelectorAll('.service-evidence-card')).toHaveLength(3);
    expect(container.querySelector('.service-marker')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Raw Radicles' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Built and operated by DSPL')).toBeInTheDocument();
  });

  it('renders the approved centered hero content and removes the legacy proof panel', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    const heroHeading = screen.getByRole('heading', {
      level: 1,
      name: 'We develop brands. We deliver disciplined market execution.',
    });
    expect(heroHeading).toBeInTheDocument();
    expect(heroHeading.querySelectorAll('span')[0]).not.toHaveClass(
      'hero-title-accent',
    );
    expect(heroHeading.querySelectorAll('span')[1]).toHaveClass(
      'hero-title-accent',
    );

    expect(
      screen.getByText(
        'Dashapatmaja Solutions Pvt Ltd develops and operates consumer brands while helping businesses coordinate branding, marketing, and e-commerce through clearly defined, accountable execution.',
      ),
    ).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: 'Work With Us' }))
      .not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'See Our Brands' }))
      .not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore our capabilities' }))
      .toHaveAttribute('href', '#capabilities');
    expect(screen.getByRole('region', {
      name: 'One growth system, not three disconnected vendors',
    })).toHaveAttribute('id', 'capabilities');

    expect(
      screen.queryByText('Brand systems for Indian consumer businesses'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('One accountable team')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Brand strategy and identity'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/return on every rupee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/convert/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/all from one place/i)).not.toBeInTheDocument();
  });

  it('keeps the supporter marquee decorative without a pause control', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    const supporterRegion = screen.getByRole('region', {
      name: 'Supported by',
    });
    expect(
      within(supporterRegion).queryByRole('button'),
    ).not.toBeInTheDocument();
  });
});
