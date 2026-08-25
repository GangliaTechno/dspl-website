import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_TIMEOUT_MS,
  DEFAULT_UNKNOWN_PATH,
  EXPECTED_ARTICLES,
  HOMEPAGE_H1,
  HOMEPAGE_HEADINGS,
  extractAnchorHrefs,
  extractH1,
  extractTitle,
  hasArticleAnchor,
  isHomepageFallbackHtml,
  isHomepageHeading,
  main,
  parseCliArgs,
  parseHstsHeader,
  runDirectExecution,
  verifyDeployment,
} from '../verify-deployment.mjs';

const VALID_ORIGIN = 'https://dashapatmaja.in';

const createMockHtml = ({
  title = 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
  h1 = HOMEPAGE_H1,
  canonical = `${VALID_ORIGIN}/`,
  ogType = 'website',
  jsonLd = null,
  bodyContent = '',
} = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${ogType}">
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
  <header>Header</header>
  <main>
    <h1>${h1}</h1>
    ${bodyContent}
  </main>
</body>
</html>`;

const defaultHeaders = {
  'content-type': 'text/html; charset=utf-8',
  'content-security-policy': "default-src 'self'; frame-ancestors 'none';",
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-frame-options': 'DENY',
};

const createMockResponse = ({
  status = 200,
  html = '',
  headers = defaultHeaders,
  url = VALID_ORIGIN,
  redirected = false,
} = {}) => ({
  status,
  ok: status >= 200 && status < 300,
  url,
  redirected,
  headers: {
    get: (name) => {
      const lower = name.toLowerCase();
      return headers[lower] ?? null;
    },
    has: (name) => {
      const lower = name.toLowerCase();
      return lower in headers;
    },
  },
  text: async () => html,
});

const createPassingRouteMap = (origin = VALID_ORIGIN) => {
  const homeHtml = createMockHtml({
    title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
    h1: HOMEPAGE_H1,
    canonical: `${origin}/`,
  });

  const blogsHtml = createMockHtml({
    title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
    h1: 'Thinking from the work of building brands.',
    canonical: `${origin}/blogs`,
    bodyContent: `
      <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI Labelling Requirements for Packaged Food</a>
      <a href="/blogs/legal-metrology-packaged-commodity-rules-india">Legal Metrology Packaged Commodity Rules</a>
    `,
  });

  const article1Html = createMockHtml({
    title: 'FSSAI Labelling Requirements for Packaged Food | Dashapatmaja Solutions Pvt Ltd',
    h1: 'FSSAI Labelling Requirements for Packaged Food',
    canonical: `${origin}/blogs/fssai-labelling-requirements-checklist-2026`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'FSSAI Labelling Requirements for Packaged Food',
      url: `${origin}/blogs/fssai-labelling-requirements-checklist-2026`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${origin}/blogs/fssai-labelling-requirements-checklist-2026`,
      },
      publisher: { '@type': 'Organization', name: 'Dashapatmaja Solutions Pvt Ltd' },
    },
  });

  const article2Html = createMockHtml({
    title: 'Legal Metrology Packaged Commodity Rules | Dashapatmaja Solutions Pvt Ltd',
    h1: 'Legal Metrology Packaged Commodity Rules',
    canonical: `${origin}/blogs/legal-metrology-packaged-commodity-rules-india`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Legal Metrology Packaged Commodity Rules',
      url: `${origin}/blogs/legal-metrology-packaged-commodity-rules-india`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${origin}/blogs/legal-metrology-packaged-commodity-rules-india`,
      },
      publisher: { '@type': 'Organization', name: 'Dashapatmaja Solutions Pvt Ltd' },
    },
  });

  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashapatmaja Solutions Pvt Ltd | Page Not Found</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${origin}/404.html">
</head>
<body>
  <main>
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </main>
</body>
</html>`;

  return new Map([
    [`${origin}/`, { status: 200, html: homeHtml, url: `${origin}/` }],
    [`${origin}/blogs`, { status: 200, html: blogsHtml, url: `${origin}/blogs` }],
    [`${origin}/blogs/`, { status: 200, html: blogsHtml, url: `${origin}/blogs`, redirected: true }],
    [`${origin}/blogs/fssai-labelling-requirements-checklist-2026`, { status: 200, html: article1Html, url: `${origin}/blogs/fssai-labelling-requirements-checklist-2026` }],
    [`${origin}/blogs/legal-metrology-packaged-commodity-rules-india`, { status: 200, html: article2Html, url: `${origin}/blogs/legal-metrology-packaged-commodity-rules-india` }],
    [`${origin}/does-not-exist`, { status: 404, html: notFoundHtml, url: `${origin}/does-not-exist` }],
  ]);
};

const createMockFetch = (routeMap) => vi.fn(async (url) => {
  const urlStr = String(url);
  const entry = routeMap.get(urlStr);
  if (entry) {
    return createMockResponse({
      status: entry.status ?? 200,
      html: entry.html ?? '',
      headers: entry.headers ?? defaultHeaders,
      url: entry.url ?? urlStr,
      redirected: entry.redirected ?? false,
    });
  }
  return createMockResponse({
    status: 404,
    html: 'Not Found',
    url: urlStr,
  });
});

describe('CLI argument parsing', () => {
  it('parses --origin with space separator', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  });

  it('parses --origin with equals separator', () => {
    expect(parseCliArgs(['--origin=https://dashapatmaja.in'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  });

  it('strips trailing slashes from root origin', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in///'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  });

  it('accepts origin with port', () => {
    expect(parseCliArgs(['--origin', 'http://localhost:3000/'])).toEqual({
      origin: 'http://localhost:3000',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  });

  it('accepts custom --unknown-path with space or equals', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in', '--unknown-path', '/custom-404'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: '/custom-404',
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in', '--unknown-path=/custom-404-eq'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: '/custom-404-eq',
      timeoutMs: DEFAULT_TIMEOUT_MS,
    });
  });

  it('accepts custom --timeout / --timeout-ms', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in', '--timeout', '5000'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: 5000,
    });
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in', '--timeout-ms=8000'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
      timeoutMs: 8000,
    });
  });

  it('throws when --origin is missing or empty', () => {
    expect(() => parseCliArgs([])).toThrow(/Missing required --origin/);
    expect(() => parseCliArgs(['--origin'])).toThrow(/Missing required --origin/);
    expect(() => parseCliArgs(['--origin', '   '])).toThrow(/Missing required --origin/);
  });

  it('throws for non-http/https protocol', () => {
    expect(() => parseCliArgs(['--origin', 'ftp://dashapatmaja.in'])).toThrow(/Invalid --origin protocol: "ftp:"/);
    expect(() => parseCliArgs(['--origin', 'file:///var/www/html'])).toThrow(/Invalid --origin protocol/);
  });

  it('throws for origin with credentials without echoing credentials', () => {
    const credInput = 'https://admin:supersecret@dashapatmaja.in';
    expect(() => parseCliArgs(['--origin', credInput])).toThrow(/credentials \(username\/password\) are not allowed/);
    try {
      parseCliArgs(['--origin', credInput]);
    } catch (err) {
      expect(err.message).not.toContain('supersecret');
      expect(err.message).not.toContain('admin');
    }
  });

  it('throws for origin with username only without echoing credentials', () => {
    const credInput = 'https://admin@dashapatmaja.in';
    expect(() => parseCliArgs(['--origin', credInput])).toThrow(/credentials \(username\/password\) are not allowed/);
  });

  it('throws for origin containing non-root path', () => {
    expect(() => parseCliArgs(['--origin', 'https://dashapatmaja.in/blogs'])).toThrow(/path "\/blogs" is not allowed/);
  });

  it('throws for origin containing query parameters', () => {
    expect(() => parseCliArgs(['--origin', 'https://dashapatmaja.in?query=123'])).toThrow(/query parameters are not allowed/);
  });

  it('throws for origin containing fragment', () => {
    expect(() => parseCliArgs(['--origin', 'https://dashapatmaja.in#section'])).toThrow(/fragments are not allowed/);
  });

  it('throws for malformed origin URL', () => {
    expect(() => parseCliArgs(['--origin', 'not-a-valid-url'])).toThrow(/Invalid --origin URL/);
    expect(() => parseCliArgs(['--origin', 'http://'])).toThrow(/Invalid --origin URL/);
  });
});

describe('deployment smoke verification (offline unit tests)', () => {
  it('passes completely against a healthy deployment mock', async () => {
    const routeMap = createPassingRouteMap();
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(true);
    expect(result.failures).toHaveLength(0);
    expect(result.checks.length).toBeGreaterThanOrEqual(20);
  });

  it('passes against healthy HTTP deployment without requiring HSTS', async () => {
    const httpOrigin = 'http://localhost:3000';
    const httpHeaders = {
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy': "default-src 'self'; frame-ancestors 'self';",
      'x-frame-options': 'SAMEORIGIN',
    };
    const routeMap = createPassingRouteMap(httpOrigin);
    for (const [key, val] of routeMap.entries()) {
      routeMap.set(key, { ...val, headers: httpHeaders });
    }
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: httpOrigin,
      fetch,
    });

    expect(result.ok).toBe(true);
    expect(result.failures).toHaveLength(0);
  });

  it('detects wrong final URL on /blogs', async () => {
    const routeMap = createPassingRouteMap();
    const blogsEntry = routeMap.get(`${VALID_ORIGIN}/blogs`);
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      ...blogsEntry,
      url: `${VALID_ORIGIN}/`, // wrong redirect to homepage
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          message: expect.stringMatching(/Expected final URL "https:\/\/dashapatmaja\.in\/blogs"/i),
        }),
      ]),
    );
  });

  it('detects wrong final URL on article route', async () => {
    const routeMap = createPassingRouteMap();
    const articlePath = `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`;
    const entry = routeMap.get(articlePath);
    routeMap.set(articlePath, {
      ...entry,
      url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026/`, // trailing slash redirect defect
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/fssai-labelling-requirements-checklist-2026',
          message: expect.stringMatching(/Expected final URL/i),
        }),
      ]),
    );
  });

  it('detects trailing slash /blogs/ failing to resolve to slashless URL', async () => {
    const routeMap = createPassingRouteMap();
    const entry = routeMap.get(`${VALID_ORIGIN}/blogs/`);
    routeMap.set(`${VALID_ORIGIN}/blogs/`, {
      ...entry,
      url: `${VALID_ORIGIN}/blogs/`, // didn't resolve to slashless
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/',
          name: 'Trailing slash /blogs/ resolves to slashless URL',
        }),
      ]),
    );
  });

  it('detects trailing slash /blogs/ fetch network failure explicitly', async () => {
    const routeMap = createPassingRouteMap();
    const fetch = vi.fn(async (url) => {
      if (String(url) === `${VALID_ORIGIN}/blogs/`) {
        throw new Error('Connection reset by peer');
      }
      const entry = routeMap.get(String(url));
      return createMockResponse({
        status: entry?.status ?? 200,
        html: entry?.html ?? '',
        headers: entry?.headers ?? defaultHeaders,
        url: entry?.url ?? String(url),
      });
    });

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/',
          name: 'Trailing slash /blogs/ request',
          message: expect.stringMatching(/Connection reset by peer/i),
        }),
      ]),
    );
  });

  it('detects missing CSP header on content routes', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'strict-transport-security': 'max-age=31536000',
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Content-Security-Policy',
        }),
      ]),
    );
  });

  it('detects missing HSTS on HTTPS origin', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/Missing required Strict-Transport-Security/i),
        }),
      ]),
    );
  });

  it('detects HSTS with max-age=0 or non-positive value', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'max-age=0; includeSubDomains',
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/strictly positive/i),
        }),
      ]),
    );
  });

  it('detects HSTS missing max-age directive', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'preload; includeSubDomains',
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/missing max-age directive/i),
        }),
      ]),
    );
  });

  it('detects permissive frame-ancestors wildcard in CSP and missing valid XFO', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'; frame-ancestors *;",
        'strict-transport-security': 'max-age=31536000',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Frame protection (X-Frame-Options or frame-ancestors)',
          message: expect.stringMatching(/Missing or ineffective frame protection/i),
        }),
      ]),
    );
  });

  it('detects invalid X-Frame-Options value (e.g. ALLOWALL)', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'max-age=31536000',
        'x-frame-options': 'ALLOWALL',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Security Header: Frame protection (X-Frame-Options or frame-ancestors)',
        }),
      ]),
    );
  });

  it('detects missing security headers on /blogs or article routes even if / has them', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      ...routeMap.get(`${VALID_ORIGIN}/blogs`),
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          name: 'Security Header: Content-Security-Policy',
        }),
        expect.objectContaining({
          path: '/blogs',
          name: 'Security Header: Strict-Transport-Security',
        }),
        expect.objectContaining({
          path: '/blogs',
          name: 'Security Header: Frame protection (X-Frame-Options or frame-ancestors)',
        }),
      ]),
    );
  });

  it('detects when /blogs returns homepage fallback', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
        h1: HOMEPAGE_H1,
        canonical: `${VALID_ORIGIN}/`,
      }),
      url: `${VALID_ORIGIN}/blogs`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          message: expect.stringMatching(/homepage fallback|Insights/i),
        }),
      ]),
    );
  });

  it('detects when /blogs has generic Dashapatmaja title but wrong/missing Insights H1', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
        h1: 'Unrelated Company Updates',
        canonical: `${VALID_ORIGIN}/blogs`,
        bodyContent: `
          <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI</a>
          <a href="/blogs/legal-metrology-packaged-commodity-rules-india">Legal</a>
        `,
      }),
      url: `${VALID_ORIGIN}/blogs`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          name: 'Insights listing H1 heading',
          message: expect.stringMatching(/Expected H1 "Thinking from the work of building brands\."/i),
        }),
      ]),
    );
  });

  it('detects stale removed articles on /blogs listing', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
        h1: 'Thinking from the work of building brands.',
        canonical: `${VALID_ORIGIN}/blogs`,
        bodyContent: '<a href="/blogs/coordinating-brand-market-commerce">Coordinating Brand</a>',
      }),
      url: `${VALID_ORIGIN}/blogs`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          message: expect.stringMatching(/stale removed article/i),
        }),
      ]),
    );
  });

  it('detects when article routes return homepage fallback', async () => {
    const routeMap = createPassingRouteMap();
    for (const article of EXPECTED_ARTICLES) {
      routeMap.set(`${VALID_ORIGIN}${article.path}`, {
        status: 200,
        html: createMockHtml({
          title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
          h1: HOMEPAGE_H1,
          canonical: `${VALID_ORIGIN}/`,
        }),
        url: `${VALID_ORIGIN}${article.path}`,
      });
    }
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    for (const article of EXPECTED_ARTICLES) {
      expect(result.failures).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: article.path,
            name: `Article ${article.slug} rejects homepage fallback`,
          }),
        ]),
      );
    }
  });

  it('detects when article route has mismatched title', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`, {
      status: 200,
      html: createMockHtml({
        title: 'Unrelated Generic Title',
        h1: 'Unrelated Heading',
        canonical: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: 'FSSAI Labelling Requirements for Packaged Food',
          url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        },
      }),
      url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/fssai-labelling-requirements-checklist-2026',
          name: 'Article fssai-labelling-requirements-checklist-2026 distinct title',
        }),
      ]),
    );
  });

  it('detects when article route has unrelated BlogPosting JSON-LD (wrong headline)', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`, {
      status: 200,
      html: createMockHtml({
        title: 'FSSAI Labelling Requirements | Dashapatmaja Solutions',
        h1: 'FSSAI Labelling Requirements',
        canonical: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: 'Completely Unrelated Topic and Article',
          url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        },
      }),
      url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/fssai-labelling-requirements-checklist-2026',
          name: 'Article fssai-labelling-requirements-checklist-2026 BlogPosting JSON-LD schema',
          message: expect.stringMatching(/Missing valid BlogPosting JSON-LD/i),
        }),
      ]),
    );
  });

  it('detects when article route has BlogPosting JSON-LD with wrong URL / mainEntityOfPage', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`, {
      status: 200,
      html: createMockHtml({
        title: 'FSSAI Labelling Requirements | Dashapatmaja Solutions',
        h1: 'FSSAI Labelling Requirements',
        canonical: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        ogType: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: 'FSSAI Labelling Requirements for Packaged Food',
          url: `${VALID_ORIGIN}/blogs/some-other-different-article`,
          mainEntityOfPage: `${VALID_ORIGIN}/blogs/some-other-different-article`,
        },
      }),
      url: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs/fssai-labelling-requirements-checklist-2026',
          name: 'Article fssai-labelling-requirements-checklist-2026 BlogPosting JSON-LD schema',
        }),
      ]),
    );
  });

  it('detects when unknown path returns HTTP 200 (SPA fallback defect)', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
        h1: HOMEPAGE_H1,
      }),
      url: `${VALID_ORIGIN}/does-not-exist`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/does-not-exist',
          name: 'Unknown route HTTP 404 status',
          message: expect.stringMatching(/expected HTTP 404, got 200/i),
        }),
      ]),
    );
  });

  it('detects when unknown path returns HTTP 404 with empty body', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 404,
      html: '',
      url: `${VALID_ORIGIN}/does-not-exist`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/does-not-exist',
          name: 'Unknown route Not Found page identity',
        }),
      ]),
    );
  });

  it('detects when unknown path returns HTTP 404 with arbitrary non-404 body', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 404,
      html: '<html><head><title>Some Arbitrary Title</title></head><body><h1>Welcome to Our Store</h1></body></html>',
      url: `${VALID_ORIGIN}/does-not-exist`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/does-not-exist',
          name: 'Unknown route Not Found page identity',
          message: expect.stringMatching(/missing Not Found identity/i),
        }),
      ]),
    );
  });

  it('reports path and duration when request times out or aborts', async () => {
    const fetch = vi.fn(async () => {
      const err = new Error('The operation was aborted due to timeout');
      err.name = 'TimeoutError';
      throw err;
    });

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
      timeoutMs: 5000,
    });

    expect(result.ok).toBe(false);
    expect(result.failures.length).toBeGreaterThan(0);
    expect(result.failures[0].message).toMatch(/Request to \/ timed out after 5000ms/);
  });

  it('handles fetch network exceptions gracefully', async () => {
    const fetch = vi.fn().mockRejectedValue(new Error('Connection refused'));

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures.length).toBeGreaterThan(0);
    expect(result.failures[0].message).toMatch(/Connection refused/);
  });
});

describe('CLI execution lifecycle', () => {
  it('main returns exit code 0 when all checks pass', async () => {
    const routeMap = createPassingRouteMap();
    const fetch = createMockFetch(routeMap);
    const stdout = [];
    const stderr = [];

    const exitCode = await main({
      argv: ['--origin', VALID_ORIGIN],
      fetch,
      writeOut: (msg) => stdout.push(msg),
      writeErr: (msg) => stderr.push(msg),
    });

    expect(exitCode).toBe(0);
    expect(stdout.join('')).toMatch(/Verification PASSED/);
  });

  it('main returns exit code 1 when checks fail', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 200,
      html: 'Homepage content',
      url: `${VALID_ORIGIN}/does-not-exist`,
    });
    const fetch = createMockFetch(routeMap);
    const stdout = [];
    const stderr = [];

    const exitCode = await main({
      argv: ['--origin', VALID_ORIGIN],
      fetch,
      writeOut: (msg) => stdout.push(msg),
      writeErr: (msg) => stderr.push(msg),
    });

    expect(exitCode).toBe(1);
    expect(stderr.join('')).toMatch(/Verification FAILED/);
  });

  it('runDirectExecution sets exitCode and writes error for invalid args', async () => {
    let capturedExitCode = 0;
    const stderr = [];

    await runDirectExecution({
      argv: [],
      writeErr: (msg) => stderr.push(msg),
      setExitCode: (code) => { capturedExitCode = code; },
    });

    expect(capturedExitCode).toBe(1);
    expect(stderr.join('')).toMatch(/Missing required --origin/);
  });
});

describe('HSTS directive parser unit tests', () => {
  it('parses valid max-age directive and ignores other valid directives', () => {
    const result1 = parseHstsHeader('max-age=31536000');
    expect(result1.valid).toBe(true);
    expect(result1.maxAge).toBe(31536000);

    const result2 = parseHstsHeader('max-age=31536000; includeSubDomains; preload');
    expect(result2.valid).toBe(true);
    expect(result2.maxAge).toBe(31536000);

    const result3 = parseHstsHeader('includeSubDomains; max-age = 63072000 ; preload');
    expect(result3.valid).toBe(true);
    expect(result3.maxAge).toBe(63072000);
  });

  it('rejects near-matches such as not-max-age=31536000', () => {
    const result = parseHstsHeader('not-max-age=31536000; includeSubDomains');
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/missing max-age directive/i);
  });

  it('rejects malformed max-age with non-digit suffix like max-age=31536000garbage', () => {
    const result = parseHstsHeader('max-age=31536000garbage; includeSubDomains');
    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/max-age directive is malformed/i);
  });

  it('rejects max-age=0 and negative values', () => {
    const resultZero = parseHstsHeader('max-age=0; includeSubDomains');
    expect(resultZero.valid).toBe(false);
    expect(resultZero.message).toMatch(/strictly positive integer/i);

    const resultNeg = parseHstsHeader('max-age=-100; includeSubDomains');
    expect(resultNeg.valid).toBe(false);
    expect(resultNeg.message).toMatch(/max-age directive is malformed/i);
  });

  it('rejects missing max-age directive or valueless max-age directive', () => {
    const resultMissing = parseHstsHeader('includeSubDomains; preload');
    expect(resultMissing.valid).toBe(false);
    expect(resultMissing.message).toMatch(/missing max-age directive/i);

    const resultValueless = parseHstsHeader('max-age; includeSubDomains');
    expect(resultValueless.valid).toBe(false);
    expect(resultValueless.message).toMatch(/missing value/i);
  });

  it('rejects duplicate max-age directives in any order', () => {
    const result1 = parseHstsHeader('max-age=0; max-age=31536000');
    expect(result1.valid).toBe(false);
    expect(result1.message).toMatch(/duplicate max-age directives/i);

    const result2 = parseHstsHeader('max-age=31536000; max-age=0');
    expect(result2.valid).toBe(false);
    expect(result2.message).toMatch(/duplicate max-age directives/i);

    const result3 = parseHstsHeader('max-age=31536000; includeSubDomains; max-age=31536000');
    expect(result3.valid).toBe(false);
    expect(result3.message).toMatch(/duplicate max-age directives/i);

    const result4 = parseHstsHeader('max-age=31536000; max-age=31536000');
    expect(result4.valid).toBe(false);
    expect(result4.message).toMatch(/duplicate max-age directives/i);
  });

  it('handles null, undefined, empty, or whitespace strings safely', () => {
    expect(parseHstsHeader(null).valid).toBe(false);
    expect(parseHstsHeader(undefined).valid).toBe(false);
    expect(parseHstsHeader('').valid).toBe(false);
    expect(parseHstsHeader('   ').valid).toBe(false);
  });
});

describe('Anchor link parser unit tests', () => {
  it('extracts anchor hrefs from HTML strings', () => {
    const html = `
      <div>
        <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI</a>
        <a class="btn" href="https://dashapatmaja.in/blogs/legal-metrology-packaged-commodity-rules-india" target="_blank">Legal</a>
        <span>No link here: /blogs/coordinating-brand-market-commerce</span>
      </div>
    `;
    const hrefs = extractAnchorHrefs(html);
    expect(hrefs).toEqual([
      '/blogs/fssai-labelling-requirements-checklist-2026',
      'https://dashapatmaja.in/blogs/legal-metrology-packaged-commodity-rules-india',
    ]);
  });

  it('hasArticleAnchor correctly matches relative and same-origin absolute paths', () => {
    const html = `
      <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI</a>
      <a href="https://dashapatmaja.in/blogs/legal-metrology-packaged-commodity-rules-india/">Legal with trailing slash</a>
    `;
    expect(hasArticleAnchor(html, '/blogs/fssai-labelling-requirements-checklist-2026', VALID_ORIGIN)).toBe(true);
    expect(hasArticleAnchor(html, '/blogs/legal-metrology-packaged-commodity-rules-india', VALID_ORIGIN)).toBe(true);
  });

  it('hasArticleAnchor rejects external origin anchors even with matching pathname', () => {
    const html = '<a href="https://evil.com/blogs/fssai-labelling-requirements-checklist-2026">FSSAI</a>';
    expect(hasArticleAnchor(html, '/blogs/fssai-labelling-requirements-checklist-2026', VALID_ORIGIN)).toBe(false);
  });
});

describe('Phase 3 Round 2 regressions', () => {
  it('Finding 1: Passes homepage check with actual combined H1 ("We build consumer brands. We help businesses build theirs.")', async () => {
    const routeMap = createPassingRouteMap();
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(true);
    const homeCheck = result.checks.find((c) => c.name === 'Homepage heading identity');
    expect(homeCheck?.passed).toBe(true);
    expect(homeCheck?.message).toMatch(/We build consumer brands\. We help businesses build theirs\./);
  });

  it('Finding 1: Detects homepage fallback on unknown route when returning HTTP 200 or 404 with combined homepage H1', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 404,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
        h1: 'We build consumer brands. We help businesses build theirs.',
        canonical: `${VALID_ORIGIN}/`,
      }),
      url: `${VALID_ORIGIN}/does-not-exist`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/does-not-exist',
          name: 'Unknown route does not return homepage body',
        }),
        expect.objectContaining({
          path: '/does-not-exist',
          name: 'Unknown route Not Found page identity',
        }),
      ]),
    );
  });

  it('Finding 2: Detects /blogs missing anchor links when both slugs occur in plain text/JSON/scripts without <a> href anchors', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
        h1: 'Thinking from the work of building brands.',
        canonical: `${VALID_ORIGIN}/blogs`,
        bodyContent: `
          <script>
            const articles = [
              "/blogs/fssai-labelling-requirements-checklist-2026",
              "/blogs/legal-metrology-packaged-commodity-rules-india"
            ];
          </script>
          <p>Read about fssai-labelling-requirements-checklist-2026 and legal-metrology-packaged-commodity-rules-india</p>
        `,
      }),
      url: `${VALID_ORIGIN}/blogs`,
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          name: 'Insights listing links to current article fssai-labelling-requirements-checklist-2026',
          message: expect.stringMatching(/missing anchor <a href> link/i),
        }),
        expect.objectContaining({
          path: '/blogs',
          name: 'Insights listing links to current article legal-metrology-packaged-commodity-rules-india',
          message: expect.stringMatching(/missing anchor <a href> link/i),
        }),
      ]),
    );
  });

  it('Finding 3: Rejects near-match not-max-age=31536000 during verifyDeployment on HTTPS', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'not-max-age=31536000; includeSubDomains',
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/missing max-age directive/i),
        }),
      ]),
    );
  });

  it('Finding 3: Rejects malformed max-age=31536000garbage during verifyDeployment on HTTPS', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'max-age=31536000garbage; includeSubDomains',
        'x-frame-options': 'DENY',
      },
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/max-age directive is malformed/i),
        }),
      ]),
    );
  });
});

describe('Phase 3 Round 3 regressions', () => {
  it('Finding 1: Rejects single-part H1 ("We build consumer brands.") alone on homepage verification', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
        h1: 'We build consumer brands.',
        canonical: `${VALID_ORIGIN}/`,
      }),
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(false);
    const homeH1Check = result.failures.find((f) => f.name === 'Homepage heading identity');
    expect(homeH1Check).toBeDefined();
    expect(homeH1Check?.path).toBe('/');
    expect(homeH1Check?.message).toMatch(/Expected homepage H1 "We build consumer brands\. We help businesses build theirs\.", got "We build consumer brands\."/);
  });

  it('Finding 1: Accepts complete combined H1 ("We build consumer brands. We help businesses build theirs.") on homepage verification', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      ...routeMap.get(`${VALID_ORIGIN}/`),
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
        h1: 'We build consumer brands. We help businesses build theirs.',
        canonical: `${VALID_ORIGIN}/`,
      }),
    });
    const fetch = createMockFetch(routeMap);

    const result = await verifyDeployment({
      origin: VALID_ORIGIN,
      fetch,
    });

    expect(result.ok).toBe(true);
    const homeH1Check = result.checks.find((c) => c.name === 'Homepage heading identity');
    expect(homeH1Check?.passed).toBe(true);
    expect(homeH1Check?.message).toMatch(/Homepage heading verified/);
  });

  it('Finding 2: parseHstsHeader rejects duplicate max-age directives in any order and retains valid single-directive case', () => {
    const dup1 = parseHstsHeader('max-age=0; max-age=31536000');
    expect(dup1.valid).toBe(false);
    expect(dup1.message).toMatch(/duplicate max-age directives/i);

    const dup2 = parseHstsHeader('max-age=31536000; max-age=0');
    expect(dup2.valid).toBe(false);
    expect(dup2.message).toMatch(/duplicate max-age directives/i);

    const dup3 = parseHstsHeader('includeSubDomains; max-age=31536000; max-age=31536000; preload');
    expect(dup3.valid).toBe(false);
    expect(dup3.message).toMatch(/duplicate max-age directives/i);

    // Retain valid single-directive case
    const single = parseHstsHeader('max-age=31536000; includeSubDomains');
    expect(single.valid).toBe(true);
    expect(single.maxAge).toBe(31536000);
  });

  it('Finding 2: verifyDeployment rejects HTTPS responses with duplicate max-age in HSTS header in any order', async () => {
    // Order 1: max-age=0; max-age=31536000
    const routeMap1 = createPassingRouteMap();
    routeMap1.set(`${VALID_ORIGIN}/`, {
      ...routeMap1.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'max-age=0; max-age=31536000',
        'x-frame-options': 'DENY',
      },
    });
    const fetch1 = createMockFetch(routeMap1);
    const result1 = await verifyDeployment({ origin: VALID_ORIGIN, fetch: fetch1 });
    expect(result1.ok).toBe(false);
    expect(result1.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/duplicate max-age directives/i),
        }),
      ]),
    );

    // Order 2: max-age=31536000; max-age=0
    const routeMap2 = createPassingRouteMap();
    routeMap2.set(`${VALID_ORIGIN}/`, {
      ...routeMap2.get(`${VALID_ORIGIN}/`),
      headers: {
        'content-security-policy': "default-src 'self'",
        'strict-transport-security': 'max-age=31536000; max-age=0',
        'x-frame-options': 'DENY',
      },
    });
    const fetch2 = createMockFetch(routeMap2);
    const result2 = await verifyDeployment({ origin: VALID_ORIGIN, fetch: fetch2 });
    expect(result2.ok).toBe(false);
    expect(result2.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/',
          name: 'Security Header: Strict-Transport-Security',
          message: expect.stringMatching(/duplicate max-age directives/i),
        }),
      ]),
    );
  });
});

describe('Helper functions and constants unit tests', () => {
  it('extractTitle and extractH1 extract and decode text properly', () => {
    const html = '<html><head><title>Test &amp; Example</title></head><body><h1>Heading &lt;1&gt;</h1></body></html>';
    expect(extractTitle(html)).toBe('Test & Example');
    expect(extractH1(html)).toBe('Heading <1>');
  });

  it('isHomepageHeading verifies combined H1 and rejects single-part heading', () => {
    expect(isHomepageHeading(HOMEPAGE_H1)).toBe(true);
    expect(isHomepageHeading('We build consumer brands.')).toBe(false);
    expect(isHomepageHeading('We help businesses build theirs.')).toBe(false);
    expect(isHomepageHeading('We build consumer brands. We help businesses build theirs.')).toBe(true);
    expect(isHomepageHeading('Unrelated Heading')).toBe(false);
    expect(isHomepageHeading(null)).toBe(false);
    expect(HOMEPAGE_HEADINGS).toHaveLength(2);
  });

  it('isHomepageFallbackHtml identifies root canonical or homepage heading or title', () => {
    expect(isHomepageFallbackHtml({
      html: '<h1>We build consumer brands. We help businesses build theirs.</h1>',
      canonical: `${VALID_ORIGIN}/blogs`,
      normalizedOrigin: VALID_ORIGIN,
    })).toBe(true);

    expect(isHomepageFallbackHtml({
      html: '<h1>Thinking from the work of building brands.</h1>',
      canonical: `${VALID_ORIGIN}/`,
      normalizedOrigin: VALID_ORIGIN,
    })).toBe(true);

    expect(isHomepageFallbackHtml({
      html: '<title>Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth</title><h1>Insights</h1>',
      canonical: `${VALID_ORIGIN}/blogs`,
      normalizedOrigin: VALID_ORIGIN,
    })).toBe(true);

    expect(isHomepageFallbackHtml({
      html: '<title>Insights</title><h1>Insights</h1>',
      canonical: `${VALID_ORIGIN}/blogs`,
      normalizedOrigin: VALID_ORIGIN,
    })).toBe(false);
  });
});
