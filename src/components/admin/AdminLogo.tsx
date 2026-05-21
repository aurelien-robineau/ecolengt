import type { ServerProps } from 'payload'

/** Full logo on the admin login screen (replaces the Payload logo). */
export function AdminLogo(_props: ServerProps) {
  return (
    <img
      src="/assets/logo.svg"
      alt="École de Batterie NGT"
      width={193}
      height={44}
      style={{ display: 'block', maxHeight: 44, width: 'auto', height: 'auto' }}
    />
  )
}
