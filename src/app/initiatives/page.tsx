import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { learningCenters, shelterServices, communityEfforts } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'
import { Heart, Shield, Users, BookOpen, Home as HomeIcon, Megaphone, GraduationCap, HandHeart, ArrowRight } from 'lucide-react'

export const metadata = seoConfig.pages.initiatives;

const effortIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Support Services': Shield,
  'Cultural Heritage': BookOpen,
  'Community Awareness': Megaphone,
  'UNHCR Registration': Users,
  'Integration Support': Heart,
  'Safe Housing': HomeIcon,
};

const programIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Support Services': Shield,
  'Cultural Programs': BookOpen,
};

export default function Initiatives() {
  const initiatives = [
    {
      title: "Support Services",
      description: "A comprehensive network of assistance designed to safeguard the welfare of every community member — from emergency response and healthcare navigation to compassionate support for vulnerable families.",
      details: communityEfforts,
      icon: Shield,
      color: 'blue'
    },
    {
      title: "Cultural Programs",
      description: "Rooted in the belief that identity is strength, our cultural programs nurture the K'Cho heritage through education, creative expression, and community celebration.",
      details: [
        { title: "Language Preservation", description: "Mother tongue classes ensuring the K'Cho language thrives across generations." },
        { title: "Cultural Events", description: "Festivals, ceremonies, and gatherings that honor tradition and foster unity." },
        { title: "Traditional Arts", description: "Workshops in weaving, music, and storytelling that keep ancestral skills alive." },
        { title: "Community Gatherings", description: "Spaces for elders and youth to connect, share, and strengthen communal bonds." }
      ],
      icon: BookOpen,
      color: 'emerald'
    },
    {
      title: learningCenters.title,
      description: "Every child deserves a safe place to learn. Our learning centers provide nurturing environments where K'Cho children build knowledge, confidence, and a foundation for a brighter future.",
      details: learningCenters.services,
      icon: GraduationCap,
      color: 'purple'
    },
    {
      title: shelterServices.title,
      description: "For those in our community facing the most acute challenges, our shelter services offer immediate protection, professional care, and a dignified path toward stability.",
      details: shelterServices.services,
      icon: HandHeart,
      color: 'rose'
    }
  ]

  const colorMap: Record<string, { bg: string; border: string; iconBg: string; iconText: string; tag: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100', iconText: 'text-blue-600', tag: 'bg-blue-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', tag: 'bg-emerald-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', iconBg: 'bg-purple-100', iconText: 'text-purple-600', tag: 'bg-purple-600' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', iconBg: 'bg-rose-100', iconText: 'text-rose-600', tag: 'bg-rose-600' },
  }

  return (
    <>
      <Hero
        title="Our Initiatives"
        subtitle="Purposeful programs and services that empower, protect, and celebrate the K'Cho refugee community"
        showCoverPhoto={true}
      />

      {/* Overview Strip */}
      <Section className="py-12 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
            From emergency support and education to cultural preservation and shelter, every initiative is built on the principle that <strong>no community member should face hardship alone</strong>.
          </p>
        </div>
      </Section>

      {/* Initiative Cards */}
      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {initiatives.map((initiative, index) => {
            const colors = colorMap[initiative.color];
            const IconComponent = initiative.icon;
            return (
              <div key={index} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                {/* Initiative Header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-7 h-7 ${colors.iconText}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{initiative.title}</h3>
                    <p className="text-gray-600 leading-relaxed max-w-3xl">{initiative.description}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-0 md:ml-[4.5rem]">
                  {initiative.details.map((detail, idx) => {
                    const detailTitle = typeof detail === 'string' ? detail : detail.title;
                    const detailDesc = typeof detail === 'string' ? null : detail.description;
                    return (
                      <div key={idx} className={`${colors.bg} border ${colors.border} rounded-lg p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
                        <h4 className="font-semibold text-gray-800 mb-1">{detailTitle}</h4>
                        {detailDesc && <p className="text-sm text-gray-600 leading-relaxed">{detailDesc}</p>}
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                {index < initiatives.length - 1 && (
                  <div className="mt-12 border-b border-gray-200" />
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get Involved</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether through volunteering, mentorship, or advocacy, your involvement strengthens the foundation of our community and transforms lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary px-8 py-3 text-base inline-flex items-center gap-2">
              Volunteer With Us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/learning-centers" className="btn-secondary px-8 py-3 text-base">
              Explore Learning Centers
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}
