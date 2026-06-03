'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <section className="py-[120px] bg-bg-dark">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-[90%] mx-auto bg-bg-dark rounded-[24px] border border-white/8 py-16 px-8 text-center flex flex-col items-center gap-6"
        >
          <h2 className="text-[32px] md:text-[38px] font-medium text-white leading-tight tracking-[-0.02em] max-w-[560px]">
            Pronto para transformar seu negócio com IA?
          </h2>
          <p className="text-[17px] text-text-dark-muted">
            Agende uma conversa. Sem compromisso, sem jargão técnico.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] px-7 py-[13px] bg-brand-green text-white rounded-full hover:bg-brand-mid transition-colors duration-200 font-medium mt-2"
          >
            Fale com a DeepCare
          </a>
        </motion.div>
      </div>
    </section>
  )
}
