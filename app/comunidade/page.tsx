'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const WEBHOOK_URL = 'WEBHOOK_N8N_PLACEHOLDER'

type Message = {
  id: number
  role: 'bot' | 'user'
  text: string
}

type Answers = {
  nome: string
  whatsapp: string
  empresa: string
  desafio: string
  extra: string
}

function getQuestion(step: number, nome: string): string {
  switch (step) {
    case 0: return 'Oi! Eu sou o Ricardo, fundador da DeepCare. Qual é o seu nome?'
    case 1: return `Prazer, ${nome}! Qual é o seu WhatsApp? (com DDD)`
    case 2: return 'Ótimo! Qual o nome da sua empresa e o que ela faz?'
    case 3: return 'Entendido. Qual a maior dificuldade que você enfrenta hoje no seu negócio?'
    case 4: return 'Obrigado por compartilhar isso. Tem mais alguma coisa que queira contar antes de finalizarmos?'
    default: return ''
  }
}

export default function ComunidadePage() {
  const searchParams = useSearchParams()
  const solucao = searchParams.get('solucao')
  const primeiraMsg = solucao
    ? `Oi! Vi que você tem interesse no ${solucao}. Eu sou o Ricardo, fundador da DeepCare. Qual é o seu nome?`
    : `Oi! Eu sou o Ricardo, fundador da DeepCare. Qual é o seu nome?`

  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [done, setDone] = useState(false)
  const [answers, setAnswers] = useState<Answers>({
    nome: '', whatsapp: '', empresa: '', desafio: '', extra: '',
  })

  const msgIdRef = useRef(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const nextId = () => {
    msgIdRef.current += 1
    return msgIdRef.current
  }

  // Mount: show first question
  useEffect(() => {
    setMessages([{ id: nextId(), role: 'bot', text: primeiraMsg }])
    const t = setTimeout(() => setShowInput(true), 600)
    return () => clearTimeout(t)
  // primeiraMsg is derived from URL params and stable after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, showInput, done])

  // Focus input when it appears
  useEffect(() => {
    if (showInput) inputRef.current?.focus()
  }, [showInput])

  const handleReset = useCallback(() => {
    msgIdRef.current = 0
    setStep(0)
    setInputValue('')
    setShowInput(false)
    setDone(false)
    setAnswers({ nome: '', whatsapp: '', empresa: '', desafio: '', extra: '' })
    setMessages([{ id: 1, role: 'bot', text: getQuestion(0, '') }])
    msgIdRef.current = 1
    setTimeout(() => setShowInput(true), 600)
  }, [])

  const handleSubmit = useCallback(() => {
    const value = inputValue.trim()
    const isLastStep = step === 4

    if (!value && !isLastStep) return

    const newAnswers: Answers = { ...answers }
    switch (step) {
      case 0: newAnswers.nome     = value; break
      case 1: newAnswers.whatsapp = value; break
      case 2: newAnswers.empresa  = value; break
      case 3: newAnswers.desafio  = value; break
      case 4: newAnswers.extra    = value; break
    }
    setAnswers(newAnswers)

    if (value) {
      setMessages(prev => [...prev, { id: nextId(), role: 'user', text: value }])
    }

    setInputValue('')
    setShowInput(false)

    if (isLastStep) {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAnswers, solucao: solucao || 'Não especificada' }),
      }).catch(() => {})

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: nextId(), role: 'bot', text: 'Recebemos tudo! Em breve entro em contato com você pelo WhatsApp.' },
        ])
        setDone(true)
      }, value ? 600 : 300)
      return
    }

    const nextStep = step + 1
    setStep(nextStep)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: nextId(), role: 'bot', text: getQuestion(nextStep, newAnswers.nome) },
      ])
      setTimeout(() => setShowInput(true), 600)
    }, 600)
  }, [inputValue, step, answers])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Left panel — desktop only */}
      <div className="hidden md:flex md:w-[40%] flex-shrink-0 bg-[#1A2620] h-screen flex-col relative">
        <div className="flex flex-col flex-1 justify-center p-12">
          <Image
            src="/logo/deepcare-logo-dark.svg"
            alt="DeepCare Analytics"
            height={32}
            width={195}
            priority
          />
          <div className="mt-12 h-px bg-white/10" />
          <h1 className="text-3xl font-bold text-white mt-12 leading-snug">
            Onde gestores e profissionais resolvem problemas com IA — juntos.
          </h1>
          <p className="text-base text-gray-400 mt-4 leading-relaxed">
            Aqui você conta seus desafios reais, troca experiências com quem está na mesma jornada e conecta com soluções que já funcionam na prática — ou criamos uma personalizada para você.
          </p>
        </div>
        <div className="absolute bottom-8 left-12 flex flex-col gap-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Voltar ao site
          </Link>
          <p className="text-xs text-gray-600">© 2026 DeepCare Analytics</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">

        {/* Top bar: mobile "Voltar" left + "Recomeçar" right */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-16 pt-5 pb-2">
          <Link href="/" className="md:hidden text-xs text-gray-500 hover:text-gray-600 transition-colors">
            ← Voltar ao site
          </Link>
          <div className="hidden md:block" />
          {!done && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 underline cursor-pointer hover:text-gray-600 transition-colors"
            >
              Recomeçar
            </button>
          )}
        </div>

        {/* Scrollable messages */}
        <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8">
          <div className="max-w-lg mx-auto flex flex-col gap-4">

            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-end gap-3'}`}
                >
                  {msg.role === 'bot' && (
                    <Image
                      src="/avatar/ricardo.jpeg"
                      alt="Ricardo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div
                    className={`px-4 py-3 text-sm max-w-[85%] leading-relaxed ${
                      msg.role === 'bot'
                        ? 'bg-[#F8F9FA] text-[#111111] rounded-2xl rounded-tl-none'
                        : 'bg-[#5B8F7A] text-white rounded-2xl rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <AnimatePresence>
          {showInput && !done && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 px-6 md:px-16 py-4 flex-shrink-0"
            >
              <div className="max-w-lg mx-auto flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={step === 4 ? 'Pode deixar em branco se preferir' : 'Digite sua resposta...'}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#5B8F7A] transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center bg-[#5B8F7A] text-white rounded-xl px-5 py-3 hover:bg-[#4a7a67] transition-colors flex-shrink-0"
                  aria-label="Enviar"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
