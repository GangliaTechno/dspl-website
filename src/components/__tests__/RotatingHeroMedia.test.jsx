import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RotatingHeroMedia from '../RotatingHeroMedia';

const images = [
  {
    id: 'primary',
    src: '/primary-1440.webp',
    desktopSrcSet: '/primary-960.webp 960w, /primary-1440.webp 1440w',
    mobileSrc: '/primary-mobile.webp',
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
  {
    id: 'secondary',
    src: '/secondary-1440.webp',
    desktopSrcSet: '/secondary-960.webp 960w, /secondary-1440.webp 1440w',
    mobileSrc: '/secondary-mobile.webp',
    sizes: '100vw',
    width: 1440,
    height: 810,
  },
];

const installMatchMedia = (matches) => {
  const listeners = new Set();
  const mediaQuery = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn((event, listener) => {
      if (event === 'change') listeners.add(listener);
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === 'change') listeners.delete(listener);
    }),
  };
  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery));
  return { mediaQuery, listeners };
};

const setDocumentHidden = (hidden, dispatch = true) => {
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    value: hidden,
  });
  if (dispatch) {
    document.dispatchEvent(new Event('visibilitychange'));
  }
};

describe('RotatingHeroMedia', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestIdleCallback', vi.fn((cb) => setTimeout(cb, 0)));
    vi.stubGlobal('cancelIdleCallback', vi.fn((id) => clearTimeout(id)));
    installMatchMedia(false);
    setDocumentHidden(false, false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    setDocumentHidden(false, false);
  });

  it('defers secondary media and rotates only after it has loaded', () => {
    const { container } = render(
      <RotatingHeroMedia
        images={images}
        className="test-hero-media"
        imageClassName="test-hero-image"
        mobileBreakpoint={700}
      />,
    );

    const wrapper = container.querySelector('.test-hero-media');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('picture')).toHaveLength(1);
    expect(screen.getByTestId('hero-primary')).toHaveAttribute('loading', 'eager');
    expect(screen.getByTestId('hero-primary')).toHaveAttribute('fetchpriority', 'high');

    act(() => vi.runOnlyPendingTimers());

    expect(container.querySelectorAll('picture')).toHaveLength(2);
    expect(screen.getByTestId('hero-secondary')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByTestId('hero-secondary')).not.toHaveAttribute('fetchpriority');
    expect(container.querySelector('source[media="(max-width: 700px)"]'))
      .toHaveAttribute('srcset', '/primary-mobile.webp');

    act(() => vi.advanceTimersByTime(19999));
    expect(container.querySelector('[data-hero-id="primary"]'))
      .toHaveAttribute('data-active', 'true');

    act(() => {
      fireEvent.load(screen.getByTestId('hero-secondary'));
    });
    act(() => vi.advanceTimersByTime(19999));
    expect(container.querySelector('[data-hero-id="primary"]'))
      .toHaveAttribute('data-active', 'true');

    act(() => vi.advanceTimersByTime(1));
    expect(container.querySelector('[data-hero-id="secondary"]'))
      .toHaveAttribute('data-active', 'true');

    act(() => vi.advanceTimersByTime(20000));
    expect(container.querySelector('[data-hero-id="primary"]'))
      .toHaveAttribute('data-active', 'true');
  });

  it('pauses while the document is hidden and resumes from the same image', () => {
    const { container } = render(
      <RotatingHeroMedia
        images={images}
        className="test-hero-media"
        imageClassName="test-hero-image"
      />,
    );

    act(() => vi.runOnlyPendingTimers());
    act(() => {
      fireEvent.load(screen.getByTestId('hero-secondary'));
    });
    act(() => setDocumentHidden(true));
    act(() => vi.advanceTimersByTime(40000));
    expect(container.querySelector('[data-hero-id="primary"]'))
      .toHaveAttribute('data-active', 'true');

    act(() => setDocumentHidden(false));
    act(() => vi.advanceTimersByTime(20000));
    expect(container.querySelector('[data-hero-id="secondary"]'))
      .toHaveAttribute('data-active', 'true');
  });

  it('removes scheduled work after unmount', () => {
    const { unmount } = render(
      <RotatingHeroMedia
        images={images}
        className="test-hero-media"
        imageClassName="test-hero-image"
      />,
    );

    act(() => vi.runOnlyPendingTimers());
    act(() => {
      fireEvent.load(screen.getByTestId('hero-secondary'));
    });
    expect(vi.getTimerCount()).toBeGreaterThan(0);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('renders only the primary image for reduced motion', () => {
    installMatchMedia(true);
    const { container } = render(
      <RotatingHeroMedia
        images={images}
        className="test-hero-media"
        imageClassName="test-hero-image"
      />,
    );

    act(() => vi.runOnlyPendingTimers());
    expect(container.querySelectorAll('picture')).toHaveLength(1);
    expect(container.querySelector('[data-hero-id="primary"]'))
      .toHaveAttribute('data-active', 'true');
    expect(screen.queryByTestId('hero-secondary')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });
});
