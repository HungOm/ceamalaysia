// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { seoConfig } from '@/lib/seo-config'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: seoConfig.default.title,
  description: seoConfig.default.description,
  keywords: seoConfig.default.keywords,
  openGraph: {
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    type: 'website',
    locale: 'en_US',
    siteName: "K'Cho Ethnic Association Malaysia",
    images: [
      {
        url: 'https://ceamalaysia.org/images/cea-social-share.png',
        width: 1200,
        height: 630,
        alt: "K'Cho Ethnic Association Malaysia - Empowering Communities, Preserving Heritage",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.default.title,
    description: seoConfig.default.description,
    images: ['https://ceamalaysia.org/images/cea-social-share.png'],
  },
  alternates: {
    canonical: 'https://ceamalaysia.org'
  },
  authors: [{ name: 'CEAM' }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'HzImGeUsmCR8sd4oCmARzvMOL8WemXqNNclqFOaeUbc',
  },
  metadataBase: new URL('https://ceamalaysia.org'),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  category: 'non-profit organization',
}

// Viewport configuration moved to separate export (Next.js 14+ requirement)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow animate-fade-in">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}