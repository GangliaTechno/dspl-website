import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, describe, it, expect } from 'vitest';
import Header from '../Header';
import { WORK_MODAL_EVENT } from '../../utils/workModal';

const originalInnerWidth = window.innerWidth;

afterEach(() => {
  window.innerWidth = originalInnerWidth;
});

describe('Header Component', () => {
  it('renders logo and main navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(
      screen.getByAltText('Dashapatmaja Solutions Pvt Ltd logo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main Navigation' })).toBeInTheDocument();
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('owns the global Work With Us modal action', () => {
    const sources = [];
    const captureSource = (event) => sources.push(event.detail.source);
    window.addEventListener(WORK_MODAL_EVENT, captureSource);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getAllByRole('button', {
      name: 'Open Work With Us enquiry form',
    })[0]);
    expect(sources).toEqual(['header']);

    window.removeEventListener(WORK_MODAL_EVENT, captureSource);
  });

  it('toggles mobile menu button with proper ARIA attributes', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const toggleBtn = screen.getByLabelText('Toggle navigation menu');
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps the drawer open through 1039px and closes it at 1040px', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(menuButton);

    window.innerWidth = 1039;
    fireEvent(window, new Event('resize'));
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    window.innerWidth = 1040;
    fireEvent(window, new Event('resize'));
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('lifts slightly while scrolling down and returns while scrolling up', async () => {
    const originalAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;

    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = screen.getByRole('banner');

    window.scrollY = 180;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).toHaveClass('header-lifted'));
    expect(header).not.toHaveClass('header-hidden');

    window.scrollY = 100;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).not.toHaveClass('header-lifted'));

    window.requestAnimationFrame = originalAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    window.scrollY = 0;
  });
});
