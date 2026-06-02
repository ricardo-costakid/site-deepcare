'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <section id="contato" className="py-24 bg-brand-dark">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
          Pronto para transformar seu negócio com IA?
        </h2>
        <p className="text-text-secondary text-lg">
          Agende uma conversa. Sem compromisso, sem jargão técnico.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-brand-green text-white font-semibold rounded-lg text-lg hover:bg-brand-mid transition-colors duration-200"
        >
          Fale com a DeepCare
        </a>
      </motion.div>
    </section>
  )
}
