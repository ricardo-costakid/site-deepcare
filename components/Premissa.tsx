'use client'

import { motion } from 'framer-motion'

export default function Premissa() {
  return (
    <section className="py-[140px] bg-bg-dark">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-[760px] mx-auto px-6 text-center"
      >
        <p className="text-[11px] font-medium tracking-[2px] text-brand-green uppercase mb-10">
          Nossa Premissa
        </p>
        <p className="text-[26px] font-normal text-white leading-relaxed mb-4">
          Toda solução que entregamos precisa cumprir pelo menos um objetivo:
        </p>
        <p className="text-[38px] md:text-[44px] font-semibold text-white leading-snug tracking-[-0.02em]">
          Aumentar o lucro{' '}
          <span className="text-brand-green">ou</span>{' '}
          Reduzir os custos do cliente.
        </p>
        <p className="text-[16px] text-text-dark-muted mt-8">
          Se não fizer nenhum dos dois, não faz sentido.
        </p>
      </motion.div>
    </section>
  )
}
