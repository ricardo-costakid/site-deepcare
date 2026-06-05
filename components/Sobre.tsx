'use client'

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
              O mercado não espera. Empresas que não incorporam IA nos processos hoje vão operar em desvantagem amanhã.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              A DeepCare nasceu para mudar isso.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Somos uma empresa AI First — inteligência artificial não é um recurso extra, é a base de tudo que construímos. Cada solução é projetada para gerar resultado mensurável: mais lucro, menos custo, mais controle.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Não vendemos tecnologia por tecnologia. Implementamos IA onde ela faz sentido — com ética, segurança e acompanhamento real.
            </p>
          </motion.div>

          {/* AI First card dark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex md:justify-end"
          >
            <div className="w-full max-w-[400px] bg-[#111814] border border-white/10 rounded-2xl p-6 overflow-hidden">
              <p
                className="font-black leading-none mb-2 text-white/10 select-none"
                style={{ fontSize: 52 }}
              >
                <span className="block">EMPRESA</span>
                <span className="block text-right">AI FIRST</span>
              </p>
              <div className="flex flex-col divide-y divide-white/10">
                {['→ IA no centro de tudo', '→ resultado mensurável', '→ ética e controle'].map((item) => (
                  <span key={item} className="font-mono text-sm text-[#5B8F7A] py-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
