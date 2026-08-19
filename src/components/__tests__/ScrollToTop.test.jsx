import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop global hash and scroll management', () => {
  let scrollIntoViewMock;
  let scrollToMock;

  beforeEach(() => {
    scrollIntoViewMock = vi.fn();
    scrollToMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    window.scrollTo = scrollToMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to (0, 0) when no hash is present', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it('handles skip-link #main-content by focusing the target element', () => {
    const main = document.createElement('main');
    main.id = 'main-content';
    document.body.appendChild(main);

    const focusSpy = vi.spyOn(main, 'focus');

    render(
      <MemoryRouter initialEntries={['/#main-content']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(main.getAttribute('tabindex')).toBe('-1');
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);

    main.remove();
  });

  it.each([
    ['/branding#compliance', 'compliance'],
    ['/ecommerce#compliance', 'compliance'],
    ['/about#team', 'team'],
    ['/about#journey-2022', 'journey-2022'],
  ])('scrolls to hash target on %s (%s)', async (route, targetId) => {
    const target = document.createElement('section');
    target.id = targetId;
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={[route]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    target.remove();
  });

  it('uses behavior: auto when reduced motion is preferred', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const target = document.createElement('section');
    target.id = 'compliance';
    document.body.appendChild(target);

    render(
      <MemoryRouter initialEntries={['/branding#compliance']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    });

    target.remove();
  });

  it('handles unknown or missing hash element gracefully without throwing', () => {
    expect(() => {
      render(
        <MemoryRouter initialEntries={['/about#non-existent-section']}>
          <ScrollToTop />
        </MemoryRouter>,
      );
    }).not.toThrow();
  });

  it('cancels pending timers and frames cleanly on rapid unmount or navigation', () => {
    vi.spyOn(window, 'cancelAnimationFrame');
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(
      <MemoryRouter initialEntries={['/about#delayed-target']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
