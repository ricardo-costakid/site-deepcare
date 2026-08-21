import { NextRequest, NextResponse } from 'next/server'

type LeadPayload = {
  nome: string
  whatsapp: string
  empresa: string
  desafio: string
  extra: string
  solucao: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildMessage(lead: LeadPayload): string {
  const { nome, whatsapp, empresa, desafio, extra, solucao } = lead
  return [
    '<b>🔔 Novo lead — Comunidade DeepCare</b>',
    '',
    `<b>Nome:</b> ${escapeHtml(nome)}`,
    `<b>WhatsApp:</b> ${escapeHtml(whatsapp)}`,
    `<b>Empresa:</b> ${escapeHtml(empresa)}`,
    `<b>Desafio:</b> ${escapeHtml(desafio)}`,
    `<b>Extra:</b> ${escapeHtml(extra)}`,
    `<b>Origem (solucao):</b> ${escapeHtml(solucao)}`,
  ].join('\n')
}

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return NextResponse.json({ ok: false, error: 'Telegram env vars not configured' }, { status: 500 })
  }

  const lead = (await request.json()) as LeadPayload

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(lead),
        parse_mode: 'HTML',
      }),
    })

    if (!telegramRes.ok) {
      return NextResponse.json({ ok: false, error: 'Telegram API request failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to reach Telegram API' }, { status: 502 })
  }
}
