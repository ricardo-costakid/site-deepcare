'use client'

import Link from 'next/link'
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
  'Faturamento realizado vs. meta em tempo real',
  'Identificação de cobranças não realizadas',
  'Projeção de caixa para os próximos 60 dias',
  'Controle de repasse médico por profissional',
  'Lux AI — análises em linguagem de negócios',
  'Funciona com o sistema que a clínica já usa',
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
        <li key={cap} className="flex gap-2.5 text-gray-300">
          <span className="text-[#5B8F7A] flex-shrink-0">→</span>
          <span>{cap}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─────────────────────────  Visual mockups (JSX)  ────────────────────── */

const HERO_BARS = [42, 64, 51, 78, 60, 88, 72]

function HeroVisual() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Faturamento — full width with animated bars */}
      <div className="col-span-2 bg-[#0F1117] border border-white/5 rounded-xl p-6">
        <p className="text-sm text-gray-500">Faturamento do mês</p>
        <p className="text-3xl font-bold text-[#5B8F7A] mt-1">R$ 487.300</p>
        <p className="text-xs text-gray-500 mt-1">+12,4% vs. meta</p>
        <div className="flex items-end gap-2 h-20 mt-5">
          {HERO_BARS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-[#5B8F7A]/70 rounded-t-sm"
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#0F1117] border border-white/5 rounded-xl p-6">
        <p className="text-sm text-gray-500">Projeção de caixa (60d)</p>
        <p className="text-2xl font-bold text-[#5B8F7A] mt-1">R$ 1,24 mi</p>
      </div>
      <div className="bg-[#0F1117] border border-white/5 rounded-xl p-6">
        <p className="text-sm text-gray-500">Glosa identificada</p>
        <p className="text-2xl font-bold text-[#5B8F7A] mt-1">R$ 38.900</p>
      </div>
    </div>
  )
}

function BidMockup() {
  const kpis = [
    { label: 'Faturamento', value: 'R$ 487k' },
    { label: 'A receber', value: 'R$ 213k' },
    { label: 'Repasse médico', value: 'R$ 96k' },
  ]
  return (
    <div className="bg-[#0F1117] border border-white/5 rounded-xl p-6 space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
            <p className="text-[11px] text-gray-500">{k.label}</p>
            <p className="text-base font-semibold text-[#5B8F7A] mt-1">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white/[0.03] border border-white/5 p-4">
        <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">Lux AI</p>
        <p className="text-sm text-gray-300">
          “Qual a projeção de caixa para junho?”
        </p>
        <p className="text-sm text-[#5B8F7A] mt-2 leading-relaxed">
          Caixa projetado em R$ 1,24 mi · margem saudável. Atenção a 3 cobranças
          não realizadas (R$ 38,9k) — recuperáveis ainda este mês.
        </p>
      </div>
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
  visual,
  reverse,
}: {
  badge: string
  name: string
  tagline: string
  description: string
  capabilities: string[]
  ctaLabel: string
  visual: React.ReactNode
  reverse?: boolean
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Text */}
      <div className={reverse ? 'md:order-2' : ''}>
        <Badge>{badge}</Badge>
        <h3 className="text-3xl font-bold text-white mt-4">{name}</h3>
        <p className="text-lg text-[#8BBFAE] mt-1">{tagline}</p>
        <p className="text-gray-400 leading-relaxed mt-4">{description}</p>
        <Capabilities items={capabilities} />
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={`${btnGreen} mt-8`}>
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
        <section className="bg-[#1A2620] py-32">
          <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <Reveal>
              <Badge>Setor de Saúde</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-4">
                Inteligência de negócios para clínicas que querem crescer com clareza.
              </h1>
              <p className="text-lg text-gray-400 mt-4 max-w-lg leading-relaxed">
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
                  className="inline-flex items-center justify-center text-[15px] px-7 py-[13px] text-white/90 rounded-full hover:bg-white/5 transition-colors duration-200 font-medium"
                >
                  Ver soluções ↓
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="w-4 h-4 text-[#5B8F7A] flex-shrink-0" strokeWidth={1.5} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right */}
            <Reveal>
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

        {/* ───────────  03 · Soluções  ─────────── */}
        <section id="solucoes-saude" className="bg-[#1A2620] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Três soluções. Cada uma resolve um problema específico.
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Você não precisa contratar tudo de uma vez. Começa pelo que dói
                mais — e expande quando fizer sentido.
              </p>
            </Reveal>

            <div className="mt-16 flex flex-col gap-24">
              <ProductBlock
                badge="Inteligência Financeira"
                name="DeepCare BID"
                tagline="O cérebro financeiro da sua clínica."
                description="Do faturamento ao caixa, do repasse médico à projeção dos próximos 60 dias — tudo em um painel que fala a língua do gestor. Com o Lux AI, você pergunta em português e recebe análises de nível sênior."
                capabilities={BID_CAPS}
                ctaLabel="Quero conhecer o BID →"
                visual={<BidMockup />}
              />
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
        <section className="bg-[#1A2620] py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal className="max-w-4xl mx-auto">
              <div className="bg-[#0F1117] border border-white/5 rounded-3xl p-16 text-center">
                <h2 className="text-4xl font-bold text-white">
                  Sua clínica merece clareza para crescer.
                </h2>
                <p className="text-gray-400 mt-4 text-lg">
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
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
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
