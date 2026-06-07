# DeepCare Analytics — Referência do Site

Site institucional Next.js 14 em produção: **deepcareanalytics.com**

---

## Stack

- Next.js 14 (App Router), TypeScript
- Tailwind CSS v3
- Framer Motion (`whileInView` em todas as seções)
- Inter via `next/font/google`
- Vercel (deploy)

---

## Mapa de componentes

| Arquivo | Responsabilidade |
|---|---|
| `app/layout.tsx` | SEO metadata, Inter font, wrapper global |
| `app/page.tsx` | Composição de todas as seções |
| `app/globals.css` | Tokens CSS, scroll-behavior, `.scrollbar-hide` |
| `lib/constants.ts` | `WA_URL` (fonte única do link WhatsApp) |
| `components/Header.tsx` | Nav fixa, blur no scroll, drawer mobile |
| `components/Hero.tsx` | Headline, CTAs, orb Spline |
| `components/Credibilidade.tsx` | Faixa de credibilidade |
| `components/Solucoes.tsx` | 9 cards de soluções |
| `components/ComoFunciona.tsx` | 3 passos: Diagnóstico, Setup, Evolução |
| `components/Premissa.tsx` | Bloco "aumentar lucro ou reduzir custos" |
| `components/Mentoria.tsx` | Seção de mentoria individual |
| `components/Comunidade.tsx` | Bloco da comunidade DeepCare |
| `components/Sobre.tsx` | Sobre a empresa |
| `components/CTAFinal.tsx` | CTA dark final |
| `components/Footer.tsx` | Logo, links, copyright |

---

## Correções mobile — 2026-06-06

### 1. Hero.tsx — orb Spline oculto no mobile

Container do orb alterado para `hidden md:flex md:w-1/2`. No mobile a seção exibe apenas o bloco de texto; o orb Spline só carrega a partir de `md`.

### 2. Premissa.tsx · Comunidade.tsx · CTAFinal.tsx — texto fantasma

- `<section>` raiz de cada um tem `overflow-hidden`.
- `fontSize` do texto fantasma: `clamp(72px, 9vw, 140px)` → **`clamp(40px, 9vw, 140px)`**.  
  O mínimo reduz de 72 px para 40 px no mobile; em desktop o `9vw` continua atingindo os 140 px normalmente.

### 3. Footer.tsx — grid responsivo

Grid já utiliza `grid-cols-1 md:grid-cols-3`. Container com `py-12` garante espaçamento no mobile.

### 4. Header.tsx — drawer mobile refatorado

| Elemento | Classes / comportamento |
|---|---|
| Overlay | `fixed inset-0 bg-black/50 z-40 md:hidden` — cobre a tela toda |
| Painel | `fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden shadow-xl` |
| Animação | Framer Motion `x: 288 → 0` (entra da direita) via `AnimatePresence` |
| Fechar | Clique no overlay **ou** no botão X dentro do painel |
| Body scroll | `document.body.style.overflow = 'hidden'` ao abrir; restaurado ao fechar via `useEffect([menuOpen])` |

### 5. Solucoes.tsx — carrossel horizontal no mobile

No mobile os cards viram carrossel com scroll snapping; em `md+` mantém o grid original.

```
mobile:  flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide
desktop: md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pb-0
```

Cada card wrapper: `snap-start shrink-0 w-[80vw] md:w-auto`  
Scrollbar oculta via `.scrollbar-hide` em `globals.css` (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).

### 6. Padding entre seções — mobile reduzido

Componentes com `py-24` substituídos por `py-12 md:py-24`:

- `Comunidade.tsx` — `<section>` raiz
- `Mentoria.tsx` — bloco CTA final escuro (`bg-[#1A2620]`)

Os demais componentes (Credibilidade, ComoFunciona, Premissa, Sobre, CTAFinal) usam valores arbitrários (`py-[140px]`, `py-[120px]`) que não se enquadram no padrão `py-24/py-32` e não foram alterados.

---

## Ajustes de espaçamento e polish — 2026-06-07

### 1. Hero.tsx

- `min-h-screen` removido da `<section>` raiz.
- `pb-20` reduzido para `pb-10` no div interno.
- Botão "Ver soluções →" estilizado com `text-[#DA7756]` e `hover:text-[#c4664a]`.

### 2. Credibilidade.tsx

- Texto alterado para: _"Saúde, advocacia, varejo, educação… IA que gera resultado em qualquer setor."_
- Linhas decorativas (`h-px`) removidas.
- `bg-border-subtle` removido.

### 3. Solucoes.tsx

- `py-[140px]` → `py-20`.
- Botão "Quero uma solução personalizada →" convertido em link simples: `text-[#DA7756]`, sem borda, sem fundo, com `hover:underline`.

### 4. ComoFunciona.tsx

- `py-[140px]` → `py-20`.

### 5. Premissa.tsx

- `py-[140px]` → `py-20`.
- Texto "Nossa régua de sucesso:" → "Régua de sucesso:".

### 6. Mentoria.tsx

- `py-[140px]` → `py-20` no div interno.
- Link "Quero agendar uma sessão →" estilizado com `text-[#DA7756]`.

### 7. Comunidade.tsx

- `py-12 md:py-24` → `py-12 md:py-20`.
- Texto fantasma posicionado com `top: 1rem`.

### 8. Sobre.tsx

- `py-[140px]` → `py-20`.

### 9. CTAFinal.tsx

- `py-[120px]` → `py-20`.

### 10. app/saude/page.tsx — Hero da página Saúde

- `<section>` do Hero: `pt-24` → `pt-10`.
- `<Reveal>` interno: `pt-8` → `pt-2`.
