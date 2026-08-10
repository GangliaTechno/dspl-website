import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FAQAccordion from '../FAQAccordion';

const faqs = [
  { q: 'How is the scope defined?', a: 'The scope is documented before work begins.' },
  { q: 'How are results assessed?', a: 'Against agreed measures.' },
];

describe('FAQAccordion', () => {
  it('uses h3 questions and retains labelled accordion regions and toggle behaviour', () => {
    const { container } = render(<FAQAccordion faqs={faqs} />);

    const firstButton = screen.getByRole('button', { name: faqs[0].q });
    const firstAnswer = container.querySelector('#faq-0-answer');

    expect(firstButton.closest('h3')).toHaveClass('faq-heading');
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(firstAnswer).toHaveAttribute('role', 'region');
    expect(firstAnswer).toHaveAttribute('aria-labelledby', firstButton.id);
    expect(firstAnswer).not.toBeVisible();

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstAnswer).toBeVisible();

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(firstAnswer).not.toBeVisible();
  });
});
