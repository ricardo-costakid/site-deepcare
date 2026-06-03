'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, ScanLine, CreditCard, Landmark } from 'lucide-react'

interface Solucao {
  nome: string
  tagline?: string
  descricao: string
  icon: React.ReactNode
}

const SOLUCOES: Solucao[] = [
  {
    nome: 'Lux',
    tagline: 'Seu analista sênior com IA',
    descricao:
      'Conectado à base de dados da sua empresa, o Lux responde perguntas em linguagem natural e entrega insights estratégicos para donos e gestores. Saiba hoje qual é sua margem real, seu ticket médio, sua inadimplência — sem abrir planilha.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    nome: 'Painel Financeiro Executivo',
    tagline: 'Visibilidade total do seu caixa',
    descricao:
      'Dashboard com fluxo de caixa, recebíveis, margem por pedido e alertas de inadimplência — integrado ao seu ERP ou planilhas. Relatório executivo automático entregue por WhatsApp ou e-mail.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    nome: 'SDR no WhatsApp',
    tagline: 'Seu vendedor que nunca dorme',
    descricao:
      'Agente de IA que qualifica leads, responde dúvidas e agenda reuniões automaticamente via WhatsApp. Mais conversas avançando, menos trabalho manual.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6" />
        <path d="M5 10l-1 7h4l-1-7" />
        <path d="M15 10l-1 7h4l-1-7" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="5" y1="10" x2="9" y2="10" />
        <line x1="15" y1="10" x2="19" y2="10" />
        <line x1="3" y1="21" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    nome: 'Gestão de Vendas com IA',
    tagline: 'Do pedido ao bolso, sem planilha',
    descricao:
      'Kanban automatizado que comunica fornecedor e cliente em cada etapa. Controle de estoque, comissões, margem por produto e dashboard do gestor — tudo em um painel.',
    icon: <ShoppingCart size={22} strokeWidth={1.75} />,
  },
  {
    nome: 'Inventário e Controle de Ativos com IA',
    descricao:
      'Painel inteligente com inventário completo dos seus ativos e alertas automáticos de manutenção — avisa antes do vencimento, evita equipamento parado e elimina a gestão manual.',
    icon: <ScanLine size={22} strokeWidth={1.75} />,
  },
  {
    nome: 'Conciliação de Cartão de Crédito com IA',
    tagline: 'Todas as maquininhas, um só painel',
    descricao:
      'Nossa IA centraliza vendas de múltiplas maquininhas e operadoras em um único dashboard. Saiba exatamente o que entra, em quantas parcelas, quando cai e quais taxas estão sendo cobradas — sem entrar em várias plataformas, sem erro, sem surpresa.',
    icon: <CreditCard size={22} strokeWidth={1.75} />,
  },
  {
    nome: 'ERP Financeiro com Open Finance',
    tagline: 'Contas a pagar, receber e fluxo de caixa integrados',
    descricao:
      'Gestão financeira completa com Open Finance — organize entradas, saídas e antecipe gargalos no fluxo de caixa com visibilidade total do financeiro em tempo real, sem esforço manual.',
    icon: <Landmark size={22} strokeWidth={1.75} />,
  },
]

function SolucaoCard({ nome, tagline, descricao, icon }: Solucao) {
  return (
    <div className="h-full bg-[#111814] border border-white/5 rounded-2xl p-6 flex flex-col gap-5
      hover:border-[#5B8F7A]/40 hover:shadow-[0_0_24px_rgba(91,143,122,0.08)] transition-all duration-200 cursor-default">
      <div className="text-[#5B8F7A]">{icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[17px] font-semibold text-white">{nome}</h3>
        {tagline && <p className="text-sm text-[#5B8F7A] font-medium">{tagline}</p>}
      </div>
      <p className="text-[15px] text-gray-400 leading-relaxed flex-1">{descricao}</p>
    </div>
  )
}

export default function Solucoes() {
  return (
    <section id="solucoes" className="py-[140px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
            Nossas Soluções
          </h2>
          <p className="text-[17px] text-text-secondary mt-3 max-w-[580px] leading-relaxed">
            Explore soluções plug &amp; play para implementar IA na sua empresa de forma simples e rápida. Não encontrou o que precisa? A gente cria sob medida para você.
          </p>
          <Link
            href="/comunidade"
            className="inline-block mt-6 text-sm border border-[#5B8F7A] text-[#5B8F7A] rounded-xl px-5 py-2 hover:bg-[#5B8F7A] hover:text-white transition-colors duration-200"
          >
            Quero uma solução personalizada →
          </Link>
        </motion.div>

        {/* All 9 cards — 3×3 on xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SOLUCOES.map((s, i) => (
            <motion.div
              key={s.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
