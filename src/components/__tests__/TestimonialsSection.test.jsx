import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TestimonialsSection from '../TestimonialsSection';

describe('TestimonialsSection', () => {
  it('creates no empty section when no approved testimonials exist', () => {
    const { container } = render(<TestimonialsSection testimonials={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders only supplied testimonial evidence', () => {
    render(
      <TestimonialsSection
        eyebrow="Client perspective"
        title="What collaborators say"
        testimonials={[
          {
            quote: 'The work was clear and carefully coordinated.',
            name: 'Approved Person',
            role: 'Founder',
            company: 'Approved Company',
            consentReference: 'consent-001',
          },
        ]}
      />,
    );

    expect(
      screen.getByRole('region', { name: 'What collaborators say' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('The work was clear and carefully coordinated.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Approved Person')).toBeInTheDocument();
    expect(screen.getByText(/Founder, Approved Company/)).toBeInTheDocument();
    expect(screen.queryByText('consent-001')).not.toBeInTheDocument();
  });
});
