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
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    icon: <ShoppingCart size={64} strokeWidth={1.5} />,
  },
  {
    nome: 'Inventário e Controle de Ativos com IA',
    descricao:
      'Painel inteligente com inventário completo dos seus ativos e alertas automáticos de manutenção — avisa antes do vencimento, evita equipamento parado e elimina a gestão manual.',
    icon: <ScanLine size={64} strokeWidth={1.5} />,
  },
  {
    nome: 'Conciliação de Cartão de Crédito com IA',
    tagline: 'Todas as maquininhas, um só painel',
    descricao:
      'Nossa IA centraliza vendas de múltiplas maquininhas e operadoras em um único dashboard. Saiba exatamente o que entra, em quantas parcelas, quando cai e quais taxas estão sendo cobradas — sem entrar em várias plataformas, sem erro, sem surpresa.',
    icon: <CreditCard size={64} strokeWidth={1.5} />,
  },
  {
    nome: 'ERP Financeiro com Open Finance',
    tagline: 'Contas a pagar, receber e fluxo de caixa integrados',
    descricao:
      'Gestão financeira completa com Open Finance — organize entradas, saídas e antecipe gargalos no fluxo de caixa com visibilidade total do financeiro em tempo real, sem esforço manual.',
    icon: <Landmark size={64} strokeWidth={1.5} />,
  },
]

function SolucaoCard({ nome, tagline, descricao, icon }: Solucao) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#1A2620] p-6 min-h-[220px] cursor-default
        hover:border-[#5B8F7A]/50 hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:bg-[#1F2E26]
        transition-colors duration-300"
    >
      <div className="absolute top-4 right-4 text-white/10">
        {icon}
      </div>
      <div className="pr-20">
        <h3 className="text-white font-semibold text-lg leading-snug">{nome}</h3>
        {tagline && <p className="text-[#5B8F7A] text-sm mt-1">{tagline}</p>}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{descricao}</p>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <a
          href={`/comunidade?solucao=${encodeURIComponent(nome)}`}
          className="text-sm text-[#5B8F7A] hover:text-[#8BBFAE] transition-colors duration-200"
        >
          Saiba mais →
        </a>
        <a
          href={`https://wa.me/5517992449351?text=${encodeURIComponent(`Olá, tenho interesse na solução ${nome} da DeepCare.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#5B8F7A] transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.842L.057 23.215a.75.75 0 00.918.943l5.521-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-4.951-1.355l-.355-.211-3.679.959.983-3.574-.231-.368A9.721 9.721 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </motion.div>
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

        {/* All 9 cards — carousel on mobile, grid on md+ */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pb-0">
          {SOLUCOES.map((s, i) => (
            <motion.div
              key={s.nome}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex snap-start shrink-0 w-[80vw] md:w-auto"
            >
              <SolucaoCard {...s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
