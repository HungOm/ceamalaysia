// src/app/contact/page.tsx
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { siteConfig, organizationInfo } from '@/lib/constants'
import { seoConfig } from '@/lib/seo-config'

// Updated metadata using seoConfig
export const metadata = seoConfig.pages.contact;

export default function Contact() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Get involved with our community or seek assistance"
        showCoverPhoto={true}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full p-3 border rounded-md h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <p>
                <strong>Note:</strong> Due to the legal context in Malaysia, {organizationInfo.shortName} 
                operates as {organizationInfo.type}. We are committed to 
                transparency and cooperation with relevant authorities.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Get Involved</h4>
                <p>
                  Whether you're a K'Cho refugee seeking support or someone interested 
                  in helping our community, we welcome your involvement. Reach out to 
                  learn more about our activities and how you can contribute to our mission.
                </p>
              </div>
              <p>Email: {siteConfig.links.email}</p>
              <p>Facebook: <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">{siteConfig.links.facebook}</a></p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
