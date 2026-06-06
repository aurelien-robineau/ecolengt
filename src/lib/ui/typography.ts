/**
 * Readable type scale — 16px body minimum, clear hierarchy, WCAG-friendly colors.
 * Brand yellow is reserved for backgrounds & dark-surface accents, never body text on white.
 */

/** Default paragraph — 16px, relaxed leading, muted but high-contrast gray. */
export const bodyTextClassName = 'type-body text-start text-foreground-muted'

/** Intro / lead paragraph — 18px, sits between body and section titles. */
export const leadTextClassName = 'type-lead text-foreground-muted'

/** Section eyebrow on light backgrounds — small caps, dark gray (not yellow). */
export const sectionLabelClassName = 'type-eyebrow'

/** Section eyebrow on dark backgrounds (footer) — brand yellow is readable here. */
export const sectionLabelInverseClassName = 'type-eyebrow-inverse'

/** Page-level section heading (h2). */
export const pageSectionTitleClassName =
  'type-section-title text-start text-[clamp(1.5rem,3vw,2rem)]'

/** Card / block title (h3). */
export const cardTitleClassName = 'type-card-title'

/** Contact values on the contact page (phone, email, address). */
export const contactValueClassName =
  'font-sans text-lg leading-snug font-normal text-foreground md:text-xl lg:text-lg'

export const contactLinkValueClassName = `${contactValueClassName} no-underline transition-colors duration-150 hover:text-foreground`

/** Inline label before a phone or email when both appear on one line. */
export const contactItemLabelClassName =
  'text-xs font-semibold tracking-[var(--tracking-widest)] text-foreground-subtle uppercase'

/** Inline label variant for dark footer surfaces. */
export const contactItemLabelInverseClassName =
  'text-xs font-semibold tracking-[var(--tracking-widest)] text-foreground-inverse-muted uppercase'

/** Footer / dark surface — Téléphone, E-mail group headings under Contact. */
export const contactGroupLabelInverseClassName =
  'text-xs font-semibold tracking-[var(--tracking-widest)] text-foreground-inverse uppercase'

/** Vertical rhythm — 12px below eyebrows / surtitles. */
export const stackEyebrowClassName = 'mb-3'

/** Vertical rhythm — 16px below card titles and in-callout labels. */
export const stackTitleClassName = 'mb-4'

/** Vertical rhythm — 48px below section headers or page h2 blocks. */
export const stackSectionClassName = 'mb-12'

/** Vertical rhythm — 64px between major content blocks. */
export const stackBlockClassName = 'mb-16'

/** Vertical rhythm — 24px below footer column headings. */
export const stackColumnLabelClassName = 'mb-6'

/** Stacked links or contact lines — 16px between items. */
export const stackListClassName = 'space-y-4'

/** Default content grid gap — 32px, 48px from lg. */
export const gridGapClassName = 'gap-8 lg:gap-12'
