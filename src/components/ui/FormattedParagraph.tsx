import { cn } from '@/lib/cn'

type FormattedParagraphProps = {
  children: string
  className?: string
}

/** Preserves single line breaks from CMS textareas (blank lines still split into separate blocks). */
export function FormattedParagraph({ children, className }: FormattedParagraphProps) {
  return <p className={cn('whitespace-pre-line', className)}>{children}</p>
}
