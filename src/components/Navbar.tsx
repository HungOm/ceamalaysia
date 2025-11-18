"use client";
import Logo from './Logo'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Heart } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Programs', 
      href: '#',
      dropdown: [
        { name: 'Learning Centers', href: '/learning-centers' },
        { name: 'Shelter Services', href: '/shelter' },
        { name: 'Community Support', href: '/community-support' },
      ]
    },
    { name: 'Initiatives', href: '/initiatives' },
    // { name: 'News', href: '/news' }, // Temporarily commented out - will enable when news content is ready
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo showText={true} />

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className="nav-link flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 w-48">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`nav-link ${pathname === item.href ? 'text-blue-600' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/donate"
              className="btn-primary flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-semibold text-lg">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="py-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="border-b border-gray-100">
                    <div className="px-6 py-3 text-gray-900 font-medium">
                      {item.name}
                    </div>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-8 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 text-gray-900 hover:text-blue-600 hover:bg-blue-50 transition-colors ${
                      pathname === item.href ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-6 py-4 border-t border-gray-100 mt-4">
              <Link
                href="/donate"
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                Support Our Cause
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}