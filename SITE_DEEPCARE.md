# Site DeepCare Analytics — Estado Atual
**Última atualização:** 03/06/2026 (sessão tarde)  
**Versão:** 1.4  
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
Fundo escuro:        #111814 (Premissa, CTAFinal, Comunidade)
Fundo cards escuros: #0F1117 (cards Soluções)
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
  constants.ts            ✅ WA_URL = 'https://wa.me/5517981852807'
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
- CTAs: "Quero uma demonstração" (verde) + "Ver soluções →" (ghost)
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
- **Cards (estilo dark `#0F1117`):** `flex flex-col`, ícone e tagline em #5B8F7A, título branco, descrição text-gray-400
  - Borda: border-white/5
  - Hover: `bg-[#161B22]`, `border-[#5B8F7A]/50`, `shadow-[0_0_30px_rgba(91,143,122,0.15)]`, `scale(1.02)`
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
- 3 passos: 01 Diagnóstico | 02 Setup | 03 Mensalidade
- Linha conectora desktop

### Premissa.tsx ✅
- Fundo: #111814 (escuro)
- "Toda solução que entregamos precisa cumprir pelo menos um objetivo:"
- "Aumentar o lucro **ou** Reduzir os custos do cliente."
- "ou" em verde #5B8F7A

### Mentoria.tsx ✅
- Layout duas colunas: texto esquerda, Spline direita
- Bloco decorativo "1:1" substituído por componente Spline
- `SplineMentoria` via `dynamic(() => import('@splinetool/react-spline'), { ssr: false })`
- URL Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
- `useRef splineContainerRef` → scroll fix via `useEffect` com retry; `querySelector('canvas')` dentro do container (sem conflito com canvas do Hero)
- Container Spline: `hidden md:block`, `height: 600px`, `overflow: visible`, `position: relative`, `width: 100%`
- Coluna esquerda com `pb-16` para alinhamento vertical com a orb
- CTA ghost → WhatsApp

### Comunidade.tsx ✅ *(nova)*
- Seção inserida em `page.tsx` entre `<Mentoria />` e `<Sobre />`
- Fundo: #111814, id="comunidade", py-24
- Layout: duas colunas `grid-cols-[55%_45%]` no desktop
- **Coluna esquerda:**
  - Badge pill: "COMUNIDADE" — tracking largo, cor #5B8F7A, bg rgba(91,143,122,0.12)
  - Headline: "Onde gestores e profissionais resolvem problemas com IA — juntos."
  - Subtítulo: "Aqui você conta seus desafios reais, troca experiências com quem está na mesma jornada e conecta com soluções que já funcionam na prática — ou criamos uma personalizada para você."
  - CTA: "Quero fazer parte →" → `/comunidade` (botão verde sólido, rounded-full)
- **Coluna direita (desktop):**
  - Palavra "COMUNIDADE" fantasma: `rgba(255,255,255,0.04)`, font-black, ~140px
  - 3 linhas mono em #5B8F7A opacity-60 com stagger Framer Motion (delay 0.15s):
    - `→ diagnóstico coletivo` | `→ soluções reais` | `→ resultado mensurável`

### Sobre.tsx ✅
- Fundo: #F8F9FA
- Badge AI First com símbolo da DeepCare

### CTAFinal.tsx ✅
- Fundo: #111814
- Card ~90% largura, border-radius 24px
- Botão: "Fale com a DeepCare" → WhatsApp

### Footer.tsx ✅
- Logo: `deepcare-sidebar-dark.svg`
- © 2026 DeepCare Analytics · São José do Rio Preto – SP
- deepcareanalytics.com

---

## Rota /comunidade ✅ *(nova)*

### app/comunidade/layout.tsx
- Layout isolado (sem header/footer do site principal)
- Metadata: título "Comunidade DeepCare", descrição própria

### app/comunidade/page.tsx
- `'use client'`, altura 100vh, sem scroll externo
- **Layout duas colunas (desktop):** painel escuro 40% | área chat 60%
- **Painel esquerdo (`#111814`, desktop only):**
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
"Resolvemos problemas de quem resolve problemas." ← avaliar uso no site

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
| Cards soluções | Dark `#0F1117` (era #111814), hover `#161B22` | Profundidade maior; #111814 reservado para seções full-width |
| Card hover | Framer Motion spring (stiffness 400, damping 25) | Resposta mais viva que transition CSS pura |
| Ícone card | Absoluto top-4 right-4, text-white/10 | Decorativo, não compete com conteúdo; pr-20 protege texto |
| Rodapé card | "Saiba mais →" + "WhatsApp" com border-t | CTA duplo sem poluir o corpo do card |
| Parâmetro solucao | useSearchParams em /comunidade | Personaliza primeira mensagem do chat conforme origem (card ou direto) |
| globals.css | CSS custom de cards removido (card-glow-wrapper, card-glow-inner, card-border-glow, border-spin) | Substituído por solução Framer Motion + Tailwind pura |
| Webhook leads | N8N (placeholder) | Flexível, sem backend próprio |
