'use client'

import { motion } from 'framer-motion'

export default function Premissa() {
  return (
    <section className="py-20 bg-bg-dark border-b border-brand-green/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="inline-block px-3 py-1 border border-brand-green/30 rounded-full text-brand-green text-xs uppercase tracking-widest mb-8">
          Nossa premissa
        </div>
        <p className="text-text-secondary text-lg leading-relaxed">
          Toda solução que entregamos precisa cumprir pelo menos um objetivo:
        </p>
        <p className="text-text-primary text-2xl md:text-3xl font-bold mt-4 leading-snug">
          Aumentar o lucro{' '}
          <span className="text-brand-green">ou</span>{' '}
          Reduzir os custos do cliente.
        </p>
        <p className="text-text-secondary text-lg mt-4">
          Se não fizer nenhum dos dois, não faz sentido.
        </p>
      </motion.div>
    </section>
  )
}
