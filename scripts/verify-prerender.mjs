import fs from 'node:fs';
import path from 'node:path';

const routes = [
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

const titles = [];
const failures = [];
const decodeHtmlText = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

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

for (const { route, heading } of routes) {
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
    failures.push(`${label}: expected h1 containing "${heading}"`);
  }
  if (!/<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    failures.push(`${label}: missing canonical link`);
  }
  if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["']index, follow["'][^>]*>/i.test(html)) {
    failures.push(`${label}: missing index, follow robots metadata`);
  }
  if (!title) {
    failures.push(`${label}: missing title`);
  } else {
    titles.push({ label, title });
  }
  verifyOrganizationSchema(html, label);
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

if (failures.length) {
  console.error(`Prerender verification failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} prerendered public routes and a production 404 page.`);
