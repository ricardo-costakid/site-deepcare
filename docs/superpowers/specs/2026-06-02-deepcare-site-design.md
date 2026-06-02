# DeepCare Analytics — Site Institucional: Design Spec

**Data:** 2026-06-02  
**Status:** Aprovado pelo usuário  
**Deploy target:** Vercel → `deepcareanalytics.com`

---

## 1. Visão Geral

Site institucional one-page da DeepCare Analytics. Público-alvo: empresários conservadores do interior paulista. Tom: sóbrio, profissional, direto — dark mode premium, sem neon, sem gradientes coloridos.

---

## 2. Stack

| Tecnologia | Versão / Detalhe |
|---|---|
| Next.js | 14, App Router |
| Tailwind CSS | v3, tokens customizados |
| Framer Motion | animações de entrada e hero |
| Fonte | Inter via `next/font/google` |
| Deploy | Vercel (GitHub connect) |

---

## 3. Sistema de Design

### 3.1 Paleta de Cores

```css
--green-main:    #5B8F7A;
--green-mid:     #3D6357;
--green-dark:    #243D36;
--bg-dark:       #0A0F0D;
--bg-card:       #111814;
--bg-card-hover: #161D1A;
--text-primary:  #F5F5F3;
--text-secondary:#9CA89F;
--border-subtle: rgba(91,143,122,0.15);
```

Todos os tokens expostos como variáveis CSS em `globals.css` e como cores nomeadas no `tailwind.config.ts` (`brand-green`, `brand-mid`, `brand-dark`, `bg-dark`, `card-bg`, `card-hover`, `text-primary`, `text-secondary`).

### 3.2 Tipografia

- **Fonte única:** Inter (Google Fonts via `next/font/google`)
- Display/headlines: `font-bold`, tamanhos de `text-4xl` a `text-6xl`
- Body: `text-base` / `text-lg`, cor `text-secondary`

### 3.3 Animações

- **Entrada no viewport:** todos os blocos com `initial={{ opacity: 0, y: 24 }}` + `whileInView={{ opacity: 1, y: 0 }}` + `viewport={{ once: true }}`
- **Hero symbol:** `deepcare-simbolo-dark.svg` com `animate={{ scale: [1, 1.04, 1] }}` loop infinito + drop-shadow sutil
- **Header blur:** `useScroll` detecta scroll > 10px → aplica `backdrop-blur + bg semi-transparente`
- **Hover cards:** `border-color` transition para `--green-main` + leve `translateY(-2px)`

---

## 4. Estrutura de Arquivos

```
deepcare-site/
├── app/
│   ├── layout.tsx          ← metadata SEO, next/font, globals import
│   ├── page.tsx            ← compõe todos os componentes em sequência
│   └── globals.css         ← CSS variables + scroll-behavior: smooth + resets
├── components/
│   ├── Header.tsx          ← nav fixo, blur on scroll, hamburger mobile
│   ├── Hero.tsx            ← headline, subtítulo, CTAs, símbolo animado
│   ├── Credibilidade.tsx   ← faixa de texto sutil abaixo do hero
│   ├── Solucoes.tsx        ← grid 5 cards (2-2-1)
│   ├── ComoFunciona.tsx    ← 3 passos com ícones e linha conectora
│   ├── Premissa.tsx        ← bloco de destaque centralizado
│   ├── Mentoria.tsx        ← seção com CTA WhatsApp
│   ├── Sobre.tsx           ← fundador + badge AI First
│   ├── CTAFinal.tsx        ← fundo verde escuro + botão WhatsApp
│   └── Footer.tsx          ← logo, copyright, links
├── public/
│   └── logo/               ← SVGs já existentes (não modificar)
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 5. Seções — Comportamento e Conteúdo

### Header
- Logo: `<Image src="/logo/deepcare-logo-clara.svg" height={36} width={195} priority />`
- Nav links: Soluções | Como funciona | Mentoria | Sobre | **Fale conosco** (botão com borda verde)
- Estado inicial: `background: transparent`
- Após scroll > 10px: `backdrop-blur-md bg-bg-dark/80 border-b border-subtle`
- Mobile: menu hamburguer com drawer ou dropdown

### Hero (`#inicio`)
- Layout: duas colunas em md+ (texto à esquerda, símbolo à direita); stack em mobile
- Headline: `text-5xl font-bold text-text-primary`
- Símbolo: `deepcare-simbolo-dark.svg`, ~280px, com pulse + drop-shadow verde sutil
- CTA primário: `Quero uma demonstração` → `https://wa.me/5517XXXXXXXXX`
- CTA secundário: `Ver soluções` → scroll para `#solucoes`

### Credibilidade
- Linha de texto única, cor `text-secondary`, centrada
- Separadores decorativos opcionais (linha fina verde)

### Soluções (`#solucoes`) — 5 cards
| # | Nome | Tagline |
|---|---|---|
| 1 | Lux | Seu analista sênior com IA |
| 2 | Painel Financeiro Executivo | Visibilidade total do seu caixa |
| 3 | SDR no WhatsApp | Seu vendedor que nunca dorme |
| 4 | NPS Automatizado | Satisfação do cliente no piloto automático |
| 5 | Juris AI | IA para escritórios de advocacia |

Grid: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`. Último card centralizado com `col-span-full justify-self-center max-w-sm` em xl.  
Card design: `bg-card-bg border border-subtle rounded-xl p-6`, hover → `border-brand-green bg-card-hover`.

### Como Funciona (`#como-funciona`)
3 passos em linha com ícone (stroke, 32px) + número + título + descrição.  
Linha conectora horizontal entre os 3 em md+.

### Premissa
Fundo: `bg-green-dark/30` ou `bg-card-bg` com `border-y border-subtle`.  
Texto centralizado com destaque em bold.

### Mentoria (`#mentoria`)
Layout simples: título + parágrafo + CTA.

### Sobre (`#sobre`)
Texto em duas colunas em md+ (bio à esquerda, badge AI First à direita).  
Badge: símbolo DeepCare pequeno + texto "AI First" em caixa com borda verde.

### CTA Final (`#contato`)
Fundo: `bg-green-dark` ou background com cor sólida `#243D36`.  
Botão: `Fale com a DeepCare` → `https://wa.me/5517XXXXXXXXX`, target `_blank`.

### Footer
- Logo: `<Image src="/logo/deepcare-sidebar-dark.svg" height={28} width={125} />`
- Copyright: `© 2026 DeepCare Analytics · São José do Rio Preto – SP`
- Links de âncora: Soluções | Como funciona | Mentoria | Sobre

---

## 6. SEO e Metadata (`layout.tsx`)

```ts
export const metadata: Metadata = {
  title: 'DeepCare Analytics — Inteligência Artificial para empresas',
  description: 'A plataforma de IA para empresas que querem crescer na prática. Soluções prontas, implementação rápida, resultado mensurável.',
  icons: { icon: '/logo/deepcare-simbolo-dark.svg' },
  openGraph: {
    title: 'DeepCare Analytics',
    description: 'Inteligência Artificial para empresas que querem crescer na prática.',
    url: 'https://deepcareanalytics.com',
    siteName: 'DeepCare Analytics',
  },
}
```

---

## 7. Responsividade

- **Mobile-first**: layouts em `flex-col` por padrão
- **md (768px)**: grids ativam, hero em duas colunas, nav desktop visível
- **lg (1024px)**: espaçamentos maiores, tipografia escala

---

## 8. Restrições

- Sem imagens de banco de imagens — apenas SVG, tipografia e cor
- Sem formulários — todo contato via WhatsApp (`https://wa.me/5517XXXXXXXXX`)
- Verde: nunca saturado/brilhante — rigorosamente a paleta definida
- Logos: sempre via `next/image` ou `<img>` apontando para `/logo/` — nunca inline

---

## 9. Estratégia de Build (Opção B — Sequencial)

Ordem de implementação:

1. Scaffold Next.js 14 (`create-next-app`) + instalar dependências
2. `tailwind.config.ts` com tokens de cor
3. `globals.css` com CSS variables + resets
4. `app/layout.tsx` com metadata e font
5. `components/Header.tsx`
6. `components/Hero.tsx`
7. `components/Credibilidade.tsx`
8. `components/Solucoes.tsx`
9. `components/ComoFunciona.tsx`
10. `components/Premissa.tsx`
11. `components/Mentoria.tsx`
12. `components/Sobre.tsx`
13. `components/CTAFinal.tsx`
14. `components/Footer.tsx`
15. `app/page.tsx` — composição final
16. `npm run build` — verificar erros antes do deploy
