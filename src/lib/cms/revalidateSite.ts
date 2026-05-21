import { revalidatePath } from 'next/cache'

import { routes } from '@/config/routes'

export function revalidateSite() {
  revalidatePath('/', 'layout')
  revalidatePath(routes.students, 'layout')
}
