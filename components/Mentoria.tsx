'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function Mentoria() {
  return (
    <section id="mentoria" className="py-[140px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
                Mentoria
              </h2>
              <p className="text-[17px] text-text-secondary mt-2 leading-relaxed">
                Para empresários que querem entender e aplicar IA no próprio negócio.
              </p>
            </div>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Além da implementação, Ricardo oferece sessões individuais de mentoria para empresários
              que querem dar os primeiros passos com IA — ou acelerar o que já começaram. Presencial
              em Rio Preto ou por videoconferência.
            </p>
            <div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-brand-green font-medium hover:text-brand-mid transition-colors duration-200"
              >
                Quero agendar uma sessão →
              </a>
            </div>
          </motion.div>

          {/* Editorial decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex justify-center items-center"
            aria-hidden="true"
          >
            <span
              className="font-bold leading-none select-none"
              style={{ fontSize: '120px', color: '#F0F4F2' }}
            >
              1:1
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
