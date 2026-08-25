import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';
import NotFound from '../../pages/NotFound';
import {
  getRouteMetadata,
  PUBLIC_ROUTES,
} from '../../seo/routeMetadata';
import useSEO from '../useSEO';

const SEOProbe = ({ metadata }) => {
  useSEO(metadata);
  return null;
};

describe('useSEO', () => {
  it('keeps the canonical company name visible first in every public page title', () => {
    for (const route of PUBLIC_ROUTES) {
      expect(getRouteMetadata(route).title).toMatch(
        /^Dashapatmaja Solutions Pvt Ltd(?: \||$)/,
      );
    }
  });

  it('keeps the canonical company name visible first on the fallback page', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(document.title).toBe(
      'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
    );
    expect(document.querySelector('meta[name="robots"]'))
      .toHaveAttribute('content', 'noindex, follow');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://dashapatmaja.in/404.html',
    );
  });

  it('keeps one canonical link and one schema script across navigation', () => {
    const { rerender } = render(
      <StrictMode>
        <SEOProbe metadata={getRouteMetadata('/')} />
      </StrictMode>,
    );

    rerender(
      <StrictMode>
        <SEOProbe metadata={getRouteMetadata('/contact')} />
      </StrictMode>,
    );

    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    const schemaScripts = document.querySelectorAll(
      'script[data-dspl-schema]',
    );

    expect(canonicalLinks).toHaveLength(1);
    expect(canonicalLinks[0]).toHaveAttribute(
      'href',
      'https://dashapatmaja.in/contact',
    );
    expect(schemaScripts).toHaveLength(1);
    expect(JSON.parse(schemaScripts[0].textContent)['@type']).toEqual([
      'Organization',
      'LocalBusiness',
    ]);
  });

  it('emits share-card dimensions and alt text for the homepage', () => {
    render(<SEOProbe metadata={getRouteMetadata('/')} />);

    expect(document.querySelector('meta[property="og:image"]'))
      .toHaveAttribute('content', 'https://dashapatmaja.in/og-home-2026.jpg');
    expect(document.querySelector('meta[property="og:image:width"]'))
      .toHaveAttribute('content', '1200');
    expect(document.querySelector('meta[property="og:image:height"]'))
      .toHaveAttribute('content', '630');
    expect(document.querySelector('meta[property="og:image:alt"]'))
      .toHaveAttribute(
        'content',
        'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
      );
    expect(document.querySelector('meta[name="twitter:image:alt"]'))
      .toHaveAttribute(
        'content',
        'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
      );
  });

  it('removes stale optional image dimensions when navigating to a custom article image', () => {
    const homepageMetadata = getRouteMetadata('/');
    const articleMetadata = {
      ...getRouteMetadata('/blogs'),
      canonical: '/blogs/brand-systems',
      image: 'https://cdn.example.com/brand-systems-share.jpg',
      imageAlt: 'Approved brand systems editorial image',
    };
    delete articleMetadata.imageWidth;
    delete articleMetadata.imageHeight;

    const { rerender } = render(
      <SEOProbe metadata={homepageMetadata} />,
    );
    expect(document.querySelector('meta[property="og:image:width"]'))
      .toHaveAttribute('content', '1200');

    rerender(<SEOProbe metadata={articleMetadata} />);

    expect(document.querySelector('meta[property="og:image"]'))
      .toHaveAttribute('content', 'https://cdn.example.com/brand-systems-share.jpg');
    expect(document.querySelector('meta[property="og:image:alt"]'))
      .toHaveAttribute('content', 'Approved brand systems editorial image');
    expect(document.querySelector('meta[property="og:image:width"]'))
      .not.toBeInTheDocument();
    expect(document.querySelector('meta[property="og:image:height"]'))
      .not.toBeInTheDocument();
  });
});
