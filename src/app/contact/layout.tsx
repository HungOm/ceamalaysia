import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
    title: seoConfig.pages.contact.title,
    description: seoConfig.pages.contact.description,
    keywords: seoConfig.pages.contact.keywords,
    openGraph: seoConfig.pages.contact.openGraph,
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
