import fs from 'node:fs';
import path from 'node:path';

const routes = [
  { route: '', heading: 'We develop brands.' },
  { route: 'about', heading: 'About Dashapatmaja Solutions Pvt Ltd' },
  { route: 'brands', heading: 'We develop and operate consumer brands.' },
  { route: 'marketing', heading: 'Marketing' },
  { route: 'branding', heading: 'Branding' },
  { route: 'ecommerce', heading: 'E-commerce' },
  { route: 'contact', heading: 'Contact us' },
  { route: 'privacy', heading: 'Privacy Policy' },
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
  if (!title) {
    failures.push(`${label}: missing title`);
  } else {
    titles.push({ label, title });
  }
  if (!/type=["']application\/ld\+json["']/i.test(html)) {
    failures.push(`${label}: missing JSON-LD`);
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

console.log(`Verified ${routes.length} prerendered public routes.`);
