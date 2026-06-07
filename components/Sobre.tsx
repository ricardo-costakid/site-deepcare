'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const SplineSobre = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function Sobre() {
  const sobreContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY * 2.0, behavior: 'auto' })
    }

    let attempts = 0
    const attach = () => {
      const canvas = sobreContainerRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.addEventListener('wheel', handleWheel, { passive: true })
      } else if (attempts < 20) {
        attempts++
        setTimeout(attach, 300)
      }
    }

    attach()

    return () => {
      const canvas = sobreContainerRef.current?.querySelector('canvas')
      canvas?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <section id="sobre" className="py-20 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-[28px] md:text-[40px] font-medium text-text-primary tracking-[-0.015em]">
              Sobre a DeepCare
            </h2>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              O mercado não espera. Empresas que não incorporam IA nos processos hoje vão operar em desvantagem amanhã.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              A DeepCare nasceu para mudar isso.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Somos uma empresa AI First — inteligência artificial não é um recurso extra, é a base de tudo que construímos. Cada solução é projetada para gerar resultado mensurável: mais lucro, menos custo, mais controle.
            </p>
            <p className="text-[16px] text-text-secondary leading-relaxed">
              Não vendemos tecnologia por tecnologia. Implementamos IA onde ela faz sentido — com ética, segurança e acompanhamento real.
            </p>
          </motion.div>

          <div
            ref={sobreContainerRef}
            className="hidden md:block"
            style={{ width: '100%', height: '600px', position: 'relative', overflow: 'visible' }}
            aria-hidden="true"
          >
            <SplineSobre
              scene="https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
