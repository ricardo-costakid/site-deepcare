'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Soluções',      href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Mentoria',      href: '#mentoria' },
  { label: 'Sobre',         href: '#sobre' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-bg-dark/80 border-b border-brand-green/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#inicio">
          <Image
            src="/logo/deepcare-logo-clara.svg"
            alt="DeepCare Analytics"
            height={36}
            width={195}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green/10 transition-colors duration-200"
          >
            Fale conosco
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-dark/95 backdrop-blur-md border-t border-brand-green/15 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-text-secondary hover:text-text-primary transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-3 border border-brand-green text-brand-green rounded-lg text-center hover:bg-brand-green/10 transition-colors"
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  )
}