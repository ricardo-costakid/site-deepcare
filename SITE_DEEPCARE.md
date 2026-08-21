# Site DeepCare Analytics — Estado Atual
**Última atualização:** 07/06/2026  
**Versão:** 1.8  
**Deploy:** Vercel → deepcareanalytics.com  
**Repositório:** C:\Projetos\Site-DeepCare  

---

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- lucide-react
- @splinetool/react-spline
- Inter (next/font/google)
- TypeScript

---

## Identidade Visual

```
Fundo principal:     #FFFFFF
Fundo alternado:     #F8F9FA
Fundo escuro:        #1A2620 via token bg-bg-dark (Premissa, CTAFinal, Comunidade)
Fundo cards escuros: #1A2620 (cards Soluções, cards FeatureCard), hover #1F2E26
Texto primário:      #111111
Texto secundário:    #555555
Verde principal:     #5B8F7A
Verde médio:         #3D6357
Verde claro:         #8BBFAE
Laranja CTA:         #DA7756 (CTAs secundários/ghost a partir de 06-07)
Borda sutil:         #E5E7EB
```

---

## Estrutura de Arquivos

```
app/
  layout.tsx              ✅ SEO configurado
  page.tsx                ✅ Monta todas as seções
  globals.css             ✅ Light mode, scroll suave — CSS custom de cards removido
  comunidade/
    layout.tsx            ✅ Isolado — sem header/footer, metadata próprio
    page.tsx              ✅ Formulário conversacional 5 etapas
  saude/
    page.tsx              ✅ Página setorial /saude — ver detalhes abaixo
components/
  Header.tsx              ✅ Ver detalhes abaixo
  Hero.tsx                ✅ Ver detalhes abaixo
  Credibilidade.tsx       ✅
  Solucoes.tsx            ✅ Ver detalhes abaixo
  ComoFunciona.tsx        ✅
  Premissa.tsx            ✅
  Mentoria.tsx            ✅
  Comunidade.tsx          ✅ Nova seção — ver detalhes abaixo
  Sobre.tsx               ✅
  CTAFinal.tsx            ✅
  Footer.tsx              ✅
lib/
  constants.ts            ✅ WA_URL = 'https://wa.me/5517992449351' (número corrigido; botões usam links diretos com texto pré-preenchido)
public/
  logo/
    deepcare-logo-clara.svg       ← fundo branco (texto escuro)
    deepcare-logo-dark.svg        ← fundo escuro (texto branco)
    deepcare-sidebar-dark.svg     ← footer
    deepcare-sidebar-light.svg
    deepcare-simbolo-dark.svg     ← favicon
    deepcare-simbolo-light.svg
  avatar/
    ricardo.jpeg                  ← usado na página /comunidade
  images/
    bid-login-preview.png         ← não utilizada (substituída pelo vídeo login-bid-demo.mp4)
  videos/
    login-bid-demo.mp4            ← BID Intro (bloco 02b · /saude)
    overview-bid-demo.mp4         ← Overview (bloco 03 · /saude)
    dash-financeiro-bid-demo.mp4  ← Dashboard Financeiro (bloco 03 · /saude)
    gcaixa-bid-demo.mp4           ← Gestão de Caixa (bloco 03 · /saude)
    faturamento-bid-demo.mp4      ← Faturamento (bloco 03 · /saude)
    intel-faturamento-bid-demo.mp4← Intel. Faturamento (bloco 03 · /saude)
    Lux-bid-demo.mp4              ← Lux IA (bloco 03 · /saude)
tailwind.config.ts
next.config.mjs
package.json
```

---

## Componentes — Estado Detalhado

### Header.tsx ✅
- Logo: `deepcare-logo-clara.svg`, height 32px — **href dinâmico**: `usePathname()` do `next/navigation`; `pathname === '/saude' ? '/saude' : '/'`
- Nav: **Features** (dropdown) | Como funciona | Sobre
- Link: **Entrar** → https://app.deepcareanalytics.com/login
- CTA desktop: **Soluções para Saúde** → `/saude` (botão verde sólido, ícone HeartPulse, rounded-full)
- CTA mobile drawer: **Conhecer agora** → WhatsApp (WA_URL)
- Comportamento: sticky, backdrop-blur ao scrollar
- **Dropdown Features (desktop):** hover abre painel centralizado com Framer Motion
  - Animação: fade + translateY(−8px → 0), AnimatePresence
  - Posicionamento: `left-1/2 -translate-x-1/2` em wrapper externo (evita conflito com transform do FM)
  - Fundo branco, borda #E5E7EB, border-radius 12px, sombra leve
  - Itens: LayoutGrid **Soluções** → `#solucoes` | GraduationCap **Mentoria** → `#mentoria` | Users **Comunidade** → `/comunidade`
  - Hover item: bg-[#F8F9FA], texto #5B8F7A
- **Dropdown Features (mobile):** acordeão no drawer com AnimatePresence (height 0→auto)
- ChevronDown rotaciona 180° quando aberto
- **Drawer mobile (06-06):**

| Elemento | Classes / comportamento |
|---|---|
| Overlay | `fixed inset-0 bg-black/50 z-40 md:hidden` — cobre a tela toda |
| Painel | `fixed top-0 right-0 h-full w-72 bg-white z-50 md:hidden shadow-xl` |
| Animação | Framer Motion `x: 288 → 0` (entra da direita) via `AnimatePresence` |
| Fechar | Clique no overlay **ou** no botão X dentro do painel |
| Body scroll | `document.body.style.overflow = 'hidden'` ao abrir; restaurado ao fechar via `useEffect([menuOpen])` |

### Hero.tsx ✅
- Layout: duas colunas — texto esquerda (~50%), Spline direita (~50%)
- Section: `relative flex items-start pt-16 bg-white overflow-visible` — `min-h-screen` removido (06-07)
- Inner div: `max-w-[1200px] mx-auto px-6 pt-6 pb-10 w-full flex flex-col md:flex-row items-center gap-12` — `pb-20` → `pb-10` (06-07)
- Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
  - Container do orb: `hidden md:flex md:w-1/2` — oculto no mobile (06-06)
  - Partículas verdes: Color A `5B8F7A`, Color B `8BBFAE`
  - Fundo transparente (BG 0%)
  - Texto "Move your mouse." removido
- Scroll fix: useEffect com retry para repassar wheel event ao window (multiplicador 2.0)
- Pílula: "INTELIGÊNCIA ARTIFICIAL PARA EMPRESAS" — `tracking-[2px] uppercase text-[#5B8F7A] bg-[#5B8F7A]/[0.12] border border-[#5B8F7A]/20 rounded-full px-4 py-1.5`
- Headline: "A plataforma das empresas que crescem com IA na prática."
- Slogan: "IA implementada com ética, segurança e resultado mensurável — você no controle de cada etapa."
- CTAs: "Quero uma demonstração" (verde, WA: "Olá! Quero conhecer uma demonstração da DeepCare.") + "Ver soluções →" (`text-[#DA7756] hover:text-[#c4664a]`) (06-07)
- **Trust signals** abaixo dos CTAs (`flex flex-wrap gap-x-6 gap-y-3 mt-6`):
  - ShieldCheck "Dados protegidos"
  - UserCheck "Supervisão humana"
  - BarChart2 "Resultados auditáveis"
  - Estilo: `text-sm text-[#555555]`, ícones `text-[#5B8F7A] w-4 h-4 strokeWidth={1.5}`

### Credibilidade.tsx ✅
- Fundo: #F8F9FA
- Texto: "Saúde, advocacia, varejo, educação… IA que gera resultado em qualquer setor." (06-07)
- Linhas decorativas (`h-px`) removidas; `bg-border-subtle` removido (06-07)

### Solucoes.tsx ✅
- Padding: `py-20` (06-07)
- Título: "Nossas Soluções"
- Subtítulo: "Explore soluções plug & play..."
- Link simples: **"Quero uma solução personalizada →"** → `/comunidade` — `text-[#DA7756] hover:underline`, sem borda, sem fundo (06-07)
- **Mobile (06-06):** carrossel horizontal com scroll snapping

```
mobile:  flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide
desktop: md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pb-0
```

Cada card wrapper: `snap-start shrink-0 w-[80vw] md:w-auto`  
Scrollbar oculta via `.scrollbar-hide` em `globals.css` (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`).

- **Cards (estilo dark `#1A2620`):** `flex flex-col`, ícone e tagline em #5B8F7A, título branco, descrição text-gray-400
  - Borda: border-white/8
  - Hover: `bg-[#1F2E26]`, `border-[#5B8F7A]/50`, `shadow-[0_0_30px_rgba(91,143,122,0.15)]`, `scale(1.02)`
  - Transição: Framer Motion `type: spring, stiffness: 400, damping: 25`
  - **Ícone:** `absolute top-4 right-4`, `w-16 h-16`, `text-white/10`, `strokeWidth={1.5}`
  - Título e tagline com `pr-20` (recuo para não colidir com ícone absoluto)
  - **Rodapé de cada card** (`border-t border-white/5`, `mt-auto`):
    - "Saiba mais →" → `/comunidade?solucao={nomeDaSolucao}`, cor `#5B8F7A`
    - "WhatsApp" → `wa.me/5517981852807?text=Olá, tenho interesse na solução {nomeDaSolucao} da DeepCare.`, ícone SVG WhatsApp `w-4 h-4`
  1. **Lux** — Seu analista sênior com IA
  2. **Painel Financeiro Executivo** — Visibilidade total do seu caixa
  3. **SDR no WhatsApp** — Seu vendedor que nunca dorme
  4. **NPS Automatizado** — Satisfação do cliente no piloto automático
  5. **Juris AI** — IA para escritórios de advocacia
  6. **Gestão de Vendas com IA** — Do pedido ao bolso, sem planilha
  7. **Inventário e Controle de Ativos com IA** *(sem tagline)*
  8. **Conciliação de Cartão de Crédito com IA** — Todas as maquininhas, um só painel
  9. **ERP Financeiro com Open Finance** — Contas a pagar, receber e fluxo de caixa integrados

### ComoFunciona.tsx ✅
- Padding: `py-20` (06-07)
- Fundo: #F8F9FA
- Título: "Da conversa ao resultado — direto ao ponto."
- Subtítulo: "Três etapas pensadas para encaixar na sua rotina."
- Layout: flex-col com separador border-b border-[#E5E7EB] entre passos, py-16 em cada bloco
- Zigue-zague: passo 01 e 03 → texto esquerda + gráfico direita | passo 02 → gráfico esquerda + texto direita
- Número decorativo: 56px, text-[#C8CDD4], acima do título
- Mobile: coluna gráfica hidden md:block, texto ocupa largura total
- Animações: Framer Motion opacity 0→1, y 24→0, viewport once:true, stagger 0.1s entre texto e gráfico

**PASSOS:**

01 · Diagnóstico
- Subtítulo verde: "Você nos conta onde quer escalar e onde os processos estão travando."
- Descrição: "Reunião direta, sem formulário, sem apresentação de vendas. A gente ouve, analisa o fluxo real e identifica onde a IA entrega resultado — LUCRO a MAIS ou CUSTO a MENOS."
- "LUCRO a MAIS" e "CUSTO a MENOS" em font-semibold text-[#5B8F7A]
- GraphicCard: bg-[#1A2620], border-white/10, rounded-2xl
  → Palavra fantasma "DIAGNÓSTICO" — fontSize 52px, font-black, text-white/10, whitespace-nowrap
  → 3 linhas mono text-[#5B8F7A] opacity-80, divide-white/10:
     "→ sem formulário" | "→ sem pitch de vendas" | "→ foco no seu resultado"

02 · Setup
- Subtítulo verde: "A solução entra no seu ambiente."
- Descrição: "Criamos, configuramos e integramos com o que você já usa — WhatsApp, planilhas, sistema de gestão — e validamos tudo junto com você antes de colocar para rodar em produção. E você não precisa se preocupar, estaremos ao seu lado para garantir que tudo vai dar certo."
- GraphicCard: mesmo estilo
  → Palavra fantasma "SETUP"
  → "→ whatsapp, planilha, erp" | "→ validado com você" | "→ zero burocracia"

03 · Evolução contínua
- Subtítulo verde: "A IA trabalha. Você acompanha. A gente evolui."
- Descrição: "Suporte ativo, ajustes contínuos e evolução da solução conforme seu negócio cresce."
- GraphicCard: mesmo estilo
  → Palavra fantasma "EVOLUÇÃO"
  → "→ suporte ativo" | "→ ajustes contínuos" | "→ cresce com você"

### Premissa.tsx ✅
- Padding: `py-20` (06-07)
- Fundo: bg-bg-dark (#1A2620), seção `relative overflow-hidden`
- Label: "Nossa Premissa" (verde, 11px, tracking 2px)
- Subtítulo: "Régua de sucesso:" (06-07; era "Nossa régua de sucesso:")
- Headline: "Aumentar o lucro, reduzir custos — **ou** os dois." — "ou" em #5B8F7A
- Subtexto: "A entrega só faz sentido se gerar valor real para o seu negócio."
- **Texto fantasma "RESULTADO":** `absolute top: 0, left: 0`, filho direto da `<section>`, `rgba(255,255,255,0.04)`, `clamp(40px, 9vw, 140px)`, font-black, whiteSpace nowrap (06-06: min reduzido de 72px para 40px)

### Mentoria.tsx ✅
- Padding inner div: `py-20` (06-07)
- Layout duas colunas: texto esquerda, Spline direita
- Bloco decorativo "1:1" substituído por componente Spline
- `SplineMentoria` via `dynamic(() => import('@splinetool/react-spline'), { ssr: false })`
- URL Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- `useRef splineContainerRef` → scroll fix via `useEffect` com retry; `querySelector('canvas')` dentro do container (sem conflito com canvas do Hero)
- Container Spline: `hidden md:block`, `height: 600px`, `overflow: visible`, `position: relative`, `width: 100%`
- Coluna esquerda com `pb-16` para alinhamento vertical com a orb
- CTA hero: "Quero agendar uma sessão →" — `text-[#DA7756]`, link simples (WA: "Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare.") (06-07)
  - Pílula verde "MENTORIA" (`bg-[#5B8F7A] text-white text-xs px-2 py-0.5 rounded-full mr-2`) antes do texto
- CTA final: "Agendar uma sessão" (botão sólido verde, mesmo link WA)

### Comunidade.tsx ✅ *(nova)*
- Seção inserida em `page.tsx` entre `<Mentoria />` e `<Sobre />`
- Fundo: bg-[#1A2620], id="comunidade", `py-12 md:py-20`, `relative overflow-hidden` (06-07: md:py-24 → md:py-20)
- Layout: duas colunas `grid-cols-[55%_45%]` no desktop
- **Texto fantasma "COMUNIDADE":** filho direto da `<section>`, `absolute top: 1rem, left: 50%, translateX(-50%)`, `rgba(255,255,255,0.04)`, `clamp(40px, 9vw, 140px)`, font-black — aparece acima do badge (06-07: top 2rem→1rem; 06-06: min 72px→40px)
- **Coluna esquerda:**
  - Badge pill: "COMUNIDADE" — tracking largo, cor #5B8F7A, bg rgba(91,143,122,0.12)
  - Headline: "Resolvemos problemas de quem resolve problemas."
  - Subtítulo: "Uma comunidade onde você conta seus maiores desafios — e juntos criamos e conectamos você à solução certa."
  - CTA: "Quero fazer parte →" → `/comunidade` (botão verde sólido, rounded-full)
- **Coluna direita (desktop):**
  - 3 linhas mono em #5B8F7A opacity-60 com stagger Framer Motion (delay 0.15s):
    - `→ diagnóstico coletivo` | `→ soluções reais` | `→ resultado mensurável`

### Sobre.tsx ✅
- Padding: `py-20` (06-07)
- Fundo: #F8F9FA
- Copy: filosofia AI First — sem mencionar Ricardo pelo nome
- Layout duas colunas: texto esquerda | Spline direita (mesma orb do Hero/Mentoria)
- Orb Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- Scroll fix replicado do Mentoria.tsx (`useRef + useEffect` com retry, `querySelector('canvas')` dentro do container)
- Container Spline: `hidden md:block`, `height: 600px`, `overflow: visible`

### CTAFinal.tsx ✅
- Padding: `py-20` (06-07)
- Fundo: bg-bg-dark (#1A2620), seção `relative overflow-hidden`
- **Texto fantasma "TRANSFORMAÇÃO":** `absolute right: 0, bottom: 1rem`, filho direto da `<section>`, `rgba(255,255,255,0.04)`, `clamp(40px, 9vw, 140px)`, font-black (06-06: min 72px→40px)
- Card ~90% largura, border-radius 24px
- Botão: "Fale com a DeepCare" → `https://wa.me/5517992449351?text=Olá! Quero saber como a DeepCare pode ajudar meu negócio.`

### Footer.tsx ✅
- Logo: `deepcare-logo-clara.svg`, height 28px (texto escuro para fundo branco)
- Layout 3 colunas: Logo+descrição | Navegação | Contato
- Contato: contato@deepcareanalytics.com | (17) 99244-9351 | LinkedIn
- LinkedIn: `linkedin.com/in/ricardo-costa-139780ba`
- WhatsApp com mensagem: "Olá! Vim pelo site da DeepCare e quero mais informações."
- © 2026 DeepCare Analytics · São José do Rio Preto – SP

---

## Rota /comunidade ✅ *(nova)*

### app/comunidade/layout.tsx
- Layout isolado (sem header/footer do site principal)
- Metadata: título "Comunidade DeepCare", descrição própria

### app/comunidade/page.tsx
- `'use client'`, altura 100vh, sem scroll externo
- **Layout duas colunas (desktop):** painel escuro 40% | área chat 60%
- **Painel esquerdo (`#1A2620`, desktop only):**
  - Logo `deepcare-logo-dark.svg`
  - Separador `bg-white/10`
  - Headline: "Onde gestores e profissionais resolvem problemas com IA — juntos."
  - Subtítulo: "Aqui você conta seus desafios reais... ou criamos uma personalizada para você."
  - "← Voltar ao site" fixo `bottom-8 left-12` (text-gray-500, hover text-gray-300)
  - Copyright © 2026 DeepCare Analytics
- **Área chat (fundo branco):**
  - Barra superior: "← Voltar ao site" (mobile, md:hidden) | "Recomeçar" (direita, some na tela final)
  - Avatar `/avatar/ricardo.jpeg` circular (w-10 h-10) à esquerda de cada bolha do Ricardo
  - Bolha Ricardo: bg-[#F8F9FA], texto #111111, rounded-2xl rounded-tl-none
  - Bolha usuário: bg-[#5B8F7A], texto branco, rounded-2xl rounded-tr-none
  - Animação: opacity 0→1, y 8→0, duration 0.4s (Framer Motion, AnimatePresence)
  - Input aparece 600ms após bolha do Ricardo; Enter envia; auto-focus
  - Auto-scroll: `useRef + scrollIntoView` a cada nova mensagem
- **Parâmetro de URL:** `useSearchParams()` → `solucao = searchParams.get('solucao')`
- **5 perguntas sequenciais:**
  1. Primeira mensagem personalizada conforme origem:
     - Com parâmetro: "Oi! Vi que você tem interesse no {solucao}. Eu sou o Ricardo, fundador da DeepCare. Qual é o seu nome?"
     - Sem parâmetro: "Oi! Eu sou o Ricardo, fundador da DeepCare. Qual é o seu nome?"
  2. "Prazer, [nome]! Qual é o seu WhatsApp? (com DDD)"
  3. "Ótimo! Qual o nome da sua empresa e o que ela faz?"
  4. "Entendido. Qual a maior dificuldade que você enfrenta hoje no seu negócio?"
  5. "Obrigado por compartilhar isso. Tem mais alguma coisa que queira contar antes de finalizarmos?" *(campo opcional, permite envio vazio)*
- **Tela final:** "Recebemos tudo! Em breve entro em contato com você pelo WhatsApp."
- **Notificação de lead:** POST para rota interna `/api/notify-lead` (`app/api/notify-lead/route.ts`) com payload `{nome, whatsapp, empresa, desafio, extra, solucao}` — `solucao` recebe o parâmetro da URL ou `'Não especificada'`; falha silenciosa (`.catch(() => {})`)
  - A rota monta a mensagem (HTML `parse_mode`) e envia via Telegram Bot API (`POST https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage`) para o chat configurado em `TELEGRAM_CHAT_ID`
  - Variáveis `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` são server-only (nunca expostas ao client), configuradas em `.env.local` e na Vercel (projeto site-deepcare)
  - Substitui o webhook N8N (Railway, trial expirado, 20/08) — código do webhook antigo mantido comentado em `page.tsx` como fallback desativado, ver Infraestrutura

---

## app/saude/page.tsx ✅

**Fundo da página:** `#F8F9FA` (light mode)

### Breadcrumb ✅

- Inserido entre `<Header />` e `<main>`, sticky abaixo do header
- `sticky top-[60px] z-40` — cola logo abaixo do Header ao scrollar
- Fundo: `#F8F9FA`, border-bottom: `1px solid #E5E7EB`, altura: `h-9`
- Container interno: `max-w-[1200px] mx-auto px-6 w-full` (alinhado com seções da página)
- Conteúdo: `← DeepCare` (`<Link href="/">`, cor `#5B8F7A`) · `/` (span, `#CCCCCC`) · `Soluções para Saúde` (span, `#555555`)

### Primitivos compartilhados (locais ao arquivo)

**`FeatureCard`** — card escuro reutilizado em Problemas e Por que a DeepCare:
- bg: `#1A2620`, hover: `#1F2E26`
- Borda: `border-white/8`, hover: `border-[#5B8F7A]/50`
- Hover shadow: `shadow-[0_0_30px_rgba(91,143,122,0.15)]`, scale 1.02 (Framer Motion spring)
- Ícone fantasma: `absolute top-4 right-4`, `w-16 h-16`, `text-white/10`, `strokeWidth={1.5}`
- Título: `text-lg font-semibold text-white`, `pr-20`
- Texto: `text-gray-400 text-sm leading-relaxed`

**Pílula "Dados fictícios"** — presente em todos os blocos de vídeo **exceto** BID Intro:
```jsx
<span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 border border-orange-200 rounded-full px-3 py-1.5 text-xs mt-4">
  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
  Dados fictícios para fins ilustrativos
</span>
```

### 01 · Hero ✅

- Section: `bg-[#F8F9FA] pt-10 pb-8 md:pb-32 overflow-visible` — `pt-24` → `pt-10` (06-07); `pb-32` → `pb-8 md:pb-32` (mobile fix 07/06)
- Grid: `md:grid-cols-2 gap-16 items-center`
- **Coluna esquerda** (`Reveal`, `self-start pt-2`): — `pt-8` → `pt-2` (06-07)
  - Pílula badge: "Setor de Saúde"
  - Headline `h1`: "Inteligência de negócios para clínicas crescerem com direção e clareza."
  - Subtítulo: "O BID foi construído por profissionais com mais de 20 anos no setor de saúde, a partir de problemas reais de gestão clínica — faturamento invisível, caixa imprevisível e decisões tomadas sem dados. Tudo isso em um único painel, plug and play com o ERP que você já usa."
  - Botão: **"Ver soluções para saúde ↓"** — `href="#bid-intro"`, pílula sólida: bg `#DA7756`, texto branco, `font-weight 500`, `padding 10px 20px`, `border-radius 9999px` — **único botão** (sem "Quero uma demonstração")
  - Trust signals (`flex flex-wrap gap-x-6 gap-y-3 mt-8`): 4 items com ícones `text-[#5B8F7A] w-4 h-4`:
    - CheckCircle "Funciona com o sistema que você já usa"
    - ShieldCheck "Dados protegidos e isolados por clínica"
    - BarChart2 "Resultado mensurável desde o primeiro mês"
    - Headphones "Suporte direto com quem construiu a solução"
- **Coluna direita:** `hidden md:flex items-center justify-center` — orb Spline (`https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`), `height: 600px`, `marginTop: 80px`, scroll fix com retry 20× 300ms; **oculto no mobile** (mobile fix 07/06)

### 02 · Problemas ✅

- Section: `id="problemas-saude"`, `bg-[#F8F9FA] pt-8 pb-4 md:py-24`
- Título `h2`: "Sua clínica produz. Mas quanto disso vira resultado?"
- Subtítulo: "Problemas que gestores de clínica enfrentam todo dia."
- **Desktop:** grid `md:grid-cols-2 md:gap-6` — 4 `FeatureCard` escuros com ícone fantasma
- **Mobile:** carrossel `flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide`; card wrapper `snap-start shrink-0 w-[80vw] h-[320px] overflow-hidden md:w-auto md:h-auto md:overflow-visible`; `FeatureCard` com `h-full`; hint "deslize para ver mais" após o carrossel (`flex md:hidden`, cor `#DA7756`, ícone `ChevronRight`)

| # | Ícone | Título | Texto |
|---|-------|--------|-------|
| 1 | Receipt | Faturamento sem clareza | "De tudo que foi produzido, quanto foi faturado? O que aconteceu com o que não foi faturado? De tudo que foi faturado, quanto foi recebido? O que ainda não entrou — está a receber ou foi glosado? E o que foi glosado: por quê foi glosado e foi recursado? Perguntas que toda clínica deveria conseguir responder." |
| 2 | EyeOff | Caixa sem visibilidade | "Qual a capacidade do caixa hoje? Quanto vai entrar nos próximos dias? Quando as saídas vão superar as entradas? Sem essas respostas, decisões importantes podem ser tomadas no escuro — e o problema só aparece quando já é tarde." |
| 3 | ScanLine | Inventário de equipamentos | "Clínica sem inventário real dos seus equipamentos. Manutenção vencida sem alerta. Auditoria da vigilância sanitária chegando sem histórico organizado. Cada um desses problemas custa dinheiro e tempo." |
| 4 | Workflow | Processos manuais | "Ligar para fornecedor, atualizar planilha, avisar paciente manualmente. Tarefas repetitivas que consomem o tempo da equipe todo dia — tempo que poderia estar em atendimento." |

### 02b · BID Intro ✅

- Section: `id="bid-intro"`, `bg-[#F8F9FA] py-24`
- Layout: coluna única centralizada

**1 · Header centralizado**
- Tagline pill: "BID — BUSINESS INTELLIGENCE DEPARTMENT"
- Título `h2`: "Tenha um Departamento de Inteligência inteiro na sua clínica." — `text-2xl md:text-4xl` (mobile fix 07/06)
- Subtítulo verde: "Tudo que importa, em um lugar só." — `text-lg font-medium text-[#5B8F7A]`

**2 · Vídeo**
- Arquivo: `login-bid-demo.mp4`
- Classes: `mt-8 w-full rounded-2xl aspect-video`, `autoPlay muted loop playsInline`
- **Sem pílula "Dados fictícios"**

**3 · Grid** (`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-10`)
- Esquerda (`hidden md:block`): descrição completa (plug and play, ERPs, módulos Financeiro / Caixa / DRE / Faturamento / Glosas / guias não faturadas, Lux 24/7) — **oculta no mobile**
- Direita: 5 bullets com `→`:
  - Plug and play — funciona com qualquer ERP
  - Financeiro, Caixa, DRE e Faturamento em um só painel
  - Análise de glosas e guias não faturadas identificadas automaticamente
  - Lux: converse em linguagem natural, no celular ou no desktop, 24/7
  - KPIs que monitoram e alertam o gestor em tempo real

### 03 · Soluções ✅

- Section: `id="solucoes-saude"`, `bg-[#F8F9FA] py-8 md:py-24`
- Container: `flex flex-col gap-8 md:gap-24`
- Cada bloco: header centralizado → vídeo → grid → pílula → CTA
- **Grid por bloco:** `grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-6 md:mt-10`
  - Coluna esquerda (`hidden md:block`): descrição longa — **oculta no mobile**
  - Coluna direita: bullets com `→`
- **Pílula "Dados fictícios"** movida para **fora do grid**, logo abaixo (`mt-4`)
- **CTA "Quero meu Departamento de Inteligência →"** movido para **fora do grid**, abaixo da pílula (`mt-4`); classes mobile: `w-full md:w-auto text-center md:text-left`; link → `https://wa.me/5517992449351?text=Olá! Quero conhecer o BID da DeepCare.`
- **Títulos h3:** `text-2xl md:text-4xl font-bold` (mobile fix 07/06)
- **LensTrack e DeepCare Assets removidos**

---

#### Overview

- Tagline pill: "OVERVIEW — ACOMPANHE SUA META DE FATURAMENTO"
- Título `h3`: "Sua meta de faturamento, acompanhada em tempo real."
- Vídeo: `overview-bid-demo.mp4`
- Descrição: "Na Overview, o gestor define a meta e o BID monitora o andamento — com alertas em percentual se está abaixo, acima ou direto no alvo. Faturamento realizado, projeção de fechamento e progresso acumulado visíveis em um só painel, por mês, trimestre, semestre ou ano. Plug and play com qualquer ERP. Disponível no celular, onde você estiver."
- Bullets (6):
  - Meta de faturamento com progresso em tempo real
  - Alerta automático: abaixo, acima ou direto no alvo
  - Projeção de fechamento do período
  - Glosa do período identificada e monitorada
  - Visão mensal, trimestral, semestral e anual
  - Disponível no mobile — acompanhe de onde estiver

---

#### Dashboard Financeiro

- Tagline pill: "DASHBOARD FINANCEIRO — RESULTADO REAL DA SUA OPERAÇÃO"
- Título `h3`: "O resultado financeiro da sua clínica, sem precisar abrir planilha."
- Vídeo: `dash-financeiro-bid-demo.mp4`
- Descrição: "No Dashboard Financeiro, o gestor vê em tempo real o que entrou, o que saiu e onde está o dinheiro — com DRE simplificado, breakeven do mês e análise de receitas e despesas por categoria. Ao clicar em qualquer card, é possível aprofundar no detalhe de cada lançamento. O gráfico de Balanço Diário de Liquidez aponta desequilíbrios no fluxo de caixa antes que virem problema. Plug and play com qualquer ERP."
- Bullets (6):
  - DRE simplificado em tempo real
  - Breakeven: quanto falta para cobrir os custos do mês
  - Receitas e despesas separadas por categoria
  - Evolução mensal do resultado — sem planilha
  - Balanço Diário de Liquidez com alerta de desequilíbrio
  - Visão por período: mês, trimestre, semestre e ano

---

#### Gestão de Caixa

- Tagline pill: "GESTÃO DE CAIXA — PROJEÇÃO FUTURA"
- Título `h3`: "Saiba quando o caixa vai entrar em déficit — antes que aconteça."
- Vídeo: `gcaixa-bid-demo.mp4`
- Descrição: "Na Gestão de Caixa, o BID projeta o fluxo futuro com base no disponível em caixa, bancos e cartões, somado às contas a receber de convênios e particulares, e descontando os compromissos de pagamento já lançados. O gestor vê o ponto exato de tensão no fluxo antes que ele vire problema, identifica receitas futuras que podem ser antecipadas e acompanha a capacidade de cobertura do caixa para os compromissos à frente. Plug and play com qualquer ERP."
- Bullets (6):
  - Projeção futura com base no disponível, a pagar e a receber
  - Caixa, bancos e cartões consolidados
  - Convênios e recebíveis futuros mapeados
  - Ponto de déficit identificado antes do aperto
  - Capacidade de cobertura do caixa analisada
  - Receitas antecipáveis sinalizadas

---

#### Faturamento

- Tagline pill: "FATURAMENTO — JORNADA DO FATURAMENTO"
- Título `h3`: "Cada etapa do seu faturamento, visível em tempo real."
- Vídeo: `faturamento-bid-demo.mp4`
- Descrição: "Na tela de Faturamento, o BID responde as perguntas que toda clínica tem dificuldade em responder: de tudo que foi produzido, quanto foi faturado? O que aconteceu com o que não foi faturado? De tudo que foi faturado, quanto foi recebido? O que ainda não entrou — está a receber ou foi glosado? E o que foi glosado: por quê foi glosado e foi recursado? O BID mapeia exatamente as guias não faturadas e monitora quanto tempo cada uma está parada sem faturar — para que o gestor saiba o que está acontecendo em cada etapa. No detalhamento, o ranking de produção médica mostra como o faturamento se distribui entre a parte do médico e da clínica — deixando a relação completamente transparente. Plug and play com qualquer ERP."
- Bullets (6):
  - Faturado, Recebido, Glosado e A Receber em tempo real
  - Guias não faturadas mapeadas e rastreadas
  - Glosas detalhadas: motivo e status de recurso
  - Ranking de produção médica com split clínica/médico
  - Composição por convênio, médico e procedimento
  - Visão por período: mês, trimestre, semestre e ano

---

#### Intel. Faturamento

- Tagline pill: "INTEL. FATURAMENTO — AUDITORIA DE PROTOCOLOS CLÍNICOS"
- Título `h3`: "Descubra o dinheiro que sua clínica deixou na mesa."
- Vídeo: `intel-faturamento-bid-demo.mp4`
- Descrição: "Após definir o protocolo de exames por faixa etária, o BID vasculha toda a base de dados em busca de pacientes que passaram pela clínica e não realizaram os exames indicados. O resultado aparece em valor financeiro exato: quanto a clínica deixou de faturar e, mais importante, quantos pacientes deixaram de receber o diagnóstico correto. Ao clicar em qualquer exame, o BID abre a lista nominal dos pacientes — com convênio, data da consulta e valor — pronta para auditoria e recuperação ativa. Plug and play com qualquer ERP."
- Bullets (6):
  - Protocolos clínicos configuráveis por faixa etária
  - Auditoria automática: quem não realizou o exame indicado
  - Dinheiro na mesa calculado em valor financeiro real
  - Lista nominal de pacientes por exame — exportável
  - Gap de oportunidade por convênio e por médico
  - Recuperação de receita com rastreabilidade clínica

---

#### Lux IA

- Tagline pill: "LUX IA — SEU ANALISTA SÊNIOR, ONDE VOCÊ ESTIVER"
- Título `h3`: "Converse sobre sua clínica. O Lux responde com os seus dados."
- Vídeo: `Lux-bid-demo.mp4`
- Descrição: "O Lux é o analista sênior da clínica — com perfil de BI, Analytics, Data Science e Machine Learning. Converse em linguagem natural e o Lux busca, calcula e responde com os dados reais do negócio, sem alucinação. Prepara análises de desempenho, decomposição de despesas, comparativos entre períodos, materiais para reunião com diretoria e estratégias de negociação com fornecedores — tudo pronto para salvar em PDF ou imprimir. E quanto mais dados a clínica acumula, maior fica sua capacidade analítica: o Lux aprende com o histórico do negócio, descobre padrões em receita e despesa que passariam despercebidos e ajuda o gestor a tomar decisões mais seguras e embasadas. Disponível no celular e no computador, 24 horas por dia, 7 dias por semana."
- Bullets (8):
  - Respostas em linguagem natural com dados reais da clínica
  - BI Sênior, Analytics, Data Science e Machine Learning
  - Análise de faturamento, despesas, margem e caixa
  - Materiais para reunião prontos para PDF ou impressão
  - Suporte a negociação com fornecedores baseado em dados
  - Zero alucinação — o Lux só afirma o que os dados confirmam
  - Quanto mais dados, mais inteligente — aprende com o histórico
  - Disponível no mobile — onde você estiver

---

### 04 · Por que a DeepCare ✅

- Section: `bg-[#F8F9FA] py-8 md:py-24`
- Título `h2`: "Por que a DeepCare"
- **Desktop:** grid `md:grid-cols-2 md:gap-6 mt-12 md:max-w-4xl md:mx-auto` — 4 `FeatureCard` escuros
- **Mobile:** carrossel `flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide`; card wrapper `snap-start shrink-0 w-[80vw] h-[320px] overflow-hidden md:w-auto md:h-auto md:overflow-visible`; `FeatureCard` com `h-full`; hint "deslize para ver mais" após o carrossel (`flex md:hidden`, cor `#DA7756`, ícone `ChevronRight`)

| # | Ícone | Título | Texto |
|---|-------|--------|-------|
| 1 | Plug | Sem trocar o que você já tem | "O BID conecta direto ao ERP que a clínica já usa — sem migração, sem interrupção da operação. Plug and play com qualquer ERP do mercado. A clínica continua operando normalmente enquanto a inteligência entra em funcionamento." |
| 2 | ShieldCheck | Segurança e privacidade | "Isolamento de dados por Row Level Security — o mesmo padrão de segurança usado por bancos e operadoras de saúde. Hospedados na AWS. Acesso por perfil com autenticação segura. Contrato de proteção de dados incluso — conformidade LGPD garantida desde o primeiro dia." |
| 3 | Users | Implementação acompanhada | "Você não recebe um software, recebe inteligência. A DeepCare acompanha cada etapa com você — setup completo e validação dos dados com o gestor. Suporte ativo durante todo o processo e após a entrega. A solução só vai para produção quando estiver validada e funcionando." |
| 4 | LineChart | Resultado que se mede | "Cada solução entregue tem indicadores claros desde o primeiro dia. Faturamento recuperado, caixa projetado, glosas identificadas, tempo de equipe liberado. Você sabe exatamente o que melhorou, quanto melhorou — e o que ainda pode melhorar." |

### 05 · CTA Final ✅

- Section: `bg-[#F8F9FA] py-8 md:py-24`
- Card branco centralizado, `border border-[#E5E7EB] rounded-3xl p-16 text-center`
- Título `h2`: "Sua clínica merece clareza para crescer." — `text-2xl md:text-4xl` (mobile fix 07/06)
- Subtítulo: "Fale com a DeepCare e descubra por onde começar."
- Botão verde: "Falar com a DeepCare" → `WA_URL`
- Link ghost: "← Voltar ao site" → `/`

---

## Spline — Orb Compartilhada (Hero, Mentoria, Sobre, /saude Hero)

- URL: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- Conta: ricardocostakid@gmail.com
- Texto interno: "DeepCare Analytics" em duas linhas
  - Fonte: Syne Regular, size 35
  - Cor: #5B8F7A, opacidade 70
  - Posição: X:0, Y:-199, Z:188.6
- Partículas: Color A `5B8F7A`, Color B `8BBFAE`, fundo transparente (BG 0%)
- Scroll fix: `useEffect` com retry (`querySelector('canvas')` no container), repassa `wheelEvent` ao `window` com multiplicador 2.0

---

## WhatsApp — Mensagens Pré-preenchidas

Todos os botões usam links diretos (não mais `WA_URL`) com texto encodado. Número: `5517992449351`.

| Botão | Componente | Mensagem |
|---|---|---|
| "Quero uma demonstração" | Hero | Olá! Quero conhecer uma demonstração da DeepCare. |
| "Quero agendar uma sessão" | Mentoria (hero) | Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare. |
| "Agendar uma sessão" | Mentoria (CTA) | Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare. |
| "Fale com a DeepCare" | CTAFinal | Olá! Quero saber como a DeepCare pode ajudar meu negócio. |
| (17) 99244-9351 | Footer | Olá! Vim pelo site da DeepCare e quero mais informações. |
| "Quero meu Departamento de Inteligência →" | /saude — todos os blocos de vídeo | Olá! Quero conhecer o BID da DeepCare. |
| "Falar com a DeepCare" | /saude — CTA Final | WA_URL (sem texto pré-preenchido customizado) |

---

## Textos Fantasma

Palavras decorativas em seções escuras — `rgba(255,255,255,0.04)`, font-black, `clamp(40px, 9vw, 140px)` (06-06: min reduzido de 72px para 40px), whiteSpace nowrap, select-none, `aria-hidden`:

| Componente | Palavra | Posição |
|---|---|---|
| Premissa | RESULTADO | `top: 0, left: 0` — topo esquerdo, filho da `<section>` |
| Comunidade | COMUNIDADE | `top: 1rem, left: 50%, translateX(-50%)` — acima do badge, filho da `<section>` (06-07: top 2rem→1rem) |
| CTAFinal | TRANSFORMAÇÃO | `right: 0, bottom: 1rem` — rodapé direito, filho da `<section>` |

---

## Deploy ✅

| Campo | Valor |
|---|---|
| Site no ar | www.deepcareanalytics.com |
| Plataforma | Vercel — DeepCare's projects / Pro |
| Repositório | github.com/ricardo-costakid/site-deepcare |
| DNS | Hostinger (nameservers próprios) |
| deepcareanalytics.com | → redireciona 307 para www (Valid Configuration) |
| www.deepcareanalytics.com | → Production (Valid Configuration) |
| Variáveis de ambiente | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (ativas); `WEBHOOK_N8N_URL` (legado, webhook desativado) |

---

## Pendências — Próximas Implementações

### 1. ~~Webhook N8N — substituir placeholder~~ ✅ resolvido (20/08)
Superado: leads de `/comunidade` agora notificam via Telegram Bot API (`/api/notify-lead`), não mais via N8N. Ver Rota /comunidade e Infraestrutura Configurada.

### 2. Página /comunidade — Etapa 2
Integração Evolution API para notificação WhatsApp ao Ricardo após cada lead.
**Status:** aguardando configuração no Railway.

### 3. Favicon e sidebar — assinatura AI Native
deepcare-simbolo-dark.svg, deepcare-simbolo-light.svg (favicon) e deepcare-sidebar-dark.svg, deepcare-sidebar-light.svg ainda não foram avaliados quanto à assinatura "AI First" antiga. Verificar se precisam do mesmo tratamento antes de considerar a identidade visual do site totalmente migrada.

---

## Infraestrutura Configurada

| Serviço | URL | Status |
|---|---|---|
| Site principal | deepcareanalytics.com | ✅ Vercel (projeto site-deepcare) |
| Painel de clientes | app.deepcareanalytics.com | ✅ Vercel (projeto deepcare-v2) |
| Notificação leads /comunidade | Telegram Bot API (`@deepcare_leads_bot`), via rota interna `/api/notify-lead` | ✅ ativo (20/08) |
| Webhook leads /comunidade (antigo) | n8n-production-23c9.up.railway.app/webhook/leads-comunidade | ⚠️ desativado — Railway trial expirado, substituído por Telegram Bot API em 20/08, ver histórico |

Botão "Entrar" no Header.tsx aponta para https://app.deepcareanalytics.com/login ✅

**Nota (20/08):** a reestruturação da Hero/LuxMockup (trabalho de 16-20/08 — `Hero.tsx`, `LuxMockup.tsx`, `Tese.tsx`, `Header.tsx`, `ComoFunciona.tsx`) está commitada e preservada na branch `feature/hero-redesign`, ainda **não mesclada em `main`** — incompleta, aguardando retomada.

---

## Tagline Candidata
"Resolvemos problemas de quem resolve problemas." ← headline da seção Comunidade ✅

---

## Decisões Técnicas Registradas

| Decisão | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 14 App Router | Padrão Vercel, fácil deploy |
| Visual hero | Spline Particles (Boxes Hover) | Mais impactante que Canvas 2D |
| Fundo hero | Transparente | Integra com fundo branco do site |
| Cor partículas | #5B8F7A / #8BBFAE | Identidade DeepCare |
| Notificação leads | Evolution API + WhatsApp | Imediato, prático para Ricardo |
| Roteamento clientes | app.deepcareanalytics.com/[cliente] | Simples, sem DNS por cliente |
| Logo no header | deepcare-logo-clara.svg | Texto escuro para fundo branco |
| Dropdown FM + wrapper | Div externa para posição, motion.div para animação | Evita conflito entre transform do FM e -translate-x-1/2 do Tailwind |
| Cards soluções | Dark `#1A2620`, hover `#1F2E26` | Unificação da paleta escura com token bg-bg-dark |
| Card hover | Framer Motion spring (stiffness 400, damping 25) | Resposta mais viva que transition CSS pura |
| Ícone card | Absoluto top-4 right-4, text-white/10 | Decorativo, não compete com conteúdo; pr-20 protege texto |
| Rodapé card | "Saiba mais →" + "WhatsApp" com border-t | CTA duplo sem poluir o corpo do card |
| Parâmetro solucao | useSearchParams em /comunidade | Personaliza primeira mensagem do chat conforme origem (card ou direto) |
| globals.css | CSS custom de cards removido (card-glow-wrapper, card-glow-inner, card-border-glow, border-spin) | Substituído por solução Framer Motion + Tailwind pura |
| Notificação leads /comunidade | Telegram Bot API via rota interna `/api/notify-lead` (20/08) | N8N/Railway desativado (trial expirado); Telegram é imediato e sem dependência de infra externa |
| /saude blocos vídeo | Coluna única (header → vídeo → grid 2 cols) | Vídeos fullwidth são mais impactantes que layout ProductBlock 30/70 |
| Pílula dados fictícios | Presente em todos os blocos exceto BID Intro | BID Intro mostra tela de login sem dados reais; demais blocos contêm KPIs ilustrativos |
| CTAs secundários (ghost) | `text-[#DA7756]` sem borda/fundo (06-07) | Laranja #DA7756 cria contraste sem peso visual de botão; verde reservado para CTAs primários |

---

## Changelog de Sessões

### Correções mobile — 2026-06-06

1. **Hero.tsx** — container do orb: `hidden md:flex md:w-1/2`; orb Spline só carrega a partir de `md`
2. **Premissa · Comunidade · CTAFinal** — `overflow-hidden` na `<section>` raiz; clamp mínimo de textos fantasma: `72px` → `40px`
3. **Header.tsx** — drawer mobile refatorado com overlay + painel fixed, Framer Motion `x: 288→0`, body scroll lock via `useEffect`
4. **Solucoes.tsx** — mobile vira carrossel `snap-x snap-mandatory`, card wrapper `snap-start shrink-0 w-[80vw]`
5. **Comunidade · Mentoria** — `py-24` → `py-12 md:py-24`

### Ajustes de espaçamento e polish — 2026-06-07

1. **Hero.tsx** — `min-h-screen` removido; `pb-20` → `pb-10`; "Ver soluções →" `text-[#DA7756] hover:text-[#c4664a]`
2. **Credibilidade.tsx** — texto: "Saúde, advocacia, varejo, educação… IA que gera resultado em qualquer setor."; linhas `h-px` e `bg-border-subtle` removidos
3. **Solucoes.tsx** — `py-[140px]` → `py-20`; botão "Quero uma solução personalizada →" → link simples `text-[#DA7756] hover:underline`
4. **ComoFunciona.tsx** — `py-[140px]` → `py-20`
5. **Premissa.tsx** — `py-[140px]` → `py-20`; "Nossa régua de sucesso:" → "Régua de sucesso:"
6. **Mentoria.tsx** — `py-[140px]` → `py-20`; "Quero agendar uma sessão →" `text-[#DA7756]`
7. **Comunidade.tsx** — `md:py-24` → `md:py-20`; texto fantasma `top: 2rem` → `top: 1rem`
8. **Sobre.tsx** — `py-[140px]` → `py-20`
9. **CTAFinal.tsx** — `py-[120px]` → `py-20`
10. **app/saude/page.tsx Hero** — `pt-24` → `pt-10` na section; `pt-8` → `pt-2` no Reveal

### Fixes mobile — 2026-06-07 (sessão tarde)

1. **Header.tsx** — drawer mobile movido para createPortal no document.body; resolve conflito de stacking context com Framer Motion quando página está scrollada
2. **Solucoes.tsx** — whileHover desativado em dispositivos touch via matchMedia('(hover: none)'); indicador "deslize para ver mais" adicionado no mobile (text-sm, cor #DA7756, fixo); pb-10 mobile adicionado na section
3. **ComoFunciona.tsx** — subtítulo "Três etapas pensadas..." pintado com #DA7756; pt-10 mobile na section; mb-6 mobile no header da seção

### Correções mobile — página principal — 2026-06-07 (sessão 2)

1. **Solucoes.tsx** — carrossel mobile: animação de entrada movida do wrapper individual de cada card para o container pai, usando `variants stagger` (`staggerChildren: 0.1`) com `whileInView` uma única vez (`viewport once: true, amount: 0.2`). Elimina o efeito de flutuação ao deslizar o carrossel no mobile. `fadeUp` e `stagger` declarados no topo do componente.

### Mobile fixes — /saude (07/06/2026)

1. **Header.tsx** — item "Soluções para Saúde" adicionado no acordeão mobile (Features dropdown); ícone `HeartPulse`, `href="/saude"`, cor `text-[#5B8F7A]`, fecha o drawer ao clicar
2. **Hero** — orb Spline: `hidden md:flex` no container da coluna direita; `pb-32` → `pb-8 md:pb-32`
3. **Problemas** — carrossel mobile: `flex overflow-x-auto snap-x snap-mandatory scrollbar-hide`; card wrapper `snap-start shrink-0 w-[80vw] h-[320px] md:h-auto overflow-hidden md:overflow-visible`; hint "deslize para ver mais" após o carrossel (cor `#DA7756`); `py-24` → `pt-8 pb-4 md:py-24`
4. **Blocos de vídeo** — grid `grid-cols-1 md:grid-cols-2`; descrição longa `hidden md:block`; pílula "Dados fictícios" e CTA movidos para fora do grid; CTA `w-full md:w-auto text-center md:text-left`; gap entre blocos `gap-8 md:gap-24`
5. **Soluções** — `py-24` → `py-8 md:py-24`
6. **Por que a DeepCare** — carrossel mobile (mesmo padrão Problemas); `py-24` → `py-8 md:py-24`
7. **CTA Final** — `py-24` → `py-8 md:py-24`; h2 `text-2xl md:text-4xl`
8. **Títulos h2/h3** — todos os blocos de vídeo: `text-2xl md:text-4xl` para evitar quebra em 4+ linhas no mobile

### Webhook N8N — Leads /comunidade ✅ (07-06)

- Webhook: https://n8n-production-23c9.up.railway.app/webhook/leads-comunidade
- Workflow: Webhook → HTTP Request (notifica Ricardo) → HTTP Request (responde lead)
- Evolution API: v1.8.2 (atendai/evolution-api:v1.8.2)
- Instância: deepcare-ricardo — número 5517992449351 — CONECTADA
- N8N: https://n8n-production-23c9.up.railway.app (Railway, projeto cheerful-embrace)
- WEBHOOK_N8N_PLACEHOLDER substituído em app/comunidade/page.tsx ✅
- Notificação Ricardo: nome, whatsapp, empresa, desafio, extra, solução
- Resposta automática ao lead: mensagem personalizada com nome
- Número do lead precisa de DDI 55 prefixado (implementado no N8N)

### Atualização de identidade — AI First → AI Native (15/08/2026)

1. Substituídos deepcare-logo-clara.svg e deepcare-logo-dark.svg pela versão com assinatura "AI Native" (substitui "AI First", remanescente da fase horizontal anterior).
2. Correção de espaçamento e alinhamento do travessão entre "Analytics" e "AI Native" na logo: font-size da tagline reduzido de 13 para 12, travessão reposicionado (x de 119.6 para 122, y de 39-50 alinhado à caixa-alta), "AI Native" reancorado em x=182.
3. Sobre.tsx: copy da seção "Sobre a DeepCare" atualizado de "Somos uma empresa AI First — inteligência artificial não é um recurso extra, é a base de tudo que construímos" para "Somos uma empresa AI Native — a inteligência artificial não é um recurso que usamos, é o próprio mecanismo que entrega o resultado. Tirar a IA da solução não a deixa mais lenta: ela deixa de existir", alinhado à definição do documento de visão estratégica.
4. Validado visualmente em produção local (Header, Footer, painel /comunidade, seção Sobre) e em produção após deploy.
5. Commits: 1796153, 17d9a83 (logos) e o commit da correção de copy do Sobre.tsx — todos com push concluído, já em produção.
