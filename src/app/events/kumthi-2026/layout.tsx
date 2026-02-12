import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
    title: seoConfig.pages.kumthi2026.title,
    description: seoConfig.pages.kumthi2026.description,
    keywords: seoConfig.pages.kumthi2026.keywords,
    openGraph: seoConfig.pages.kumthi2026.openGraph,
}

export default function Kumthi2026Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
