import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import About from '../About';
import {
  getAboutRevealInitial,
  getAboutRevealTransition,
  getHashScrollBehavior,
} from '../aboutMotion';

const renderAbout = (path = '/about') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <About />
    </MemoryRouter>,
  );

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
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('lets the global route handler own normal top scrolling', () => {
    renderAbout('/about');

    expect(window.scrollTo).not.toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('scrolls to a valid hash once and clears the delayed work', () => {
    vi.useFakeTimers();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    const rendered = renderAbout('/about#team');
    act(() => vi.advanceTimersByTime(100));

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    rendered.unmount();
  });

  it('uses non-spatial hash scrolling when reduced motion is requested', () => {
    expect(getHashScrollBehavior(false)).toBe('smooth');
    expect(getHashScrollBehavior(true)).toBe('auto');
  });

  it('uses a comfortable capped reveal rhythm with a reduced-motion path', () => {
    expect(getAboutRevealInitial(false, 24)).toEqual({ opacity: 0, y: 24 });
    expect(getAboutRevealInitial(true, 24)).toEqual({ opacity: 0 });
    expect(getAboutRevealTransition(false, 0)).toEqual({
      duration: 0.5,
      ease: 'easeOut',
      delay: 0,
    });
    expect(getAboutRevealTransition(false, 10).delay).toBe(0.12);
    expect(getAboutRevealTransition(true, 10)).toEqual({
      duration: 0,
      ease: 'easeOut',
      delay: 0,
    });
  });

  it('uses the approved direction framework', () => {
    renderAbout();
    const section = screen.getByRole('heading', {
      level: 2,
      name: 'What guides our work',
    }).closest('section');

    expect(
      within(section).getAllByRole('heading', { level: 3 }).map((item) => item.textContent),
    ).toEqual(['What we are', 'What we are building towards', 'How we work']);
    expect(within(section).queryByText('Vision')).not.toBeInTheDocument();
    expect(within(section).queryByText('Mission')).not.toBeInTheDocument();
  });

  it('starts the company record with the verified incorporation milestone', () => {
    renderAbout();
    const journey = screen.getByRole('heading', { name: 'Our journey' }).closest('section');
    const years = within(journey).getAllByText(/^20\d{2}$/).map((item) => item.textContent);

    expect(years).toEqual(['2022', '2023', '2024', '2025', '2026']);
    expect(within(journey).getByText(/incorporated on 28 July 2022/i)).toBeInTheDocument();
    expect(within(journey).queryByText(/grant amount|client count/i)).not.toBeInTheDocument();
  });

  it('preserves six verified team records without empty biographies', () => {
    const { container } = renderAbout();
    const team = screen.getByRole('heading', { name: 'Meet our team' }).closest('section');

    expect(within(team).getAllByRole('link', { name: /LinkedIn Profile/ })).toHaveLength(6);
    expect(container.querySelectorAll('.team-card')).toHaveLength(6);
    expect(container.querySelectorAll('.member-bio')).toHaveLength(0);
  });

  it('adds remote-delivery scope and work DSPL does not take on', () => {
    renderAbout();

    expect(screen.getByRole('heading', { name: 'Based in Manipal, built to work remotely' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What we do not take on' })).toBeInTheDocument();
    expect(screen.getByText(/regulator, licensing authority, chartered accountant, or legal adviser/i)).toBeInTheDocument();
  });

  it('mounts the selected multidisciplinary About hero images in order', () => {
    vi.useFakeTimers();
    const rendered = renderAbout();

    act(() => vi.runOnlyPendingTimers());
    const layers = Array.from(rendered.container.querySelectorAll('.about-hero-bg picture'));
    expect(layers.map((layer) => layer.dataset.heroId)).toEqual(['about-primary', 'about-02']);

    rendered.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
