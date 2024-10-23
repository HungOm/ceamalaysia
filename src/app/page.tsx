import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { missionVision, communityEfforts, organizationInfo } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

export const metadata = seoConfig.pages.home;

export default function Home() {
  return (
    <>
      <Hero
        title={organizationInfo.fullName}
        subtitle={organizationInfo.type}
        showCoverPhoto={true}
      />
      
      <Section title="Our Vision">
        <div className="prose max-w-none">
          <p className="text-lg">{missionVision.vision}</p>
        </div>
      </Section>

      <Section title="Our Mission">
        <div className="prose max-w-none">
          <ul className="list-disc pl-6">
            {missionVision.mission.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Our Community Efforts" className="bg-gray-50">
        <div className="grid md:grid-cols-3 gap-8">
          {communityEfforts.map((effort, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{effort}</h3>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
