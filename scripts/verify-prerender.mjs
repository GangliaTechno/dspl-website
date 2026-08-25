import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const baseRoutes = [
  { route: '', heading: 'We build consumer brands.' },
  { route: 'about', heading: 'About Dashapatmaja Solutions Pvt Ltd' },
  { route: 'brands', heading: 'We develop and operate consumer brands.' },
  { route: 'brands/raw-radicles', heading: 'Raw Radicles' },
  { route: 'marketing', heading: 'Marketing' },
  { route: 'branding', heading: 'Branding' },
  { route: 'ecommerce', heading: 'E-commerce' },
  { route: 'contact', heading: 'Start a conversation.' },
  { route: 'start', heading: 'Start a Project' },
  { route: 'privacy', heading: 'Privacy Policy' },
  { route: 'terms', heading: 'Terms of Use' },
];

const dynamicBlogRoutes = [];
const manifestPath = path.join(rootDir, 'src', 'generated', 'blogManifest.json');

if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.blogsEnabled && Array.isArray(manifest.posts)) {
      dynamicBlogRoutes.push({
        route: 'blogs',
        heading: 'Thinking from the work of building brands.',
        type: 'website',
      });

      for (const post of manifest.posts) {
        const fullArticlePath = path.join(rootDir, 'src', 'generated', 'blog', `${post.slug}.json`);
        const fullPost = fs.existsSync(fullArticlePath)
          ? JSON.parse(fs.readFileSync(fullArticlePath, 'utf8'))
          : post;

        dynamicBlogRoutes.push({
          route: `blogs/${post.slug}`,
          heading: post.title,
          type: 'article',
          post: fullPost,
        });
      }
    }
  } catch (err) {
    console.warn('⚠ Could not read blogManifest.json for prerender verification:', err.message);
  }
}

const routes = [...baseRoutes, ...dynamicBlogRoutes];

const titles = [];
const failures = [];
const decodeHtmlText = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const verifyHeadUniqueness = (html, label) => {
  const checkSingle = (regex, tagName) => {
    const matches = html.match(regex) || [];
    if (matches.length !== 1) {
      failures.push(
        `${label}: expected exactly 1 ${tagName}, found ${matches.length}`,
      );
    }
  };

  checkSingle(/<title\b[^>]*>/gi, '<title>');
  checkSingle(/<meta\b[^>]*name=["']description["'][^>]*>/gi, '<meta name="description">');
  checkSingle(/<meta\b[^>]*name=["']robots["'][^>]*>/gi, '<meta name="robots">');
  checkSingle(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '<link rel="canonical">');
  checkSingle(/<meta\b[^>]*property=["']og:title["'][^>]*>/gi, '<meta property="og:title">');
  checkSingle(/<meta\b[^>]*property=["']og:description["'][^>]*>/gi, '<meta property="og:description">');
  checkSingle(/<meta\b[^>]*property=["']og:url["'][^>]*>/gi, '<meta property="og:url">');
  checkSingle(/<meta\b[^>]*property=["']og:image["'][^>]*>/gi, '<meta property="og:image">');
  checkSingle(/<meta\b[^>]*property=["']og:site_name["'][^>]*>/gi, '<meta property="og:site_name">');
  checkSingle(/<meta\b[^>]*property=["']og:type["'][^>]*>/gi, '<meta property="og:type">');
  checkSingle(/<meta\b[^>]*name=["']twitter:card["'][^>]*>/gi, '<meta name="twitter:card">');
  checkSingle(/<meta\b[^>]*name=["']twitter:title["'][^>]*>/gi, '<meta name="twitter:title">');
  checkSingle(/<meta\b[^>]*name=["']twitter:description["'][^>]*>/gi, '<meta name="twitter:description">');
  checkSingle(/<meta\b[^>]*name=["']twitter:image["'][^>]*>/gi, '<meta name="twitter:image">');
};

const verifyOrganizationSchema = (html, label) => {
  const schemas = Array.from(
    html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[1],
  );

  if (!schemas.length) {
    failures.push(`${label}: missing JSON-LD`);
    return;
  }

  let hasOrganization = false;
  for (const source of schemas) {
    try {
      const data = JSON.parse(source);
      const types = Array.isArray(data['@type']) ? data['@type'] : [data['@type']];
      if (
        types.includes('Organization')
        && data.name === 'Dashapatmaja Solutions Pvt Ltd'
        && data.brand?.['@type'] === 'Brand'
        && data.brand?.name === 'Raw Radicles'
      ) {
        hasOrganization = true;
      }
    } catch {
      failures.push(`${label}: invalid JSON-LD`);
    }
  }

  if (!hasOrganization) {
    failures.push(`${label}: missing DSPL Organization schema with Raw Radicles Brand data`);
  }
};

const verifyBlogPostingSchema = (html, label, post) => {
  const schemas = Array.from(
    html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
    (match) => match[1],
  );

  if (!schemas.length) {
    failures.push(`${label}: missing JSON-LD`);
    return;
  }

  let hasBlogPosting = false;
  let hasValidFaqPage = !post.faqs || post.faqs.length === 0;

  for (const source of schemas) {
    try {
      const data = JSON.parse(source);
      const items = Array.isArray(data['@graph']) ? data['@graph'] : [data];
      for (const item of items) {
        if (
          item['@type'] === 'BlogPosting'
          && item.headline === post.title
          && item.datePublished === post.publishedAt
          && (item.dateModified === (post._updatedAt || post.publishedAt))
          && item.publisher?.name === 'Dashapatmaja Solutions Pvt Ltd'
        ) {
          hasBlogPosting = true;
          if (post.authors?.length > 0) {
            const authors = Array.isArray(item.author) ? item.author : [item.author];
            const authorNames = authors.map((a) => a?.name).filter(Boolean);
            const expectedNames = post.authors.map((a) => a.name);
            if (JSON.stringify(authorNames) !== JSON.stringify(expectedNames)) {
              failures.push(`${label}: BlogPosting author names ${JSON.stringify(authorNames)} do not match expected ${JSON.stringify(expectedNames)}`);
            }
          }
        }

        if (item['@type'] === 'FAQPage' && Array.isArray(post.faqs) && post.faqs.length > 0) {
          const mainEntity = Array.isArray(item.mainEntity) ? item.mainEntity : [];
          if (mainEntity.length === post.faqs.length) {
            const actualQuestions = mainEntity.map((q) => q?.name);
            const expectedQuestions = post.faqs.map((f) => f.question);
            if (JSON.stringify(actualQuestions) === JSON.stringify(expectedQuestions)) {
              hasValidFaqPage = true;
            }
          }
        }
      }
    } catch {
      failures.push(`${label}: invalid JSON-LD`);
    }
  }

  if (!hasBlogPosting) {
    failures.push(`${label}: missing valid BlogPosting JSON-LD schema with matching headline, datePublished, dateModified, and publisher`);
  }

  if (!hasValidFaqPage) {
    failures.push(`${label}: missing valid FAQPage JSON-LD schema matching the article's ${post.faqs?.length} FAQs in @graph`);
  }
};

for (const { route, heading, type, post } of routes) {
  const htmlPath = route
    ? path.join('dist', route, 'index.html')
    : path.join('dist', 'index.html');
  const label = route ? `/${route}` : '/';

  if (!fs.existsSync(htmlPath)) {
    failures.push(`${label}: missing ${htmlPath}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const h1Html = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '';
  const h1Text = decodeHtmlText(
    h1Html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );

  if (!/<main\b[^>]*>[\s\S]*\S[\s\S]*<\/main>/i.test(html)) {
    failures.push(`${label}: missing non-empty <main>`);
  }
  if (!h1Text.includes(heading)) {
    failures.push(`${label}: expected h1 containing "${heading}", got "${h1Text}"`);
  }
  if (!/<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    failures.push(`${label}: missing canonical link`);
  }
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index, follow["'][^>]*>/i.test(html)) {
    failures.push(`${label}: missing index, follow robots metadata`);
  }
  if (type === 'article') {
    if (!/<meta\b[^>]*property=["']og:type["'][^>]*content=["']article["'][^>]*>/i.test(html)) {
      failures.push(`${label}: missing og:type="article"`);
    }
    verifyBlogPostingSchema(html, label, post);
  } else {
    verifyOrganizationSchema(html, label);
  }
  if (!title) {
    failures.push(`${label}: missing title`);
  } else {
    titles.push({ label, title });
  }
  verifyHeadUniqueness(html, label);
}

const notFoundPath = path.join('dist', '404.html');
if (!fs.existsSync(notFoundPath)) {
  failures.push(`404: missing ${notFoundPath}`);
} else {
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
  const notFoundTitle = notFoundHtml.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const notFoundH1 = decodeHtmlText(
    (notFoundHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

  if (!notFoundTitle) failures.push('404: missing title');
  if (!notFoundH1.includes('Page Not Found')) {
    failures.push('404: expected h1 containing "Page Not Found"');
  }
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']noindex, follow["'][^>]*>/i.test(notFoundHtml)) {
    failures.push('404: missing noindex, follow robots metadata');
  }
  if (!/<link\b(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']https:\/\/dashapatmaja\.in\/404\.html["'])[^>]*>/i.test(notFoundHtml)) {
    failures.push('404: missing stable https://dashapatmaja.in/404.html canonical');
  }
  verifyOrganizationSchema(notFoundHtml, '404');
  verifyHeadUniqueness(notFoundHtml, '404');
  if (/<code\b[^>]*class=["'][^"']*missing-path[^"']*["'][^>]*>\s*\/404\.html\s*<\/code>/i.test(notFoundHtml)) {
    failures.push('404: prerendered fallback exposes /404.html as the missing path');
  }
}

const duplicateTitles = titles.filter(
  ({ title }, index) => titles.findIndex((item) => item.title === title) !== index,
);
for (const { label, title } of duplicateTitles) {
  failures.push(`${label}: duplicate title "${title}"`);
}

// Verify removed articles are absent from the dist output.
const REMOVED_BLOG_ROUTES = [
  'blogs/coordinating-brand-market-commerce',
  'blogs/from-packaging-to-purchase',
];
for (const removedRoute of REMOVED_BLOG_ROUTES) {
  const removedPath = path.join('dist', removedRoute, 'index.html');
  if (fs.existsSync(removedPath)) {
    failures.push(`/${removedRoute}: removed article was found in dist output and must not be prerendered`);
  }
}

if (failures.length) {
  console.error(`Prerender verification failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} prerendered public routes and a production 404 page.`);
