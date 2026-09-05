import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

export const HR_EMAIL = process.env.MAIL_HR?.trim() || 'hr@reliablecompany.sa'
export const INFO_EMAIL = process.env.MAIL_INFO?.trim() || 'info@reliablecompany.sa'

function smtpFromAddress(): string {
  return (
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    'smtp@reliablecompany.sa'
  )
}

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  )
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  const options: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      minVersion: 'TLSv1.2',
      // Office 365 on some hosts needs this; still encrypts via STARTTLS
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== '0',
    },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 30_000,
  }

  return nodemailer.createTransport(options)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function textToHtml(text: string): string {
  return escapeHtml(text).replace(/\n/g, '<br />')
}

export interface MailAttachment {
  filename: string
  content: Buffer
  contentType?: string
}

export async function sendMail(options: {
  to: string
  subject: string
  text: string
  replyTo?: string
  attachments?: MailAttachment[]
}): Promise<boolean> {
  if (!isSmtpConfigured()) {
    console.warn('[mail] SMTP not configured — skipping email send')
    return false
  }

  const mailOptions: Mail.Options = {
    from: `"Reliable Company" <${smtpFromAddress()}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#111827">${textToHtml(options.text)}</div>`,
    replyTo: options.replyTo,
    attachments: options.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  }

  try {
    const transporter = createTransporter()
    const info = await transporter.sendMail(mailOptions)
    console.log('[mail] sent OK to', options.to, 'id=', info.messageId)
    return true
  } catch (error) {
    console.error('[mail] send failed:', error)
    return false
  }
}

export async function sendHrMail(
  subject: string,
  text: string,
  options?: { replyTo?: string; attachments?: MailAttachment[] },
): Promise<boolean> {
  return sendMail({
    to: HR_EMAIL,
    subject,
    text,
    replyTo: options?.replyTo,
    attachments: options?.attachments,
  })
}

export async function sendInfoMail(
  subject: string,
  text: string,
  options?: { replyTo?: string },
): Promise<boolean> {
  return sendMail({
    to: INFO_EMAIL,
    subject,
    text,
    replyTo: options?.replyTo,
  })
}
