# DeepCare Analytics — Site Institucional

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete DeepCare Analytics institutional one-page site in Next.js 14 with Tailwind CSS and Framer Motion, ready for Vercel deploy at deepcareanalytics.com.

**Architecture:** Single-page App Router site. Design tokens defined in `tailwind.config.ts` and `globals.css` first — all 10 components consume them. Framer Motion provides `whileInView` entrance animations on every block. Header blur handled via `useEffect` on scroll.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion, Inter (next/font/google), Vercel.

---

## File Map

| File | Responsibility |
|---|---|
| `tailwind.config.ts` | Brand color tokens |
| `app/globals.css` | CSS variables, scroll behavior, base resets |
| `app/layout.tsx` | SEO metadata, Inter font, global wrapper |
| `app/page.tsx` | Section composition |
| `lib/constants.ts` | WhatsApp URL (single source) |
| `components/Header.tsx` | Fixed nav, blur on scroll, mobile hamburger |
| `components/Hero.tsx` | Headline, CTAs, animated DeepCare symbol |
| `components/Credibilidade.tsx` | Credibility strip |
| `components/Solucoes.tsx` | 5 solution cards, 3-2 grid |
| `components/ComoFunciona.tsx` | 3-step process with connecting line |
| `components/Premissa.tsx` | Value proposition block |
| `components/Mentoria.tsx` | Mentoring section with CTA |
| `components/Sobre.tsx` | About founder + AI First badge |
| `components/CTAFinal.tsx` | Dark green CTA block |
| `components/Footer.tsx` | Logo, links, copyright |

---

## Task 1: Scaffold Next.js 14 + install dependencies

**Files:** Creates all Next.js boilerplate, merges with existing `public/logo/`

- [ ] **Step 1: Verify Node.js is available**

```powershell
node --version
npm --version
```

Expected: Node 18+ and npm 9+. If missing, install from nodejs.org first.

- [ ] **Step 2: Scaffold Next.js 14 in the existing directory**

Run from `C:\Projetos\Site-DeepCare`:

```powershell
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted `"The directory . contains files that could conflict"` → type `y` and press Enter.  
For all other prompts, accept defaults (Enter).

> `public/logo/` is preserved — create-next-app only adds files.

- [ ] **Step 3: Install Framer Motion**

```powershell
npm install framer-motion
```

Expected: `added X packages` with no errors.

- [ ] **Step 4: Create lib/constants.ts**

```powershell
New-Item -ItemType Directory -Force lib
```

Create `lib/constants.ts`:

```ts
export const WA_URL = 'https://wa.me/5517XXXXXXXXX'
```

- [ ] **Step 5: Verify build compiles**

```powershell
npm run build
```

Expected: `✓ Compiled successfully`. Ignore default Next.js page content.

- [ ] **Step 6: Initialize git and commit**

```powershell
git init
git add .
git commit -m "chore: scaffold Next.js 14 + framer-motion"
```

---

## Task 2: Tailwind design tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#5B8F7A',
        'brand-mid':   '#3D6357',
        'brand-dark':  '#243D36',
        'bg-dark':     '#0A0F0D',
        'card-bg':     '#111814',
        'card-hover':  '#161D1A',
        'text-primary':   '#F5F5F3',
        'text-secondary': '#9CA89F',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Type check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add tailwind.config.ts
git commit -m "chore: brand color tokens in Tailwind config"
```

---

## Task 3: globals.css + layout.tsx + clear page.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --green-main:     #5B8F7A;
  --green-mid:      #3D6357;
  --green-dark:     #243D36;
  --bg-dark:        #0A0F0D;
  --bg-card:        #111814;
  --bg-card-hover:  #161D1A;
  --text-primary:   #F5F5F3;
  --text-secondary: #9CA89F;
  --border-subtle:  rgba(91, 143, 122, 0.15);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0A0F0D;
  color: #F5F5F3;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Replace app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DeepCare Analytics — Inteligência Artificial para empresas',
  description: 'A plataforma de IA para empresas que querem crescer na prática. Soluções prontas, implementação rápida, resultado mensurável.',
  icons: {
    icon: '/logo/deepcare-simbolo-dark.svg',
  },
  openGraph: {
    title: 'DeepCare Analytics',
    description: 'Inteligência Artificial para empresas que querem crescer na prática.',
    url: 'https://deepcareanalytics.com',
    siteName: 'DeepCare Analytics',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-bg-dark text-text-primary">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Clear app/page.tsx to placeholder**

```tsx
export default function Home() {
  return <main />
}
```

- [ ] **Step 4: Verify build**

```powershell
npm run build
```

Expected: `✓ Compiled successfully`, dark background page renders.

- [ ] **Step 5: Commit**

```powershell
git add app/globals.css app/layout.tsx app/page.tsx
git commit -m "chore: globals.css, layout.tsx with SEO metadata"
```

---

## Task 4: Header

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Create components/Header.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Soluções',      href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Mentoria',      href: '#mentoria' },
  { label: 'Sobre',         href: '#sobre' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-bg-dark/80 border-b border-brand-green/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#inicio">
          <Image
            src="/logo/deepcare-logo-clara.svg"
            alt="DeepCare Analytics"
            height={36}
            width={195}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green/10 transition-colors duration-200"
          >
            Fale conosco
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg-dark/95 backdrop-blur-md border-t border-brand-green/15 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-text-secondary hover:text-text-primary transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-3 border border-brand-green text-brand-green rounded-lg text-center hover:bg-brand-green/10 transition-colors"
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Type check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add components/Header.tsx
git commit -m "feat: Header with blur-on-scroll and mobile menu"
```

---

## Task 5: Hero

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-16 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            A plataforma de Inteligência Artificial para empresas que querem crescer com IA na prática.
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Soluções prontas. Implementação rápida. Resultado mensurável em até 30 dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-green text-white font-semibold rounded-lg text-center hover:bg-brand-mid transition-colors duration-200"
            >
              Quero uma demonstração
            </a>
            <a
              href="#solucoes"
              className="px-6 py-3 border border-brand-green/40 text-text-secondary rounded-lg text-center hover:border-brand-green hover:text-text-primary transition-colors duration-200"
            >
              Ver soluções
            </a>
          </div>
        </motion.div>

        {/* Animated DeepCare symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 40px rgba(91, 143, 122, 0.35))' }}
          >
            <Image
              src="/logo/deepcare-simbolo-dark.svg"
              alt="DeepCare Analytics"
              width={300}
              height={300}
              priority
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add components/Hero.tsx
git commit -m "feat: Hero with animated DeepCare symbol"
```

---

## Task 6: Credibilidade

**Files:**
- Create: `components/Credibilidade.tsx`

- [ ] **Step 1: Create components/Credibilidade.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function Credibilidade() {
  return (
    <section className="bg-bg-dark border-y border-brand-green/10 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6"
      >
        <div className="hidden sm:block w-16 h-px bg-brand-green/30 flex-shrink-0" />
        <p className="text-text-secondary text-sm text-center">
          IA implementada em clínicas, escritórios de advocacia e empresas do interior paulista.
        </p>
        <div className="hidden sm:block w-16 h-px bg-brand-green/30 flex-shrink-0" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Credibilidade.tsx
git commit -m "feat: Credibilidade strip"
```

---

## Task 7: Solucoes

**Files:**
- Create: `components/Solucoes.tsx`

- [ ] **Step 1: Create components/Solucoes.tsx**

```tsx
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 xl:w-2/3 xl:mx-auto">
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
```

- [ ] **Step 2: Type check**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add components/Solucoes.tsx
git commit -m "feat: Solucoes with 5 cards in 3-2 grid"
```

---

## Task 8: ComoFunciona

**Files:**
- Create: `components/ComoFunciona.tsx`

- [ ] **Step 1: Create components/ComoFunciona.tsx**

```tsx
'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Passo {
  titulo: string
  descricao: string
  icon: ReactNode
}

const PASSOS: Passo[] = [
  {
    titulo: 'Diagnóstico',
    descricao: 'Entendemos a dor real do seu negócio antes de propor qualquer solução.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    titulo: 'Setup',
    descricao: 'Configuramos e implantamos a solução integrada ao seu ambiente em até 2 semanas.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    titulo: 'Mensalidade',
    descricao: 'Ficamos do seu lado: suporte contínuo, evolução e manutenção da solução ativa.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 bg-card-bg border-y border-brand-green/10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Como funciona</h2>
          <p className="text-text-secondary mt-3">Simples, direto e sem burocracia.</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-7 h-px bg-brand-green/20"
            style={{ left: '16.67%', right: '16.67%' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PASSOS.map((passo, i) => (
              <motion.div
                key={passo.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full border border-brand-green/40 bg-bg-dark flex items-center justify-center text-brand-green relative z-10">
                  {passo.icon}
                </div>
                <div>
                  <p className="text-brand-green text-xs font-mono uppercase tracking-widest mb-1">
                    0{i + 1}
                  </p>
                  <h3 className="text-text-primary font-semibold text-lg">{passo.titulo}</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {passo.descricao}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type check + commit**

```powershell
npx tsc --noEmit
git add components/ComoFunciona.tsx
git commit -m "feat: ComoFunciona 3-step process"
```

---

## Task 9: Premissa

**Files:**
- Create: `components/Premissa.tsx`

- [ ] **Step 1: Create components/Premissa.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'

export default function Premissa() {
  return (
    <section className="py-20 bg-bg-dark border-b border-brand-green/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="inline-block px-3 py-1 border border-brand-green/30 rounded-full text-brand-green text-xs uppercase tracking-widest mb-8">
          Nossa premissa
        </div>
        <p className="text-text-secondary text-lg leading-relaxed">
          Toda solução que entregamos precisa cumprir pelo menos um objetivo:
        </p>
        <p className="text-text-primary text-2xl md:text-3xl font-bold mt-4 leading-snug">
          Aumentar o lucro{' '}
          <span className="text-brand-green">ou</span>{' '}
          Reduzir os custos do cliente.
        </p>
        <p className="text-text-secondary text-lg mt-4">
          Se não fizer nenhum dos dois, não faz sentido.
        </p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Premissa.tsx
git commit -m "feat: Premissa value proposition block"
```

---

## Task 10: Mentoria

**Files:**
- Create: `components/Mentoria.tsx`

- [ ] **Step 1: Create components/Mentoria.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function Mentoria() {
  return (
    <section id="mentoria" className="py-24 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Mentoria</h2>
              <p className="text-text-secondary mt-2">
                Para empresários que querem entender e aplicar IA no próprio negócio.
              </p>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Além da implementação, Ricardo oferece sessões individuais de mentoria para empresários
              que querem dar os primeiros passos com IA — ou acelerar o que já começaram. Presencial
              em Rio Preto ou por videoconferência.
            </p>
            <div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green/10 transition-colors duration-200"
              >
                Quero agendar uma sessão
              </a>
            </div>
          </motion.div>

          {/* Decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-center items-center"
          >
            <div className="text-brand-green/10 text-[120px] font-bold leading-none select-none">
              1:1
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Mentoria.tsx
git commit -m "feat: Mentoria section with WhatsApp CTA"
```

---

## Task 11: Sobre

**Files:**
- Create: `components/Sobre.tsx`

- [ ] **Step 1: Create components/Sobre.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add components/Sobre.tsx
git commit -m "feat: Sobre section with AI First badge"
```

---

## Task 12: CTAFinal

**Files:**
- Create: `components/CTAFinal.tsx`

- [ ] **Step 1: Create components/CTAFinal.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <section id="contato" className="py-24 bg-brand-dark">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
          Pronto para transformar seu negócio com IA?
        </h2>
        <p className="text-text-secondary text-lg">
          Agende uma conversa. Sem compromisso, sem jargão técnico.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-brand-green text-white font-semibold rounded-lg text-lg hover:bg-brand-mid transition-colors duration-200"
        >
          Fale com a DeepCare
        </a>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/CTAFinal.tsx
git commit -m "feat: CTAFinal section"
```

---

## Task 13: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
import Image from 'next/image'

const FOOTER_LINKS = [
  { label: 'Soluções',      href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Mentoria',      href: '#mentoria' },
  { label: 'Sobre',         href: '#sobre' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-brand-green/10 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Logo + location */}
          <div className="flex flex-col gap-2">
            <Image
              src="/logo/deepcare-sidebar-dark.svg"
              alt="DeepCare Analytics"
              height={28}
              width={125}
            />
            <p className="text-text-secondary text-xs mt-1">São José do Rio Preto – SP</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-brand-green/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-secondary text-xs">
            © 2026 DeepCare Analytics · São José do Rio Preto – SP
          </p>
          <p className="text-text-secondary text-xs">deepcareanalytics.com</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Footer.tsx
git commit -m "feat: Footer with logo and links"
```

---

## Task 14: Compose page.tsx + production build

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx with full composition**

```tsx
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Credibilidade from '@/components/Credibilidade'
import Solucoes from '@/components/Solucoes'
import ComoFunciona from '@/components/ComoFunciona'
import Premissa from '@/components/Premissa'
import Mentoria from '@/components/Mentoria'
import Sobre from '@/components/Sobre'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Credibilidade />
        <Solucoes />
        <ComoFunciona />
        <Premissa />
        <Mentoria />
        <Sobre />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run production build**

```powershell
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (3/3)
✓ Finalizing page optimization
```

If build fails, check the error message — common issues:
- Missing `'use client'` on a component that uses `useState`/`useEffect`/Framer Motion
- Image `width`/`height` props missing on `<Image>`
- TypeScript errors from incorrect prop types

- [ ] **Step 3: Verify locally**

```powershell
npm run dev
```

Open `http://localhost:3000`. Verify:
- Dark background renders
- Header is transparent, blurs on scroll
- Hero shows headline + animated symbol (pulse)
- All sections render with correct colors
- Mobile menu opens on hamburger click
- All WhatsApp links point to `wa.me/5517XXXXXXXXX`

- [ ] **Step 4: Final commit**

```powershell
git add app/page.tsx
git commit -m "feat: compose all sections in page.tsx — site complete"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Header (fixed, blur, mobile menu)
- ✅ Hero (`#inicio`, headline, CTAs, animated symbol)
- ✅ Credibilidade (strip below hero)
- ✅ Soluções (`#solucoes`, 5 cards 3-2 grid)
- ✅ Como funciona (`#como-funciona`, 3 steps, connecting line)
- ✅ Premissa (value proposition block)
- ✅ Mentoria (`#mentoria`, CTA to WhatsApp)
- ✅ Sobre (`#sobre`, bio + AI First badge)
- ✅ CTA Final (`#contato`, dark green bg, WhatsApp button)
- ✅ Footer (logo, links, copyright)
- ✅ SEO metadata in layout.tsx
- ✅ scroll-behavior: smooth in globals.css
- ✅ Framer Motion `whileInView` on all sections
- ✅ Mobile-first, responsive breakpoints
- ✅ No external images — SVG + typography + color only
- ✅ `npm run build` verification step
- ✅ Git commits after each task

**WhatsApp URL:** `5517XXXXXXXXX` is intentionally a placeholder — replace before deploy.
