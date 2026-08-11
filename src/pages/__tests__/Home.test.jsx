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
        name: /we develop brands.*we strengthen how businesses go to market/i,
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

    expect(
      screen.getByRole('heading', {
        level: 1,
        name:
          'We develop brands. We strengthen how businesses go to market.',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Dashapatmaja Solutions Pvt Ltd brings branding, marketing, and e-commerce into one coordinated system. We apply the same disciplines to Raw Radicles, the consumer brand we develop and operate.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Work With Us' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'See Our Brands' }),
    ).toHaveAttribute('href', '/brands');

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
