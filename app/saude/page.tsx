'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  ShieldCheck,
  BarChart2,
  Headphones,
  TrendingDown,
  EyeOff,
  PackageX,
  ClipboardList,
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
    icon: TrendingDown,
    title: 'Faturamento que some',
    text: 'Atendimentos realizados que nunca chegaram a ser cobrados. O dinheiro estava lá — e foi perdido por falta de controle.',
  },
  {
    icon: EyeOff,
    title: 'Caixa sem visibilidade',
    text: 'O gestor não sabe quanto vai entrar nos próximos 30 dias nem quando o caixa vai apertar. Decisão no escuro.',
  },
  {
    icon: PackageX,
    title: 'Equipamentos sem controle',
    text: 'Aparelho emprestado sem retorno, manutenção vencida, auditoria chegando sem histórico organizado.',
  },
  {
    icon: ClipboardList,
    title: 'Operação no braço',
    text: 'Ligar para fornecedor, atualizar planilha, avisar paciente manualmente. Tempo da equipe indo embora todo dia.',
  },
]

const DIFERENCIAIS = [
  {
    icon: Plug,
    title: 'Sem trocar o que você já tem',
    text: 'Nossas soluções se adaptam ao sistema atual da clínica. Sem migração, sem interrupção da operação.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e privacidade',
    text: 'Os dados de cada clínica são isolados e protegidos. Conformidade com a LGPD desde a fundação.',
  },
  {
    icon: Users,
    title: 'Implementação acompanhada',
    text: 'Você não recebe um software e fica sozinho. A DeepCare acompanha cada etapa da implementação.',
  },
  {
    icon: LineChart,
    title: 'Resultado que se mede',
    text: 'Cada solução tem indicadores claros. Você sabe exatamente o que melhorou — e quanto.',
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
      className="bg-white border border-[#E5E7EB] rounded-2xl p-8"
    >
      <Icon className="w-10 h-10 text-[#5B8F7A] mb-4" strokeWidth={1.5} />
      <h3 className="text-lg font-semibold text-[#111111] mb-2">{title}</h3>
      <p className="text-[#555555] leading-relaxed">{text}</p>
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
      style={{ width: '100%', height: '500px', overflow: 'visible', background: 'transparent', marginTop: '80px' }}
      aria-hidden="true"
    >
      <SplineHero
        scene="https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

function BidVideo() {
  return (
    <div className="w-full max-w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <video
        src="/videos/overview-bid-demo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full block object-contain"
      ></video>
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
        <section className="bg-[#F8F9FA] py-32" style={{ overflow: 'visible' }}>
          <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <Reveal>
              <Badge>Setor de Saúde</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight mt-4">
                Inteligência de negócios para clínicas que querem crescer com clareza.
              </h1>
              <p className="text-lg text-[#555555] mt-4 max-w-lg leading-relaxed">
                A DeepCare nasceu no setor de saúde. Nossas soluções foram
                desenvolvidas a partir de problemas reais de gestão — financeiro,
                operacional e controle de ativos — que clínicas enfrentam todos os dias.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={btnGreen}>
                  Quero uma demonstração
                </a>
                <a
                  href="#solucoes-saude"
                  className="inline-flex items-center justify-center text-[15px] px-7 py-[13px] text-[#555555] rounded-full hover:bg-black/5 transition-colors duration-200 font-medium"
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
            <Reveal className="overflow-visible">
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* ───────────  02 · Problema  ─────────── */}
        <section id="problemas-saude" className="bg-[#F8F9FA] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-bold text-[#111111]">
                O que gestores de clínica enfrentam todo dia
              </h2>
              <p className="text-[#555555] mt-3 max-w-2xl mx-auto">
                Problemas que parecem normais — mas têm solução.
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
        <section className="bg-[#F8F9FA] py-24">
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
              <p className="text-[#555555] leading-relaxed">
                O BID é plug and play — não importa qual ERP você usa, ele conecta,
                normaliza e entrega inteligência executiva completa: Financeiro, Fluxo
                de Caixa, Análise de Resultado, Gestão Bancária, DRE Administrativa,
                Faturamento, Análise de Glosas e identificação de guias não faturadas.
                KPIs que monitoram e conversam com o gestor. E quando surgir uma dúvida,
                o Lux responde — em linguagem natural, pelo celular ou pelo computador,
                24 horas por dia, 7 dias por semana, com precisão de CFO e sem alucinação.
              </p>
              {/* Coluna direita: bullets + CTA */}
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
                <div className="mt-8">
                  <a
                    href="https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnGreen}
                  >
                    Quero conhecer o BID →
                  </a>
                </div>
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
                  <p className="text-[#555555] leading-relaxed">
                    Na Overview, o gestor define a meta e o BID monitora o andamento — com alertas em percentual se está abaixo, acima ou direto no alvo. Faturamento realizado, projeção de fechamento e progresso acumulado visíveis em um só painel, por mês, trimestre, semestre ou ano. Plug and play com qualquer ERP. Disponível no celular, onde você estiver.
                  </p>
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
              <ProductBlock
                badge="Oftalmologia"
                name="LensTrack"
                tagline="Gestão inteligente de lentes de contato."
                description="Do pedido ao paciente, tudo automatizado. O fornecedor recebe a especificação técnica via WhatsApp, o paciente é avisado em cada etapa — sem uma ligação manual sequer."
                capabilities={LENS_CAPS}
                ctaLabel="Quero conhecer o LensTrack →"
                visual={<LensTrackMockup />}
                reverse
              />
              <ProductBlock
                badge="Gestão de Equipamentos"
                name="DeepCare Assets"
                tagline="Seus equipamentos sob controle total."
                description="Calibração vencida, aparelho emprestado sem retorno, auditoria de convênio chegando sem histórico. O Assets resolve os três — com bloqueio automático, alertas no login e contato com o paciente em um clique."
                capabilities={ASSETS_CAPS}
                ctaLabel="Quero conhecer o Assets →"
                visual={<AssetsMockup />}
              />
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
