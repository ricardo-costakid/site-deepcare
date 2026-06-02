'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WA_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-16 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6 py-20 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            A plataforma de Inteligência Artificial para empresas que querem crescer com IA na prática.
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Soluções prontas. Implementação rápida. Resultado mensurável em até 30 dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-green text-white font-semibold rounded-lg text-center hover:bg-brand-mid transition-colors duration-200"
            >
              Quero uma demonstração
            </a>
            <a
              href="#solucoes"
              className="px-6 py-3 border border-brand-green/40 text-text-secondary rounded-lg text-center hover:border-brand-green hover:text-text-primary transition-colors duration-200"
            >
              Ver soluções
            </a>
          </div>
        </motion.div>

        {/* Animated DeepCare symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 40px rgba(91, 143, 122, 0.35))' }}
          >
            <Image
              src="/logo/deepcare-simbolo-dark.svg"
              alt="DeepCare Analytics"
              width={300}
              height={300}
              priority
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
