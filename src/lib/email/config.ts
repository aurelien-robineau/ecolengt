import { resendAdapter } from '@payloadcms/email-resend'

export const resendEmailAdapter = resendAdapter({
  apiKey: process.env.RESEND_API_KEY || '',
  defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || '',
  defaultFromName: process.env.EMAIL_FROM_NAME || '',
})
