'use client'

import { motion } from 'framer-motion'

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden py-20 bg-bg-dark">
      <span
        className="absolute select-none font-black leading-none"
        style={{
          fontSize: 'clamp(40px, 9vw, 140px)',
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: '-0.02em',
          writingMode: 'horizontal-tb',
          whiteSpace: 'nowrap',
          right: 0,
          bottom: '1rem',
        }}
      >
        TRANSFORMAÇÃO
      </span>
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
            href="https://wa.me/5517992449351?text=Ol%C3%A1!%20Quero%20saber%20como%20a%20DeepCare%20pode%20ajudar%20meu%20neg%C3%B3cio."
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
