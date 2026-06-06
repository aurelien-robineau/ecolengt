# Color Reference

Deep-dive supplement to the main SKILL.md. Read when:
- Constructing or auditing a color palette
- Implementing dark mode
- Debugging contrast failures
- Choosing accent colors

---

## CSS Custom Properties Setup

Define all colors as variables. Never hardcode hex values in components.

```css
:root {
  /* Neutrals — use a gray family (zinc, slate, neutral, stone) */
  --color-bg:          #FFFFFF;
  --color-bg-subtle:   #F9FAFB;   /* alternate section background */
  --color-surface:     #FFFFFF;   /* card, input surfaces */
  --color-border:      #E5E7EB;   /* borders, dividers */
  --color-border-strong: #D1D5DB;
  --color-text-primary:  #111827; /* headings */
  --color-text-body:     #374151; /* paragraphs */
  --color-text-muted:    #6B7280; /* captions, secondary */
  --color-text-disabled: #9CA3AF;

  /* Accent — single hue, 2 shades max */
  --color-accent:        #2563EB; /* blue example */
  --color-accent-hover:  #1D4ED8;
  --color-accent-light:  #EFF6FF; /* tinted bg for accent badges */
  --color-accent-text:   #1E40AF; /* accent-colored text on white */

  /* Semantic */
  --color-success:       #16A34A;
  --color-success-bg:    #F0FDF4;
  --color-warning:       #D97706;
  --color-warning-bg:    #FFFBEB;
  --color-error:         #DC2626;
  --color-error-bg:      #FEF2F2;
}
```

## Choosing Your Accent Color

Pick ONE hue. Apply it consistently to: primary buttons, links, active states, eyebrow labels,
focus rings. Never apply the accent to decorative backgrounds (use the `-light` tint instead).

**Accent hue recommendations by personality:**

| Hue    | Hex example | Personality                          |
|--------|-------------|--------------------------------------|
| Blue   | #2563EB     | trustworthy, technical, professional |
| Indigo | #4F46E5     | creative, modern, startup            |
| Violet | #7C3AED     | bold, expressive, premium            |
| Emerald| #059669     | growth, natural, calm                |
| Amber  | #D97706     | warm, energetic, craft               |
| Rose   | #E11D48     | passionate, design-forward           |
| Zinc   | #18181B     | minimalist, no accent (monochrome)   |

**Avoid:** Pure `#FF0000` red, pure `#0000FF` blue, pure `#00FF00` green — these are not design
colors, they are defaults. Always use a curated shade.

## Dark Mode

### The Correct Dark Mode Model

Dark mode is NOT `background: black; color: white`. That creates harsh glare and looks unpolished.

Use dark *ink* colors — very dark but slightly desaturated:

```css
[data-theme="dark"] {
  --color-bg:           #09090B;   /* zinc-950 */
  --color-bg-subtle:    #111112;   /* slightly lighter */
  --color-surface:      #18181B;   /* zinc-900 — cards */
  --color-border:       #27272A;   /* zinc-800 */
  --color-border-strong:#3F3F46;   /* zinc-700 */
  --color-text-primary: #FAFAFA;   /* zinc-50 */
  --color-text-body:    #D4D4D8;   /* zinc-300 */
  --color-text-muted:   #71717A;   /* zinc-500 */
  --color-text-disabled:#52525B;   /* zinc-600 */

  /* Accent — slightly brighter in dark mode */
  --color-accent:       #3B82F6;   /* blue-500 (lighter than dark bg version) */
  --color-accent-hover: #60A5FA;   /* blue-400 */
  --color-accent-light: #1E3A5F;   /* dark accent tint */
  --color-accent-text:  #93C5FD;   /* blue-300 */
}
```

### Dark Mode Toggle Implementation

```js
// Minimal toggle — no flash of wrong theme
const saved = localStorage.getItem('theme') ?? 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', saved);
```

Store preference, respect system preference as default, and apply before first paint
(inline script in `<head>`, before CSS loads) to prevent flash.

## Contrast Checking

### Quick Mental Model

- **Black (#000) on white (#FFF):** 21:1 — maximum
- **#374151 on white:** ~10:1 — excellent body text
- **#6B7280 on white:** ~4.6:1 — passes AA barely (use for captions only)
- **#9CA3AF on white:** ~2.8:1 — fails AA — never for text
- **White on #2563EB (blue-600):** ~4.6:1 — passes AA for normal text

Anything below 4.5:1 on body text is a bug.

### APCA (Advanced Perceptual Contrast) — Modern Standard

The newer APCA model (used in WCAG 3 drafts) is more perceptually accurate. For a showcase:
- Body text: aim for Lc 75+ (roughly 7:1 in WCAG terms)
- UI text / secondary: Lc 60+
- Large bold headings: Lc 45+

Tool: https://www.myndex.com/APCA/

## Color Anti-Patterns — Detailed

### Using `opacity` to create color variations
```css
/* Bad — creates muddy, illegible colors; also causes contrast issues */
.text-secondary { color: rgba(0,0,0,0.5); }

/* Good — use a specific color at the right step */
.text-secondary { color: var(--color-text-muted); }
```

### Saturated backgrounds on large sections
```css
/* Bad — aggressive, exhausting */
.hero { background: #2563EB; color: white; }

/* Good — use a tinted or near-white background */
.hero { background: var(--color-bg-subtle); } /* OR */
.hero { background: linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%); }
```

### Competing accent colors
```css
/* Bad — three accent colors fight for attention */
.badge { color: #2563EB; }
.cta { background: #059669; }
.link { color: #7C3AED; }

/* Good — one accent, used consistently */
.badge { color: var(--color-accent-text); background: var(--color-accent-light); }
.cta { background: var(--color-accent); color: white; }
.link { color: var(--color-accent); }
```

### Gradient overuse
```css
/* Bad — gradient everywhere = no focal point */
.hero { background: linear-gradient(135deg, #667eea, #764ba2); }
.card { background: linear-gradient(135deg, #f5f7fa, #c3cfe2); }
.button { background: linear-gradient(90deg, #43e97b, #38f9d7); }

/* Good — one subtle gradient maximum */
.hero {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, #dbeafe, transparent);
  background-color: var(--color-bg);
}
/* All other elements: solid colors */
```

## Tinting Accent Colors for Backgrounds

When you need a colored surface (badge, highlight, callout) without full saturation,
use a very low opacity or a pre-defined tint:

```css
/* Option 1 — CSS color-mix() (modern, recommended) */
.badge-bg {
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
}

/* Option 2 — hardcoded tint step (for older browser support) */
.badge-bg {
  background: var(--color-accent-light); /* e.g., #EFF6FF */
}

/* Option 3 — rgba (simple but loses theme-adaptability) */
.badge-bg {
  background: rgba(37, 99, 235, 0.08);
}
```

## Palette Examples — Copy-Ready

### Minimal Blue (most versatile for a showcase)
```css
:root {
  --accent:       #2563EB;
  --accent-hover: #1D4ED8;
  --accent-light: #EFF6FF;
  --accent-text:  #1E40AF;
  --text:         #111827;
  --text-muted:   #6B7280;
  --bg:           #FFFFFF;
  --bg-subtle:    #F9FAFB;
  --border:       #E5E7EB;
}
```

### Warm Neutral (portfolio, personal)
```css
:root {
  --accent:       #B45309;   /* warm amber */
  --accent-hover: #92400E;
  --accent-light: #FEF3C7;
  --text:         #1C1917;   /* stone-900 */
  --text-muted:   #78716C;   /* stone-500 */
  --bg:           #FAFAF9;   /* stone-50 */
  --bg-subtle:    #F5F5F4;   /* stone-100 */
  --border:       #E7E5E4;   /* stone-200 */
}
```

### Monochrome (maximally minimal)
```css
:root {
  --accent:       #18181B;   /* near-black is the accent */
  --accent-hover: #09090B;
  --accent-light: #F4F4F5;
  --text:         #18181B;
  --text-muted:   #71717A;
  --bg:           #FFFFFF;
  --bg-subtle:    #FAFAFA;
  --border:       #E4E4E7;
}
/* No color — hierarchy comes entirely from size and weight */
```
