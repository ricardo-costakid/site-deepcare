'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Target, Lightbulb, Rocket, CheckCircle } from 'lucide-react'

const SplineMentoria = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
})

const pillars = [
  {
    icon: Target,
    title: 'Foco no seu problema',
    text: 'A sessão é construída a partir da sua realidade. Cada encontro tem começo, meio e fim — com direção clara e próximos passos definidos.',
  },
  {
    icon: Lightbulb,
    title: 'Saída com clareza',
    text: 'Você termina a sessão sabendo exatamente o que fazer a seguir. Sem dúvidas no ar, sem tecnologia pela metade.',
  },
  {
    icon: Rocket,
    title: 'Menos tentativa e erro',
    text: 'Atalhe o caminho com orientação de quem já passou pelo processo e sabe onde estão os erros mais comuns.',
  },
]

const audience = [
  'Você sabe que precisa de IA mas ainda não sabe por onde começar',
  'Você tentou usar IA no negócio mas os resultados não vieram como esperado',
  'Você não sabe quais ferramentas fazem sentido para o que você precisa',
  'Você começou a implementar mas está travado e sem saber o próximo passo',
  'Você quer uma estratégia de IA sólida e não quer errar no caminho',
  'Você quer implementar do jeito certo — com segurança, ética e resultado que se mede',
]

export default function Mentoria() {
  const splineContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY * 2.0, behavior: 'auto' })
    }

    let attempts = 0
    const attach = () => {
      const canvas = splineContainerRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.addEventListener('wheel', handleWheel, { passive: true })
      } else if (attempts < 20) {
        attempts++
        setTimeout(attach, 300)
      }
    }

    attach()

    return () => {
      const canvas = splineContainerRef.current?.querySelector('canvas')
      canvas?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <section id="mentoria" className="bg-white">

      {/* 1. Hero */}
      <div className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <motion.div {...fadeUp()} className="pb-16">
              <span className="inline-block bg-[#5B8F7A] text-white text-xs tracking-widest rounded-full px-4 py-1 mb-4">
                MENTORIA
              </span>
              <h2 className="text-4xl font-bold text-[#111111] leading-tight mt-2">
                Sessões individuais para guiar a implementação de IA no seu negócio.
              </h2>
              <p className="text-lg text-[#555555] mt-4 max-w-lg leading-relaxed">
                Tire dúvidas, revise projetos e saia com clareza sobre os próximos passos — presencial em São José do Rio Preto ou por videoconferência.
              </p>
              <a
                href="https://wa.me/5517992449351?text=Ol%C3%A1!%20Tenho%20interesse%20em%20agendar%20uma%20sess%C3%A3o%20de%20mentoria%20com%20a%20DeepCare."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 text-[#DA7756] font-medium hover:underline transition-all"
              >
                <span className="bg-[#5B8F7A] text-white text-xs px-2 py-0.5 rounded-full mr-2">MENTORIA</span>
                Quero agendar uma sessão →
              </a>
            </motion.div>

            <div
              ref={splineContainerRef}
              className="hidden md:block"
              style={{ width: '100%', height: '600px', position: 'relative', overflow: 'visible' }}
              aria-hidden="true"
            >
              <SplineMentoria
                scene="https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* 2. O que são as mentorias */}
      <div className="bg-[#F8F9FA] py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <motion.div {...fadeUp()}>
              <h3 className="text-3xl font-bold text-[#111111] mb-6">
                Mentoria — seu desenvolvimento acelerado
              </h3>
              <p className="text-[#555555] leading-relaxed">
                São sessões individuais ao vivo onde você traz os desafios reais do seu negócio e sai com um caminho claro para implementar IA. Foco total no que faz sentido para o momento da sua empresa.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8">
                <p className="text-xl font-medium text-[#111111] leading-relaxed">
                  &ldquo;Uma sessão pensada para o seu contexto. Você traz o problema, a gente constrói o caminho juntos.&rdquo;
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 3. O que esperar das mentorias */}
      <div className="bg-white py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">

          <motion.div {...fadeUp()} className="text-center">
            <h3 className="text-3xl font-bold text-[#111111]">
              Como funciona a mentoria
            </h3>
            <p className="text-[#555555] mt-3 max-w-2xl mx-auto leading-relaxed">
              Cada sessão é orientada por três princípios que garantem que você saia com clareza para agir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                {...fadeUp(0.1 * i)}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-8"
              >
                <Icon className="w-10 h-10 text-[#5B8F7A] mb-4" strokeWidth={1.5} />
                <h4 className="text-lg font-semibold text-[#111111] mb-2">{title}</h4>
                <p className="text-[#555555] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Para quem é */}
      <div className="bg-[#F8F9FA] py-20 border-t border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <motion.div {...fadeUp()}>
              <h3 className="text-3xl font-bold text-[#111111] mb-4">
                Será que a mentoria é para o seu momento?
              </h3>
              <p className="text-[#555555] leading-relaxed">
                A mentoria é para quem age. Se você se reconhece em algum destes perfis, é para você.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <ul className="space-y-4">
                {audience.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-[#5B8F7A] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[#111111] text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 5. CTA Final */}
      <div className="bg-[#1A2620] py-12 md:py-24 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            {...fadeUp()}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-4xl font-bold text-white">
              Pronto para implementar IA no seu negócio?
            </h3>
            <p className="text-gray-400 mt-4 text-lg max-w-lg mx-auto leading-relaxed">
              Fale pelo WhatsApp e descubra qual formato de mentoria faz sentido para o momento da sua empresa.
            </p>
            <a
              href="https://wa.me/5517992449351?text=Ol%C3%A1!%20Tenho%20interesse%20em%20agendar%20uma%20sess%C3%A3o%20de%20mentoria%20com%20a%20DeepCare."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 bg-[#5B8F7A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#3D6357] transition-colors"
            >
              Agendar uma sessão
            </a>
            <a
              href="#inicio"
              className="mt-4 block text-gray-500 text-sm hover:text-gray-300 transition-colors"
            >
              ← Voltar ao início
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
