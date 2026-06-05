'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ShieldCheck, UserCheck, BarChart2 } from 'lucide-react'
import { WA_URL } from '@/lib/constants'

const SplineOrb = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function Hero() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      window.scrollBy({ top: e.deltaY * 2.0, behavior: 'auto' })
    }

    let attempts = 0
    const attach = () => {
      const canvas = document.querySelector('canvas')
      if (canvas) {
        canvas.addEventListener('wheel', handleWheel, { passive: true })
      } else if (attempts < 20) {
        attempts++
        setTimeout(attach, 300)
      }
    }

    attach()

    return () => {
      const canvas = document.querySelector('canvas')
      canvas?.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 bg-white overflow-visible"
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-20 w-full flex flex-col md:flex-row items-center gap-12">

        {/* Text — left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full md:w-1/2 flex flex-col gap-7"
        >
          <span className="text-[11px] font-medium tracking-[1.5px] text-brand-green uppercase">
            Inteligência Artificial para empresas
          </span>

          <h1 className="text-[36px] md:text-[56px] lg:text-[62px] font-medium text-text-primary leading-[1.1] tracking-[-0.025em]">
            A plataforma das empresas que crescem com IA na prática.
          </h1>

          <p className="text-[17px] text-text-secondary leading-relaxed max-w-[480px]">
            IA implementada com ética, segurança e resultado mensurável — você no controle de cada etapa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-1">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] px-7 py-[13px] bg-brand-green text-white rounded-full text-center hover:bg-brand-mid transition-colors duration-200 font-medium"
            >
              Quero uma demonstração
            </a>
            <a
              href="#solucoes"
              className="text-[15px] px-7 py-[13px] text-brand-green rounded-full text-center hover:bg-brand-green/5 transition-colors duration-200 font-medium"
            >
              Ver soluções →
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            <div className="flex items-center gap-2 text-sm text-[#555555]">
              <ShieldCheck className="w-4 h-4 text-[#5B8F7A]" strokeWidth={1.5} />
              <span>Dados protegidos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#555555]">
              <UserCheck className="w-4 h-4 text-[#5B8F7A]" strokeWidth={1.5} />
              <span>Supervisão humana</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#555555]">
              <BarChart2 className="w-4 h-4 text-[#5B8F7A]" strokeWidth={1.5} />
              <span>Resultados auditáveis</span>
            </div>
          </div>

        </motion.div>

        {/* Spline orb — right */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div style={{ width: '100%', height: '600px' }}>
            <SplineOrb
              scene="https://prod.spline.design/rFiuXhWUUgG552jL/scene.splinecode"
              style={{ width: '100%', height: '600px' }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}
