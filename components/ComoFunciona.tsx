'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Passo {
  titulo: string
  descricao: string
  icon: ReactNode
}

const PASSOS: Passo[] = [
  {
    titulo: 'Diagnóstico',
    descricao: 'Entendemos a dor real do seu negócio antes de propor qualquer solução.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    titulo: 'Setup',
    descricao: 'Configuramos e implantamos a solução integrada ao seu ambiente em até 2 semanas.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    titulo: 'Mensalidade',
    descricao: 'Ficamos do seu lado: suporte contínuo, evolução e manutenção da solução ativa.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 bg-card-bg border-y border-brand-green/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Como funciona</h2>
          <p className="text-text-secondary mt-3">Simples, direto e sem burocracia.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-7 h-px bg-brand-green/20"
            style={{ left: '16.67%', right: '16.67%' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PASSOS.map((passo, i) => (
              <motion.div
                key={passo.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full border border-brand-green/40 bg-bg-dark flex items-center justify-center text-brand-green relative z-10">
                  {passo.icon}
                </div>
                <div>
                  <p className="text-brand-green text-xs font-mono uppercase tracking-widest mb-1">
                    0{i + 1}
                  </p>
                  <h3 className="text-text-primary font-semibold text-lg">{passo.titulo}</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {passo.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
