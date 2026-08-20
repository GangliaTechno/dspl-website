import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = 'https://dashapatmaja.in';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-08-20' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/brands', priority: '0.9', changefreq: 'weekly', lastmod: '2026-08-20' },
  { path: '/brands/raw-radicles', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/marketing', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/branding', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/ecommerce', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/start', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-20' },
  { path: '/privacy', priority: '0.4', changefreq: 'yearly', lastmod: '2026-08-20' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly', lastmod: '2026-08-20' },
];

function formatDateOnly(isoDate) {
  if (!isoDate) return '2026-08-20';
  return isoDate.slice(0, 10);
}

function generateSitemap() {
  console.log('--- Generating Dynamic Sitemap ---');

  const manifestPath = path.join(rootDir, 'src', 'generated', 'blogManifest.json');
  let blogEntries = [];

  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (manifest.blogsEnabled && Array.isArray(manifest.posts) && manifest.posts.length > 0) {
        const latestBlogUpdate = manifest.posts.reduce((latest, post) => {
          const date = formatDateOnly(post._updatedAt || post.publishedAt);
          return date > latest ? date : latest;
        }, '2026-08-20');

        blogEntries.push({
          path: '/blogs',
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: latestBlogUpdate,
        });

        for (const post of manifest.posts) {
          blogEntries.push({
            path: `/blogs/${post.slug}`,
            priority: '0.7',
            changefreq: 'monthly',
            lastmod: formatDateOnly(post._updatedAt || post.publishedAt),
          });
        }
      }
    } catch (err) {
      console.warn('⚠ Could not read blogManifest.json for sitemap generation:', err.message);
    }
  }

  const allEntries = [...staticRoutes, ...blogEntries];

  const xmlUrls = allEntries
    .map(
      (entry) => `  <url>
    <loc>${SITE_URL}${entry.path === '/' ? '/' : entry.path}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;

  const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  console.log(`✔ Generated sitemap with ${allEntries.length} URLs at public/sitemap.xml`);
}

generateSitemap();
