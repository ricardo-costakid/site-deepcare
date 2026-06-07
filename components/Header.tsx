'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, GraduationCap, Users, ChevronDown, HeartPulse } from 'lucide-react'
import { WA_URL } from '@/lib/constants'

const FEATURES_ITEMS = [
  { label: 'Soluções',   href: '/#solucoes',  icon: LayoutGrid,    isAnchor: true  },
  { label: 'Mentoria',   href: '/#mentoria',  icon: GraduationCap, isAnchor: true  },
  { label: 'Comunidade', href: '/comunidade', icon: Users,          isAnchor: false },
]

const NAV_LINKS = [
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Sobre',         href: '/#sobre' },
]

export default function Header() {
  const pathname = usePathname()
  const logoHref = pathname === '/saude' ? '/saude' : '/'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? 'backdrop-blur-[12px] shadow-[0_1px_0_#E5E7EB]' : ''
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 h-16 flex items-center justify-between">
        <a href={logoHref} className="flex-shrink-0">
          <Image
            src="/logo/deepcare-logo-clara.svg"
            alt="DeepCare Analytics"
            height={32}
            width={195}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Features dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
              Features
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>

            {/* Outer div handles centering; inner motion.div handles animation */}
            <AnimatePresence>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="w-52 bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
                  >
                    {FEATURES_ITEMS.map(({ label, href, icon: Icon, isAnchor }) =>
                      isAnchor ? (
                        <a
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-[#F8F9FA] hover:text-[#5B8F7A] transition-colors duration-150"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon size={15} className="flex-shrink-0 opacity-70" />
                          {label}
                        </a>
                      ) : (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:bg-[#F8F9FA] hover:text-[#5B8F7A] transition-colors duration-150"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Icon size={15} className="flex-shrink-0 opacity-70" />
                          {label}
                        </Link>
                      )
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

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
            href="https://app.deepcareanalytics.com/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Entrar
          </a>
          <Link
            href="/saude"
            className="flex items-center gap-2 bg-[#5B8F7A] text-white border border-[#5B8F7A] text-sm font-medium rounded-full px-4 py-2 hover:bg-white hover:text-[#5B8F7A] transition-colors duration-200"
          >
            <HeartPulse className="w-4 h-4" strokeWidth={1.5} />
            Soluções para Saúde
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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

      {/* Mobile drawer — overlay + panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: 288 }}
              animate={{ x: 0 }}
              exit={{ x: 288 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden px-6 py-6 flex flex-col gap-4 overflow-y-auto shadow-xl"
            >
              {/* Close button */}
              <button
                className="self-end text-text-secondary hover:text-text-primary transition-colors mb-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Features accordion */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-text-secondary hover:text-text-primary transition-colors py-1"
                  onClick={() => setFeaturesOpen(!featuresOpen)}
                >
                  <span>Features</span>
                  <motion.span
                    animate={{ rotate: featuresOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex"
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {featuresOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pl-4 pt-2">
                        {FEATURES_ITEMS.map(({ label, href, icon: Icon, isAnchor }) =>
                          isAnchor ? (
                            <a
                              key={href}
                              href={href}
                              className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-[#5B8F7A] transition-colors"
                              onClick={() => { setMenuOpen(false); setFeaturesOpen(false) }}
                            >
                              <Icon size={14} className="opacity-60" />
                              {label}
                            </a>
                          ) : (
                            <Link
                              key={href}
                              href={href}
                              className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-[#5B8F7A] transition-colors"
                              onClick={() => { setMenuOpen(false); setFeaturesOpen(false) }}
                            >
                              <Icon size={14} className="opacity-60" />
                              {label}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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
                className="text-[15px] px-7 py-[13px] bg-brand-green text-white rounded-full text-center hover:bg-brand-mid transition-colors"
              >
                Conhecer agora
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
