'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User, Phone } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Services', href: '#services', hasDropdown: true },
    { label: 'About Us', href: '#about', hasDropdown: true },
    { label: 'Shop', href: '#shop' },
    { label: 'Patient Portal', href: '#portal' },
    { label: 'Contact Us', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-dark text-white text-sm py-2 px-4">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Pioneers in Hormone & Peptide Therapy</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="tel:303-351-2363" className="flex items-center gap-1 hover:text-secondary">
              <Phone className="w-4 h-4" />
              <span>303-351-2363</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-primary/95 backdrop-blur-sm text-white py-3 px-4">
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">REVITALIZED</span>
              <span className="text-xs text-gray-300 tracking-wider">HEALTH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-secondary transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link href="#appointments" className="hidden md:inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
              Book Appointment
            </Link>
            <Link href="#portal" className="p-2 hover:text-secondary transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="#cart" className="p-2 hover:text-secondary transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                $0.00
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium hover:text-secondary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#appointments"
                className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
