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
});
