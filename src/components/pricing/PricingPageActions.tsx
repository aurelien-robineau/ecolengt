import { Button } from '@/components/ui/Button'
import { routes } from '@/config/routes'

export function PricingPageActions() {
  return (
    <div className="mt-12">
      <Button href={routes.contact} className="w-full sm:w-auto">
        Nous contacter
      </Button>
    </div>
  )
}
