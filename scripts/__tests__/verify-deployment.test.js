import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_TIMEOUT_MS,
  DEFAULT_UNKNOWN_PATH,
  EXPECTED_ARTICLES,
  main,
  parseCliArgs,
  runDirectExecution,
  verifyDeployment,
} from '../verify-deployment.mjs';

const VALID_ORIGIN = 'https://dashapatmaja.in';

const createMockHtml = ({
  title = 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
  h1 = 'We build consumer brands.',
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
    h1: 'We build consumer brands.',
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
        h1: 'We build consumer brands.',
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
          h1: 'We build consumer brands.',
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
        h1: 'We build consumer brands.',
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
