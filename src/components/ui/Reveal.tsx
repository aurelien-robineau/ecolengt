'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: React.ReactNode
  className?: string
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setReduceMotion(prefersReducedMotion()))
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  const showContent = reduceMotion || visible

  return (
    <div
      ref={ref}
      className={cn(
        !reduceMotion && 'transition-[opacity,transform] duration-700',
        showContent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
