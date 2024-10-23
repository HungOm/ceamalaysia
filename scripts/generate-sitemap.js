const fs = require('fs');
const path = require('path');
const { navigation } = require('../src/lib/constants.ts');

const baseUrl = 'https://ceamalaysia.org';

// Function to get priority based on URL depth
const getPriority = (url) => {
  const depth = url.split('/').filter(Boolean).length;
  return Math.max(0.5, 1 - depth * 0.2).toFixed(1);
};

// Function to get change frequency based on URL
const getChangeFreq = (url) => {
  if (url === '/') return 'daily';
  if (url === '/about' || url === '/initiatives') return 'weekly';
  return 'monthly';
};

const pages = navigation.map(nav => ({
  url: nav.href,
  lastMod: new Date().toISOString(),
  changeFreq: getChangeFreq(nav.href),
  priority: getPriority(nav.href)
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
