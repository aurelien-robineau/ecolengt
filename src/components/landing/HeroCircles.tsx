export function HeroCircles() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 right-[6%] hidden h-[420px] w-[420px] -translate-y-1/2 text-foreground-muted opacity-[0.14] lg:block"
      viewBox="0 0 420 420"
      aria-hidden
    >
      <circle cx="210" cy="210" r="200" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="210" cy="210" r="160" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="210" cy="210" r="120" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="210" cy="210" r="80" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="210" cy="210" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="210" cy="210" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="210" y1="10" x2="210" y2="410" stroke="#FFDD00" strokeWidth="0.4" />
      <line x1="10" y1="210" x2="410" y2="210" stroke="#FFDD00" strokeWidth="0.4" />
    </svg>
  )
}
