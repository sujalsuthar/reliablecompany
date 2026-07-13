import { COMPANY_PHONE } from '@/lib/brand'

function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function getWhatsAppNumber(): string {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ||
    process.env.WHATSAPP_PHONE_NUMBER ||
    COMPANY_PHONE
  return digitsOnly(raw)
}

export function whatsAppChatUrl(message?: string): string {
  const number = getWhatsAppNumber()
  const base = `https://wa.me/${number}`
  if (!message?.trim()) return base
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

export function isWhatsAppApiConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_API_TOKEN?.trim() &&
      process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() &&
      process.env.WHATSAPP_NOTIFY_NUMBER?.trim(),
  )
}

/** Sends a text notification via Meta WhatsApp Cloud API (optional). */
export async function sendWhatsAppNotification(text: string): Promise<boolean> {
  const token = process.env.WHATSAPP_API_TOKEN?.trim()
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim()
  const recipient = process.env.WHATSAPP_NOTIFY_NUMBER?.trim()

  if (!token || !phoneNumberId || !recipient) {
    return false
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: digitsOnly(recipient),
          type: 'text',
          text: { body: text.slice(0, 4096) },
        }),
      },
    )

    if (!response.ok) {
      const body = await response.text()
      console.error('[whatsapp] API error:', response.status, body)
      return false
    }

    return true
  } catch (error) {
    console.error('[whatsapp] send failed:', error)
    return false
  }
}
