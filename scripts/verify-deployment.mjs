import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const DEFAULT_UNKNOWN_PATH = '/does-not-exist';

export const EXPECTED_ARTICLES = [
  {
    slug: 'fssai-labelling-requirements-checklist-2026',
    path: '/blogs/fssai-labelling-requirements-checklist-2026',
    titleSubstring: 'FSSAI',
  },
  {
    slug: 'legal-metrology-packaged-commodity-rules-india',
    path: '/blogs/legal-metrology-packaged-commodity-rules-india',
    titleSubstring: 'Legal Metrology',
  },
];

export const REMOVED_ARTICLES = [
  'coordinating-brand-market-commerce',
  'from-packaging-to-purchase',
];

export const HOMEPAGE_HEADINGS = [
  'We build consumer brands.',
];

const decodeHtmlEntities = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const extractTitle = (html) => {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : null;
};

const extractH1 = (html) => {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  return decodeHtmlEntities(
    match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
};

const extractCanonical = (html) => {
  const match = html.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']*)["'])[^>]*>/i);
  return match ? match[1].trim() : null;
};

const extractOgType = (html) => {
  const match = html.match(/<meta\b(?=[^>]*property=["']og:type["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>/i);
  return match ? match[1].trim() : null;
};

const extractJsonLdObjects = (html) => {
  const matches = html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const objects = [];
  for (const match of matches) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed?.['@graph'])) {
        objects.push(...parsed['@graph']);
      } else if (Array.isArray(parsed)) {
        objects.push(...parsed);
      } else if (parsed && typeof parsed === 'object') {
        objects.push(parsed);
      }
    } catch {
      // Ignored malformed JSON-LD handled in check
    }
  }
  return objects;
};

export function parseCliArgs(argv = process.argv.slice(2)) {
  let origin = null;
  let unknownPath = DEFAULT_UNKNOWN_PATH;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--origin') {
      origin = argv[i + 1] ?? null;
      i += 1;
    } else if (arg.startsWith('--origin=')) {
      origin = arg.slice('--origin='.length);
    } else if (arg === '--unknown-path') {
      unknownPath = argv[i + 1] ?? DEFAULT_UNKNOWN_PATH;
      i += 1;
    } else if (arg.startsWith('--unknown-path=')) {
      unknownPath = arg.slice('--unknown-path='.length);
    }
  }

  if (!origin || !origin.trim()) {
    throw new Error('Missing required --origin argument (e.g. --origin https://dashapatmaja.in).');
  }

  origin = origin.trim().replace(/\/+$/, '');

  try {
    const parsedUrl = new URL(origin);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
  } catch {
    throw new Error(`Invalid --origin URL: "${origin}". Expected valid HTTP or HTTPS origin.`);
  }

  return { origin, unknownPath };
}

export async function verifyDeployment({
  origin,
  fetch = globalThis.fetch,
  unknownPath = DEFAULT_UNKNOWN_PATH,
} = {}) {
  if (!origin) {
    throw new Error('Origin is required for verification.');
  }

  const normalizedOrigin = origin.trim().replace(/\/+$/, '');
  const isHttps = normalizedOrigin.startsWith('https:');
  const checks = [];
  const failures = [];

  const recordCheck = ({ name, path: reqPath, passed, message }) => {
    checks.push({ name, path: reqPath, passed, message });
    if (!passed) {
      failures.push({ name, path: reqPath, message });
    }
  };

  const safeFetch = async (targetPath, options = {}) => {
    const targetUrl = `${normalizedOrigin}${targetPath}`;
    try {
      const response = await fetch(targetUrl, options);
      const html = await response.text();
      return { response, html, error: null };
    } catch (err) {
      return { response: null, html: null, error: err };
    }
  };

  // 1. Check Homepage `/`
  const homeResult = await safeFetch('/');
  if (homeResult.error) {
    recordCheck({
      name: 'Homepage request',
      path: '/',
      passed: false,
      message: `Failed to fetch homepage: ${homeResult.error.message}`,
    });
  } else {
    const { response, html } = homeResult;
    recordCheck({
      name: 'Homepage HTTP 200 status',
      path: '/',
      passed: response.status === 200,
      message: `Homepage returned status ${response.status} (expected 200)`,
    });

    const cspHeader = response.headers?.get('content-security-policy');
    const hstsHeader = response.headers?.get('strict-transport-security');
    const xfoHeader = response.headers?.get('x-frame-options');

    recordCheck({
      name: 'Security Header: Content-Security-Policy',
      path: '/',
      passed: Boolean(cspHeader && cspHeader.trim()),
      message: cspHeader
        ? 'Content-Security-Policy header present'
        : 'Missing required Content-Security-Policy response header',
    });

    if (isHttps) {
      recordCheck({
        name: 'Security Header: Strict-Transport-Security',
        path: '/',
        passed: Boolean(hstsHeader && hstsHeader.trim()),
        message: hstsHeader
          ? 'Strict-Transport-Security header present'
          : 'Missing required Strict-Transport-Security response header for HTTPS origin',
      });
    }

    const hasFrameProtection = Boolean(
      (xfoHeader && /DENY|SAMEORIGIN/i.test(xfoHeader)) ||
      (cspHeader && /frame-ancestors/i.test(cspHeader)),
    );
    recordCheck({
      name: 'Security Header: Frame protection (X-Frame-Options or frame-ancestors)',
      path: '/',
      passed: hasFrameProtection,
      message: hasFrameProtection
        ? 'Frame protection header present'
        : 'Missing frame protection header (expected X-Frame-Options: DENY/SAMEORIGIN or CSP frame-ancestors directive)',
    });
  }

  // 2. Check Insights Listing `/blogs`
  const blogsResult = await safeFetch('/blogs');
  if (blogsResult.error) {
    recordCheck({
      name: 'Insights listing request',
      path: '/blogs',
      passed: false,
      message: `Failed to fetch /blogs: ${blogsResult.error.message}`,
    });
  } else {
    const { response, html } = blogsResult;
    recordCheck({
      name: 'Insights listing HTTP 200 status',
      path: '/blogs',
      passed: response.status === 200,
      message: `/blogs returned status ${response.status} (expected 200)`,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);

    const isHomepageFallback = (
      canonical === `${normalizedOrigin}/` ||
      canonical === normalizedOrigin ||
      h1 === 'We build consumer brands.'
    );

    const hasInsightsIdentity = (
      !isHomepageFallback &&
      (title?.includes('Insights') || title?.includes('Dashapatmaja')) &&
      (h1?.includes('Thinking from the work of building brands.') || h1?.includes('Insights') || html.includes('Insights'))
    );

    recordCheck({
      name: 'Insights listing identity',
      path: '/blogs',
      passed: hasInsightsIdentity && !isHomepageFallback,
      message: isHomepageFallback
        ? '/blogs returned homepage fallback instead of Insights listing'
        : (hasInsightsIdentity ? 'Insights listing identity verified' : 'Missing Insights listing identity in /blogs HTML'),
    });

    const isSlashlessCanonical = canonical === `${normalizedOrigin}/blogs`;
    recordCheck({
      name: 'Insights listing slashless canonical',
      path: '/blogs',
      passed: isSlashlessCanonical,
      message: isSlashlessCanonical
        ? 'Slashless canonical verified'
        : `Expected slashless canonical "${normalizedOrigin}/blogs", got "${canonical ?? 'missing'}"`,
    });

    // Check for presence of current article links
    for (const article of EXPECTED_ARTICLES) {
      const hasArticleLink = html.includes(article.path) || html.includes(article.slug);
      recordCheck({
        name: `Insights listing links to current article ${article.slug}`,
        path: '/blogs',
        passed: hasArticleLink,
        message: hasArticleLink
          ? `Listing contains link to ${article.slug}`
          : `/blogs missing link to current article ${article.slug}`,
      });
    }

    // Check absence of stale removed articles
    for (const removedSlug of REMOVED_ARTICLES) {
      const hasRemovedArticle = html.includes(removedSlug);
      recordCheck({
        name: `Insights listing excludes removed article ${removedSlug}`,
        path: '/blogs',
        passed: !hasRemovedArticle,
        message: !hasRemovedArticle
          ? `Listing cleanly excludes ${removedSlug}`
          : `Stale removed article "${removedSlug}" found in /blogs listing`,
      });
    }
  }

  // 3. Check Each Current Article Route
  for (const article of EXPECTED_ARTICLES) {
    const articleResult = await safeFetch(article.path);
    if (articleResult.error) {
      recordCheck({
        name: `Article ${article.slug} request`,
        path: article.path,
        passed: false,
        message: `Failed to fetch ${article.path}: ${articleResult.error.message}`,
      });
      continue;
    }

    const { response, html } = articleResult;
    recordCheck({
      name: `Article ${article.slug} HTTP 200 status`,
      path: article.path,
      passed: response.status === 200,
      message: `${article.path} returned status ${response.status} (expected 200)`,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);
    const ogType = extractOgType(html);
    const jsonLdObjects = extractJsonLdObjects(html);

    const isHomepageFallback = (
      canonical === `${normalizedOrigin}/` ||
      canonical === normalizedOrigin ||
      title?.includes('We build consumer brands.') ||
      h1 === 'We build consumer brands.'
    );

    recordCheck({
      name: `Article ${article.slug} rejects homepage fallback`,
      path: article.path,
      passed: !isHomepageFallback,
      message: isHomepageFallback
        ? `${article.path} returned homepage fallback instead of article identity`
        : 'Article route does not return homepage fallback',
    });

    const hasDistinctTitle = Boolean(
      title &&
      title.toLowerCase().includes(article.titleSubstring.toLowerCase()) &&
      !isHomepageFallback,
    );
    recordCheck({
      name: `Article ${article.slug} distinct title`,
      path: article.path,
      passed: hasDistinctTitle,
      message: hasDistinctTitle
        ? `Title "${title}" matches expected article identity`
        : `Expected article title containing "${article.titleSubstring}", got "${title ?? 'missing'}"`,
    });

    const expectedCanonical = `${normalizedOrigin}${article.path}`;
    const isMatchingCanonical = canonical === expectedCanonical;
    recordCheck({
      name: `Article ${article.slug} slashless canonical`,
      path: article.path,
      passed: isMatchingCanonical,
      message: isMatchingCanonical
        ? `Canonical "${canonical}" matches expected slashless path`
        : `Expected canonical "${expectedCanonical}", got "${canonical ?? 'missing'}"`,
    });

    const hasArticleOgType = ogType === 'article';
    recordCheck({
      name: `Article ${article.slug} og:type="article"`,
      path: article.path,
      passed: hasArticleOgType,
      message: hasArticleOgType
        ? 'og:type="article" verified'
        : `Expected meta property="og:type" content="article", got "${ogType ?? 'missing'}"`,
    });

    const hasBlogPostingSchema = jsonLdObjects.some((item) => {
      const type = item['@type'];
      const types = Array.isArray(type) ? type : [type];
      return types.includes('BlogPosting');
    });

    recordCheck({
      name: `Article ${article.slug} BlogPosting JSON-LD schema`,
      path: article.path,
      passed: hasBlogPostingSchema,
      message: hasBlogPostingSchema
        ? 'BlogPosting JSON-LD schema verified'
        : `Missing required BlogPosting JSON-LD schema on ${article.path}`,
    });
  }

  // 4. Check Unknown Route 404 Handling
  const unknownResult = await safeFetch(unknownPath);
  if (unknownResult.error) {
    recordCheck({
      name: 'Unknown route request',
      path: unknownPath,
      passed: false,
      message: `Failed to fetch unknown path ${unknownPath}: ${unknownResult.error.message}`,
    });
  } else {
    const { response, html } = unknownResult;
    const is404 = response.status === 404;

    recordCheck({
      name: 'Unknown route HTTP 404 status',
      path: unknownPath,
      passed: is404,
      message: is404
        ? `Unknown path correctly returned HTTP 404`
        : `Expected HTTP 404, got ${response.status} (SPA fallback defect: unknown route does not return 404)`,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const isHomepageHtml = (
      h1 === 'We build consumer brands.' ||
      title?.includes('We build consumer brands.')
    );

    recordCheck({
      name: 'Unknown route does not return homepage body',
      path: unknownPath,
      passed: !isHomepageHtml,
      message: isHomepageHtml
        ? 'Unknown route returned homepage HTML body instead of 404 page'
        : 'Unknown route does not return homepage body',
    });
  }

  // 5. Check Trailing-Slash Subpath Policy
  const trailingSlashResult = await safeFetch('/blogs/');
  if (!trailingSlashResult.error && trailingSlashResult.html) {
    const canonical = extractCanonical(trailingSlashResult.html);
    const isSlashlessCanonical = canonical === `${normalizedOrigin}/blogs`;
    recordCheck({
      name: 'Trailing slash /blogs/ canonical policy',
      path: '/blogs/',
      passed: isSlashlessCanonical,
      message: isSlashlessCanonical
        ? 'Trailing slash URL uses slashless canonical'
        : `Expected slashless canonical "${normalizedOrigin}/blogs" on trailing slash request, got "${canonical ?? 'missing'}"`,
    });
  }

  const ok = failures.length === 0;
  return {
    ok,
    origin: normalizedOrigin,
    checks,
    failures,
  };
}

export async function main({
  argv = process.argv.slice(2),
  fetch = globalThis.fetch,
  writeOut = (msg) => process.stdout.write(msg),
  writeErr = (msg) => process.stderr.write(msg),
} = {}) {
  const { origin, unknownPath } = parseCliArgs(argv);

  writeOut(`Starting deployment smoke verification against: ${origin}\n`);
  const result = await verifyDeployment({ origin, fetch, unknownPath });

  writeOut(`\n--- Verification Results ---\n`);
  for (const check of result.checks) {
    const mark = check.passed ? '✓' : '✗';
    const loc = check.path ? ` [${check.path}]` : '';
    writeOut(`${mark}${loc} ${check.name}: ${check.message}\n`);
  }

  if (result.ok) {
    writeOut(`\n✔ Verification PASSED: All ${result.checks.length} deployment checks passed successfully.\n`);
    return 0;
  }

  writeErr(`\n✖ Verification FAILED: ${result.failures.length} of ${result.checks.length} checks failed.\n`);
  for (const failure of result.failures) {
    const loc = failure.path ? ` [${failure.path}]` : '';
    writeErr(`  - ${failure.name}${loc}: ${failure.message}\n`);
  }
  return 1;
}

export async function runDirectExecution({
  argv = process.argv.slice(2),
  fetch = globalThis.fetch,
  writeOut = (msg) => process.stdout.write(msg),
  writeErr = (msg) => process.stderr.write(msg),
  setExitCode = (c) => { process.exitCode = c; },
} = {}) {
  try {
    const exitCode = await main({ argv, fetch, writeOut, writeErr });
    setExitCode(exitCode);
    return exitCode;
  } catch (err) {
    writeErr(`Deployment smoke verification error: ${err.message}\n`);
    setExitCode(1);
    return 1;
  }
}

const isDirectExecution = Boolean(
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url),
);

if (isDirectExecution) {
  await runDirectExecution();
}
