import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { shelterServices } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'
import { Home, Stethoscope, UtensilsCrossed, FileText, HeartHandshake, UserCheck, AlertTriangle, TrendingUp, Heart, ArrowRight, Heart as HeartIcon, Phone, MessageCircle, Shield, Clock, Users } from 'lucide-react'
import Image from 'next/image'

export const metadata = seoConfig.pages.shelter;

const serviceIcons = [Home, Stethoscope, UtensilsCrossed, FileText, HeartHandshake];

export default function ShelterServices() {
  return (
    <>
      <Hero
        title={shelterServices.title}
        subtitle={shelterServices.description}
        showCoverPhoto={true}
      />

      {/* Mission Statement & Inclusivity */}
      <Section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            {shelterServices.mission}
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <HeartIcon className="w-8 h-8 text-rose-500 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Everyone Is Welcome</h3>
              <p className="text-gray-600 leading-relaxed italic">
                &quot;{shelterServices.inclusivity}&quot;
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Community Photos */}
      <Section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {shelterServices.photos.map((photo, index) => (
              <div key={index} className={`relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group stagger-${index + 1} animate-fade-in-up`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-medium text-lg">{photo.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelterServices.services.map((service, index) => {
              const IconComponent = serviceIcons[index] || HeartHandshake;
              return (
                <div key={index} className={`group animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                  <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-rose-600 group-hover:to-rose-500 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-rose-600 transition-colors">{service.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Eligibility */}
      <Section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Eligibility</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">Our shelter services are available to K&apos;Cho community members and other refugees who meet the following criteria:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {shelterServices.eligibility.map((criteria, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <UserCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{criteria}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <Section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Shelter Guidelines</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">To ensure a safe and supportive environment for everyone, our shelter operates under these core principles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {shelterServices.guidelines.map((guideline, index) => {
              const icons = [Clock, Shield, Users];
              const Icon = icons[index];
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{guideline.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{guideline.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Impact */}
      <Section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact</h2>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shelterServices.impact.map((impact, index) => (
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
              {shelterServices.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* How You Can Help & Contact */}
      <Section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">How You Can Help</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8" />
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your generosity provides immediate relief and lasting dignity to those who need it most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Help Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ways to Contribute</h3>
              <div className="grid gap-4">
                {shelterServices.howToHelp.map((help, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 text-left">
                    <Heart className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{help}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a href="/contact" className="btn-primary w-full sm:w-auto text-base inline-flex items-center justify-center gap-2">
                  Donate or Volunteer <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Contact Shelter Services</h3>
                <p className="text-blue-100 text-sm">Reach out directly for inquiries or emergencies</p>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    👨‍💼
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{shelterServices.contact.name}</h4>
                    <p className="text-blue-600 font-medium">{shelterServices.contact.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${shelterServices.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone</p>
                      <p className="text-gray-900 font-medium">{shelterServices.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={shelterServices.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-green-700 uppercase tracking-wider font-semibold">WhatsApp</p>
                      <p className="text-gray-900 font-medium">Chat on WhatsApp</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
