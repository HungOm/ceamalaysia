import Link from 'next/link'
import Logo from './Logo'
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Logo variant="white" compact={false} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering K&apos;cho and Chin refugee communities through compassionate support,
              cultural preservation, and sustainable integration initiatives in Malaysia.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com/ceamalaysia"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 hover:text-white text-gray-400 transition-all duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/ceamalaysia"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:border-blue-400 hover:text-white text-gray-400 transition-all duration-300"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/ceamalaysia"
                className="w-10 h-10 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white text-gray-400 transition-all duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Initiatives', href: '/initiatives' },
                { label: 'Learning Centers', href: '/learning-centers' },
                { label: 'Shelter Services', href: '/shelter' },
                { label: 'Volunteer', href: '/volunteer' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 text-sm group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: 'Events', href: '/events' },
                { label: 'Community Resources', href: '/resources' },
                { label: 'Partners', href: '/partners' },
                { label: 'Donate', href: '/donate' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors inline-flex items-center gap-2 text-sm group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-tight">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center flex-shrink-0 mt-[-2px] group-hover:bg-gray-800 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Kuala Lumpur,<br />
                  Malaysia
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-800 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:contact@ceamalaysia.org" className="text-gray-400 hover:text-white transition-colors text-sm">
                  contact@ceamalaysia.org
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded bg-gray-900 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-800 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a
                  href="https://wa.me/601168128634"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Preferred channel for quick response"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +60 11-6812 8634
                  <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-green-900/30 text-green-400 border border-green-900/50">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left order-2 md:order-1">
            &copy; {currentYear} K&apos;Cho Ethnic Association Malaysia. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm order-1 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-800/50 pt-6">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1.5">
            With <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> for the K&apos;Cho community
          </p>
        </div>
      </div>
    </footer>
  )
}