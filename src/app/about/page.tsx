// src/app/about/page.tsx
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { organizationInfo, missionVision, ethicalCommitments } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

// Updated metadata using seoConfig
export const metadata = seoConfig.pages.about;

export default function About() {
  return (
    <>
      <Hero title="About Us" subtitle={`Understanding the ${organizationInfo.shortName} community and our mission in Malaysia`} showCoverPhoto={true} />

      <Section>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            {organizationInfo.fullName} ({organizationInfo.shortName}) is a {organizationInfo.type} supporting K&apos;Cho refugees and asylum-seekers in Malaysia. Our community consists of individuals who have fled conflict and persecution in Myanmar, seeking safety and a chance for a better life.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Who Are the K'Cho People?</h3>
          <p>
            {organizationInfo.kChoDetails.origin} {organizationInfo.kChoDetails.culturalIdentity} {organizationInfo.kChoDetails.history} {organizationInfo.kChoDetails.displacement}
          </p>
          <p>
            {organizationInfo.kChoDetails.subGroups} {organizationInfo.kChoDetails.religion} {organizationInfo.kChoDetails.livelihood}
          </p>
          <p>
            {organizationInfo.kChoDetails.challenges} {organizationInfo.kChoDetails.culturalPreservation}
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Our Language</h3>
          <p>{organizationInfo.language.primary} is the primary language of our community, with {organizationInfo.language.secondary} also being spoken. {organizationInfo.language.note}</p>

          <h3 className="text-2xl font-bold mt-8 mb-4">Our Mission</h3>
          <ul>
            {missionVision.mission.map((missionStatement, index) => (
              <li key={index} className="mb-4">{missionStatement}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4">Our Ethical Commitments</h3>
          <ul>
            {ethicalCommitments.map((commitment, index) => (
              <li key={index} className="mb-2">{commitment}</li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}
