"use client";
import Logo from './Logo'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Heart, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        setMobileDropdownOpen(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Focus trap and accessibility improvements
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      // Focus first focusable element when menu opens
      const firstButton = mobileMenuRef.current.querySelector('button') as HTMLElement
      if (firstButton) {
        firstButton.focus()
      }
    }
  }, [mobileMenuOpen])

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === itemName ? null : itemName)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileDropdownOpen(null)
  }

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
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled
      ? 'bg-white/90 backdrop-blur-md border-gray-100 shadow-sm py-2'
      : 'bg-transparent border-transparent py-4 lg:py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo showText={true} compact={true} variant={scrolled ? 'default' : 'white'} />

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button className={`nav-link flex items-center gap-1 group-hover:opacity-80 transition-opacity ${pathname.startsWith(item.href) && item.href !== '#'
                      ? (scrolled ? 'text-blue-600 font-semibold' : 'text-white font-bold')
                      : (scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white')
                      }`}>
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-5 py-3.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium border-b border-gray-50 last:border-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`nav-link transition-opacity hover:opacity-80 ${pathname === item.href
                      ? (scrolled ? 'text-blue-600 font-semibold' : 'text-white font-bold')
                      : (scrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/90 hover:text-white')
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/donate"
              className={`${scrolled ? 'btn-primary' : 'bg-white text-blue-900 hover:bg-blue-50'} flex items-center gap-2 shadow-lg transition-all duration-300 font-semibold px-6 py-2.5 rounded-full`}
            >
              <Heart className={`w-4 h-4 ${scrolled ? 'fill-current' : 'fill-blue-900 text-blue-900'}`} />
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-lg transition-colors ${scrolled
                ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                : 'text-white hover:bg-white/10'
                }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
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
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="mobile-menu-backdrop absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Menu panel */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-[85%] max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white">
            <Logo showText={true} compact={true} />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => (
              <div key={item.name} className="px-4 mb-1">
                {item.dropdown ? (
                  <div className="rounded-xl overflow-hidden bg-gray-50/50 border border-gray-100/50">
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-4 text-left font-semibold transition-colors ${mobileDropdownOpen === item.name ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      aria-expanded={mobileDropdownOpen === item.name}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${mobileDropdownOpen === item.name ? 'rotate-180 text-blue-600' : ''
                          }`}
                      />
                    </button>

                    {/* Dropdown items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdownOpen === item.name ? 'max-h-96 opacity-100 mb-2' : 'max-h-0 opacity-0'
                        }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 ml-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors text-sm font-medium border-l-2 border-transparent hover:border-blue-300"
                          onClick={closeMobileMenu}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-5 py-4 rounded-xl font-semibold transition-all ${pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Donate button footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <Link
              href="/donate"
              className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3 shadow-lg shadow-blue-200"
              onClick={closeMobileMenu}
            >
              <Heart className="w-5 h-5 fill-current" />
              Support Our Cause
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4">
              Making a difference in the K&apos;Cho community
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}