import { describe, expect, it, vi } from 'vitest';
import { loadHydrationPage } from '../hydrationRoute';

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
