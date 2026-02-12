import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Link from 'next/link'
import { missionVision, communityEfforts, organizationInfo, statistics } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'
import { Heart, Shield, Users, BookOpen, Home as HomeIcon, Megaphone, ArrowRight, Calendar, Trophy } from 'lucide-react'

export const metadata = seoConfig.pages.home;

const effortIcons = {
  'Support Services': Shield,
  'Cultural Heritage': BookOpen,
  'Community Awareness': Megaphone,
  'UNHCR Registration': Users,
  'Integration Support': Heart,
  'Safe Housing': HomeIcon,
};

export default function Home() {
  return (
    <>
      <Hero
        title={organizationInfo.fullName}
        subtitle={organizationInfo.tagline}
        subtitleKCho={organizationInfo.taglineKCho}
        showCoverPhoto={true}
      />
      {/* Upcoming Events Section */}
      <Section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Upcoming Events</h2>
              <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View All Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kumthi 2026 Card */}
            <Link href="/events/kumthi-2026" className="group">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="h-56 bg-gradient-to-r from-yellow-500 to-orange-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Cultural Festival</span>
                    <h3 className="text-3xl font-black shadow-black drop-shadow-md">KUMTHI 2026</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">April 1st, 2026 • 10:00 AM</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Join us for the biggest cultural celebration of the year! Featuring traditional dances, modern music, and the grand finale of our esports championship.
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>View Event Details</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Esports Card */}
            <Link href="/events/kumthi-ascension-26" className="group">
              <div className="bg-[#0a101f] rounded-2xl shadow-md overflow-hidden border border-gray-800 hover:shadow-xl hover:border-blue-700 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                <div className="h-56 bg-[#0f172a] relative overflow-hidden group-hover:bg-[#1e293b] transition-colors">
                  <div className="absolute inset-0 bg-[url('/images/grid.png')] opacity-20" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Esports Tournament</span>
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">KUMTHI ASCENSION '26</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-400">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium text-gray-300">Mobile Legends & PUBG Mobile</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      Witness the rise of new champions. MLBB Knockouts start March 8th. PUBG Mobile Showdown on March 15th.
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-800 flex items-center justify-between text-blue-400 font-semibold group-hover:text-blue-300">
                    <span>Tournament Info</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              View All Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient">Our Vision</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-blue-50">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed md:leading-loose text-center max-w-4xl mx-auto">
              {missionVision.vision}
            </p>
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {missionVision.mission.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full card-hover border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                    <span className="text-blue-600 font-bold text-xl group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed md:leading-loose">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Making a Difference</h2>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed px-4">
              Together, we&apos;re building a stronger, more resilient community for K&apos;Cho refugees in Malaysia
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/20">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">{stat.value}</div>
                  <div className="text-sm sm:text-base text-white/95 font-medium leading-relaxed">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">Community Initiatives</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive programs designed to empower and support our community members at every stage of their journey
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityEfforts.map((effort, index) => {
              const IconComponent = effortIcons[effort.title as keyof typeof effortIcons] || Heart;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-blue-600 group-hover:to-blue-500 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {effort.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {effort.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900">Join Our Cause</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 md:mb-12 leading-relaxed md:leading-loose max-w-3xl mx-auto">
            Your support can transform lives. Whether through volunteering, donations, or spreading awareness,
            every contribution helps us build a brighter future for K&apos;Cho refugees in Malaysia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/contact" className="btn-primary px-8 py-3 text-base w-full sm:w-auto">
              Get Involved
            </a>
            <a href="/initiatives" className="btn-secondary px-8 py-3 text-base w-full sm:w-auto">
              Learn More
            </a>
          </div>
        </div>
      </Section>
    </>
  )
}