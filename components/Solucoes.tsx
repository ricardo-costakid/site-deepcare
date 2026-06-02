'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Solucao {
  nome: string
  tagline: string
  descricao: string
  icon: ReactNode
}

const SOLUCOES: Solucao[] = [
  {
    nome: 'Lux',
    tagline: 'Seu analista sênior com IA',
    descricao:
      'Conectado à base de dados da sua empresa, o Lux responde perguntas em linguagem natural e entrega insights estratégicos para donos e gestores. Saiba hoje qual é sua margem real, seu ticket médio, sua inadimplência — sem abrir planilha.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" /><line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
  {
    nome: 'Painel Financeiro Executivo',
    tagline: 'Visibilidade total do seu caixa',
    descricao:
      'Dashboard com fluxo de caixa, recebíveis, margem por pedido e alertas de inadimplência — integrado ao seu ERP ou planilhas. Relatório executivo automático entregue por WhatsApp ou e-mail.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="4" width="4" height="17" rx="1" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
  {
    nome: 'SDR no WhatsApp',
    tagline: 'Seu vendedor que nunca dorme',
    descricao:
      'Agente de IA que qualifica leads, responde dúvidas e agenda reuniões automaticamente via WhatsApp. Mais conversas avançando, menos trabalho manual.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    nome: 'NPS Automatizado',
    tagline: 'Satisfação do cliente no piloto automático',
    descricao:
      'Pesquisa de satisfação disparada automaticamente após cada atendimento, com análise por IA. Saiba o que seus clientes pensam sem esforço operacional.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    nome: 'Juris AI',
    tagline: 'IA para escritórios de advocacia',
    descricao:
      'Análise e síntese de jurisprudência, geração assistida de peças jurídicas. Mais produtividade para advogados, sem abrir mão da qualidade técnica.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
]

function SolucaoCard({ nome, tagline, descricao, icon }: Solucao) {
  return (
    <div className="h-full bg-card-bg border border-brand-green/15 rounded-xl p-6 flex flex-col gap-4
      hover:border-brand-green hover:bg-card-hover transition-all duration-300 hover:-translate-y-0.5">
      <div className="text-brand-green">{icon}</div>
      <div>
        <h3 className="text-text-primary font-semibold text-lg">{nome}</h3>
        <p className="text-brand-green text-sm mt-0.5">{tagline}</p>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed flex-1">{descricao}</p>
    </div>
  )
}

export default function Solucoes() {
  return (
    <section id="solucoes" className="py-24 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Nossas Soluções</h2>
          <p className="text-text-secondary mt-3 max-w-2xl leading-relaxed">
            Desenvolvemos agentes e sistemas de IA prontos para uso — adaptáveis a qualquer segmento, integráveis ao seu sistema atual.
          </p>
        </motion.div>

        {/* Row 1: first 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {SOLUCOES.slice(0, 3).map((s, i) => (
            <motion.div
              key={s.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex"
            >
              <SolucaoCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* Row 2: last 2 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto w-full">
          {SOLUCOES.slice(3).map((s, i) => (
            <motion.div
              key={s.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 3) * 0.08 }}
              className="flex"
            >
              <SolucaoCard {...s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
