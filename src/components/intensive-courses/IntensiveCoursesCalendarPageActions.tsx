import { Button } from '@/components/ui/Button'
import { pricingIntensiveCoursesSectionId } from '@/config/pricingSections'
import { routes } from '@/config/routes'

export function IntensiveCoursesCalendarPageActions() {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-4">
      <Button href={routes.stagesIntensifs} variant="ghost">
        Stages intensifs
      </Button>
      <Button href={`${routes.pricing}#${pricingIntensiveCoursesSectionId}`}>Tarifs</Button>
    </div>
  )
}
