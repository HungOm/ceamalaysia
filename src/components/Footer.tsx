import Link from 'next/link'
import Logo from './Logo'
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering K&apos;cho and Chin refugee communities through compassionate support, 
              cultural preservation, and sustainable integration initiatives in Malaysia.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com/ceamalaysia" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/ceamalaysia" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/ceamalaysia" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  About Us
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Our Initiatives
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/learning-centers" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Learning Centers
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/shelter" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Shelter Services
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Volunteer
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {/* Temporarily commented out - will enable when news content is ready
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  News & Updates
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              */}
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Events
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Community Resources
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Partners
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 text-sm">
                  Donate
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Kuala Lumpur,<br />
                  Malaysia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:contact@ceamalaysia.org" className="text-gray-400 hover:text-white transition-colors text-sm">
                  contact@ceamalaysia.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/601168128634" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +60 11-6812 8634
                  <span className="ml-1 text-xs">(WhatsApp)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} K&apos;Cho Ethnic Association Malaysia. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the K&apos;Cho community
          </p>
        </div>
      </div>
    </footer>
  )
}