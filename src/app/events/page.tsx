import Hero from '@/components/Hero'
import Section from '@/components/Section'
import { EventsGrid } from '@/components/UpcomingEvents' // Client component — filters out past events by date
import { seoConfig } from '@/lib/seo-config'

export const metadata = {
    title: seoConfig.pages.events.title,
    description: seoConfig.pages.events.description,
    keywords: seoConfig.pages.events.keywords,
    openGraph: seoConfig.pages.events.openGraph,
}

export default function EventsPage() {
    return (
        <>
            <Hero
                title="Events & Gatherings"
                subtitle="Celebrating our culture, strengthening our community"
                showCoverPhoto={false}
            />

            <Section className="py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-gray-900 border-l-4 border-blue-600 pl-4">Upcoming Events</h2>
                    {/* EventsGrid is a client component that checks event endDate and hides past events */}
                    <EventsGrid />
                </div>
            </Section>
        </>
    )
}
