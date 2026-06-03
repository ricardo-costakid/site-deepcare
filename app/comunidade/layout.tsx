import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comunidade DeepCare',
  description: 'Conta seu maior desafio. A gente cria a solução.',
}

export default function ComunidadeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
