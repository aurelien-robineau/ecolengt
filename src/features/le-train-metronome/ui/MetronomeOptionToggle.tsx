'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { FeatureIcon } from './FeatureIcon'
import type { MetronomeIconName } from './icons'

const optionIconNames = {
  mechanical: 'metronome',
  accentFirst: 'accentBeats',
} as const satisfies Record<string, MetronomeIconName>

type MetronomeOptionToggleProps = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  icon: keyof typeof optionIconNames
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
  const isAccentIcon = icon === 'accentFirst'

  return (
    <label
      htmlFor={id}
      className={cn(
        'group flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-3 transition-[border-color,background-color]',
        'sm:gap-4 sm:px-4 sm:py-3.5',
        checked
          ? 'border-[var(--metro-border-strong)] bg-[var(--metro-brand-dim)]'
          : 'border-[var(--metro-border)] bg-[var(--metro-panel)] hover:border-[var(--metro-border-strong)] hover:bg-[var(--metro-hover)]',
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
          'flex shrink-0 items-center justify-center rounded-sm border transition-colors',
          isAccentIcon ? 'size-9 p-0.5 sm:size-10 sm:p-1' : 'size-9 sm:size-10',
          checked
            ? 'border-[var(--metro-border-strong)] bg-[var(--metro-brand)] text-[var(--metro-on-brand)]'
            : 'border-[var(--metro-border)] bg-[var(--metro-panel)] text-[var(--metro-muted)] group-hover:text-[var(--metro-text)]',
        )}
        aria-hidden
      >
        <FeatureIcon
          name={optionIconNames[icon]}
          className={isAccentIcon ? 'size-5.5 sm:size-6' : 'size-5'}
        />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[13px] leading-tight text-[var(--metro-text)] sm:text-sm sm:leading-snug">
          {children}
        </span>
        {description ? (
          <span className="mt-1 hidden text-xs leading-relaxed text-[var(--metro-muted)] sm:block">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full border transition-colors',
          checked
            ? 'border-[var(--metro-brand)]/40 bg-[var(--metro-brand)]'
            : 'border-[var(--metro-border)] bg-[var(--metro-hover)]',
        )}
        aria-hidden
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-[1.125rem] rounded-full transition-transform',
            checked ? 'translate-x-5 bg-[var(--metro-on-brand)]' : 'bg-[var(--metro-panel)]',
          )}
        />
      </span>
    </label>
  )
}
