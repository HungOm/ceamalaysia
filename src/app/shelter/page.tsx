import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { shelterServices } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

export const metadata = seoConfig.pages.shelter;

export default function ShelterServices() {
  return (
    <>
      <Hero
        title={shelterServices.title}
        subtitle={shelterServices.description}
        showCoverPhoto={true}
      />

      <Section title="Our Mission">
        <p className="text-lg mb-6">{shelterServices.mission}</p>
      </Section>

      <Section title="Our Services" className="bg-gray-50">
        <ul className="list-disc pl-6 space-y-2">
          {shelterServices.services.map((service, index) => (
            <li key={index}>
              <strong>{service.title}:</strong> {service.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Eligibility">
        <ul className="list-disc pl-6 space-y-2">
          {shelterServices.eligibility.map((criteria, index) => (
            <li key={index}>{criteria}</li>
          ))}
        </ul>
      </Section>

      <Section title="Challenges We Face" className="bg-gray-50">
        <ul className="list-disc pl-6 space-y-2">
          {shelterServices.challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </Section>

      <Section title="Our Impact">
        <ul className="list-disc pl-6 space-y-2">
          {shelterServices.impact.map((impact, index) => (
            <li key={index}>{impact}</li>
          ))}
        </ul>
      </Section>

      <Section title="How You Can Help" className="bg-gray-50">
        <ul className="list-disc pl-6 space-y-2">
          {shelterServices.howToHelp.map((help, index) => (
            <li key={index}>{help}</li>
          ))}
        </ul>
      </Section>
    </>
  )
}
