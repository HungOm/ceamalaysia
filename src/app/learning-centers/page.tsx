import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { learningCenters } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'
import { BookOpen, Languages, Palette, Lightbulb, Gamepad2, AlertTriangle, TrendingUp, Heart, ArrowRight } from 'lucide-react'

export const metadata = seoConfig.pages.learningCenters;

const serviceIcons = [BookOpen, Languages, Palette, Lightbulb, Gamepad2];

export default function LearningCenters() {
  return (
    <>
      <Hero
        title={learningCenters.title}
        subtitle={learningCenters.description}
        showCoverPhoto={true}
      />

      {/* Mission Statement */}
      <Section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {learningCenters.mission}
          </p>
        </div>
      </Section>

      {/* Services */}
      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What We Offer</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCenters.services.map((service, index) => {
              const IconComponent = serviceIcons[index] || BookOpen;
              return (
                <div key={index} className={`group animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                  <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Impact Stats */}
      <Section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact</h2>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCenters.impact.map((impact, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-blue-200 flex-shrink-0 mt-0.5" />
                <span className="text-white/95 leading-relaxed">{impact}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Challenges */}
      <Section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-8 rounded-r-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-amber-900">Challenges We Face</h3>
            </div>
            <ul className="space-y-3">
              {learningCenters.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How You Can Help */}
      <Section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How You Can Help</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Every contribution — whether time, expertise, or resources — directly shapes the future of K&apos;Cho children.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {learningCenters.howToHelp.map((help, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-left">
                <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{help}</span>
              </div>
            ))}
          </div>
          <a href="/contact" className="btn-primary px-8 py-3 text-base inline-flex items-center gap-2">
            Get Involved <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>
    </>
  )
}
