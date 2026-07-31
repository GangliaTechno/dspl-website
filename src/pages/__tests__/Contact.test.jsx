import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Contact from '../Contact';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

describe('Contact', () => {
  it('keeps one headquarters panel with the verified contact routes', () => {
    const { container } = render(<Contact />);
    const panel = container.querySelector('.contact-details-panel');
    const rows = panel?.querySelectorAll('.contact-detail-row');

    expect(panel).toBeInTheDocument();
    expect(rows).toHaveLength(3);
    expect(screen.getByRole('link', { name: '+91 88619 42440' }))
      .toHaveAttribute('href', 'tel:+918861942440');
    expect(screen.getByRole('link', { name: '+91 90725 56665' }))
      .toHaveAttribute('href', 'tel:+919072556665');
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
    expect(screen.getByRole('link', { name: 'dsplmanipal@gmail.com' }))
      .toHaveAttribute('href', 'mailto:dsplmanipal@gmail.com');
  });

  it('preserves the primary enquiry fields and choices', () => {
    render(<Contact />);

    expect(screen.getByLabelText('First Name')).toBeRequired();
    expect(screen.getByLabelText('Last Name')).toBeRequired();
    expect(screen.getByLabelText('Email Address')).toBeRequired();
    const helpType = screen.getByLabelText('What do you need help with?');

    expect(helpType).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(
      Array.from(helpType.options, (option) => option.textContent),
    ).toEqual([
      'Select an option...',
      'Marketing',
      'Branding',
      'E-commerce',
      'New brand',
      'Other',
    ]);
    expect(screen.getByRole('button', { name: /Send Message/i }))
      .toHaveAttribute('type', 'submit');
  });
});
