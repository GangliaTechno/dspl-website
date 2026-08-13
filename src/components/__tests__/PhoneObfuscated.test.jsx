import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PhoneObfuscated from '../PhoneObfuscated';

describe('PhoneObfuscated', () => {
  it('renders truthful visible text and a direct tel link', () => {
    render(
      <PhoneObfuscated
        number="+91 88619 42440"
        label="Call new enquiries"
      />,
    );

    const link = screen.getByRole('link', { name: 'Call new enquiries' });
    expect(link).toHaveAttribute('href', 'tel:+918861942440');
    expect(link).toHaveTextContent('+91 88619 42440');
    expect(link).not.toHaveAttribute('href', '#phone');
    expect(link.querySelector('[dir="rtl"]')).not.toBeInTheDocument();
  });
});
