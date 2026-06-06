# Spacing Reference

Deep-dive supplement to the main SKILL.md. Read when:
- Auditing specific spacing violations in a component
- Setting up a spacing system in CSS variables
- Deciding padding/margin for a component not listed in SKILL.md

---

## CSS Custom Properties Setup

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;   /* use rarely — prefer 16 or 24 */
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;   /* use rarely — prefer 32 or 48 */
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;   /* use rarely — prefer 64 or 96 */
  --space-24: 96px;
  --space-32: 128px;
}
```

The "use rarely" steps exist in the scale but should be avoided — they're between the natural
resting points and often indicate you should round to the nearest standard value.

## Section Padding Scale by Viewport

| Section type          | Mobile (< 768px) | Tablet (768–1024px) | Desktop (> 1024px) |
|-----------------------|------------------|---------------------|-------------------|
| Hero / above-fold     | 80px top, 64px bot | 96px top/bot      | 128px top/bot     |
| Standard content      | 48px             | 64px               | 96px              |
| Compact / dense       | 32px             | 48px               | 64px              |
| Footer                | 48px top, 32px bot | 64px top/bot     | 64–80px top/bot   |

## Component Spacing — Full Table

| Component                | Property          | Mobile   | Desktop  | Notes                                  |
|--------------------------|-------------------|----------|----------|----------------------------------------|
| Page container           | padding-inline    | 16–20px  | 24–48px  | Never less than 16px                  |
| Page container           | max-width         | 100%     | 1280px   | Centered with margin: auto             |
| Prose / content column   | max-width         | 100%     | 680px    | Enforces readable line length          |
| Section heading block    | margin-bottom     | 32px     | 48px     | Space between heading group and content|
| Card grid                | gap               | 16px     | 24px     | 20px acceptable for denser layouts     |
| Card internal padding    | padding           | 20–24px  | 24–32px  | Scale with card visual size            |
| Form field               | padding-block     | 10px     | 12px     |                                        |
| Form field               | padding-inline    | 14px     | 16px     |                                        |
| Form field               | gap to next field | 16px     | 16px     |                                        |
| Form label → field       | margin-bottom     | 6px      | 8px      |                                        |
| Button                   | padding-inline    | 20px     | 24px     | sm variant: 14–16px                   |
| Button                   | padding-block     | 10px     | 12px     | min-height: 44px always               |
| Nav link                 | padding-inline    | 12px     | 16px     |                                        |
| Nav                      | padding-block     | 0        | 0        | Use height/min-height instead          |
| Tooltip                  | padding           | 6px 10px | 8px 12px |                                       |
| Badge / chip             | padding           | 3px 10px | 4px 12px | pill: border-radius 999px             |
| Modal                    | padding           | 24px     | 32px     |                                        |
| Dropdown item            | padding           | 8px 16px | 8px 16px |                                       |
| Table cell (data)        | padding           | 8px 12px | 12px 16px|                                       |
| Table cell (header)      | padding           | 8px 12px | 10px 16px| font-weight 600, uppercase 12px        |
| Avatar + text            | gap               | 8px      | 10–12px  |                                        |
| Icon + text (inline)     | gap               | 6px      | 8px      | align-items: center                    |
| Stack of paragraphs      | margin-between    | 1em      | 1em      | relative to font-size                  |

## Common Anti-Patterns and Fixes

### Anti-pattern: Inconsistent arbitrary values
```css
/* Bad */
.hero { padding: 73px 40px; }
.section { padding: 55px 32px; }
.card { padding: 18px; }

/* Good */
.hero { padding: 96px 48px; }
.section { padding: 64px 32px; }
.card { padding: 24px; }
```

### Anti-pattern: Padding creep in Tailwind
```html
<!-- Bad — no logic, just trial-and-error -->
<section class="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-16">

<!-- Good — uses named scale -->
<section class="px-4 py-12 md:px-8 lg:py-24">
```

### Anti-pattern: Missing container max-width
```css
/* Bad — text stretches to 2000px wide on large monitors */
.section-content { padding: 0 24px; }

/* Good */
.section-content {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 48px); /* fluid horizontal padding */
}
```

### Anti-pattern: Collapsed margins between sections
```css
/* Bad — sections feel fused */
.section { margin-bottom: 0; }

/* Good — alternating background + padding creates rhythm, no need for margin */
.section:nth-child(even) { background: var(--bg-subtle); }
```

## Fluid Spacing with `clamp()`

For section padding that scales smoothly between breakpoints:

```css
.section {
  padding-block: clamp(48px, 8vw, 96px);
  padding-inline: clamp(16px, 4vw, 48px);
}
```

This eliminates the need for multiple breakpoint overrides in most cases.

## Negative Space as a Design Tool

In a simple, modern showcase, **whitespace is the luxury signal**. More padding = more confidence.

When in doubt between two spacing values, pick the larger one.

Exceptions: dense data tables, navigation bars, badges — these should be tight.
Everything else should breathe.

## Stacking Contexts and Z-Index Scale

If your design uses overlapping elements (fixed nav, modals, tooltips), use a named scale:

```css
:root {
  --z-below:    -1;
  --z-base:      0;
  --z-raised:   10;   /* cards on hover, sticky elements */
  --z-dropdown: 100;  /* dropdowns, popovers */
  --z-sticky:   200;  /* sticky headers */
  --z-modal:    300;  /* modals, drawers */
  --z-toast:    400;  /* notification toasts */
  --z-tooltip:  500;  /* tooltips (should be above everything) */
}
```

Never use arbitrary z-index values like `z-index: 9999` — this is a symptom of a missing scale.
