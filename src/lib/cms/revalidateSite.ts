import { revalidatePath } from 'next/cache'

import { routes } from '@/config/routes'

export function revalidateSite() {
  revalidatePath('/', 'layout')
  revalidatePath(routes.news, 'layout')
  revalidatePath(routes.students, 'layout')
  revalidatePath(routes.legalNotice)
  revalidatePath(routes.tomTom)
}
