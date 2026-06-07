'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const LINES = [
  '→ diagnóstico coletivo',
  '→ soluções reais',
  '→ resultado mensurável',
]

export default function Comunidade() {
  return (
    <section id="comunidade" className="relative overflow-hidden py-12 md:py-20 bg-[#1A2620]">
      {/* Ghost word */}
      <span
        className="absolute select-none font-black leading-none"
        style={{
          fontSize: 'clamp(40px, 9vw, 140px)',
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: '-0.02em',
          writingMode: 'horizontal-tb',
          whiteSpace: 'nowrap',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
        }}
      >
        COMUNIDADE
      </span>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[55%_45%] gap-12 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="inline-flex mb-6">
              <span
                className="text-xs font-semibold tracking-[0.2em] px-3 py-1.5 rounded-full"
                style={{ color: '#5B8F7A', background: 'rgba(91,143,122,0.12)' }}
              >
                COMUNIDADE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              Resolvemos problemas de quem resolve problemas.
            </h2>

            <p className="text-lg text-[#9CA3AF] mt-4 leading-relaxed">
              Uma comunidade onde você conta seus maiores desafios — e juntos criamos e conectamos você à solução certa.
            </p>

            <div className="mt-8">
              <Link
                href="/comunidade"
                className="inline-block text-[15px] px-7 py-[13px] bg-[#5B8F7A] text-white rounded-full hover:bg-[#4a7a67] transition-colors duration-200 leading-none"
              >
                Quero fazer parte →
              </Link>
            </div>
          </motion.div>

          {/* Right column — visual */}
          <div className="hidden md:flex items-center justify-center min-h-[280px]" aria-hidden="true">

            {/* Animated lines */}
            <div className="relative z-10 flex flex-col gap-4">
              {LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 0.6, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="text-xl font-mono"
                  style={{ color: '#5B8F7A' }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
