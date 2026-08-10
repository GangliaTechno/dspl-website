import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import About from '../About';

describe('About page', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}

      unobserve() {}

      disconnect() {}
    });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('presents the direction framework in its approved reading order', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'What guides our work',
    });
    const section = heading.closest('section');

    expect(section).toBeInTheDocument();

    const directionSection = within(section);
    expect(directionSection.getAllByRole('article')).toHaveLength(3);
    expect(
      directionSection.getAllByRole('heading', { level: 3 }).map((card) => card.textContent),
    ).toEqual(['Vision', 'Mission', 'Values']);
    expect(directionSection.getAllByText(/^0[1-3]$/).map((number) => number.textContent)).toEqual([
      '01',
      '02',
      '03',
    ]);
    expect(directionSection.getByText(
      'To build an enduring portfolio of consumer brands defined by quality, relevance, and responsible growth.',
    )).toBeInTheDocument();
    expect(directionSection.getByText(
      'We develop our own brands and help businesses strengthen their branding, marketing, and e-commerce capabilities through practical, accountable execution.',
    )).toBeInTheDocument();
    expect(directionSection.getByText(
      'Evidence before claims. Clarity in decisions. Care in execution.',
    )).toBeInTheDocument();
    expect(section.querySelectorAll('svg')).toHaveLength(0);
  });
});
