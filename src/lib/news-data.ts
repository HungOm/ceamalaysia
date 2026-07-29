// lib/news-data.ts
// ================================
// GUIDE FOR UPDATING NEWS ARTICLES
// ================================
// 
// To add a new news article:
// 1. Create a new object in the newsArticles array below
// 2. Follow the NewsArticle interface structure
// 3. Ensure the slug is unique and URL-friendly (lowercase, hyphens instead of spaces)
// 4. Set featured: true for only ONE article at a time (the main story)
// 5. Upload images to /public/images/news/ directory
// 6. Use appropriate categories: 'Community', 'Education', 'Events', 'Healthcare', 'Advocacy'
// 7. Content array supports multiple types: paragraph, heading, image, quote, list
// 8. Tags help with SEO and article discovery
//
// Example:
// {
//   slug: 'your-article-url-slug',
//   title: 'Article Title',
//   excerpt: 'Brief 2-3 sentence summary',
//   category: 'Community',
//   date: '2024-03-15',
//   author: 'Author Name',
//   authorRole: 'Position/Title',
//   readTime: '5 min read',
//   featured: false,
//   image: '/images/news/article-image.jpg',
//   tags: ['tag1', 'tag2'],
//   content: [
//     { type: 'paragraph', text: 'Your paragraph text...' },
//     { type: 'heading', text: 'Section Heading' },
//     { type: 'image', src: '/images/news/image.jpg', alt: 'Description', caption: 'Photo caption' },
//     { type: 'quote', text: 'Quote text', author: 'Quote Author' },
//     { type: 'list', items: ['Item 1', 'Item 2'] }
//   ]
// }
//
// ⚠️  BEFORE PUBLISHING ANY ARTICLE HERE, READ THIS:
// Every name, quote, and number in an article is a public claim CEAM has to be able
// to stand behind. Only publish people who actually hold the role given, quotes they
// actually said and approved, and figures you can evidence from a register, attendance
// sheet, or partner report. Cross-check any number against the `statistics` array in
// constants.ts so the site never states two different figures for the same thing.

export interface NewsArticle {
    slug: string
    title: string
    excerpt: string
    category: 'Community' | 'Education' | 'Events' | 'Healthcare' | 'Advocacy' | 'Success Stories'
    date: string
    author: string
    authorRole?: string
    authorBio?: string
    readTime: string
    featured: boolean
    image: string
    tags?: string[]
    content: Array<{
      type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list'
      text?: string
      src?: string
      alt?: string
      caption?: string
      author?: string
      items?: string[]
    }>
  }
  
  // SECURITY / CREDIBILITY: the six placeholder articles that previously lived here were
  // removed, and the /news routes were deleted with them. They were demo content that had
  // gone live: none of the events described happened as written, and they presented invented
  // people as real CEAM leadership — "David Lian, CEAM Executive Director", "Sarah Thompson,
  // Communications Director", "Dr. James Wong", "Mary Sung", "Anna Lim", "Michael Chen",
  // "Jennifer Tan", "Elder Pau Thang".
  //
  // Although the News link was commented out of the site navigation, all six pages were still
  // being built, were publicly reachable, and were explicitly listed in sitemap.xml for Google
  // to index. They also carried ~18 invented figures that contradicted CEAM's real published
  // numbers (e.g. a "third learning center" with 200 enrolled implied 500-600 children against
  // the "300+" shown on the home page; "over 5,000 hours" of volunteer labour against "50+"
  // volunteers; a "10th Annual" festival implying a 2014 founding against "7+ years of service").
  //
  // Anyone able to show that CEAM invented its own executive director and its own news stories
  // could discredit the entire site, including the true protection and shelter information.
  // That risk is not worth carrying for placeholder copy.
  //
  // The full previous content is in git history. To review or restore it:
  //   git show HEAD:src/lib/news-data.ts
  //   git show HEAD:src/app/news/page.tsx
  //   git show HEAD:'src/app/news/[slug]/page.tsx'
  // Restoring the section requires those two page files back as well as entries below.
  export const newsArticles: NewsArticle[] = [];
  
  // Function to get latest articles
  export function getLatestArticles(count: number = 6) {
    return newsArticles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }
  
  // Function to get articles by category
  export function getArticlesByCategory(category: string) {
    return newsArticles.filter(article => article.category === category);
  }
  
  // Function to get featured article
  export function getFeaturedArticle() {
    return newsArticles.find(article => article.featured);
  }
  
  // Function to get related articles (same category, different article)
  export function getRelatedArticles(slug: string, category: string, count: number = 3) {
    return newsArticles
      .filter(article => article.category === category && article.slug !== slug)
      .slice(0, count);
  }
