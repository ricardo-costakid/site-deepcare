# Site DeepCare Analytics — Estado Atual
**Última atualização:** 06/06/2026  
**Versão:** 1.5  
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
Fundo cards escuros: #1A2620 (cards Soluções), hover #1F2E26
Texto primário:      #111111
Texto secundário:    #555555
Verde principal:     #5B8F7A
Verde médio:         #3D6357
Verde claro:         #8BBFAE
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
tailwind.config.ts
next.config.mjs
package.json
```

---

## Componentes — Estado Detalhado

### Header.tsx ✅
- Logo: `deepcare-logo-clara.svg`, height 32px
- Nav: **Features** (dropdown) | Como funciona | Sobre
- Link: **Entrar** → https://www.deepcareanalytics.com/login
- CTA: **Conhecer agora** → WhatsApp (WA_URL)
- Comportamento: sticky, backdrop-blur ao scrollar
- **Dropdown Features (desktop):** hover abre painel centralizado com Framer Motion
  - Animação: fade + translateY(−8px → 0), AnimatePresence
  - Posicionamento: `left-1/2 -translate-x-1/2` em wrapper externo (evita conflito com transform do FM)
  - Fundo branco, borda #E5E7EB, border-radius 12px, sombra leve
  - Itens: LayoutGrid **Soluções** → `#solucoes` | GraduationCap **Mentoria** → `#mentoria` | Users **Comunidade** → `/comunidade`
  - Hover item: bg-[#F8F9FA], texto #5B8F7A
- **Dropdown Features (mobile):** acordeão no drawer com AnimatePresence (height 0→auto)
- ChevronDown rotaciona 180° quando aberto

### Hero.tsx ✅
- Layout: duas colunas — texto esquerda (~50%), Spline direita (~50%)
- Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
  - Partículas verdes: Color A `5B8F7A`, Color B `8BBFAE`
  - Fundo transparente (BG 0%)
  - Texto "Move your mouse." removido
- Scroll fix: useEffect com retry para repassar wheel event ao window (multiplicador 2.0)
- Label: "INTELIGÊNCIA ARTIFICIAL PARA EMPRESAS"
- Headline: "A plataforma das empresas que crescem com IA na prática."
- Slogan: "IA implementada com ética, segurança e resultado mensurável — você no controle de cada etapa."
- CTAs: "Quero uma demonstração" (verde, WA: "Olá! Quero conhecer uma demonstração da DeepCare.") + "Ver soluções →" (ghost)
- **Trust signals** abaixo dos CTAs (`flex flex-wrap gap-x-6 gap-y-3 mt-6`):
  - ShieldCheck "Dados protegidos"
  - UserCheck "Supervisão humana"
  - BarChart2 "Resultados auditáveis"
  - Estilo: `text-sm text-[#555555]`, ícones `text-[#5B8F7A] w-4 h-4 strokeWidth={1.5}`

### Credibilidade.tsx ✅
- Fundo: #F8F9FA
- Texto: "IA implementada em clínicas, escritórios de advocacia e empresas do interior paulista."

### Solucoes.tsx ✅
- Título: "Nossas Soluções"
- Subtítulo: "Explore soluções plug & play..."
- Botão ghost: **"Quero uma solução personalizada →"** → `/comunidade`
  - Estilo: border #5B8F7A, texto #5B8F7A, hover bg #5B8F7A texto branco, rounded-xl
- Grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6` — 9 cards, grade 3×3 fechada
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
- Fundo: bg-bg-dark (#1A2620), seção `relative overflow-hidden`
- Label: "Nossa Premissa" (verde, 11px, tracking 2px)
- Subtítulo: "Nossa régua de sucesso:"
- Headline: "Aumentar o lucro, reduzir custos — **ou** os dois." — "ou" em #5B8F7A
- Subtexto: "A entrega só faz sentido se gerar valor real para o seu negócio."
- **Texto fantasma "RESULTADO":** `absolute top: 0, left: 0`, filho direto da `<section>`, `rgba(255,255,255,0.04)`, `clamp(72px, 9vw, 140px)`, font-black, whiteSpace nowrap

### Mentoria.tsx ✅
- Layout duas colunas: texto esquerda, Spline direita
- Bloco decorativo "1:1" substituído por componente Spline
- `SplineMentoria` via `dynamic(() => import('@splinetool/react-spline'), { ssr: false })`
- URL Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- `useRef splineContainerRef` → scroll fix via `useEffect` com retry; `querySelector('canvas')` dentro do container (sem conflito com canvas do Hero)
- Container Spline: `hidden md:block`, `height: 600px`, `overflow: visible`, `position: relative`, `width: 100%`
- Coluna esquerda com `pb-16` para alinhamento vertical com a orb
- CTA hero: "Quero agendar uma sessão →" (ghost link, WA: "Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare.")
  - Pílula verde "MENTORIA" (`bg-[#5B8F7A] text-white text-xs px-2 py-0.5 rounded-full mr-2`) antes do texto
- CTA final: "Agendar uma sessão" (botão sólido verde, mesmo link WA)

### Comunidade.tsx ✅ *(nova)*
- Seção inserida em `page.tsx` entre `<Mentoria />` e `<Sobre />`
- Fundo: bg-[#1A2620], id="comunidade", py-24, `relative overflow-hidden`
- Layout: duas colunas `grid-cols-[55%_45%]` no desktop
- **Texto fantasma "COMUNIDADE":** filho direto da `<section>`, `absolute top: 2rem, left: 50%, translateX(-50%)`, `rgba(255,255,255,0.04)`, `clamp(72px, 9vw, 140px)`, font-black — aparece acima do badge
- **Coluna esquerda:**
  - Badge pill: "COMUNIDADE" — tracking largo, cor #5B8F7A, bg rgba(91,143,122,0.12)
  - Headline: "Resolvemos problemas de quem resolve problemas."
  - Subtítulo: "Uma comunidade onde você conta seus maiores desafios — e juntos criamos e conectamos você à solução certa."
  - CTA: "Quero fazer parte →" → `/comunidade` (botão verde sólido, rounded-full)
- **Coluna direita (desktop):**
  - 3 linhas mono em #5B8F7A opacity-60 com stagger Framer Motion (delay 0.15s):
    - `→ diagnóstico coletivo` | `→ soluções reais` | `→ resultado mensurável`

### Sobre.tsx ✅
- Fundo: #F8F9FA
- Copy: filosofia AI First — sem mencionar Ricardo pelo nome
- Layout duas colunas: texto esquerda | Spline direita (mesma orb do Hero/Mentoria)
- Orb Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- Scroll fix replicado do Mentoria.tsx (`useRef + useEffect` com retry, `querySelector('canvas')` dentro do container)
- Container Spline: `hidden md:block`, `height: 600px`, `overflow: visible`

### CTAFinal.tsx ✅
- Fundo: bg-bg-dark (#1A2620), seção `relative overflow-hidden`
- **Texto fantasma "TRANSFORMAÇÃO":** `absolute right: 0, bottom: 1rem`, filho direto da `<section>`, `rgba(255,255,255,0.04)`, `clamp(72px, 9vw, 140px)`, font-black
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
- **Webhook N8N:** POST para `WEBHOOK_N8N_PLACEHOLDER` com payload `{nome, whatsapp, empresa, desafio, extra, solucao}` — `solucao` recebe o parâmetro da URL ou `'Não especificada'`; falha silenciosa (`.catch(() => {})`)

---

## Spline — Orb Compartilhada (Hero, Mentoria, Sobre)

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

Todos os botões usam links diretos (não mais `WA_URL`) com texto encodado. Número: `5517992449351` (corrigido de `5517981852807`).

| Botão | Componente | Mensagem |
|---|---|---|
| "Quero uma demonstração" | Hero | Olá! Quero conhecer uma demonstração da DeepCare. |
| "Quero agendar uma sessão" | Mentoria (hero) | Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare. |
| "Agendar uma sessão" | Mentoria (CTA) | Olá! Tenho interesse em agendar uma sessão de mentoria com a DeepCare. |
| "Fale com a DeepCare" | CTAFinal | Olá! Quero saber como a DeepCare pode ajudar meu negócio. |
| (17) 99244-9351 | Footer | Olá! Vim pelo site da DeepCare e quero mais informações. |

---

## Textos Fantasma

Palavras decorativas em seções escuras — `rgba(255,255,255,0.04)`, font-black, `clamp(72px, 9vw, 140px)`, whiteSpace nowrap, select-none, `aria-hidden`:

| Componente | Palavra | Posição |
|---|---|---|
| Premissa | RESULTADO | `top: 0, left: 0` — topo esquerdo, filho da `<section>` |
| Comunidade | COMUNIDADE | `top: 2rem, left: 50%, translateX(-50%)` — acima do badge, filho da `<section>` |
| CTAFinal | TRANSFORMAÇÃO | `right: 0, bottom: 1rem` — rodapé direito, filho da `<section>` |

---

## Pendências — Próximas Implementações

### 1. Webhook N8N — substituir placeholder
Em `app/comunidade/page.tsx`, trocar `WEBHOOK_N8N_PLACEHOLDER` pela URL real do webhook N8N.

### 2. Página /comunidade — Etapa 2
Integração Evolution API para notificação WhatsApp ao Ricardo após cada lead.
**Status:** aguardando configuração no Railway.

### 3. Deploy
- Criar repositório GitHub
- Importar no Vercel
- Configurar domínio deepcareanalytics.com
- Configurar app.deepcareanalytics.com para o painel de clientes

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
| Webhook leads | N8N (placeholder) | Flexível, sem backend próprio |
