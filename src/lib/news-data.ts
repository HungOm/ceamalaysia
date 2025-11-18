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
  
  export const newsArticles: NewsArticle[] = [
    {
      slug: 'new-learning-center-opens-2024',
      title: 'CEAM Opens New Learning Center for 200 K\'Cho Children',
      excerpt: 'A beacon of hope shines brighter as CEAM inaugurates its third learning center in Kuala Lumpur, providing education access to 200 additional refugee children who previously had no formal schooling opportunities.',
      category: 'Education',
      date: '2024-03-10',
      author: 'Sarah Thompson',
      authorRole: 'Communications Director',
      authorBio: 'Sarah has been advocating for refugee education rights for over 5 years and leads CEAM\'s communications strategy.',
      readTime: '6 min read',
      featured: true,
      image: '/images/news/learning-center-opening.jpg',
      tags: ['education', 'learning center', 'children', 'milestone'],
      content: [
        {
          type: 'paragraph',
          text: 'In a momentous achievement for the K\'Cho refugee community, CEAM celebrated the opening of its third learning center in the heart of Kuala Lumpur. The new facility, which can accommodate 200 students, represents a significant expansion of educational opportunities for refugee children who have been denied access to formal education.'
        },
        {
          type: 'heading',
          text: 'Breaking Down Barriers to Education'
        },
        {
          type: 'paragraph',
          text: 'The new center addresses a critical gap in refugee education. With Malaysian law restricting refugee children from attending public schools, community-based learning centers like this one serve as lifelines for thousands of young minds eager to learn and grow.'
        },
        {
          type: 'quote',
          text: 'Education is not just about books and exams; it\'s about giving our children hope, dignity, and a chance at a better future. Today, we\'re not just opening a building – we\'re opening doors to countless possibilities.',
          author: 'David Lian, CEAM Executive Director'
        },
        {
          type: 'paragraph',
          text: 'The center features six classrooms, a computer lab, a library with over 1,000 books in multiple languages, and a recreational area. The curriculum covers primary education subjects including Mathematics, Science, English, Malay, and crucially, K\'Cho language classes to preserve cultural heritage.'
        },
        {
          type: 'heading',
          text: 'Community Support Makes It Possible'
        },
        {
          type: 'paragraph',
          text: 'This achievement was made possible through the generous support of local and international donors, volunteers who contributed over 5,000 hours of labor, and the unwavering determination of the K\'Cho community itself.'
        },
        {
          type: 'list',
          items: [
            '200 children enrolled for the first semester',
            '12 qualified teachers recruited from the refugee community',
            'Full primary curriculum from Grade 1 to Grade 6',
            'Free meals program serving 600 meals daily',
            'Transportation assistance for students from distant areas'
          ]
        },
        {
          type: 'image',
          src: '/images/news/students-classroom.jpg',
          alt: 'Students in their new classroom',
          caption: 'Eager students attend their first day of classes at the new CEAM Learning Center'
        },
        {
          type: 'paragraph',
          text: 'The opening ceremony was attended by representatives from UNHCR, partner NGOs, and community leaders. Traditional K\'Cho performances by the children reminded everyone present of the rich cultural heritage these young students carry with them.'
        },
        {
          type: 'heading',
          text: 'Looking Ahead'
        },
        {
          type: 'paragraph',
          text: 'While this new center marks a significant milestone, CEAM recognizes that much work remains. An estimated 2,000 K\'Cho refugee children in Malaysia still lack access to any form of education. The organization has ambitious plans to establish two more centers by 2025, contingent on continued community support and funding.'
        },
        {
          type: 'quote',
          text: 'Every child deserves the right to education. We won\'t stop until every K\'Cho child in Malaysia has a place to learn, grow, and dream.',
          author: 'Mary Sung, Education Coordinator'
        },
        {
          type: 'paragraph',
          text: 'For those inspired to support this vital mission, CEAM welcomes volunteers, donations of educational materials, and financial contributions. Every contribution, no matter how small, helps build a brighter future for these resilient young learners.'
        }
      ]
    },
    {
      slug: 'community-health-screening-2024',
      title: 'Free Health Screening Serves 500 Refugees in Partnership with Local Clinic',
      excerpt: 'CEAM\'s quarterly health screening program provided vital medical checkups and treatments to 500 K\'Cho refugees, addressing critical healthcare gaps in the community.',
      category: 'Healthcare',
      date: '2024-03-05',
      author: 'Dr. James Wong',
      authorRole: 'Health Program Coordinator',
      readTime: '4 min read',
      featured: false,
      image: '/images/news/health-screening.jpg',
      tags: ['healthcare', 'community service', 'partnership'],
      content: [
        {
          type: 'paragraph',
          text: 'In collaboration with Mercy Medical Clinic, CEAM successfully conducted its largest health screening event to date, providing free medical services to 500 K\'Cho refugees who typically face significant barriers to healthcare access.'
        },
        {
          type: 'heading',
          text: 'Addressing Critical Health Needs'
        },
        {
          type: 'paragraph',
          text: 'The two-day event offered comprehensive health services including general health checkups, diabetes and hypertension screening, dental examinations, eye tests, and childhood vaccinations. Medical professionals identified several cases requiring immediate intervention, which were referred to partner hospitals for treatment.'
        },
        {
          type: 'list',
          items: [
            '500 individuals received health screenings',
            '150 children vaccinated',
            '75 pairs of reading glasses distributed',
            '200 dental treatments provided',
            '50 chronic disease cases identified for follow-up care'
          ]
        },
        {
          type: 'quote',
          text: 'Many refugees haven\'t seen a doctor in years due to cost and fear. Events like these are literally life-saving for our community.',
          author: 'Peter Thang, Community Health Volunteer'
        },
        {
          type: 'paragraph',
          text: 'The success of this program highlights the importance of partnerships between refugee organizations and healthcare providers in addressing the health disparities faced by vulnerable populations. CEAM plans to continue these quarterly screenings throughout 2024.'
        }
      ]
    },
    {
      slug: 'cultural-festival-preserves-heritage',
      title: 'Annual K\'Cho Cultural Festival Draws 2,000 Attendees',
      excerpt: 'The vibrant celebration showcased traditional music, dance, crafts, and cuisine, strengthening cultural identity and community bonds among K\'Cho refugees in Malaysia.',
      category: 'Events',
      date: '2024-02-28',
      author: 'Anna Lim',
      authorRole: 'Cultural Programs Manager',
      readTime: '5 min read',
      featured: false,
      image: '/images/news/cultural-festival.jpg',
      tags: ['culture', 'events', 'community', 'heritage'],
      content: [
        {
          type: 'paragraph',
          text: 'The 10th Annual K\'Cho Cultural Festival transformed the community hall into a vibrant celebration of heritage, with over 2,000 attendees gathering to celebrate their roots through traditional performances, crafts, and cuisine.'
        },
        {
          type: 'heading',
          text: 'Preserving Heritage in Displacement'
        },
        {
          type: 'paragraph',
          text: 'The festival featured traditional K\'Cho dances performed by youth groups, demonstrations of traditional weaving techniques, and a feast of authentic K\'Cho dishes prepared by community elders. The event served as both a celebration and an educational opportunity for younger generations born in Malaysia.'
        },
        {
          type: 'image',
          src: '/images/news/traditional-dance.jpg',
          alt: 'Traditional K\'Cho dance performance',
          caption: 'Youth performers showcase traditional K\'Cho dances passed down through generations'
        },
        {
          type: 'quote',
          text: 'In displacement, our culture becomes our anchor. This festival reminds our children who they are and where they come from.',
          author: 'Elder Pau Thang, Cultural Advisor'
        },
        {
          type: 'paragraph',
          text: 'The festival also included a handicraft market where artisans sold traditional textiles and crafts, with proceeds supporting community programs. Malaysian neighbors and representatives from other refugee communities attended, fostering intercultural understanding and solidarity.'
        }
      ]
    },
    {
      slug: 'youth-leadership-program-graduates',
      title: '30 Young Leaders Graduate from CEAM Leadership Development Program',
      excerpt: 'The inaugural youth leadership program equipped 30 young K\'Cho refugees with skills in community organizing, advocacy, and project management.',
      category: 'Community',
      date: '2024-02-20',
      author: 'Michael Chen',
      authorRole: 'Youth Program Director',
      readTime: '4 min read',
      featured: false,
      image: '/images/news/youth-graduation.jpg',
      tags: ['youth', 'leadership', 'education', 'empowerment'],
      content: [
        {
          type: 'paragraph',
          text: 'Thirty young K\'Cho refugees aged 18-25 celebrated their graduation from CEAM\'s intensive six-month leadership development program, marking a significant investment in the next generation of community leaders.'
        },
        {
          type: 'heading',
          text: 'Building Tomorrow\'s Leaders'
        },
        {
          type: 'paragraph',
          text: 'The program curriculum included modules on project management, public speaking, financial literacy, digital skills, and community advocacy. Participants also completed community service projects, organizing health awareness campaigns and tutoring programs for younger children.'
        },
        {
          type: 'list',
          items: [
            'Leadership and communication skills training',
            'Project management certification',
            'Digital literacy and computer skills',
            'Community organizing techniques',
            'Mentorship from established community leaders'
          ]
        },
        {
          type: 'quote',
          text: 'This program gave me confidence and skills I never thought I could have as a refugee. Now I feel ready to give back to my community.',
          author: 'Mary Sung, Program Graduate'
        },
        {
          type: 'paragraph',
          text: 'Several graduates have already secured volunteer positions with local NGOs, while others are launching their own community initiatives. The program\'s success has inspired CEAM to expand it to accommodate 50 participants in the next cohort.'
        }
      ]
    },
    {
      slug: 'emergency-aid-flood-victims',
      title: 'CEAM Mobilizes Emergency Aid for 100 Families Affected by Floods',
      excerpt: 'Quick response from CEAM provided essential supplies and temporary shelter to K\'Cho families displaced by recent flooding in Klang Valley.',
      category: 'Community',
      date: '2024-02-15',
      author: 'David Kumar',
      authorRole: 'Emergency Response Coordinator',
      readTime: '3 min read',
      featured: false,
      image: '/images/news/flood-relief.jpg',
      tags: ['emergency aid', 'disaster relief', 'community support'],
      content: [
        {
          type: 'paragraph',
          text: 'When unexpected floods hit several areas in Klang Valley, CEAM\'s emergency response team quickly mobilized to assist 100 K\'Cho refugee families who lost their homes and belongings to the rising waters.'
        },
        {
          type: 'heading',
          text: 'Rapid Response in Crisis'
        },
        {
          type: 'paragraph',
          text: 'Within 24 hours of the floods, CEAM activated its emergency protocol, establishing a temporary shelter at the community center and distributing emergency supplies including food, clean water, clothing, and basic medical supplies.'
        },
        {
          type: 'list',
          items: [
            '100 families received emergency assistance',
            '500 food packages distributed',
            '200 hygiene kits provided',
            'Temporary shelter for 50 displaced individuals',
            'Medical aid for 30 injured community members'
          ]
        },
        {
          type: 'paragraph',
          text: 'The crisis highlighted the vulnerability of refugee communities during natural disasters and the importance of community-based emergency response systems. CEAM continues to work with affected families on long-term recovery plans.'
        }
      ]
    },
    {
      slug: 'womens-skills-training-success',
      title: 'Women\'s Vocational Training Program Empowers 50 Mothers',
      excerpt: 'CEAM\'s skills training initiative helped 50 refugee women develop marketable skills in sewing, handicrafts, and food preparation, creating pathways to economic independence.',
      category: 'Community',
      date: '2024-02-08',
      author: 'Jennifer Tan',
      authorRole: 'Women\'s Program Coordinator',
      readTime: '5 min read',
      featured: false,
      image: '/images/news/womens-training.jpg',
      tags: ['women empowerment', 'vocational training', 'economic development'],
      content: [
        {
          type: 'paragraph',
          text: 'Fifty K\'Cho refugee women completed CEAM\'s three-month vocational training program, gaining practical skills that are already translating into income-generating opportunities for their families.'
        },
        {
          type: 'heading',
          text: 'Skills for Economic Empowerment'
        },
        {
          type: 'paragraph',
          text: 'The program offered training in three areas: advanced sewing and tailoring, traditional handicraft production, and commercial food preparation. Participants received certificates upon completion and were connected with potential buyers and markets for their products.'
        },
        {
          type: 'quote',
          text: 'For the first time, I can contribute to my family\'s income. This training has given me dignity and hope.',
          author: 'Participant Testimonial'
        },
        {
          type: 'image',
          src: '/images/news/sewing-class.jpg',
          alt: 'Women learning sewing skills',
          caption: 'Participants practice sewing techniques that will help them generate income'
        },
        {
          type: 'paragraph',
          text: 'Many graduates have formed cooperative groups to take on larger orders, while others have started small home-based businesses. The program\'s success has attracted additional funding to expand training opportunities to 100 women in the next cycle.'
        }
      ]
    }
  ];
  
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