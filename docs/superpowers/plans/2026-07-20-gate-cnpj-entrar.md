# Gate de acesso por CNPJ na página /entrar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir os dois cards fixos de `/entrar` por um gate de acesso por CNPJ: o
visitante digita o CNPJ, e só vê as ferramentas liberadas para aquele cliente (config
estática em `lib/clientAccess.ts`), com redirect direto ao clicar — sem autenticação nessa
camada.

**Architecture:** `app/entrar/page.tsx` vira client component com uma máquina de 3 estados
(`form` → `found` | `not-found`) via `useState`, transições com `AnimatePresence`/`motion.div`
(padrão já usado em `app/comunidade/page.tsx`). Dados de acesso ficam em `lib/clientAccess.ts`,
um `Record<string, ClientAccess>` estático indexado por CNPJ normalizado (14 dígitos).

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind, framer-motion
(já é dependência), lucide-react (já é dependência).

## Global Constraints

- CNPJ: máscara de input `00.000.000/0000-00`; normalização = só dígitos; validação = exatos
  14 dígitos numéricos, sem cálculo de dígito verificador.
- Reaproveitar fielmente o estilo de card já existente: `bg-[#1C1C1C] border border-white/[0.08]
  rounded-2xl p-6`, hover `bg-[#242424] border-[rgba(91,143,122,0.5)]
  shadow-[0_0_30px_rgba(91,143,122,0.15)] scale-[1.02]`, ícone `w-8 h-8 text-[#5B8F7A]`.
- Fundo da página: `bg-[#0D0D0D]`, `min-h-screen`, isolada (sem Header/Footer do site).
- Transições: `AnimatePresence` + `motion.div`, `initial={{ opacity: 0, y: 8 }}`,
  `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.3 }}` (padrão de
  `app/comunidade/page.tsx`).
- WhatsApp: usar `WA_URL` de `lib/constants.ts`, nunca hardcode a URL.
- Sem banco de dados, sem autenticação nessa tela, sem instalar framework de testes.
- Não mexer em BID/LensTrack/Conciliação em si.
- Não commitar/dar deploy fora dos commits explicitamente pedidos neste plano — parar após
  implementar e verificar localmente, aguardando validação do Ricardo.
- Verificação é manual via `npm run dev` (sem framework de testes automatizado neste projeto).

---

### Task 1: `lib/clientAccess.ts` — config estática de acesso por CNPJ

**Files:**
- Create: `lib/clientAccess.ts`

**Interfaces:**
- Produces: `interface ClientTool { nome: string; descricao: string; url: string; icone: string }`,
  `interface ClientAccess { nome: string; tools: ClientTool[] }`,
  `export const clientAccess: Record<string, ClientAccess>` — chaves são CNPJ normalizado
  (14 dígitos, só números).

- [ ] **Step 1: Criar o arquivo com as interfaces e os dados**

```ts
// lib/clientAccess.ts
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

- [ ] **Step 2: Verificar que o TypeScript compila**

Run: `npx tsc --noEmit`
Expected: sem erros relacionados a `lib/clientAccess.ts`

- [ ] **Step 3: Commit**

```bash
git add lib/clientAccess.ts
git commit -m "feat: adiciona config estática de acesso por CNPJ (lib/clientAccess.ts)"
```

---

### Task 2: `lib/cnpj.ts` — máscara e normalização de CNPJ

**Files:**
- Create: `lib/cnpj.ts`

**Interfaces:**
- Produces: `export function maskCnpj(rawInput: string): string` (recebe o valor cru do input,
  devolve string formatada `00.000.000/0000-00`, truncando em 14 dígitos);
  `export function normalizeCnpj(value: string): string` (remove tudo que não é dígito);
  `export function isValidCnpjFormat(value: string): boolean` (true se `normalizeCnpj(value).length === 14`).

- [ ] **Step 1: Implementar `normalizeCnpj` e `isValidCnpjFormat`**

```ts
// lib/cnpj.ts
export function normalizeCnpj(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidCnpjFormat(value: string): boolean {
  return normalizeCnpj(value).length === 14;
}

export function maskCnpj(rawInput: string): string {
  const digits = normalizeCnpj(rawInput).slice(0, 14);

  let result = digits;
  if (digits.length > 2) result = `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length > 5) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length > 8) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  if (digits.length > 12) result = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;

  return result;
}
```

- [ ] **Step 2: Verificar manualmente no console do Node**

Run:
```bash
node -e "
const { maskCnpj, normalizeCnpj, isValidCnpjFormat } = require('./lib/cnpj.ts');
"
```

Como o arquivo é `.ts`, valide direto via um script temporário com `npx tsx` (ou, se `tsx` não
estiver disponível, valide via o teste manual no navegador na Task 4 — não é bloqueante).
Casos a conferir mentalmente/no browser depois:
- `maskCnpj("01448506000120")` → `"01.448.506/0001-20"`
- `maskCnpj("0144850600012099")` (mais de 14 dígitos) → trunca em `"01.448.506/0001-20"`
- `normalizeCnpj("01.448.506/0001-20")` → `"01448506000120"`
- `isValidCnpjFormat("01.448.506/0001-20")` → `true`
- `isValidCnpjFormat("01.448.506/0001-2")` → `false`

- [ ] **Step 3: Verificar que o TypeScript compila**

Run: `npx tsc --noEmit`
Expected: sem erros relacionados a `lib/cnpj.ts`

- [ ] **Step 4: Commit**

```bash
git add lib/cnpj.ts
git commit -m "feat: adiciona helpers de máscara e normalização de CNPJ"
```

---

### Task 3: Mapa de ícones lucide-react usados nos dados

**Files:**
- Create: `lib/toolIcons.tsx`

**Interfaces:**
- Consumes: `ClientTool.icone` (string) de `lib/clientAccess.ts` (Task 1).
- Produces: `export const TOOL_ICONS: Record<string, LucideIcon>` e
  `export function ToolIcon({ name, className }: { name: string; className?: string }): JSX.Element | null`.

- [ ] **Step 1: Criar o mapa e o componente wrapper**

```tsx
// lib/toolIcons.tsx
import { BarChart3, Eye, FileCheck, LucideIcon } from "lucide-react";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  BarChart3,
  Eye,
  FileCheck,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TOOL_ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
```

- [ ] **Step 2: Verificar que o TypeScript compila**

Run: `npx tsc --noEmit`
Expected: sem erros relacionados a `lib/toolIcons.tsx`

- [ ] **Step 3: Commit**

```bash
git add lib/toolIcons.tsx
git commit -m "feat: adiciona mapa de ícones lucide-react para tools do gate de CNPJ"
```

---

### Task 4: Reescrever `app/entrar/page.tsx` com o gate de CNPJ

**Files:**
- Modify: `app/entrar/page.tsx` (reescrita completa — arquivo tinha 65 linhas, era server
  component estático)

**Interfaces:**
- Consumes:
  - `clientAccess: Record<string, ClientAccess>` de `lib/clientAccess.ts` (Task 1)
  - `maskCnpj(rawInput: string): string`, `normalizeCnpj(value: string): string`,
    `isValidCnpjFormat(value: string): boolean` de `lib/cnpj.ts` (Task 2)
  - `ToolIcon` de `lib/toolIcons.tsx` (Task 3)
  - `WA_URL` de `lib/constants.ts` (já existe: `'https://wa.me/5517992449351'`)
- Produces: página `/entrar` renderizada — nenhum outro arquivo consome esta página
  diretamente (é a folha da árvore de dependências deste plano).

- [ ] **Step 1: Escrever o novo `app/entrar/page.tsx`**

```tsx
// app/entrar/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clientAccess } from "@/lib/clientAccess";
import { maskCnpj, normalizeCnpj, isValidCnpjFormat } from "@/lib/cnpj";
import { ToolIcon } from "@/lib/toolIcons";
import { WA_URL } from "@/lib/constants";

type ViewState = "form" | "found" | "not-found";

export default function EntrarPage() {
  const [view, setView] = useState<ViewState>("form");
  const [cnpjInput, setCnpjInput] = useState("");
  const [formError, setFormError] = useState("");
  const [activeCnpj, setActiveCnpj] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidCnpjFormat(cnpjInput)) {
      setFormError("CNPJ inválido. Confira os 14 dígitos e tente novamente.");
      return;
    }

    setFormError("");
    const normalized = normalizeCnpj(cnpjInput);
    setActiveCnpj(normalized);
    setView(normalized in clientAccess ? "found" : "not-found");
  }

  function handleReset() {
    setView("form");
    setCnpjInput("");
    setFormError("");
    setActiveCnpj("");
  }

  const client = view === "found" ? clientAccess[activeCnpj] : undefined;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 py-12">
      <img
        src="/logo/deepcare-logo-dark.svg"
        alt="DeepCare Analytics"
        style={{ height: "70px", width: "auto", display: "block" }}
      />

      <h1
        className="mt-10 text-center"
        style={{ fontSize: "48px", fontWeight: 600, color: "#ffffff", letterSpacing: "-1px", fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}
      >
        Soluções AI First da DeepCare Analytics
      </h1>

      <AnimatePresence mode="wait">
        {view === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[420px]"
          >
            <p
              className="text-center"
              style={{ fontSize: "13.6px", fontWeight: 400, color: "#DA7756", letterSpacing: "0.1px", fontFamily: "'Inter', sans-serif" }}
            >
              Digite o CNPJ da sua empresa para acessar
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={cnpjInput}
                onChange={(e) => setCnpjInput(maskCnpj(e.target.value))}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="w-full rounded-xl px-4 py-3 bg-[#1C1C1C] border border-white/[0.08] text-white text-center text-lg tracking-wide focus:outline-none focus:border-[rgba(91,143,122,0.5)] transition-colors"
              />

              {formError && (
                <span className="text-center text-sm" style={{ color: "#DA7756" }}>
                  {formError}
                </span>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-xl px-4 py-3 bg-[#5B8F7A] text-white font-semibold hover:bg-[#4d7a68] transition-colors"
              >
                Acessar
              </button>
            </form>
          </motion.div>
        )}

        {view === "found" && client && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[760px]"
          >
            <p
              className="text-center"
              style={{ fontSize: "13.6px", fontWeight: 400, color: "#DA7756", letterSpacing: "0.1px", fontFamily: "'Inter', sans-serif" }}
            >
              {client.nome} — selecione o produto para acessar
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-4 w-full">
              {client.tools.map((tool) => (
                <a
                  key={tool.nome}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-start gap-4 rounded-2xl p-6 bg-[#1C1C1C] border border-white/[0.08] transition-all duration-200 ease-in-out
                    hover:bg-[#242424] hover:border-[rgba(91,143,122,0.5)] hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:scale-[1.02]"
                >
                  <ToolIcon name={tool.icone} className="w-8 h-8 text-[#5B8F7A] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-xl font-bold">{tool.nome}</span>
                    <span className="text-gray-400 text-sm">{tool.descricao}</span>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-8 text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              usar outro CNPJ
            </button>
          </motion.div>
        )}

        {view === "not-found" && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[420px] text-center"
          >
            <p className="text-white text-lg font-semibold">CNPJ não encontrado</p>
            <p className="mt-2 text-gray-400 text-sm">
              Não localizamos esse CNPJ na nossa base. Fale com a DeepCare para liberar o
              acesso da sua empresa.
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl px-5 py-3 bg-[#5B8F7A] text-white font-semibold hover:bg-[#4d7a68] transition-colors"
            >
              Falar com a DeepCare no WhatsApp
            </a>

            <button
              onClick={handleReset}
              className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              usar outro CNPJ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Verificar que o TypeScript compila**

Run: `npx tsc --noEmit`
Expected: sem erros relacionados a `app/entrar/page.tsx`

- [ ] **Step 3: Rodar o lint**

Run: `npm run lint`
Expected: sem erros novos introduzidos por este arquivo

- [ ] **Step 4: Commit**

```bash
git add app/entrar/page.tsx
git commit -m "feat: substitui cards fixos de /entrar por gate de acesso por CNPJ"
```

---

### Task 5: Verificação manual end-to-end no navegador

**Files:** nenhum arquivo novo — só verificação.

**Interfaces:** nenhuma (task de validação).

- [ ] **Step 1: Subir o servidor local**

Run: `npm run dev`
Expected: servidor sobe em `http://localhost:3000` sem erros no terminal

- [ ] **Step 2: Testar CNPJ válido e conhecido (BID)**

Abrir `http://localhost:3000/entrar`, digitar `01448506000120` no input (conferir que a
máscara formata para `01.448.506/0001-20` enquanto digita), clicar "Acessar".
Expected: transição suave para o card único "BID", com o texto "Cliente BID — selecione o
produto para acessar" acima.

- [ ] **Step 3: Testar CNPJ válido e conhecido (OftoVision, 2 tools)**

Clicar "usar outro CNPJ", digitar `35165757000110`, clicar "Acessar".
Expected: transição suave para os dois cards ("LensTrack" e "Conciliação ClinicWeb × Porto
Seguro"), cada um com hover funcionando (fundo, borda, sombra, `scale-[1.02]`), abrindo em
nova aba ao clicar.

- [ ] **Step 4: Testar CNPJ válido mas desconhecido**

Clicar "usar outro CNPJ", digitar `11222333000181` (formato válido, ausente do
`clientAccess`), clicar "Acessar".
Expected: transição suave para a mensagem "CNPJ não encontrado", botão do WhatsApp abrindo
`https://wa.me/5517992449351` em nova aba, e o link "usar outro CNPJ" funcionando.

- [ ] **Step 5: Testar CNPJ mal formatado**

Clicar "usar outro CNPJ", digitar `123` (menos de 14 dígitos), clicar "Acessar".
Expected: **não** troca de estado — mensagem de erro inline aparece abaixo do input
("CNPJ inválido. Confira os 14 dígitos e tente novamente."), formulário continua visível.

- [ ] **Step 6: Conferir responsividade**

Redimensionar a janela do navegador (ou DevTools em modo mobile) na tela de "found" com 2
tools.
Expected: cards empilham em coluna (`flex-col`) abaixo do breakpoint `md`, sem overflow
horizontal.

- [ ] **Step 7: Reportar resultado ao Ricardo**

Não commitar nada nesta task (é só verificação). Resumir ao usuário o resultado dos passos
2–6 e aguardar validação antes de qualquer commit adicional, deploy, ou merge.

---

## Self-Review Notes

- **Cobertura da spec:** máscara/normalização (Task 2), config estática (Task 1), ícones
  (Task 3), os 3 estados + transições + link "usar outro CNPJ" (Task 4), validação manual dos
  3 fluxos + responsividade (Task 5). Constraints de "não mexer nos produtos", "sem banco",
  "sem autenticação", "sem instalar framework de testes" e "sem commit/deploy automático"
  estão nas Global Constraints e refletidas na ausência de tasks que as violem.
- **Placeholders:** nenhum "TBD"/"similar to Task N" — todo código está completo em cada step.
- **Consistência de tipos:** `ClientTool`/`ClientAccess` (Task 1) usados sem alteração em
  Task 3 (`tool.icone`) e Task 4 (`client.nome`, `client.tools`, `tool.url`, `tool.descricao`,
  `tool.nome`, `tool.icone`). Assinaturas de `lib/cnpj.ts` (Task 2) usadas identicamente em
  Task 4 (`maskCnpj`, `normalizeCnpj`, `isValidCnpjFormat`). `ToolIcon` (Task 3) consumido com
  a mesma prop shape (`name`, `className`) em Task 4.
