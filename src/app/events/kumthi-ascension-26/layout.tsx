import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo-config'

export const metadata: Metadata = {
    title: seoConfig.pages.kumthiAscension26.title,
    description: seoConfig.pages.kumthiAscension26.description,
    keywords: seoConfig.pages.kumthiAscension26.keywords,
    openGraph: seoConfig.pages.kumthiAscension26.openGraph,
}

export default function KumthiAscensionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
