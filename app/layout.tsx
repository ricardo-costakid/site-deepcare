import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DeepCare Analytics — Inteligência Artificial para empresas',
  description: 'A plataforma de IA para empresas que querem crescer na prática. Soluções prontas, implementação rápida, resultado mensurável.',
  icons: {
    icon: '/logo/deepcare-simbolo-dark.svg',
  },
  openGraph: {
    title: 'DeepCare Analytics',
    description: 'Inteligência Artificial para empresas que querem crescer na prática.',
    url: 'https://deepcareanalytics.com',
    siteName: 'DeepCare Analytics',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans bg-bg-dark text-text-primary">
        {children}
      </body>
    </html>
  )
}
