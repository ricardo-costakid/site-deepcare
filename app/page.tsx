import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Credibilidade from '@/components/Credibilidade'
import Solucoes from '@/components/Solucoes'
import ComoFunciona from '@/components/ComoFunciona'
import Premissa from '@/components/Premissa'
import Mentoria from '@/components/Mentoria'
import Sobre from '@/components/Sobre'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Credibilidade />
        <Solucoes />
        <ComoFunciona />
        <Premissa />
        <Mentoria />
        <Sobre />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
