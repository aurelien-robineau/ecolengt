type PortraitPlaceholderProps = {
  alt: string
}

export function PortraitPlaceholder({ alt }: PortraitPlaceholderProps) {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="h-14 w-14 stroke-foreground-subtle opacity-35"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <circle cx="32" cy="40" r="18" strokeWidth="1.5" />
          <ellipse cx="32" cy="22" rx="12" ry="5" strokeWidth="1.5" />
          <line x1="32" y1="2" x2="32" y2="16" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="sr-only">{alt}</span>
    </>
  )
}
