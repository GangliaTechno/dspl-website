import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_UNKNOWN_PATH,
  EXPECTED_ARTICLES,
  main,
  parseCliArgs,
  runDirectExecution,
  verifyDeployment,
} from '../verify-deployment.mjs';

const VALID_ORIGIN = 'https://dashapatmaja.in';

const createMockHtml = ({
  title = 'Dashapatmaja Solutions Pvt Ltd',
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
} = {}) => ({
  status,
  ok: status >= 200 && status < 300,
  url,
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
    title: 'Dashapatmaja Solutions Pvt Ltd — Consumer Brand Building & Growth',
    h1: 'We build consumer brands.',
    canonical: `${origin}`,
  });

  const blogsHtml = createMockHtml({
    title: 'Insights — Dashapatmaja Solutions Pvt Ltd',
    h1: 'Thinking from the work of building brands.',
    canonical: `${origin}/blogs`,
    bodyContent: `
      <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI Labelling Requirements for Packaged Food</a>
      <a href="/blogs/legal-metrology-packaged-commodity-rules-india">Legal Metrology Packaged Commodity Rules</a>
    `,
  });

  const article1Html = createMockHtml({
    title: 'FSSAI Labelling Requirements for Packaged Food — Dashapatmaja Solutions',
    h1: 'FSSAI Labelling Requirements for Packaged Food',
    canonical: `${origin}/blogs/fssai-labelling-requirements-checklist-2026`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'FSSAI Labelling Requirements for Packaged Food',
      publisher: { '@type': 'Organization', name: 'Dashapatmaja Solutions Pvt Ltd' },
    },
  });

  const article2Html = createMockHtml({
    title: 'Legal Metrology Packaged Commodity Rules — Dashapatmaja Solutions',
    h1: 'Legal Metrology Packaged Commodity Rules',
    canonical: `${origin}/blogs/legal-metrology-packaged-commodity-rules-india`,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Legal Metrology Packaged Commodity Rules',
      publisher: { '@type': 'Organization', name: 'Dashapatmaja Solutions Pvt Ltd' },
    },
  });

  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found — Dashapatmaja Solutions</title>
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
    [`${origin}/`, { status: 200, html: homeHtml }],
    [`${origin}/blogs`, { status: 200, html: blogsHtml }],
    [`${origin}/blogs/`, { status: 200, html: blogsHtml, url: `${origin}/blogs` }],
    [`${origin}/blogs/fssai-labelling-requirements-checklist-2026`, { status: 200, html: article1Html }],
    [`${origin}/blogs/legal-metrology-packaged-commodity-rules-india`, { status: 200, html: article2Html }],
    [`${origin}/does-not-exist`, { status: 404, html: notFoundHtml }],
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
    });
  });

  it('parses --origin with equals separator', () => {
    expect(parseCliArgs(['--origin=https://dashapatmaja.in'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
    });
  });

  it('strips trailing slashes from origin', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in///'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: DEFAULT_UNKNOWN_PATH,
    });
  });

  it('accepts custom --unknown-path', () => {
    expect(parseCliArgs(['--origin', 'https://dashapatmaja.in', '--unknown-path', '/custom-404-check'])).toEqual({
      origin: 'https://dashapatmaja.in',
      unknownPath: '/custom-404-check',
    });
  });

  it('throws when --origin is missing or empty', () => {
    expect(() => parseCliArgs([])).toThrow(/Missing required --origin/);
    expect(() => parseCliArgs(['--origin'])).toThrow(/Missing required --origin/);
    expect(() => parseCliArgs(['--origin', '   '])).toThrow(/Missing required --origin/);
  });

  it('throws for invalid origin URL', () => {
    expect(() => parseCliArgs(['--origin', 'not-a-valid-url'])).toThrow(/Invalid --origin URL/);
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
    expect(result.checks.length).toBeGreaterThanOrEqual(10);
  });

  it('detects when /blogs returns homepage fallback', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd — Consumer Brand Building & Growth',
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
    expect(result.failures).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: '/blogs',
          message: expect.stringMatching(/homepage fallback|missing Insights listing/i),
        }),
      ]),
    );
  });

  it('detects stale removed articles on /blogs listing', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Insights — Dashapatmaja Solutions Pvt Ltd',
        h1: 'Thinking from the work of building brands.',
        canonical: `${VALID_ORIGIN}/blogs`,
        bodyContent: '<a href="/blogs/coordinating-brand-market-commerce">Coordinating Brand, Market, and Commerce</a>',
      }),
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

  it('detects when article routes return homepage fallback (Phase 2 defect)', async () => {
    const routeMap = createPassingRouteMap();
    for (const article of EXPECTED_ARTICLES) {
      routeMap.set(`${VALID_ORIGIN}${article.path}`, {
        status: 200,
        html: createMockHtml({
          title: 'Dashapatmaja Solutions Pvt Ltd — Consumer Brand Building & Growth',
          h1: 'We build consumer brands.',
          canonical: `${VALID_ORIGIN}/`,
        }),
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
            message: expect.stringMatching(/homepage fallback|article identity/i),
          }),
        ]),
      );
    }
  });

  it('detects when article route is missing BlogPosting JSON-LD or og:type="article"', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`, {
      status: 200,
      html: createMockHtml({
        title: 'FSSAI Labelling Requirements for Packaged Food — Dashapatmaja Solutions',
        h1: 'FSSAI Labelling Requirements for Packaged Food',
        canonical: `${VALID_ORIGIN}/blogs/fssai-labelling-requirements-checklist-2026`,
        ogType: 'website',
        jsonLd: null,
      }),
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
          message: expect.stringMatching(/BlogPosting|og:type="article"/i),
        }),
      ]),
    );
  });

  it('detects when unknown path returns HTTP 200 (SPA fallback defect)', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/does-not-exist`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd — Consumer Brand Building & Growth',
        h1: 'We build consumer brands.',
      }),
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
          message: expect.stringMatching(/expected HTTP 404, got 200/i),
        }),
      ]),
    );
  });

  it('detects missing security headers (CSP, HSTS, X-Frame-Options)', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/`, {
      status: 200,
      html: createMockHtml({
        title: 'Dashapatmaja Solutions Pvt Ltd — Consumer Brand Building & Growth',
        h1: 'We build consumer brands.',
      }),
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
          message: expect.stringMatching(/Content-Security-Policy/i),
        }),
        expect.objectContaining({
          message: expect.stringMatching(/Strict-Transport-Security/i),
        }),
        expect.objectContaining({
          message: expect.stringMatching(/frame protection|X-Frame-Options/i),
        }),
      ]),
    );
  });

  it('detects slashless canonical policy violation on subpath', async () => {
    const routeMap = createPassingRouteMap();
    routeMap.set(`${VALID_ORIGIN}/blogs`, {
      status: 200,
      html: createMockHtml({
        title: 'Insights — Dashapatmaja Solutions Pvt Ltd',
        h1: 'Thinking from the work of building brands.',
        canonical: `${VALID_ORIGIN}/blogs/`,
        bodyContent: `
          <a href="/blogs/fssai-labelling-requirements-checklist-2026">FSSAI</a>
          <a href="/blogs/legal-metrology-packaged-commodity-rules-india">Legal</a>
        `,
      }),
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
          message: expect.stringMatching(/slashless/i),
        }),
      ]),
    );
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
