'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  BarChart2,
  Headphones,
  Receipt,
  EyeOff,
  ScanLine,
  Workflow,
  Plug,
  Users,
  LineChart,
} from 'lucide-react'
import { WA_URL } from '@/lib/constants'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ─────────────────────────  Animation variants  ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────────────  Data  ──────────────────────────────── */

const TRUST = [
  { icon: CheckCircle, text: 'Funciona com o sistema que você já usa' },
  { icon: ShieldCheck, text: 'Dados protegidos e isolados por clínica' },
  { icon: BarChart2, text: 'Resultado mensurável desde o primeiro mês' },
  { icon: Headphones, text: 'Suporte direto com quem construiu a solução' },
]

const PROBLEMAS = [
  {
    icon: Receipt,
    title: 'Faturamento sem clareza',
    text: 'De tudo que foi produzido, quanto foi faturado? O que aconteceu com o que não foi faturado? De tudo que foi faturado, quanto foi recebido? O que ainda não entrou — está a receber ou foi glosado? E o que foi glosado: por quê foi glosado e foi recursado? Perguntas que toda clínica deveria conseguir responder.',
  },
  {
    icon: EyeOff,
    title: 'Caixa sem visibilidade',
    text: 'Qual a capacidade do caixa hoje? Quanto vai entrar nos próximos dias? Quando as saídas vão superar as entradas? Sem essas respostas, decisões importantes podem ser tomadas no escuro — e o problema só aparece quando já é tarde.',
  },
  {
    icon: ScanLine,
    title: 'Inventário de equipamentos',
    text: 'Clínica sem inventário real dos seus equipamentos. Manutenção vencida sem alerta. Auditoria da vigilância sanitária chegando sem histórico organizado. Cada um desses problemas custa dinheiro e tempo.',
  },
  {
    icon: Workflow,
    title: 'Processos manuais',
    text: 'Ligar para fornecedor, atualizar planilha, avisar paciente manualmente. Tarefas repetitivas que consomem o tempo da equipe todo dia — tempo que poderia estar em atendimento.',
  },
]

const DIFERENCIAIS = [
  {
    icon: Plug,
    title: 'Sem trocar o que você já tem',
    text: 'O BID conecta direto ao ERP que a clínica já usa — sem migração, sem interrupção da operação. Plug and play com qualquer ERP do mercado. A clínica continua operando normalmente enquanto a inteligência entra em funcionamento.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e privacidade',
    text: 'Isolamento de dados por Row Level Security — o mesmo padrão de segurança usado por bancos e operadoras de saúde. Hospedados na AWS. Acesso por perfil com autenticação segura. Contrato de proteção de dados incluso — conformidade LGPD garantida desde o primeiro dia.',
  },
  {
    icon: Users,
    title: 'Implementação acompanhada',
    text: 'Você não recebe um software, recebe inteligência. A DeepCare acompanha cada etapa com você — setup completo e validação dos dados com o gestor. Suporte ativo durante todo o processo e após a entrega. A solução só vai para produção quando estiver validada e funcionando.',
  },
  {
    icon: LineChart,
    title: 'Resultado que se mede',
    text: 'Cada solução entregue tem indicadores claros desde o primeiro dia. Faturamento recuperado, caixa projetado, glosas identificadas, tempo de equipe liberado. Você sabe exatamente o que melhorou, quanto melhorou — e o que ainda pode melhorar.',
  },
]

const BID_CAPS = [
  'Meta de faturamento com progresso em tempo real',
  'Alerta automático: abaixo, acima ou direto no alvo',
  'Projeção de fechamento do período',
  'Glosa do período identificada e monitorada',
  'Visão mensal, trimestral, semestral e anual',
  'Disponível no mobile — acompanhe de onde estiver',
]

const LENS_CAPS = [
  'Kanban de pedidos com alertas de prazo',
  'Comunicação automática com paciente e fornecedor via WhatsApp',
  'Controle de estoque com leitura de código de barras',
  'Algoritmo inteligente para evitar vencimento de estoque',
  'Margens e comissões em tempo real',
  'Formulário de troca em PDF com logo da clínica',
]

const ASSETS_CAPS = [
  'Bloqueio automático quando manutenção vence',
  'Alerta de equipamentos não devolvidos',
  'Contato com paciente via WhatsApp com um clique',
  'Histórico imutável para auditorias de convênio',
  'Perfis de acesso por nível (admin e recepção)',
  'Relatório em PDF para reuniões de diretoria',
]

/* ────────────────────────  Shared UI primitives  ─────────────────────── */

const btnGreen =
  'inline-flex items-center justify-center text-[15px] px-7 py-[13px] bg-brand-green text-white rounded-full hover:bg-brand-mid transition-colors duration-200 font-medium'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
      {children}
    </span>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Plug
  title: string
  text: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#1A2620] p-6 cursor-default
        hover:border-[#5B8F7A]/50 hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:bg-[#1F2E26]
        transition-colors duration-300"
    >
      <div className="absolute top-4 right-4 text-white/10">
        <Icon className="w-16 h-16" strokeWidth={1.5} />
      </div>
      <div className="pr-20">
        <h3 className="text-lg font-semibold text-white leading-snug">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
    </motion.div>
  )
}

function Capabilities({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-2.5">
      {items.map((cap) => (
        <li key={cap} className="flex gap-2.5 text-[#555555]">
          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
          <span>{cap}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─────────────────────────  Visual mockups (JSX)  ────────────────────── */

const SplineHero = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

function HeroVisual() {
  const splineContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY * 2.0, behavior: 'auto' })
    }

    let attempts = 0
    const attach = () => {
      const canvas = splineContainerRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.addEventListener('wheel', handleWheel, { passive: true })
      } else if (attempts < 20) {
        attempts++
        setTimeout(attach, 300)
      }
    }

    attach()

    return () => {
      const canvas = splineContainerRef.current?.querySelector('canvas')
      canvas?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div
      ref={splineContainerRef}
      style={{ width: '100%', height: '600px', marginTop: '80px' }}
      aria-hidden="true"
    >
      <SplineHero
        scene="https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode"
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  )
}

function LensTrackMockup() {
  const columns = [
    { title: 'Pedido', cards: [{ nome: 'Ana Martins', spec: 'Tórica · -2,75 / -1,25' }] },
    { title: 'Em produção', cards: [{ nome: 'Carlos Reis', spec: 'Multifocal · OD/OE' }] },
    {
      title: 'Pronto',
      cards: [{ nome: 'Júlia Souza', spec: 'Esférica · -1,50', alert: true }],
    },
  ]
  return (
    <div className="bg-[#0F1117] border border-white/5 rounded-xl p-6">
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider text-gray-500">
              {col.title}
            </p>
            {col.cards.map((card) => (
              <div
                key={card.nome}
                className="rounded-lg bg-white/[0.03] border border-white/5 p-3"
              >
                <p className="text-sm text-gray-200">{card.nome}</p>
                <p className="text-[11px] text-gray-500 mt-1">{card.spec}</p>
                {'alert' in card && card.alert && (
                  <span className="inline-block mt-2 text-[10px] text-[#5B8F7A]">
                    ● Avisar paciente
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function AssetsMockup() {
  const rows = [
    { nome: 'Tonômetro', status: 'Operacional', tone: 'green' },
    { nome: 'Autorrefrator', status: 'Manutenção vencida', tone: 'red' },
    { nome: 'OCT de Retina', status: 'Emprestado', tone: 'amber' },
    { nome: 'Lâmpada de fenda', status: 'Operacional', tone: 'green' },
  ] as const

  const toneClass: Record<string, string> = {
    green: 'bg-[#5B8F7A]/15 text-[#5B8F7A]',
    red: 'bg-red-500/15 text-red-400',
    amber: 'bg-amber-500/15 text-amber-400',
  }

  return (
    <div className="bg-[#0F1117] border border-white/5 rounded-xl p-6">
      <div className="flex flex-col divide-y divide-white/5">
        {rows.map((row) => (
          <div key={row.nome} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-sm text-gray-200">{row.nome}</span>
            <span className={`text-[11px] font-medium rounded-full px-2.5 py-1 ${toneClass[row.tone]}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ──────────────────────────  Product block  ──────────────────────────── */

function ProductBlock({
  badge,
  name,
  tagline,
  description,
  capabilities,
  ctaLabel,
  ctaHref,
  visual,
  reverse,
}: {
  badge: string
  name: string
  tagline?: string
  description: string
  capabilities: string[]
  ctaLabel: string
  ctaHref?: string
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid md:grid-cols-[30%_70%] gap-12 items-center"
    >
      {/* Text */}
      <div className={reverse ? 'md:order-2' : ''}>
        <Badge>{badge}</Badge>
        <h3 className="text-3xl font-bold text-[#111111] mt-4">{name}</h3>
        {tagline && <p className="text-lg text-[#5B8F7A] mt-1">{tagline}</p>}
        <p className="text-[#555555] leading-relaxed mt-4">{description}</p>
        <Capabilities items={capabilities} />
        <a href={ctaHref ?? WA_URL} target="_blank" rel="noopener noreferrer" className={`${btnGreen} mt-8`}>
          {ctaLabel}
        </a>
      </div>

      {/* Visual */}
      <div className={reverse ? 'md:order-1' : ''}>{visual}</div>
    </motion.div>
  )
}

/* ────────────────────────────────  Page  ─────────────────────────────── */

export default function SaudePage() {
  return (
    <>
      <Header />
      <main>
        {/* ───────────  01 · Hero  ─────────── */}
        <section className="bg-[#F8F9FA] pt-24 pb-32" style={{ overflow: 'visible' }}>
          <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center" style={{ overflow: 'visible' }}>
            {/* Left */}
            <Reveal className="self-start pt-8">
              <Badge>Setor de Saúde</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mt-4">
                Inteligência de negócios para clínicas crescerem com direção e clareza.
              </h1>
              <p className="text-lg text-[#555555] mt-4 max-w-lg leading-relaxed">
                O BID foi construído por profissionais com mais de 20 anos no setor de saúde, a partir de problemas reais de gestão clínica — faturamento invisível, caixa imprevisível e decisões tomadas sem dados. Tudo isso em um único painel, plug and play com o ERP que você já usa.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <a
                  href="#bid-intro"
                  className="inline-flex items-center justify-center text-[15px] px-7 py-[13px] text-[#D97757] rounded-full hover:bg-black/5 transition-colors duration-200 font-medium"
                >
                  Ver soluções ↓
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-[#555555]">
                    <Icon className="w-4 h-4 text-[#5B8F7A] flex-shrink-0" strokeWidth={1.5} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right */}
            <div className="flex items-center justify-center">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* ───────────  02 · Problema  ─────────── */}
        <section id="problemas-saude" className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-bold text-[#111111]">
                Sua clínica produz. Mas quanto disso vira resultado?
              </h2>
              <p className="text-[#555555] mt-3 max-w-2xl mx-auto">
                Problemas que gestores de clínica enfrentam todo dia.
              </p>
            </Reveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            >
              {PROBLEMAS.map((p) => (
                <FeatureCard key={p.title} {...p} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───────────  02b · BID Intro  ─────────── */}
        <section id="bid-intro" className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">

            {/* 1 · Header centralizado */}
            <Reveal className="text-center">
              <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                BID — Business Intelligence Department
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                Tenha um Departamento de Inteligência inteiro na sua clínica.
              </h2>
              <p className="text-lg font-medium text-[#5B8F7A] mt-3">
                Tudo que importa, em um lugar só.
              </p>
            </Reveal>

            {/* 2 · Vídeo */}
            <Reveal>
              <video
                src="/videos/login-bid-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="mt-8 w-full rounded-2xl aspect-video"
              />
            </Reveal>

            {/* 3 · Descrição, bullets e CTA */}
            <Reveal className="grid grid-cols-2 gap-12 mt-10">
              {/* Coluna esquerda: descrição */}
              <div>
                <p className="text-[#555555] leading-relaxed">
                  O BID é plug and play — não importa qual ERP você usa, ele conecta,
                  normaliza e entrega inteligência executiva completa: Financeiro, Fluxo
                  de Caixa, Análise de Resultado, Gestão Bancária, DRE Administrativa,
                  Faturamento, Análise de Glosas e identificação de guias não faturadas.
                  KPIs que monitoram e conversam com o gestor. E quando surgir uma dúvida,
                  o Lux responde — em linguagem natural, pelo celular ou pelo computador,
                  24 horas por dia, 7 dias por semana, com precisão de CFO e sem alucinação.
                </p>
              </div>
              {/* Coluna direita: bullets */}
              <div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    'Plug and play — funciona com qualquer ERP',
                    'Financeiro, Caixa, DRE e Faturamento em um só painel',
                    'Análise de glosas e guias não faturadas identificadas automaticamente',
                    'Lux: converse em linguagem natural, no celular ou no desktop, 24/7',
                    'KPIs que monitoram e alertam o gestor em tempo real',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[#555555]">
                      <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ───────────  03 · Soluções  ─────────── */}
        <section id="solucoes-saude" className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col gap-24">
              {/* Overview — coluna única */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    OVERVIEW — ACOMPANHE SUA META DE FATURAMENTO
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    Sua meta de faturamento, acompanhada em tempo real.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/overview-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      Na Overview, o gestor define a meta e o BID monitora o andamento — com alertas em percentual se está abaixo, acima ou direto no alvo. Faturamento realizado, projeção de fechamento e progresso acumulado visíveis em um só painel, por mês, trimestre, semestre ou ano. Plug and play com qualquer ERP. Disponível no celular, onde você estiver.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {BID_CAPS.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Dashboard Financeiro */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    DASHBOARD FINANCEIRO — RESULTADO REAL DA SUA OPERAÇÃO
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    O resultado financeiro da sua clínica, sem precisar abrir planilha.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/dash-financeiro-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      No Dashboard Financeiro, o gestor vê em tempo real o que entrou, o que saiu e onde está o dinheiro — com DRE simplificado, breakeven do mês e análise de receitas e despesas por categoria. Ao clicar em qualquer card, é possível aprofundar no detalhe de cada lançamento. O gráfico de Balanço Diário de Liquidez aponta desequilíbrios no fluxo de caixa antes que virem problema. Plug and play com qualquer ERP.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'DRE simplificado em tempo real',
                        'Breakeven: quanto falta para cobrir os custos do mês',
                        'Receitas e despesas separadas por categoria',
                        'Evolução mensal do resultado — sem planilha',
                        'Balanço Diário de Liquidez com alerta de desequilíbrio',
                        'Visão por período: mês, trimestre, semestre e ano',
                      ].map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Gestão de Caixa */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    GESTÃO DE CAIXA — PROJEÇÃO FUTURA
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    Saiba quando o caixa vai entrar em déficit — antes que aconteça.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/gcaixa-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      Na Gestão de Caixa, o BID projeta o fluxo futuro com base no disponível em caixa, bancos e cartões, somado às contas a receber de convênios e particulares, e descontando os compromissos de pagamento já lançados. O gestor vê o ponto exato de tensão no fluxo antes que ele vire problema, identifica receitas futuras que podem ser antecipadas e acompanha a capacidade de cobertura do caixa para os compromissos à frente. Plug and play com qualquer ERP.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Projeção futura com base no disponível, a pagar e a receber',
                        'Caixa, bancos e cartões consolidados',
                        'Convênios e recebíveis futuros mapeados',
                        'Ponto de déficit identificado antes do aperto',
                        'Capacidade de cobertura do caixa analisada',
                        'Receitas antecipáveis sinalizadas',
                      ].map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Faturamento */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    FATURAMENTO — JORNADA DO FATURAMENTO
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    Cada etapa do seu faturamento, visível em tempo real.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/faturamento-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      Na tela de Faturamento, o BID responde as perguntas que toda clínica tem dificuldade em responder: de tudo que foi produzido, quanto foi faturado? O que aconteceu com o que não foi faturado? De tudo que foi faturado, quanto foi recebido? O que ainda não entrou — está a receber ou foi glosado? E o que foi glosado: por quê foi glosado e foi recursado? O BID mapeia exatamente as guias não faturadas e monitora quanto tempo cada uma está parada sem faturar — para que o gestor saiba o que está acontecendo em cada etapa. No detalhamento, o ranking de produção médica mostra como o faturamento se distribui entre a parte do médico e da clínica — deixando a relação completamente transparente. Plug and play com qualquer ERP.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Faturado, Recebido, Glosado e A Receber em tempo real',
                        'Guias não faturadas mapeadas e rastreadas',
                        'Glosas detalhadas: motivo e status de recurso',
                        'Ranking de produção médica com split clínica/médico',
                        'Composição por convênio, médico e procedimento',
                        'Visão por período: mês, trimestre, semestre e ano',
                      ].map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Intel. Faturamento */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    INTEL. FATURAMENTO — AUDITORIA DE PROTOCOLOS CLÍNICOS
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    Descubra o dinheiro que sua clínica deixou na mesa.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/intel-faturamento-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      Após definir o protocolo de exames por faixa etária, o BID vasculha toda a base de dados em busca de pacientes que passaram pela clínica e não realizaram os exames indicados. O resultado aparece em valor financeiro exato: quanto a clínica deixou de faturar e, mais importante, quantos pacientes deixaram de receber o diagnóstico correto. Ao clicar em qualquer exame, o BID abre a lista nominal dos pacientes — com convênio, data da consulta e valor — pronta para auditoria e recuperação ativa. Plug and play com qualquer ERP.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Protocolos clínicos configuráveis por faixa etária',
                        'Auditoria automática: quem não realizou o exame indicado',
                        'Dinheiro na mesa calculado em valor financeiro real',
                        'Lista nominal de pacientes por exame — exportável',
                        'Gap de oportunidade por convênio e por médico',
                        'Recuperação de receita com rastreabilidade clínica',
                      ].map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Lux IA */}
              <div>
                <Reveal className="text-center">
                  <span className="inline-flex items-center text-xs font-medium tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5">
                    LUX IA — SEU ANALISTA SÊNIOR, ONDE VOCÊ ESTIVER
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111111] leading-tight mt-5">
                    Converse sobre sua clínica. O Lux responde com os seus dados.
                  </h3>
                </Reveal>

                <Reveal>
                  <video
                    src="/videos/Lux-bid-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="mt-8 w-full rounded-2xl aspect-video"
                  />
                </Reveal>

                <Reveal className="grid grid-cols-2 gap-12 mt-10">
                  <div>
                    <p className="text-[#555555] leading-relaxed">
                      O Lux é o analista sênior da clínica — com perfil de BI, Analytics, Data Science e Machine Learning. Converse em linguagem natural e o Lux busca, calcula e responde com os dados reais do negócio, sem alucinação. Prepara análises de desempenho, decomposição de despesas, comparativos entre períodos, materiais para reunião com diretoria e estratégias de negociação com fornecedores — tudo pronto para salvar em PDF ou imprimir. E quanto mais dados a clínica acumula, maior fica sua capacidade analítica: o Lux aprende com o histórico do negócio, descobre padrões em receita e despesa que passariam despercebidos e ajuda o gestor a tomar decisões mais seguras e embasadas. Disponível no celular e no computador, 24 horas por dia, 7 dias por semana.
                    </p>
                    <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      Dados fictícios para fins ilustrativos
                    </span>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-2.5">
                      {[
                        'Respostas em linguagem natural com dados reais da clínica',
                        'BI Sênior, Analytics, Data Science e Machine Learning',
                        'Análise de faturamento, despesas, margem e caixa',
                        'Materiais para reunião prontos para PDF ou impressão',
                        'Suporte a negociação com fornecedores baseado em dados',
                        'Zero alucinação — o Lux só afirma o que os dados confirmam',
                        'Quanto mais dados, mais inteligente — aprende com o histórico',
                        'Disponível no mobile — onde você estiver',
                      ].map((item) => (
                        <li key={item} className="flex gap-2.5 text-[#555555]">
                          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <a
                        href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnGreen}
                      >
                        Quero meu Departamento de Inteligência →
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ───────────  04 · Por que a DeepCare  ─────────── */}
        <section className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-bold text-[#111111]">Por que a DeepCare</h2>
            </Reveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto"
            >
              {DIFERENCIAIS.map((d) => (
                <FeatureCard key={d.title} {...d} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───────────  05 · CTA Final  ─────────── */}
        <section className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-16 text-center">
                <h2 className="text-4xl font-bold text-[#111111]">
                  Sua clínica merece clareza para crescer.
                </h2>
                <p className="text-[#555555] mt-4 text-lg">
                  Fale com a DeepCare e descubra por onde começar.
                </p>
                <div className="mt-8">
                  <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={btnGreen}>
                    Falar com a DeepCare
                  </a>
                </div>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="text-sm text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    ← Voltar ao site
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
