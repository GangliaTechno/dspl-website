import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const DEFAULT_UNKNOWN_PATH = '/does-not-exist';
export const DEFAULT_TIMEOUT_MS = 10000;

export const EXPECTED_ARTICLES = [
  {
    slug: 'fssai-labelling-requirements-checklist-2026',
    path: '/blogs/fssai-labelling-requirements-checklist-2026',
    titleSubstring: 'FSSAI',
    expectedHeadline: 'FSSAI Labelling Requirements for Packaged Food',
  },
  {
    slug: 'legal-metrology-packaged-commodity-rules-india',
    path: '/blogs/legal-metrology-packaged-commodity-rules-india',
    titleSubstring: 'Legal Metrology',
    expectedHeadline: 'Legal Metrology Packaged Commodity Rules',
  },
];

export const REMOVED_ARTICLES = [
  'coordinating-brand-market-commerce',
  'from-packaging-to-purchase',
];

export const HOMEPAGE_H1 = 'We build consumer brands. We help businesses build theirs.';
export const HOMEPAGE_HEADINGS = [
  'We build consumer brands.',
  'We help businesses build theirs.',
];

export const decodeHtmlEntities = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export const extractTitle = (html = '') => {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : null;
};

export const extractH1 = (html = '') => {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return null;
  return decodeHtmlEntities(
    match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
};

export const extractCanonical = (html = '') => {
  const match = html.match(/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']*)["'])[^>]*>/i);
  return match ? match[1].trim() : null;
};

export const extractOgType = (html = '') => {
  const match = html.match(/<meta\b(?=[^>]*property=["']og:type["'])(?=[^>]*content=["']([^"']*)["'])[^>]*>/i);
  return match ? match[1].trim() : null;
};

export const extractAnchorHrefs = (html = '') => {
  const matches = html.matchAll(/<a\b(?=[^>]*\bhref=["']([^"']*)["'])[^>]*>/gi);
  const hrefs = [];
  for (const match of matches) {
    if (typeof match[1] === 'string') {
      hrefs.push(match[1].trim());
    }
  }
  return hrefs;
};

export const hasArticleAnchor = (html = '', targetPath = '', origin = '') => {
  const hrefs = extractAnchorHrefs(html);
  const normalizedTargetPath = targetPath.length > 1 ? targetPath.replace(/\/+$/, '') : targetPath;
  let originObj = null;
  if (origin) {
    try {
      originObj = new URL(origin);
    } catch {
      originObj = null;
    }
  }

  return hrefs.some((href) => {
    try {
      const base = origin || 'http://localhost';
      const parsed = new URL(href, base);
      if (originObj && parsed.origin !== originObj.origin) {
        return false;
      }
      const normalized = parsed.pathname.length > 1 ? parsed.pathname.replace(/\/+$/, '') : parsed.pathname;
      return normalized === normalizedTargetPath;
    } catch {
      return false;
    }
  });
};

export const extractJsonLdObjects = (html = '') => {
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
      // Malformed JSON-LD handled gracefully
    }
  }
  return objects;
};

export const isHomepageHeading = (h1) => {
  if (!h1 || typeof h1 !== 'string') return false;
  const normalized = h1.replace(/\s+/g, ' ').trim();
  return (
    normalized === HOMEPAGE_H1 ||
    (normalized.includes('We build consumer brands.') &&
      normalized.includes('We help businesses build theirs.'))
  );
};

export const isHomepageFallbackHtml = ({ html, canonical, normalizedOrigin } = {}) => {
  const h1 = extractH1(html);
  const title = extractTitle(html);
  const isRootCanonical = Boolean(
    canonical && (canonical === `${normalizedOrigin}/` || canonical === normalizedOrigin),
  );
  const hasHomeHeading = isHomepageHeading(h1);
  const hasHomeTitle = Boolean(
    title && (
      title.includes('Consumer Brand Building & Growth') ||
      title.includes('We build consumer brands.')
    ),
  );
  return Boolean(isRootCanonical || hasHomeHeading || hasHomeTitle);
};

export const parseHstsHeader = (headerValue = '') => {
  if (!headerValue || typeof headerValue !== 'string' || !headerValue.trim()) {
    return {
      valid: false,
      maxAge: null,
      message: 'Missing required Strict-Transport-Security response header for HTTPS origin',
    };
  }

  const directives = headerValue.split(';').map((d) => d.trim()).filter(Boolean);
  let maxAge = null;
  let maxAgeCount = 0;

  for (const directive of directives) {
    const eqIdx = directive.indexOf('=');
    if (eqIdx !== -1) {
      const name = directive.slice(0, eqIdx).trim().toLowerCase();
      const value = directive.slice(eqIdx + 1).trim();
      if (name === 'max-age') {
        maxAgeCount += 1;
        if (maxAgeCount > 1) {
          return {
            valid: false,
            maxAge: null,
            message: `Strict-Transport-Security header contains duplicate max-age directives (got: "${headerValue}")`,
          };
        }
        if (!/^\d+$/.test(value)) {
          return {
            valid: false,
            maxAge: null,
            message: `Strict-Transport-Security max-age directive is malformed (got: "${directive}")`,
          };
        }
        maxAge = Number.parseInt(value, 10);
      }
    } else {
      const name = directive.trim().toLowerCase();
      if (name === 'max-age') {
        maxAgeCount += 1;
        if (maxAgeCount > 1) {
          return {
            valid: false,
            maxAge: null,
            message: `Strict-Transport-Security header contains duplicate max-age directives (got: "${headerValue}")`,
          };
        }
        return {
          valid: false,
          maxAge: null,
          message: 'Strict-Transport-Security max-age directive missing value',
        };
      }
    }
  }

  if (maxAgeCount === 0) {
    return {
      valid: false,
      maxAge: null,
      message: `Strict-Transport-Security header missing max-age directive (got: "${headerValue}")`,
    };
  }

  if (maxAge === 0 || maxAge === null || maxAge <= 0) {
    return {
      valid: false,
      maxAge,
      message: `Strict-Transport-Security max-age must be strictly positive integer (got: max-age=${maxAge})`,
    };
  }

  return {
    valid: true,
    maxAge,
    message: `Strict-Transport-Security header valid (max-age=${maxAge})`,
  };
};

export function parseCliArgs(argv = process.argv.slice(2)) {
  let rawOrigin = null;
  let unknownPath = DEFAULT_UNKNOWN_PATH;
  let timeoutMs = DEFAULT_TIMEOUT_MS;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--origin') {
      rawOrigin = argv[i + 1] ?? null;
      i += 1;
    } else if (arg.startsWith('--origin=')) {
      rawOrigin = arg.slice('--origin='.length);
    } else if (arg === '--unknown-path') {
      unknownPath = argv[i + 1] ?? DEFAULT_UNKNOWN_PATH;
      i += 1;
    } else if (arg.startsWith('--unknown-path=')) {
      unknownPath = arg.slice('--unknown-path='.length);
    } else if (arg === '--timeout' || arg === '--timeout-ms') {
      const val = Number.parseInt(argv[i + 1], 10);
      if (!Number.isNaN(val) && val > 0) {
        timeoutMs = val;
      }
      i += 1;
    } else if (arg.startsWith('--timeout=') || arg.startsWith('--timeout-ms=')) {
      const val = Number.parseInt(arg.split('=')[1], 10);
      if (!Number.isNaN(val) && val > 0) {
        timeoutMs = val;
      }
    }
  }

  if (!rawOrigin || !rawOrigin.trim()) {
    throw new Error('Missing required --origin argument (e.g. --origin https://dashapatmaja.in).');
  }

  const trimmed = rawOrigin.trim();
  let parsedUrl;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    throw new Error('Invalid --origin URL. Expected a valid HTTP or HTTPS origin.');
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error(`Invalid --origin protocol: "${parsedUrl.protocol}". Expected http: or https:.`);
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error('Invalid --origin: credentials (username/password) are not allowed.');
  }

  const normalizedPathname = parsedUrl.pathname.replace(/\/+$/, '');
  if (normalizedPathname !== '') {
    throw new Error(`Invalid --origin: path "${parsedUrl.pathname}" is not allowed. Expected origin without path.`);
  }

  if (parsedUrl.search) {
    throw new Error('Invalid --origin: query parameters are not allowed.');
  }

  if (parsedUrl.hash) {
    throw new Error('Invalid --origin: fragments are not allowed.');
  }

  const origin = `${parsedUrl.protocol}//${parsedUrl.host}`;
  return { origin, unknownPath, timeoutMs };
}

function verifySecurityHeaders({
  response,
  path: reqPath,
  isHttps,
  recordCheck,
}) {
  const headers = response?.headers;
  const cspHeader = headers?.get ? headers.get('content-security-policy') : headers?.['content-security-policy'];
  const hstsHeader = headers?.get ? headers.get('strict-transport-security') : headers?.['strict-transport-security'];
  const xfoHeader = headers?.get ? headers.get('x-frame-options') : headers?.['x-frame-options'];

  const hasCsp = Boolean(cspHeader && cspHeader.trim());
  recordCheck({
    name: 'Security Header: Content-Security-Policy',
    path: reqPath,
    passed: hasCsp,
    message: hasCsp
      ? 'Content-Security-Policy header present'
      : 'Missing required Content-Security-Policy response header',
  });

  if (isHttps) {
    const hstsResult = parseHstsHeader(hstsHeader);
    recordCheck({
      name: 'Security Header: Strict-Transport-Security',
      path: reqPath,
      passed: hstsResult.valid,
      message: hstsResult.message,
    });
  }

  const isValidXfo = Boolean(xfoHeader && /^(DENY|SAMEORIGIN)$/i.test(xfoHeader.trim()));

  let isRestrictiveFrameAncestors = false;
  if (cspHeader) {
    const directives = cspHeader.split(';').map((d) => d.trim());
    const frameAncestorsDirective = directives.find((d) => /^frame-ancestors\b/i.test(d));
    if (frameAncestorsDirective) {
      const sources = frameAncestorsDirective.replace(/^frame-ancestors\s*/i, '').trim();
      const hasWildcard = /(^|\s)\*(?=\s|$)/.test(sources);
      if (sources.length > 0 && !hasWildcard) {
        isRestrictiveFrameAncestors = true;
      }
    }
  }

  const hasEffectiveFrameProtection = isValidXfo || isRestrictiveFrameAncestors;
  recordCheck({
    name: 'Security Header: Frame protection (X-Frame-Options or frame-ancestors)',
    path: reqPath,
    passed: hasEffectiveFrameProtection,
    message: hasEffectiveFrameProtection
      ? (isValidXfo
          ? `Frame protection verified via X-Frame-Options (${xfoHeader.trim()})`
          : 'Frame protection verified via restrictive CSP frame-ancestors directive')
      : 'Missing or ineffective frame protection header (expected X-Frame-Options: DENY/SAMEORIGIN or restrictive CSP frame-ancestors without "*")',
  });
}

export async function verifyDeployment({
  origin,
  fetch = globalThis.fetch,
  unknownPath = DEFAULT_UNKNOWN_PATH,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  if (!origin) {
    throw new Error('Origin is required for verification.');
  }

  const urlObj = new URL(origin);
  const normalizedOrigin = `${urlObj.protocol}//${urlObj.host}`;
  const isHttps = urlObj.protocol === 'https:';
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
    let signal = options.signal;
    if (!signal && typeof AbortSignal?.timeout === 'function') {
      signal = AbortSignal.timeout(timeoutMs);
    }
    try {
      const response = await fetch(targetUrl, {
        ...options,
        ...(signal ? { signal } : {}),
      });
      const html = await response.text();
      const finalUrl = response.url || targetUrl;
      return {
        response,
        html,
        url: finalUrl,
        redirected: Boolean(response.redirected),
        error: null,
      };
    } catch (err) {
      const isTimeout = err?.name === 'TimeoutError' || err?.name === 'AbortError' || err?.code === 23;
      const errorMessage = isTimeout
        ? `Request to ${targetPath} timed out after ${timeoutMs}ms`
        : `Failed to fetch ${targetPath}: ${err.message || String(err)}`;
      return {
        response: null,
        html: null,
        url: null,
        redirected: false,
        error: err,
        errorMessage,
      };
    }
  };

  // 1. Check Homepage `/`
  const homeResult = await safeFetch('/');
  if (homeResult.error) {
    recordCheck({
      name: 'Homepage request',
      path: '/',
      passed: false,
      message: homeResult.errorMessage,
    });
  } else {
    const { response, html, url: finalUrl } = homeResult;
    recordCheck({
      name: 'Homepage HTTP 200 status',
      path: '/',
      passed: response.status === 200,
      message: `Homepage returned status ${response.status} (expected 200)`,
    });

    const isHomeFinalUrl = (finalUrl === `${normalizedOrigin}/` || finalUrl === normalizedOrigin);
    recordCheck({
      name: 'Homepage final URL',
      path: '/',
      passed: isHomeFinalUrl,
      message: isHomeFinalUrl
        ? `Homepage resolved to root URL (${finalUrl})`
        : `Expected final URL "${normalizedOrigin}/", got "${finalUrl}"`,
    });

    verifySecurityHeaders({
      response,
      path: '/',
      isHttps,
      recordCheck,
    });

    const h1 = extractH1(html);
    const hasHomeH1 = isHomepageHeading(h1);
    recordCheck({
      name: 'Homepage heading identity',
      path: '/',
      passed: hasHomeH1,
      message: hasHomeH1
        ? `Homepage heading verified ("${HOMEPAGE_H1}")`
        : `Expected homepage H1 "${HOMEPAGE_H1}", got "${h1 ?? 'missing'}"`,
    });
  }

  // 2. Check Insights Listing `/blogs`
  const blogsResult = await safeFetch('/blogs');
  if (blogsResult.error) {
    recordCheck({
      name: 'Insights listing request',
      path: '/blogs',
      passed: false,
      message: blogsResult.errorMessage,
    });
  } else {
    const { response, html, url: finalUrl } = blogsResult;
    recordCheck({
      name: 'Insights listing HTTP 200 status',
      path: '/blogs',
      passed: response.status === 200,
      message: `/blogs returned status ${response.status} (expected 200)`,
    });

    const isBlogsFinalUrl = (finalUrl === `${normalizedOrigin}/blogs`);
    recordCheck({
      name: 'Insights listing final URL',
      path: '/blogs',
      passed: isBlogsFinalUrl,
      message: isBlogsFinalUrl
        ? `Insights listing resolved to slashless URL (${finalUrl})`
        : `Expected final URL "${normalizedOrigin}/blogs", got "${finalUrl}"`,
    });

    verifySecurityHeaders({
      response,
      path: '/blogs',
      isHttps,
      recordCheck,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);

    const isHomepageFallback = isHomepageFallbackHtml({
      html,
      canonical,
      normalizedOrigin,
    });

    const hasInsightsTitle = Boolean(
      title &&
      /insights/i.test(title) &&
      /dashapatmaja/i.test(title) &&
      !isHomepageFallback,
    );
    recordCheck({
      name: 'Insights listing title',
      path: '/blogs',
      passed: hasInsightsTitle,
      message: hasInsightsTitle
        ? `Title "${title}" matches Insights listing identity`
        : `Expected Insights listing title, got "${title ?? 'missing'}"`,
    });

    const hasInsightsH1 = Boolean(
      h1 &&
      (h1.includes('Thinking from the work of building brands.') || h1.trim() === 'Thinking from the work of building brands.') &&
      !isHomepageFallback,
    );
    recordCheck({
      name: 'Insights listing H1 heading',
      path: '/blogs',
      passed: hasInsightsH1,
      message: hasInsightsH1
        ? `H1 "${h1}" matches expected Insights heading`
        : `Expected H1 "Thinking from the work of building brands.", got "${h1 ?? 'missing'}"`,
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

    for (const article of EXPECTED_ARTICLES) {
      const hasLink = hasArticleAnchor(html, article.path, normalizedOrigin);
      recordCheck({
        name: `Insights listing links to current article ${article.slug}`,
        path: '/blogs',
        passed: hasLink,
        message: hasLink
          ? `Listing contains anchor link to ${article.path}`
          : `/blogs missing anchor <a href> link to current article ${article.path}`,
      });
    }

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
        message: articleResult.errorMessage,
      });
      continue;
    }

    const { response, html, url: finalUrl } = articleResult;
    recordCheck({
      name: `Article ${article.slug} HTTP 200 status`,
      path: article.path,
      passed: response.status === 200,
      message: `${article.path} returned status ${response.status} (expected 200)`,
    });

    const isArticleFinalUrl = (finalUrl === `${normalizedOrigin}${article.path}`);
    recordCheck({
      name: `Article ${article.slug} final URL`,
      path: article.path,
      passed: isArticleFinalUrl,
      message: isArticleFinalUrl
        ? `Article resolved to slashless URL (${finalUrl})`
        : `Expected final URL "${normalizedOrigin}${article.path}", got "${finalUrl}"`,
    });

    verifySecurityHeaders({
      response,
      path: article.path,
      isHttps,
      recordCheck,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);
    const ogType = extractOgType(html);
    const jsonLdObjects = extractJsonLdObjects(html);

    const isHomepageFallback = isHomepageFallbackHtml({
      html,
      canonical,
      normalizedOrigin,
    });

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

    const matchingBlogPosting = jsonLdObjects.find((item) => {
      const type = item?.['@type'];
      const types = Array.isArray(type) ? type : [type];
      if (!types.includes('BlogPosting')) return false;

      const headline = typeof item.headline === 'string'
        ? item.headline
        : (typeof item.name === 'string' ? item.name : '');
      const headlineMatches = headline.toLowerCase().includes(article.titleSubstring.toLowerCase()) ||
        (article.expectedHeadline && headline.toLowerCase().includes(article.expectedHeadline.toLowerCase()));
      if (!headlineMatches) return false;

      const itemUrl = typeof item.url === 'string' ? item.url : null;
      const mainEntity = item.mainEntityOfPage;
      const mainEntityUrl = typeof mainEntity === 'string'
        ? mainEntity
        : (typeof mainEntity?.['@id'] === 'string' ? mainEntity['@id'] : null);

      const targetAbsoluteUrl = `${normalizedOrigin}${article.path}`;
      const matchesUrl = (itemUrl === targetAbsoluteUrl || itemUrl === article.path);
      const matchesMainEntity = (mainEntityUrl === targetAbsoluteUrl || mainEntityUrl === article.path);

      return Boolean(matchesUrl || matchesMainEntity);
    });

    recordCheck({
      name: `Article ${article.slug} BlogPosting JSON-LD schema`,
      path: article.path,
      passed: Boolean(matchingBlogPosting),
      message: matchingBlogPosting
        ? 'BlogPosting JSON-LD schema verified with matching headline and route URL'
        : `Missing valid BlogPosting JSON-LD matching headline "${article.titleSubstring}" and URL "${normalizedOrigin}${article.path}"`,
    });
  }

  // 4. Check Unknown Route 404 Handling
  const unknownResult = await safeFetch(unknownPath);
  if (unknownResult.error) {
    recordCheck({
      name: 'Unknown route request',
      path: unknownPath,
      passed: false,
      message: unknownResult.errorMessage,
    });
  } else {
    const { response, html } = unknownResult;
    const is404 = response.status === 404;

    recordCheck({
      name: 'Unknown route HTTP 404 status',
      path: unknownPath,
      passed: is404,
      message: is404
        ? 'Unknown path correctly returned HTTP 404'
        : `Expected HTTP 404, got ${response.status} (SPA fallback defect: unknown route does not return 404)`,
    });

    const title = extractTitle(html);
    const h1 = extractH1(html);
    const canonical = extractCanonical(html);

    const isHomepageHtml = isHomepageFallbackHtml({
      html,
      canonical,
      normalizedOrigin,
    });

    recordCheck({
      name: 'Unknown route does not return homepage body',
      path: unknownPath,
      passed: !isHomepageHtml,
      message: isHomepageHtml
        ? 'Unknown route returned homepage HTML body instead of 404 page'
        : 'Unknown route does not return homepage body',
    });

    const hasNotFoundIdentity = Boolean(
      html &&
      html.trim().length > 20 &&
      !isHomepageHtml &&
      ((title && /page not found|not found|404/i.test(title)) || (h1 && /page not found|not found|404/i.test(h1))),
    );

    recordCheck({
      name: 'Unknown route Not Found page identity',
      path: unknownPath,
      passed: hasNotFoundIdentity,
      message: hasNotFoundIdentity
        ? 'Not Found page identity verified (title/H1)'
        : `Unknown route missing Not Found identity (expected "Page Not Found", got title "${title ?? 'missing'}", H1 "${h1 ?? 'missing'}")`,
    });
  }

  // 5. Check Trailing-Slash Subpath Policy
  const trailingSlashResult = await safeFetch('/blogs/');
  if (trailingSlashResult.error) {
    recordCheck({
      name: 'Trailing slash /blogs/ request',
      path: '/blogs/',
      passed: false,
      message: trailingSlashResult.errorMessage,
    });
  } else {
    const { url: finalUrl, html } = trailingSlashResult;
    const isSlashlessFinalUrl = (finalUrl === `${normalizedOrigin}/blogs`);
    recordCheck({
      name: 'Trailing slash /blogs/ resolves to slashless URL',
      path: '/blogs/',
      passed: isSlashlessFinalUrl,
      message: isSlashlessFinalUrl
        ? `Trailing slash URL resolved to slashless URL (${finalUrl})`
        : `Expected final URL "${normalizedOrigin}/blogs", got "${finalUrl}"`,
    });

    const canonical = extractCanonical(html);
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
  const { origin, unknownPath, timeoutMs } = parseCliArgs(argv);

  writeOut(`Starting deployment smoke verification against: ${origin}\n`);
  const result = await verifyDeployment({ origin, fetch, unknownPath, timeoutMs });

  writeOut('\n--- Verification Results ---\n');
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
