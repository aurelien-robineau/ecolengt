import { Button } from '@/components/ui/Button'
import { pricingWorkshopsSectionId } from '@/config/pricingSections'
import { routes } from '@/config/routes'

export function IntensiveCoursesPageActions() {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-4">
      <Button href={`${routes.pricing}#${pricingWorkshopsSectionId}`} size="md">
        Tarifs
      </Button>
      <Button href={routes.stagesIntensifsCalendar} variant="ghost" size="md">
        Calendrier
      </Button>
    </div>
  )
}
