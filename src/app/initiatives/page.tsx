import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { learningCenters, shelterServices, communityEfforts } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

export const metadata = seoConfig.pages.initiatives;

export default function Initiatives() {
  const initiatives = [
    {
      title: "Support Services",
      description: "Facilitating access to education, healthcare, and legal aid resources.",
      details: communityEfforts
    },
    {
      title: "Cultural Programs",
      description: "Preserving and celebrating K'Cho heritage and traditions.",
      details: [
        "Language preservation",
        "Cultural events",
        "Traditional arts",
        "Community gatherings"
      ]
    },
    {
      title: learningCenters.title,
      description: learningCenters.description,
      details: learningCenters.services
    },
    {
      title: shelterServices.title,
      description: shelterServices.description,
      details: shelterServices.services
    }
  ]

  return (
    <>
      <Hero
        title="Our Initiatives"
        subtitle="Programs and services supporting the K'Cho refugee community"
        showCoverPhoto={true}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
              <p className="text-lg mb-6">{initiative.description}</p>
              <ul className="space-y-2">
                {initiative.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
