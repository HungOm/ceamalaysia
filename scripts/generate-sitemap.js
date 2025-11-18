const fs = require('fs');
const path = require('path');

const baseUrl = 'https://ceamalaysia.org';

// Navigation structure (mirrored from constants.ts)
// Note: News is commented out in navigation but included in sitemap
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '#', 
    dropdown: [
      { name: 'Learning Centers', href: '/learning-centers' },
      { name: 'Shelter Services', href: '/shelter' },
      { name: 'Community Support', href: '/community-support' }
    ]
  },
  { name: 'Initiatives', href: '/initiatives' },
  // { name: 'News', href: '/news' }, // Commented out but still in sitemap
  { name: 'Contact', href: '/contact' },
];

// News articles slugs
const newsArticles = [
  'new-learning-center-opens-2024',
  'community-health-screening-2024',
  'cultural-festival-preserves-heritage',
  'youth-leadership-program-graduates',
  'emergency-aid-flood-victims',
  'womens-skills-training-success'
];

// Function to get priority based on URL depth
const getPriority = (url) => {
  const depth = url.split('/').filter(Boolean).length;
  return Math.max(0.5, 1 - depth * 0.2).toFixed(1);
};

// Function to get change frequency based on URL
const getChangeFreq = (url) => {
  if (url === '/') return 'daily';
  if (url === '/about' || url === '/initiatives' || url === '/news') return 'weekly';
  return 'monthly';
};

// Get all pages from navigation (including dropdown items)
const pages = [];
navigation.forEach(nav => {
  if (nav.dropdown) {
    // Add dropdown items
    nav.dropdown.forEach(subItem => {
      if (subItem.href !== '#') {
        pages.push({
          url: subItem.href,
          lastMod: new Date().toISOString(),
          changeFreq: getChangeFreq(subItem.href),
          priority: getPriority(subItem.href)
        });
      }
    });
  } else if (nav.href !== '#') {
    // Add regular navigation items
    pages.push({
      url: nav.href,
      lastMod: new Date().toISOString(),
      changeFreq: getChangeFreq(nav.href),
      priority: getPriority(nav.href)
    });
  }
});

// Add news page
pages.push({
  url: '/news',
  lastMod: new Date().toISOString(),
  changeFreq: 'weekly',
  priority: '0.9'
});

// Add news articles
newsArticles.forEach(slug => {
  pages.push({
    url: `/news/${slug}`,
    lastMod: new Date().toISOString(),
    changeFreq: 'monthly',
    priority: '0.7'
  });
});

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
