import { MetronomeFeature } from './MetronomeFeature'
import { MetronomeForm } from './MetronomeForm'

type LeTrainMetronomeEmbedProps = {
  className?: string
}

/** Embeddable metronome UI — fonts, theme, and form in one boundary. */
export function LeTrainMetronomeEmbed({ className }: LeTrainMetronomeEmbedProps) {
  return (
    <MetronomeFeature className={className}>
      <MetronomeForm />
    </MetronomeFeature>
  )
}
