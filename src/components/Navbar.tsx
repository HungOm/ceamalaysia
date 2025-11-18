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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo showText={true} compact={false} />

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
                      <div className="absolute top-full left-0 pt-2 w-56 z-50">
                        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium first:rounded-t-lg last:rounded-b-lg"
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
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
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
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div 
          className="mobile-menu-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
        
        {/* Menu panel */}
        <div 
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <Logo showText={true} compact={true} />
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu items */}
          <div className="overflow-y-auto h-[calc(100vh-73px)] bg-white py-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="border-b border-gray-100">
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between px-6 py-3.5 text-gray-900 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors active:bg-blue-100"
                      aria-expanded={mobileDropdownOpen === item.name}
                      aria-controls={`mobile-dropdown-${item.name}`}
                    >
                      <span>{item.name}</span>
                      <ChevronRight 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          mobileDropdownOpen === item.name ? 'rotate-90 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Dropdown items */}
                    <div
                      id={`mobile-dropdown-${item.name}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${
                        mobileDropdownOpen === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-10 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors text-sm font-medium"
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
                    className={`block px-6 py-3.5 text-gray-900 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors font-medium ${
                      pathname === item.href ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-800' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Donate button */}
            <div className="px-6 py-4 border-t border-gray-200 mt-4 bg-white">
              <Link
                href="/donate"
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={closeMobileMenu}
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