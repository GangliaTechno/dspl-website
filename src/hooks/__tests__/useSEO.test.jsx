import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { describe, expect, it } from 'vitest';
import { getRouteMetadata } from '../../seo/routeMetadata';
import useSEO from '../useSEO';

const SEOProbe = ({ metadata }) => {
  useSEO(metadata);
  return null;
};

describe('useSEO', () => {
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
});
