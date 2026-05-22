import { cn } from '@/lib/cn'

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section'
  id?: string
}

export function Container({ children, className, as: Tag = 'div', id }: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn('mx-auto min-w-0 w-full max-w-(--width-content) px-8 md:px-16', className)}
    >
      {children}
    </Tag>
  )
}
