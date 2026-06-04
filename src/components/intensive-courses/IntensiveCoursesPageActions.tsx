import { Button } from '@/components/ui/Button'
import { pricingIntensiveCoursesSectionId } from '@/config/pricingSections'
import { routes } from '@/config/routes'

export function IntensiveCoursesPageActions() {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-4">
      <Button href={`${routes.pricing}#${pricingIntensiveCoursesSectionId}`}>Tarifs</Button>
      <Button href={routes.stagesIntensifsCalendar} variant="ghost">
        Calendrier
      </Button>
    </div>
  )
}
