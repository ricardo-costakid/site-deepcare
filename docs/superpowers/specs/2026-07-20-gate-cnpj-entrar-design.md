# Gate de acesso por CNPJ na página /entrar

## Contexto

A página `/entrar` hoje (`app/entrar/page.tsx`) é um server component estático que mostra
dois cards fixos (BID e LensTrack) para qualquer visitante, sem nenhum filtro. Isso vai ser
substituído por um gate de acesso: o visitante digita o CNPJ da empresa, e só vê os cards
das ferramentas às quais aquele CNPJ tem acesso.

Não há autenticação real nessa camada — cada produto (BID, LensTrack, Conciliação) continua
validando login por conta própria. Esta tela apenas filtra e redireciona.

## Estado atual (referência visual)

Confirmado em `app/entrar/page.tsx` e na memória do projeto (`page-entrar.md`):

- Server component, sem `'use client'`, sem Framer Motion.
- Layout: coluna única centralizada, `min-h-screen bg-[#0D0D0D]`, isolado (sem Header/Footer
  do site principal).
- Logo `deepcare-logo-dark.svg` (`height: 70px`), headline "Soluções AI First da DeepCare
  Analytics" (`48px, fontWeight 600, color #ffffff`), subtítulo (`13.6px, color #DA7756`).
- Cards: `mt-10 flex flex-col md:flex-row gap-4 w-full max-w-[760px]`, cada card
  `bg-[#1C1C1C] border border-white/[0.08] rounded-2xl p-6`, hover
  `bg-[#242424] border-[rgba(91,143,122,0.5)] shadow-[0_0_30px_rgba(91,143,122,0.15)] scale-[1.02]`,
  ícone lucide `w-8 h-8 text-[#5B8F7A]`.
- `lib/constants.ts` já expõe `WA_URL = 'https://wa.me/5517992449351'`.
- Framer Motion (`framer-motion@^12`) já é dependência do projeto; padrão de transição usado
  em outras páginas (`app/comunidade/page.tsx`): `AnimatePresence` + `motion.div` com
  `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.3–0.4 }}`.

O card novo (Conciliação) e o gate de CNPJ devem seguir fielmente esse padrão visual — nada
de estilo novo.

## Decisões (resolvidas na etapa de brainstorming)

1. **Validação de CNPJ**: apenas formato, 14 dígitos numéricos após remover pontuação (não 11
   — a spec original tinha esse número errado; os próprios CNPJs de exemplo têm 14 dígitos).
   Sem cálculo de dígito verificador.
2. **Retry/voltar**: tanto no estado "encontrado" quanto no "não encontrado" existe um link
   discreto "usar outro CNPJ" que reseta para o formulário, sem precisar recarregar a página.

## Arquitetura

### `lib/clientAccess.ts` (novo arquivo)

```ts
export interface ClientTool {
  nome: string;
  descricao: string;
  url: string;
  icone: string; // nome do ícone lucide-react
}

export interface ClientAccess {
  nome: string;
  tools: ClientTool[];
}

export const clientAccess: Record<string, ClientAccess> = {
  "01448506000120": {
    nome: "Cliente BID",
    tools: [
      {
        nome: "BID",
        descricao: "Business Intelligence Department — Painel financeiro, faturamento e IA para clínicas",
        url: "https://app.deepcareanalytics.com/login",
        icone: "BarChart3"
      }
    ]
  },
  "35165757000110": {
    nome: "OftoVision Clínica Oftalmológica",
    tools: [
      {
        nome: "LensTrack",
        descricao: "Gestão de Lentes de Contato com IA — Controle de vendas, prazos de entrega e relacionamento com clientes",
        url: "https://lenstrack.deepcareanalytics.com/login",
        icone: "Eye"
      },
      {
        nome: "Conciliação ClinicWeb × Porto Seguro",
        descricao: "Conciliação automática de faturamento entre ClinicWeb e Porto Seguro",
        url: "https://conciliacao.deepcareanalytics.com",
        icone: "FileCheck"
      }
    ]
  }
};
```

Chaves do `Record` são o CNPJ normalizado (só dígitos, 14 chars) — mesmo formato produzido
pela normalização do input.

### `app/entrar/page.tsx` (reescrito)

Vira client component (`'use client'`) com uma máquina de estados simples via `useState`:

```
type ViewState = 'form' | 'found' | 'not-found'
```

- **`form`** (estado inicial): input de CNPJ mascarado + botão "Acessar".
- **`found`**: header com o nome do cliente (`clientAccess[cnpj].nome`) + grid de cards das
  tools liberadas, reaproveitando o markup/estilo de card do arquivo atual.
- **`not-found`**: mensagem amigável + botão WhatsApp (`WA_URL`).

Transições entre os três estados usam `AnimatePresence` + `motion.div`, seguindo o padrão de
`comunidade/page.tsx` (fade + slide vertical de 8px, duration 0.3–0.4s).

Nos estados `found` e `not-found`, um link discreto "usar outro CNPJ" volta para `form`
(reset do estado e do valor do input).

### Máscara e normalização de CNPJ

- Máscara aplicada a cada keystroke no input: `00.000.000/0000-00`.
- Implementação sem lib externa: função pura que extrai só dígitos do valor digitado, limita
  a 14, e reinsere os separadores nas posições fixas.
- Normalização no submit: `value.replace(/\D/g, '')`.
- Validação: `normalized.length === 14`. Se inválido, mensagem inline no form (não avança de
  estado) — não é o mesmo fluxo do "não encontrado", que é para CNPJ bem-formado mas ausente
  do `clientAccess`.

### Ícones

Os nomes em `ClientTool.icone` são resolvidos via um mapa local restrito aos ícones
realmente usados hoje nos dados (`BarChart3`, `Eye`, `FileCheck`), evitando lookup dinâmico
sobre todo o pacote `lucide-react`:

```ts
const ICONS: Record<string, LucideIcon> = { BarChart3, Eye, FileCheck }
```

## Fora de escopo

- Não mexe nos produtos BID/LensTrack/Conciliação em si — só na camada de roteamento do site
  principal (`/entrar`).
- Sem banco de dados — `clientAccess` fica como arquivo estático em `lib/`.
- Sem autenticação nessa tela — ela só filtra e redireciona; cada produto valida login por
  conta própria.
- Sem commit nem deploy automático — parar após implementar e testar localmente, aguardando
  validação do Ricardo.

## Testes

- Unitário para a função de máscara/normalização de CNPJ (casos: digitação parcial, colagem
  de CNPJ já formatado, mais de 14 dígitos digitados).
- Verificação manual local (`next dev`) dos três estados: CNPJ válido conhecido → `found`;
  CNPJ válido desconhecido → `not-found`; CNPJ mal formatado → erro inline sem trocar de
  estado; link "usar outro CNPJ" em ambos os casos.
