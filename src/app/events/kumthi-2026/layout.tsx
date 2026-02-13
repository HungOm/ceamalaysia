import { Metadata } from 'next'
import { getPageMetadata } from '@/lib/seo-config'

export const metadata: Metadata = {
    ...getPageMetadata('kumthi2026'),
}

export default function Kumthi2026Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
