import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, ChevronRight } from 'lucide-react'
import Section from '@/components/Section'
import SocialShare from '@/components/SocialShare'
import { newsArticles } from '@/lib/news-data'

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${article.title} | CEAM News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug)
  
  if (!article) {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = newsArticles
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-0 w-full z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Meta Information */}
      <Section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{article.author}</p>
                  <p className="text-sm text-gray-500">{article.authorRole || 'Staff Writer'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
            <SocialShare 
              title={article.title}
              description={article.excerpt}
            />
          </div>
        </div>
      </Section>

      {/* Article Content */}
      <Section className="py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Lead Paragraph */}
            <p className="text-xl leading-relaxed text-gray-700 font-medium mb-8">
              {article.excerpt}
            </p>
            
            {/* Article Body - Rich formatted content */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              {article.content.map((section, index) => (
                <div key={index}>
                  {section.type === 'paragraph' && (
                    <p className="mb-4">{section.text}</p>
                  )}
                  {section.type === 'heading' && (
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{section.text}</h2>
                  )}
                  {section.type === 'image' && (
                    <figure className="my-8">
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image
                          src={section.src || '/images/placeholder.jpg'}
                          alt={section.alt || 'Article image'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {section.caption && (
                        <figcaption className="text-sm text-gray-600 text-center mt-3 italic">
                          {section.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="border-l-4 border-blue-600 pl-6 py-2 my-6 italic text-gray-700 bg-blue-50/50 rounded-r-lg">
                      <p className="mb-2">&ldquo;{section.text}&rdquo;</p>
                      {section.author && (
                        <cite className="text-sm text-gray-600 not-italic">— {section.author}</cite>
                      )}
                    </blockquote>
                  )}
                  {section.type === 'list' && (
                    <ul className="list-disc pl-6 space-y-2 my-4">
                      {section.items?.map((item, i) => (
                        <li key={i} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Article Tags */}
            {article.tags && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-600">Tags:</span>
                  {article.tags.map((tag, index) => (
                    <Link 
                      key={index}
                      href={`/news?tag=${tag}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Author Bio */}
      <Section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{article.author}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {article.authorBio || `${article.author} is a dedicated member of the CEAM team, committed to sharing stories of resilience and hope from the K'Cho refugee community.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section className="py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Stories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.slug} href={`/news/${related.slug}`} className="group">
                  <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(related.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                        Read more
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Newsletter CTA */}
      <Section className="py-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
          <p className="text-lg text-blue-100 mb-8">
            Subscribe to receive the latest news and updates from our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </Section>
    </>
  )
}