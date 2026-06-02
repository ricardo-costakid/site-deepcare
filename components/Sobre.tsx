'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 bg-card-bg border-y border-brand-green/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">

          {/* Text — 2/3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Sobre a DeepCare</h2>
            <p className="text-text-secondary leading-relaxed">
              A DeepCare Analytics é uma empresa AI First fundada por Ricardo Costa em São José do
              Rio Preto – SP. Ricardo é economista, autodidata em IA e cursando MBA em Inteligência
              Artificial para Negócios.
            </p>
            <p className="text-text-secondary leading-relaxed">
              A DeepCare não apenas entrega IA para os clientes — opera com IA internamente. Nossos
              agentes trabalham enquanto dormimos. É assim que entregamos mais do que uma equipe
              convencional.
            </p>
          </motion.div>

          {/* AI First badge — 1/3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex md:justify-end"
          >
            <div className="inline-flex items-center gap-4 px-6 py-5 border border-brand-green/40 rounded-xl bg-bg-dark">
              <Image
                src="/logo/deepcare-simbolo-dark.svg"
                alt="DeepCare Analytics"
                width={40}
                height={40}
              />
              <div>
                <p className="text-brand-green font-bold text-lg leading-none">AI First</p>
                <p className="text-text-secondary text-xs mt-1">Empresa de IA nativa</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
