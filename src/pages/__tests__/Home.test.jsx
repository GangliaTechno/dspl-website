import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../Home';

describe('Home page', () => {
  it('presents institutional, process, and owned-brand proof without duplicate logos', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /we build brands.*we help businesses grow/i,
      }),
    ).toBeInTheDocument();

    const supporterRegion = screen.getByRole('region', {
      name: 'Supported by',
    });
    expect(within(supporterRegion).getAllByRole('img')).toHaveLength(4);
    expect(
      screen.getByRole('heading', { name: 'How We Work With You' }),
    ).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Raw Radicles' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/owned-brand proof/i)).toBeInTheDocument();
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
        name: 'We build brands. We help businesses grow.',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Dashapatmaja Solutions Pvt Ltd helps businesses grow. We build your brand, bring you customers, and sell your products online. We also build and sell our own brand, Raw Radicles, so we know this work from both sides.',
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
