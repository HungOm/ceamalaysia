import { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo-config'

export const metadata: Metadata = {
    ...getPageMetadata('kumthiAscension26'),
}

export default function KumthiAscensionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
