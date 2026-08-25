import { describe, expect, it } from 'vitest';
import { resolvePublicationArtwork } from '../publicationArtwork';

describe('resolvePublicationArtwork', () => {
  it('returns null when mainImage is null, undefined, or missing asset.url', () => {
    expect(resolvePublicationArtwork(null)).toBeNull();
    expect(resolvePublicationArtwork(undefined)).toBeNull();
    expect(resolvePublicationArtwork({})).toBeNull();
    expect(resolvePublicationArtwork({ asset: {} })).toBeNull();
    expect(resolvePublicationArtwork({ asset: { url: '' } })).toBeNull();
  });

  it('builds a 3-entry srcSet when all responsive URLs are valid strings', () => {
    const mainImage = {
      alt: 'Compliance checklist on desk',
      caption: 'Field review checklist for packaging',
      asset: {
        url: '/insights/fssai-labelling-v1-1440.webp',
        metadata: { dimensions: { width: 1440, height: 810 } },
      },
      responsive: {
        640: '/insights/fssai-labelling-v1-640.webp',
        960: '/insights/fssai-labelling-v1-960.webp',
        1440: '/insights/fssai-labelling-v1-1440.webp',
      },
    };

    const resolved = resolvePublicationArtwork(mainImage);
    expect(resolved).toEqual({
      src: '/insights/fssai-labelling-v1-1440.webp',
      srcSet: '/insights/fssai-labelling-v1-640.webp 640w, /insights/fssai-labelling-v1-960.webp 960w, /insights/fssai-labelling-v1-1440.webp 1440w',
      alt: 'Compliance checklist on desk',
      caption: 'Field review checklist for packaging',
      width: 1440,
      height: 810,
    });
  });

  it('omits srcSet when any responsive breakpoint is missing or invalid', () => {
    const mainImageMissing640 = {
      alt: 'Test Alt',
      asset: { url: '/insights/test-1440.webp' },
      responsive: {
        960: '/insights/test-960.webp',
        1440: '/insights/test-1440.webp',
      },
    };
    const res1 = resolvePublicationArtwork(mainImageMissing640);
    expect(res1.srcSet).toBeUndefined();
    expect(res1.src).toBe('/insights/test-1440.webp');
    expect(res1.width).toBe(1440);
    expect(res1.height).toBe(810);

    const mainImageEmptyString = {
      alt: 'Test Alt',
      asset: { url: '/insights/test-1440.webp' },
      responsive: {
        640: '',
        960: '/insights/test-960.webp',
        1440: '/insights/test-1440.webp',
      },
    };
    const res2 = resolvePublicationArtwork(mainImageEmptyString);
    expect(res2.srcSet).toBeUndefined();
  });

  it('falls back to fallbackAlt when alt is missing', () => {
    const mainImageNoAlt = {
      asset: { url: '/insights/test.webp' },
    };
    const res = resolvePublicationArtwork(mainImageNoAlt, 'Fallback Title');
    expect(res.alt).toBe('Fallback Title');
  });
});
