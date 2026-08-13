import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TermsOfUse from '../TermsOfUse';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));

describe('Terms of Use', () => {
  it('sets restrained terms for the informational website', () => {
    const { container } = render(<TermsOfUse />);
    const text = container.textContent;

    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Use' })).toBeInTheDocument();
    expect(text).toMatch(/informational/i);
    expect(text).toMatch(/does not create.*client relationship/i);
    expect(text).toMatch(/signed proposal or agreement.*takes precedence/i);
    expect(text).toMatch(/intellectual property/i);
    expect(text).toMatch(/prohibited misuse/i);
    expect(text).toMatch(/external links/i);
    expect(text).toMatch(/reasonable efforts.*accurate.*available/i);
    expect(text).toMatch(/laws of India/i);
    expect(text).toMatch(/courts in Karnataka/i);
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
  });

  it('avoids sweeping legal clauses', () => {
    const { container } = render(<TermsOfUse />);
    expect(container).not.toHaveTextContent(/all liability/i);
    expect(container).not.toHaveTextContent(/as is/i);
    expect(container).not.toHaveTextContent(/indemnify us against any/i);
  });
});
