# Site DeepCare Analytics — Estado Atual
**Última atualização:** 03/06/2026  
**Versão:** 1.2  
**Deploy:** Vercel → deepcareanalytics.com  
**Repositório:** C:\Projetos\Site-DeepCare  

---

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- @splinetool/react-spline
- Inter (next/font/google)
- TypeScript

---

## Identidade Visual

```
Fundo principal:     #FFFFFF
Fundo alternado:     #F8F9FA
Fundo escuro:        #111814 (Premissa e CTA Final)
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
  layout.tsx          ✅ SEO configurado
  page.tsx            ✅ Monta todas as seções
  globals.css         ✅ Light mode, scroll suave
components/
  Header.tsx          ✅ Ver detalhes abaixo
  Hero.tsx            ✅ Ver detalhes abaixo
  Credibilidade.tsx   ✅
  Solucoes.tsx        ✅
  ComoFunciona.tsx    ✅
  Premissa.tsx        ✅
  Mentoria.tsx        ✅
  Sobre.tsx           ✅
  CTAFinal.tsx        ✅
  Footer.tsx          ✅
lib/
  constants.ts        ✅ WA_URL = 'https://wa.me/5517XXXXXXXXX' ← SUBSTITUIR
public/
  logo/
    deepcare-logo-clara.svg       ← fundo branco (texto escuro)
    deepcare-logo-dark.svg        ← fundo escuro (texto branco)
    deepcare-sidebar-dark.svg     ← footer
    deepcare-sidebar-light.svg
    deepcare-simbolo-dark.svg     ← favicon
    deepcare-simbolo-light.svg
tailwind.config.ts
next.config.ts
package.json
```

---

## Componentes — Estado Detalhado

### Header.tsx ✅
- Logo: `deepcare-logo-clara.svg`, height 32px
- Nav: **Features** (dropdown — a implementar) | Como funciona | Mentoria | Sobre
- Link: **Entrar** → https://www.deepcareanalytics.com/login
- CTA: **Conhecer agora** → WhatsApp (WA_URL)
- Comportamento: sticky, backdrop-blur ao scrollar
- Mobile: hamburguer com drawer
- **PENDENTE:** transformar Features em dropdown com: Soluções | Mentoria | Comunidade

### Hero.tsx ✅
- Layout: duas colunas — texto esquerda (~50%), Spline direita (~50%)
- Spline: `https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode`
  - Partículas verdes: Color A `5B8F7A`, Color B `8BBFAE`
  - Fundo transparente (BG 0%)
  - Texto "Move your mouse." removido
- Scroll fix: useEffect com retry para repassar wheel event ao window (multiplicador 2.0)
- Label: "INTELIGÊNCIA ARTIFICIAL PARA EMPRESAS"
- Headline: "A plataforma das empresas que crescem com IA na prática."
- Slogan: "Implementamos IA no seu negócio de forma rápida e com resultado mensurável."
- CTAs: "Quero uma demonstração" (verde) + "Ver soluções →" (ghost)

### Credibilidade.tsx ✅
- Fundo: #F8F9FA
- Texto: "IA implementada em clínicas, escritórios de advocacia e empresas do interior paulista."

### Solucoes.tsx ✅
- Título: "Nossas Soluções"
- Grid: md:grid-cols-2 xl:grid-cols-3, último card centralizado
- 5 cards: Lux | Painel Financeiro Executivo | SDR no WhatsApp | NPS Automatizado | Juris AI
- Ícones Lucide, hover com borda verde

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
- Layout duas colunas: texto esquerda, "1:1" decorativo direita
- CTA ghost → WhatsApp

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

## Pendências — Próximas Implementações

### 1. Dropdown Features no Header
Transformar item "Features" em dropdown com:
- **Soluções** → âncora `#solucoes`
- **Mentoria** → âncora `#mentoria`
- **Comunidade** → link `/comunidade`

### 2. Seção Comunidade (nova seção no site)
Adicionar entre Mentoria e Sobre:
- Fundo escuro #111814 ou verde escuro #243D36
- Headline: "Resolvemos problemas de quem resolve problemas."
- Subtítulo: "Uma comunidade onde você conta seus maiores desafios — e juntos criamos e conectamos você à solução certa."
- CTA: "Quero fazer parte" → `/comunidade`
- Visual: a definir (orb Spline menor ou tipografia grande decorativa)

### 3. Página /comunidade — Formulário Conversacional
Estilo chat (inspiração: type.viverdeia.ai). Avatar: foto do Ricardo.

**5 perguntas:**
1. "Qual seu nome?"
2. "Prazer, [nome]! Qual seu WhatsApp?"
3. "Qual o nome da sua empresa e o que ela faz?"
4. "Qual a maior dificuldade que você enfrenta hoje no seu negócio?"
5. "Em breve entraremos em contato. Alguma coisa a mais que queira compartilhar?" (opcional)

**Tela final:** "Recebemos! Em breve entraremos em contato com você pelo WhatsApp."

**Integração:** webhook N8N recebe os dados.
**Notificação:** Evolution API (a configurar no Railway) → WhatsApp de Ricardo.
**Status:** Etapa 1 (formulário + webhook N8N) a construir. Etapa 2 (Evolution API) após configurar no Railway.

### 4. WhatsApp — substituir placeholder
Em `lib/constants.ts`, trocar `5517XXXXXXXXX` pelo número real de Ricardo.

### 5. Deploy
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
