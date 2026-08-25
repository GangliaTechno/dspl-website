import { describe, expect, it, vi } from 'vitest';
import {
  loadHydrationPage,
  shouldHydratePrerenderedPage,
} from '../hydrationRoute';

describe('loadHydrationPage', () => {
  it('loads only the page that matches the initial pathname', async () => {
    const Home = () => null;
    const About = () => null;
    const loaders = {
      Home: vi.fn(async () => ({ default: Home })),
      About: vi.fn(async () => ({ default: About })),
      NotFound: vi.fn(async () => ({ default: () => null })),
    };

    await expect(loadHydrationPage('/about', loaders)).resolves.toEqual({
      About,
    });
    expect(loaders.About).toHaveBeenCalledOnce();
    expect(loaders.Home).not.toHaveBeenCalled();
    expect(loaders.NotFound).not.toHaveBeenCalled();
  });

  it.each([
    ['/brands/raw-radicles', 'RawRadicles'],
    ['/start', 'StartProject'],
    ['/terms', 'TermsOfUse'],
    ['/blogs', 'Blogs'],
    ['/blogs/approved-slug', 'BlogPost'],
  ])('loads %s through the %s page loader', async (pathname, pageName) => {
    const Page = () => null;
    const loaders = {
      [pageName]: vi.fn(async () => ({ default: Page })),
      NotFound: vi.fn(async () => ({ default: () => null })),
    };

    await expect(loadHydrationPage(pathname, loaders)).resolves.toEqual({
      [pageName]: Page,
    });
    expect(loaders[pageName]).toHaveBeenCalledOnce();
    expect(loaders.NotFound).not.toHaveBeenCalled();
  });

  it('uses the not-found page for an unknown pathname', async () => {
    const NotFound = () => null;
    const loaders = {
      Home: vi.fn(async () => ({ default: () => null })),
      NotFound: vi.fn(async () => ({ default: NotFound })),
    };

    await expect(
      loadHydrationPage('/missing-evidence-route', loaders),
    ).resolves.toEqual({ NotFound });
    expect(loaders.NotFound).toHaveBeenCalledOnce();
    expect(loaders.Home).not.toHaveBeenCalled();
  });
});

describe('shouldHydratePrerenderedPage', () => {
  it('hydrates known public and published blog routes', () => {
    expect(
      shouldHydratePrerenderedPage(true, { Home: () => null }, '/'),
    ).toBe(true);
    expect(
      shouldHydratePrerenderedPage(
        true,
        { StartProject: () => null },
        '/start',
      ),
    ).toBe(true);
    expect(
      shouldHydratePrerenderedPage(
        true,
        { Blogs: () => null },
        '/blogs',
      ),
    ).toBe(true);
    expect(
      shouldHydratePrerenderedPage(
        true,
        { BlogPost: () => null },
        '/blogs/fssai-labelling-requirements-checklist-2026',
      ),
    ).toBe(true);
  });

  it('client-renders unknown routes because the server fallback may contain another route', () => {
    expect(
      shouldHydratePrerenderedPage(
        true,
        { NotFound: () => null },
        '/missing-evidence-route',
      ),
    ).toBe(false);
    expect(
      shouldHydratePrerenderedPage(
        true,
        { BlogPost: () => null },
        '/blogs/unknown-slug',
      ),
    ).toBe(false);
  });

  it('client-renders when no prerendered markup exists', () => {
    expect(shouldHydratePrerenderedPage(false, undefined, '/')).toBe(false);
  });
});
