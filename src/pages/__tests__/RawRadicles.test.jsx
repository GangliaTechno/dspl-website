import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import RawRadicles from '../RawRadicles';

describe('Raw Radicles project overview', () => {
  it('publishes the complete confirmed fact set', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/brands/raw-radicles']}>
        <RawRadicles />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'We own it, so we carry every decision' })).toBeInTheDocument();
    const hero = container.querySelector('.raw-radicles-hero');
    for (const product of ['Wrath Relief', 'Holy Sin', 'Smart Sin']) {
      expect(
        screen.getByAltText(`${product} Raw Radicles milk chocolate pack`),
      ).toBeInTheDocument();
    }
    expect(hero.querySelectorAll('.raw-radicles-hero-pack')).toHaveLength(3);
    expect(screen.getByText(/Holy Sin, with Chyawanprash/i)).toBeInTheDocument();
    expect(screen.getByText(/Wrath Relief, with Ashwagandha/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart Sin, with Brahmi/i)).toBeInTheDocument();
    for (const fact of [
      /six 60 g bars across three collections/i,
      /real cacao/i,
      /Ayurvedic botanical/i,
      /formulation partnership in Thrissur/i,
      /manufacturing partnership in Ernakulam/i,
      /Formulation brief/i,
      /Packaging and identity/i,
      /FSSAI and Legal Metrology labelling/i,
      /Commercial photography/i,
      /Pricing and margins/i,
      /Route to market/i,
    ]) {
      expect(screen.getAllByText(fact).length).toBeGreaterThan(0);
    }

    expect(screen.getByRole('link', { name: 'Explore our brands' })).toHaveAttribute('href', '/brands');
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/start');
    expect(screen.getByRole('heading', { name: 'We learned this by doing it, not by reading about it' }))
      .toBeInTheDocument();
    expect(container).not.toHaveTextContent(
      /evidence boundary|confirmed facts|approved evidence|does not claim|owner approval/i,
    );

    const text = container.textContent;
    for (const unsupported of [
      /growth by/i,
      /regulatory clearance/i,
      /FSSAI licensed/i,
      /registered trademark/i,
      /confidential cost/i,
    ]) {
      expect(text).not.toMatch(unsupported);
    }
  });
});
