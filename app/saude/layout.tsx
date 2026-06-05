import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soluções para Saúde — DeepCare Analytics',
  description:
    'Inteligência de negócios para clínicas que querem crescer com clareza. Faturamento, projeção de caixa e controle de ativos — soluções nascidas no setor de saúde.',
}

export default function SaudeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
