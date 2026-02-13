// src/app/about/page.tsx
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { organizationInfo, missionVision, ethicalCommitments } from '@/lib/constants'
import { getPageMetadata } from '@/lib/seo-config'

// Updated metadata using seoConfig
export const metadata = getPageMetadata('about');

export default function About() {
  return (
    <>
      <Hero title="About Us" subtitle={`Understanding the ${organizationInfo.shortName} community and our mission in Malaysia`} showCoverPhoto={true} />

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">UNHCR Recognized CBO</span>
            <p className="text-lg leading-relaxed text-gray-700 mb-2">
              {organizationInfo.fullName} ({organizationInfo.shortName}) is a {organizationInfo.type} supporting K&apos;Cho refugees and asylum-seekers in Malaysia.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Our community consists of individuals who have fled conflict and persecution in Myanmar, seeking safety and a chance for a better life.
            </p>
          </div>

          {/* Who Are the K'Cho People */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2 inline-block">Who Are the K&apos;Cho People?</h3>
            <p className="text-gray-700 leading-relaxed mt-4 mb-4">
              {organizationInfo.kChoDetails.origin} {organizationInfo.kChoDetails.culturalIdentity} {organizationInfo.kChoDetails.history} {organizationInfo.kChoDetails.displacement}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {organizationInfo.kChoDetails.subGroups} {organizationInfo.kChoDetails.religion} {organizationInfo.kChoDetails.livelihood}
            </p>
          </div>

          {/* Challenges & Advocacy */}
          <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <h3 className="text-2xl font-bold mb-3 text-blue-900">Challenges &amp; Advocacy</h3>
            <p className="text-gray-800 leading-relaxed mb-3">
              {organizationInfo.kChoDetails.challenges}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {organizationInfo.kChoDetails.culturalPreservation}
            </p>
          </div>

          {/* Our Language */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2 inline-block">Our Language</h3>
            <p className="text-gray-700 leading-relaxed mt-4 mb-3">
              {organizationInfo.language.details}
            </p>
            <p className="text-gray-600 italic">{organizationInfo.language.note}.</p>
          </div>

          {/* Our Mission */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">Our Mission</h3>
            <div className="grid gap-6 mt-4">
              {missionVision.mission.map((missionStatement, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">{missionStatement.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{missionStatement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Ethical Commitments */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">Our Ethical Commitments</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {ethicalCommitments.map((commitment, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-gray-50">
                  <span className="text-blue-600 mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{commitment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* References — subtle, small footer-style */}
          <details className="mt-16 pt-6 border-t border-gray-200">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition-colors uppercase tracking-wider font-medium">
              References &amp; Academic Sources
            </summary>
            <ol className="mt-4 space-y-2 list-decimal list-inside">
              {organizationInfo.citations.map((citation, index) => (
                <li key={index} className="text-xs text-gray-500 leading-relaxed">
                  {citation.author} ({citation.year}). <em>{citation.title}</em>. {citation.publication}.
                </li>
              ))}
            </ol>
          </details>
        </div>
      </Section>
    </>
  )
}
