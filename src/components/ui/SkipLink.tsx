import { mainContentId } from '@/lib/a11y/mainContent'

export function SkipLink() {
  return (
    <a href={`#${mainContentId}`} className="skip-link">
      Aller au contenu principal
    </a>
  )
}
