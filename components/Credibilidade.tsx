'use client'

import { motion } from 'framer-motion'

export default function Credibilidade() {
  return (
    <section className="bg-bg-dark border-y border-brand-green/10 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6"
      >
        <div className="hidden sm:block w-16 h-px bg-brand-green/30 flex-shrink-0" />
        <p className="text-text-secondary text-sm text-center">
          IA implementada em clínicas, escritórios de advocacia e empresas do interior paulista.
        </p>
        <div className="hidden sm:block w-16 h-px bg-brand-green/30 flex-shrink-0" />
      </motion.div>
    </section>
  )
}
