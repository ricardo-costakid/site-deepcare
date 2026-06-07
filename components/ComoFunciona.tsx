'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Passo {
  num: string
  titulo: string
  subtitulo: string
  descricao: ReactNode
  reverse: boolean
  fantasma: string
  linhas: string[]
}

const PASSOS: Passo[] = [
  {
    num: '01',
    titulo: 'Diagnóstico',
    subtitulo: 'Você nos conta onde quer escalar e onde os processos estão travando.',
    descricao: (
      <>
        Reunião direta, sem formulário, sem apresentação de vendas. A gente ouve, analisa o fluxo
        real e identifica onde a IA entrega resultado —{' '}
        <strong className="font-semibold text-[#5B8F7A]">LUCRO a MAIS</strong> ou{' '}
        <strong className="font-semibold text-[#5B8F7A]">CUSTO a MENOS</strong>.
      </>
    ),
    reverse: false,
    fantasma: 'DIAGNÓSTICO',
    linhas: ['→ sem formulário', '→ sem pitch de vendas', '→ foco no seu resultado'],
  },
  {
    num: '02',
    titulo: 'Setup',
    subtitulo: 'A solução entra no seu ambiente.',
    descricao:
      'Criamos, configuramos e integramos com o que você já usa — WhatsApp, planilhas, sistema de gestão — e validamos tudo junto com você antes de colocar para rodar em produção. E você não precisa se preocupar, estaremos ao seu lado para garantir que tudo vai dar certo.',
    reverse: true,
    fantasma: 'SETUP',
    linhas: ['→ whatsapp, planilha, erp', '→ validado com você', '→ zero burocracia'],
  },
  {
    num: '03',
    titulo: 'Evolução contínua',
    subtitulo: 'A IA trabalha. Você acompanha. A gente evolui.',
    descricao:
      'Suporte ativo, ajustes contínuos e evolução da solução conforme seu negócio cresce.',
    reverse: false,
    fantasma: 'EVOLUÇÃO',
    linhas: ['→ suporte ativo', '→ ajustes contínuos', '→ cresce com você'],
  },
]

function GraphicCard({ fantasma, linhas }: { fantasma: string; linhas: string[] }) {
  return (
    <div className="bg-[#1A2620] border border-white/10 rounded-2xl p-6 overflow-hidden">
      <p
        className="font-black leading-none mb-4 text-white/10 select-none whitespace-nowrap"
        style={{ fontSize: 52 }}
      >
        {fantasma}
      </p>
      <div className="flex flex-col divide-y divide-white/10">
        {linhas.map((l) => (
          <span key={l} className="font-mono text-sm text-[#5B8F7A] opacity-80 py-2">
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
            Da conversa ao resultado — direto ao ponto.
          </h2>
          <p className="text-[17px] text-text-secondary mt-3">
            Três etapas pensadas para encaixar na sua rotina.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {PASSOS.map((p, i) => (
            <div
              key={p.num}
              className={`py-16 ${i < PASSOS.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                  p.reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
                }`}
              >
                {/* Bloco de texto */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                >
                  <p
                    className="font-medium text-[#C8CDD4] leading-none mb-4 select-none"
                    style={{ fontSize: 56 }}
                  >
                    {p.num}
                  </p>
                  <h3 className="text-[24px] font-semibold text-text-primary mb-2">{p.titulo}</h3>
                  <p className="text-[15px] font-medium text-[#5B8F7A] mb-4">{p.subtitulo}</p>
                  <p className="text-[15px] text-text-secondary leading-relaxed">{p.descricao}</p>
                </motion.div>

                {/* Bloco gráfico — oculto em mobile */}
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <GraphicCard fantasma={p.fantasma} linhas={p.linhas} />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
