'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function Mentoria() {
  return (
    <section id="mentoria" className="py-24 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Mentoria</h2>
              <p className="text-text-secondary mt-2">
                Para empresários que querem entender e aplicar IA no próprio negócio.
              </p>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Além da implementação, Ricardo oferece sessões individuais de mentoria para empresários
              que querem dar os primeiros passos com IA — ou acelerar o que já começaram. Presencial
              em Rio Preto ou por videoconferência.
            </p>
            <div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green/10 transition-colors duration-200"
              >
                Quero agendar uma sessão
              </a>
            </div>
          </motion.div>

          {/* Decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="text-brand-green/10 text-[120px] font-bold leading-none select-none">
              1:1
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
