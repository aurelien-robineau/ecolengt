import { cn } from '@/lib/cn'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-(--width-content) px-8 md:px-16', className)}>
      {children}
    </div>
  )
}
