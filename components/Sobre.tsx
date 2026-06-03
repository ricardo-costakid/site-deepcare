'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Sobre() {
  return (
    <section id="sobre" className="py-[140px] bg-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
              Sobre a DeepCare
            </h2>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              A DeepCare Analytics é uma empresa AI First fundada por Ricardo Costa em São José do
              Rio Preto – SP. Ricardo é economista, autodidata em IA e cursando MBA em Inteligência
              Artificial para Negócios.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              A DeepCare não apenas entrega IA para os clientes — opera com IA internamente. Nossos
              agentes trabalham enquanto dormimos. É assim que entregamos mais do que uma equipe
              convencional.
            </p>
          </motion.div>

          {/* AI First badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex md:justify-end"
          >
            <div className="inline-flex items-center gap-4 px-7 py-6 bg-white border border-border-subtle rounded-[16px]">
              <Image
                src="/logo/deepcare-simbolo-dark.svg"
                alt="DeepCare Analytics"
                width={32}
                height={32}
              />
              <div>
                <p className="text-[16px] font-semibold text-text-primary leading-none">AI First</p>
                <p className="text-[13px] text-text-secondary mt-1">Empresa de IA nativa</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
