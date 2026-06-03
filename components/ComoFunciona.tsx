'use client'

import { motion } from 'framer-motion'

const PASSOS = [
  {
    num: '01',
    titulo: 'Diagnóstico',
    descricao: 'Entendemos a dor real do seu negócio antes de propor qualquer solução.',
  },
  {
    num: '02',
    titulo: 'Setup',
    descricao: 'Configuramos e implantamos a solução integrada ao seu ambiente em até 2 semanas.',
  },
  {
    num: '03',
    titulo: 'Mensalidade',
    descricao: 'Ficamos do seu lado: suporte contínuo, evolução e manutenção da solução ativa.',
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-[140px] bg-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
            Como funciona
          </h2>
          <p className="text-[17px] text-text-secondary mt-3">
            Simples, direto e sem burocracia.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-5 h-px bg-border-subtle"
            style={{ left: 'calc(16.67% + 24px)', right: 'calc(16.67% + 24px)' }}
            aria-hidden="true"
          />

          {PASSOS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center md:px-10"
            >
              <div className="relative z-10 w-10 h-10 bg-bg-alt border border-border-subtle rounded-full flex items-center justify-center mb-6">
                <span className="text-[11px] font-medium tracking-[1.5px] text-brand-green uppercase">
                  {p.num}
                </span>
              </div>
              <h3 className="text-[19px] font-semibold text-text-primary mb-2">{p.titulo}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">{p.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
