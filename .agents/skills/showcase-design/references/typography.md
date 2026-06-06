# Typography Reference

Deep-dive supplement to the main SKILL.md. Read when:
- Choosing or auditing a font pairing
- Debugging type rhythm issues
- Setting up a CSS type system from scratch

---

## CSS Custom Properties Setup

Always define type as CSS variables at `:root`. Never hardcode sizes inline.

```css
:root {
  /* Scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  2rem;      /* 32px */
  --text-4xl:  2.5rem;    /* 40px */
  --text-5xl:  3rem;      /* 48px */
  --text-display: clamp(3rem, 6vw, 5rem); /* fluid hero */

  /* Leading */
  --leading-tight:  1.15;
  --leading-snug:   1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  /* Tracking */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-widest:  0.1em;

  /* Weights */
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 800;
}
```

## Fluid Typography with `clamp()`

For hero text, use `clamp()` instead of breakpoint-based font sizing:

```css
.hero-title {
  font-size: clamp(2.5rem, 5vw + 1rem, 5rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.section-heading {
  font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

The formula: `clamp(min, preferred, max)` where `preferred` is a viewport-relative expression.
A good rule of thumb: `preferred = X vw + Y rem` where Y anchors the minimum and X adds fluid growth.

## Font Loading — Google Fonts

Always use `display=swap` and `preconnect`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap" rel="stylesheet">
```

Load only the weights you use. Don't load 100–900 if you only use 400 and 700.

## Optical Sizing

For variable fonts that support it (DM Sans, Source Serif, etc.), enable optical sizing:

```css
h1, h2 { font-optical-sizing: auto; }
```

This subtly adjusts letterform proportions for large sizes — makes big headings look more refined.

## Proven Font Pairings for a Showcase Site

### Pairing 1 — DM Sans (technical, clean)
```css
--font-display: 'DM Sans', sans-serif;
--font-body: 'DM Sans', sans-serif; /* single family, different weights */
```
Use: `font-weight: 700–800` for headings, `400` for body.
Load: `ital,opsz,wght@0,9..40,300..800`

### Pairing 2 — Fraunces + DM Sans (editorial contrast)
```css
--font-display: 'Fraunces', serif;    /* optical, expressive for large text */
--font-body: 'DM Sans', sans-serif;   /* clean, readable for body */
```
Use: Fraunces only at h1/h2 level (700), DM Sans for everything else.

### Pairing 3 — Instrument Serif + Instrument Sans (unified system)
```css
--font-display: 'Instrument Serif', serif;
--font-body: 'Instrument Sans', sans-serif;
```
Designed as a system by the same foundry. Excellent coherence.

### Pairing 4 — Space Grotesk + Space Mono (techy/monospace accent)
```css
--font-display: 'Space Grotesk', sans-serif;
--font-mono: 'Space Mono', monospace;  /* for code, labels, counters */
--font-body: 'Space Grotesk', sans-serif;
```
Good for a developer portfolio or tool showcase.

### Pairing 5 — Syne + Satoshi (modern geometric)
```css
--font-display: 'Syne', sans-serif;       /* geometric, confident */
--font-body: 'Satoshi', sans-serif;        /* self-hosted or from Fontshare */
```
Syne has strong character at display sizes. Satoshi is excellent body.

## Vertical Rhythm

Body text should sit on an invisible baseline grid. A typical setup:

```
Base font-size:  16px
Base line-height: 1.6 → 25.6px line height
Baseline unit:   8px (half line-height)
```

All spacing below body text (margin-bottom on paragraphs, list item spacing) should be a multiple of 8px.
This creates natural vertical rhythm even without explicit baseline-grid tooling.

## Paragraph Spacing

```css
p + p {
  margin-top: 1em; /* roughly one line of text */
}

/* In article/prose contexts: */
.prose p {
  margin-bottom: 1.5em;
}
.prose h2 {
  margin-top: 2.5em;
  margin-bottom: 0.75em;
}
.prose h3 {
  margin-top: 2em;
  margin-bottom: 0.5em;
}
```

## Eyebrow / Section Label Pattern

Small uppercase labels above section headings create hierarchy and rhythm. Apply consistently:

```css
.eyebrow {
  font-size: var(--text-xs);       /* 12px */
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest); /* 0.1em */
  text-transform: uppercase;
  color: var(--accent);            /* accent color */
  margin-bottom: 12px;
}
```

Usage:
```html
<span class="eyebrow">About</span>
<h2>Who I am and what I build</h2>
```
