import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import contactCss from '../pages/Contact.css?raw';
import WorkWithUsModal from '../components/WorkWithUsModal';
import { openWorkModal } from '../utils/workModal';

const pick = (styles, properties) => Object.fromEntries(
  properties.map((property) => [property, styles[property]]),
);

const injectCss = (css) => {
  const style = document.createElement('style');
  style.dataset.testRouteCss = 'contact';
  style.textContent = css;
  document.head.append(style);
};

const captureModalStyles = () => ({
  row: pick(getComputedStyle(screen.getByLabelText(/Email Address/i).closest('.form-group').parentElement), [
    'display', 'gridTemplateColumns', 'gap',
  ]),
  select: pick(getComputedStyle(screen.getByLabelText(/How did you hear/i)), [
    'appearance', 'paddingRight', 'cursor',
  ]),
  error: pick(getComputedStyle(screen.getByText(/Full Name is required/i)), [
    'display', 'color', 'fontSize', 'marginTop',
  ]),
  submit: pick(getComputedStyle(screen.getByRole('button', { name: /Send My Project Details/i })), [
    'width', 'marginTop', 'fontSize',
  ]),
});

afterEach(() => {
  document.querySelectorAll('style[data-test-route-css="contact"]').forEach((style) => style.remove());
});

describe('route stylesheet isolation', () => {
  it('does not let Contact styles alter an open Work With Us modal', () => {
    render(<WorkWithUsModal />);
    act(() => openWorkModal('route-style-isolation'));

    fireEvent.click(screen.getByRole('button', { name: /Send My Project Details/i }));

    const before = captureModalStyles();
    injectCss(contactCss);

    expect(captureModalStyles()).toEqual(before);
  });
});
