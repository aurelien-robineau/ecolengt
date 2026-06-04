'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

function MetronomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v2" />
      <path d="M8 5h8l3 15H5L8 5z" />
      <path d="M12 9.5l3.5 6.5" />
      <circle cx="12" cy="9.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Four-beat row: emphasized downbeat (common accent pattern). */
function AccentBeatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="5" cy="12" r="3" fill="currentColor" />
      <circle cx="10.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="21.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

const optionIcons = {
  mechanical: MetronomeIcon,
  accentFirst: AccentBeatIcon,
} as const

type MetronomeOptionToggleProps = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon: keyof typeof optionIcons
  children: ReactNode
  description?: string
}

export function MetronomeOptionToggle({
  id,
  checked,
  onChange,
  icon,
  children,
  description,
}: MetronomeOptionToggleProps) {
  const Icon = optionIcons[icon]

  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex cursor-pointer items-center gap-3 rounded-sm border px-3 py-2.5 transition-[border-color,background-color,box-shadow] sm:gap-3.5 sm:px-3.5 sm:py-3.5',
        checked
          ? 'border-brand-border bg-brand-dim shadow-[inset_0_0_0_1px_rgb(255_221_0_/_0.15)]'
          : 'border-brand-border/60 bg-surface-card hover:border-brand-border/90 hover:bg-surface-muted/50',
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-sm border transition-colors sm:size-10',
          checked
            ? 'border-brand-border bg-brand text-foreground'
            : 'border-brand-border/40 bg-surface-muted text-foreground-muted group-hover:text-foreground',
        )}
        aria-hidden
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[13px] leading-tight text-foreground sm:text-sm sm:leading-snug">
          {children}
        </span>
        {description ? (
          <span className="mt-0.5 hidden text-xs leading-relaxed text-foreground-muted sm:block">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-full border transition-colors',
          checked
            ? 'border-foreground/20 bg-foreground'
            : 'border-brand-border/50 bg-surface-muted',
        )}
        aria-hidden
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-[1.125rem] rounded-full bg-surface-card shadow-sm transition-transform',
            checked && 'translate-x-4',
          )}
        />
      </span>
    </label>
  )
}
