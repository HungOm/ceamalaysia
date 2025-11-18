import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { learningCenters } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

export const metadata = seoConfig.pages.learningCenters;

export default function LearningCenters() {
  return (
    <>
      <Hero
        title={learningCenters.title}
        subtitle={learningCenters.description}
        showCoverPhoto={true}
      />

      <Section title="Our Mission">
        <p className="text-lg mb-6">{learningCenters.mission}</p>
      </Section>

      <Section title="Our Services" className="bg-gray-50">
        <ul className="list-disc pl-6 space-y-2">
          {learningCenters.services.map((service, index) => (
            <li key={index}>
              <strong>{service.title}:</strong> {service.description}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Challenges We Face">
        <ul className="list-disc pl-6 space-y-2">
          {learningCenters.challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </ul>
      </Section>

      <Section title="Our Impact" className="bg-gray-50">
        <ul className="list-disc pl-6 space-y-2">
          {learningCenters.impact.map((impact, index) => (
            <li key={index}>{impact}</li>
          ))}
        </ul>
      </Section>

      <Section title="How You Can Help">
        <ul className="list-disc pl-6 space-y-2">
          {learningCenters.howToHelp.map((help, index) => (
            <li key={index}>{help}</li>
          ))}
        </ul>
      </Section>
    </>
  )
}
