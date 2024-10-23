// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { seoConfig } from '@/lib/seo-config'

const inter = Inter({ subsets: ['latin'] })

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
        alt: "K'Cho Ethnic Association Malaysia",
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
  authors: [{ name: 'CEA Malaysia' }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
    yandex: 'verification_token',
    yahoo: 'verification_token',
    other: {
      me: ['my-email@ceamalaysia.org'],
    },
  },
  metadataBase: new URL('https://ceamalaysia.org'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  category: 'non-profit organization'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

