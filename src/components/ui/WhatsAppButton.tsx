'use client'

import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { whatsAppChatUrl } from '@/lib/whatsapp'

const DEFAULT_MESSAGE =
  'Hello Reliable Company, I would like to discuss your cybersecurity services.'

export default function WhatsAppButton() {
  const href = whatsAppChatUrl(DEFAULT_MESSAGE)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-whatsapp/50 focus:ring-offset-2"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  )
}
