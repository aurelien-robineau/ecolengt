---
name: showcase-design
description: >
  Design audit and improvement skill for a modern, simple showcase website. Use this skill whenever
  the user asks to improve, refine, polish, audit, or review the design of an existing page or
  component — even if phrased casually ("make this cleaner", "this feels off", "tighten the spacing",
  "make it more professional", "does this look good"). Also trigger when the user pastes or shares
  HTML/CSS/JSX code and wants design feedback or improvements. This skill provides concrete,
  opinionated rules a design-improvement agent must follow: spacing system, typography scale, color
  usage, layout principles, and common anti-patterns to fix. It does NOT redesign from scratch —
  it audits and elevates what already exists.
---

# Showcase Design — Audit & Improvement Skill

This skill gives you the ruleset to **audit an existing design and produce concrete improvements**.
You are not redesigning the page. You are a senior designer reviewing the work and applying
precision fixes: spacing, type scale, contrast, rhythm, hierarchy.

Read the full skill before touching any code. Then work section by section.

For deep-dive reference on specific subsystems, see:
- `references/typography.md` — full type scale, pairing rules, Google Fonts recommendations
- `references/spacing.md` — spacing scale, component-level padding tables, do/don't examples
- `references/color.md` — palette construction, contrast rules, dark/light mode handling

---

## 0. Audit Checklist — Run This First

Before writing any code, scan the existing design and check each item. Note violations. Fix them in
priority order (critical → major → minor).

**Critical (fix always)**
- [ ] Text contrast ≥ 4.5:1 on body, ≥ 3:1 on large text / UI components (WCAG AA)
- [ ] No raw `px` font sizes on body text (use `rem` or CSS custom properties)
- [ ] No invisible tap targets < 44×44px on interactive elements
- [ ] No horizontal overflow / broken layout on 375px mobile viewport

**Major (fix unless explicitly out of scope)**
- [ ] Spacing is inconsistent — not on a scale (arbitrary `13px`, `22px`, `37px` values)
- [ ] Type hierarchy is flat — all text feels the same visual weight
- [ ] Line-length (measure) exceeds 75ch on body text
- [ ] Font mixing is chaotic (3+ typefaces, or mismatched moods)
- [ ] CTA or primary action is not visually dominant

**Minor (improve when touching nearby code)**
- [ ] Missing `letter-spacing` on uppercase labels / small caps
- [ ] Icon and text baseline not aligned
- [ ] Transition/hover states missing or jarring
- [ ] Paragraph spacing tighter than line-height

---

## 1. Spacing System

**Always use a base-8 scale.** Every margin, padding, gap, and size must be a multiple of 4px,
strongly preferring multiples of 8px. No exceptions without a comment explaining why.

```
4px   — xs  — hairline gaps, icon inner padding
8px   — sm  — tight intra-component spacing (icon↔label, badge padding)
12px  — —   — acceptable for dense UIs only
16px  — md  — standard intra-component padding (buttons, inputs, cards)
24px  — lg  — between related elements within a section
32px  — xl  — between distinct components in a section
48px  — 2xl — section internal top/bottom padding (mobile)
64px  — 3xl — section internal top/bottom padding (desktop)
96px  — 4xl — between major page sections (desktop)
128px — 5xl — hero / above-the-fold breathing room
```

### Component Padding Rules

| Component       | Inline (L/R) | Block (T/B) | Notes                          |
|-----------------|-------------|-------------|--------------------------------|
| Button (default)| 24px        | 12px        | Min height 44px                |
| Button (sm)     | 16px        | 8px         | Min height 36px                |
| Card            | 24–32px     | 24–32px     | Increase on desktop            |
| Input / field   | 16px        | 10–12px     | Consistent with button height  |
| Navigation item | 16px        | 8–12px      | Horizontal nav                 |
| Section wrapper | 24px (mob)  | 48–64px     | Max-width container: 1200–1280px |
| Modal           | 32px        | 32px        | 24px on mobile                 |
| Badge / chip    | 10–12px     | 4–6px       | Pill border-radius             |

### Layout Widths

```
Content column:  680–740px  (prose / article body)
UI content:      960–1024px (cards, grids)
Full page max:   1200–1280px
Hero / full-bleed: no max-width constraint
```

**Anti-patterns to remove:**
- `margin: auto` with no `max-width` (text goes edge-to-edge on wide screens)
- Padding that changes at every breakpoint with no logic (`p-3 md:p-5 lg:p-7`)
- Mixing `px` and `rem` units for spacing in the same component

---

## 2. Typography

### Scale (modular, ratio ≈ 1.25 — Major Third)

```
12px / 0.75rem  — label-xs   — legal, captions, metadata
14px / 0.875rem — label-sm   — secondary labels, table headers, nav
16px / 1rem     — body       — default paragraph text (NEVER go below this for body)
18px / 1.125rem — body-lg    — lead paragraphs, intro text
20px / 1.25rem  — h4         — card titles, small section headings
24px / 1.5rem   — h3         — subsection headings
32px / 2rem     — h2         — section headings
40px / 2.5rem   — h1 (mob)  — page title on mobile
48–56px / 3rem+ — h1 (desk) — page title on desktop, hero display
72–96px+        — display    — hero statement, single bold claim
```

### Line-Height Rules

| Usage              | Line-height         |
|--------------------|---------------------|
| Display / hero     | 1.0 – 1.1           |
| Headings (h1–h2)   | 1.1 – 1.2           |
| Headings (h3–h4)   | 1.25 – 1.35         |
| Body text          | 1.6 – 1.7           |
| Labels / UI text   | 1.2 – 1.4           |
| Captions           | 1.4 – 1.5           |

**Line-height is the most commonly broken rule.** Headings with `line-height: 1.5` look amateurish.
Body text with `line-height: 1.3` is unreadable. Fix both.

### Letter-Spacing Rules

```
Display / hero text:     -0.02em to -0.03em  (tighten large type)
Headings h1–h2:          -0.01em to -0.02em
Headings h3–h4:          0 to -0.01em
Body text:               0 (never touch)
UPPERCASE labels / tags: 0.05em to 0.1em     (always widen all-caps)
```

### Font Weight Hierarchy

Use **maximum 3 weights** from a single family (or 2 families with clear roles):

```
Display / Hero CTA:   700–900 (bold, black, extrabold)
Section headings:     600–700 (semibold, bold)
Body / paragraphs:    400 (regular) — 450–500 acceptable for UI text
Labels, captions:     400–500
Decorative accents:   300 (light) — use sparingly, only in large sizes
```

### Font Pairing for a Showcase Site

For a modern, simple showcase, the safest and most impactful pairings:

**Option A — Clean & Technical**
- Display/Headings: `Geist` or `DM Sans` (700–900)
- Body: `DM Sans` or `Inter` (400) ← Inter is acceptable here as body-only
- Character: precise, startup-adjacent, trustworthy

**Option B — Editorial & Human**
- Display: `Playfair Display` or `Cormorant Garamond` (700–800)
- Body: `Lato` or `Source Sans 3` (400)
- Character: warm, crafted, personality-forward

**Option C — Brutalist Minimal**
- Single family: `IBM Plex Sans` or `Space Mono` (all weights)
- Character: raw, direct, no decoration

**Rule:** One display font + one body font maximum. If using a variable font, you need zero pairings.

### Typography Anti-Patterns

- `font-size: 14px` or smaller for body copy — illegal
- `line-height: 1` on anything that wraps — illegal  
- All-caps headings without `letter-spacing: 0.05em+` — fix always
- Bold body paragraphs (not headings) — remove unless it's a callout
- More than 2 typefaces active on a single page — simplify

---

## 3. Color & Contrast

### Palette Construction for a Showcase Site

Use a **3-tier palette**: Neutral base + 1 accent + semantic states.

```
Neutral (80% of the design):
  Background:     #F9F9F9 or pure white (#FFFFFF)
  Surface/card:   #FFFFFF or #F4F4F5
  Border:         #E4E4E7 (zinc-200 equivalent)
  Subtle text:    #71717A (zinc-500) — check contrast on bg
  Body text:      #18181B (zinc-900)
  Heading text:   #09090B (zinc-950) or true black

Accent (15% — one color, max 2 shades):
  Primary:        One saturated hue — blue, indigo, emerald, amber, etc.
  Hover/active:   10–15% darker shade of primary

Semantic (5%):
  Success:        #16A34A or similar green
  Warning:        #D97706 or similar amber  
  Error:          #DC2626 or similar red
```

**Dark mode:** Invert the neutral scale. Do NOT simply set `background: black; color: white`.
Use ink values like `#09090B` (not `#000000`) for backgrounds and `#FAFAFA` (not `#FFFFFF`) for text.
This prevents harsh glare and looks intentional.

### Contrast Minimums (Non-Negotiable)

```
Body text on background:      ≥ 7:1   (AAA, aim for this)
Body text minimum:            ≥ 4.5:1 (AA, hard minimum)
Large text (≥18px bold):      ≥ 3:1
UI components (borders etc):  ≥ 3:1
Placeholder text:             ≥ 3:1 on input background
Disabled state:               exempt, but still aim for 3:1
```

Check with: https://webaim.org/resources/contrastchecker/

**Common violations to fix:**
- Light gray text (`#999`, `#aaa`) on white — almost always fails for body
- White text on medium-saturation colored backgrounds
- Ghost/outline buttons with low-contrast border on near-white background

### Color Anti-Patterns

- `opacity: 0.5` on text to make it "secondary" — use a real color instead
- 3+ accent colors competing for attention — pick one, use one
- Saturated color backgrounds on large sections (feels aggressive) — use tints (5–10% opacity)
- Gradient overuse — one subtle gradient maximum per design; zero if in doubt

---

## 4. Layout & Visual Hierarchy

### The F-Pattern / Z-Pattern Rule

For a showcase site, content should naturally guide the eye:
1. Top-left: Brand / logo / name (anchor)
2. Top-right: Navigation / CTA
3. Center or left-aligned: Primary message
4. Below fold: Evidence (work samples, testimonials, stack)
5. Footer: Contact / secondary navigation

**Hierarchy check:** Cover the page with your hand and slowly uncover it top-to-bottom.
The most important element must be unmistakably dominant at every reveal point.

### Grid & Alignment

```
Mobile:    Single column, 16–24px horizontal padding
Tablet:    2-column or single wide column, 32px padding
Desktop:   12-column grid or named areas, centered, max-width: 1280px
```

**Align everything to the grid.** No element should appear to float without a clear grid anchor.
Consistent left-edge alignment (even with varying widths) creates coherence.

### Section Rhythm

Each page section follows the same vertical rhythm:

```
[Section top padding: 64–96px]
  [Section label / eyebrow: uppercase 12–14px, accent color, letter-spaced]
  [Section heading: h2, large, tight line-height]
  [Section subtext: body-lg, subdued color, max 640px wide]
  [Section content: cards / images / list]
[Section bottom padding: 64–96px]
```

Alternate section backgrounds subtly (`white` / `#F9F9F9`) to create visual breathing room
without heavy borders or dividers.

### Visual Hierarchy Rules

1. **One primary CTA per section.** Never two equally bold buttons side by side.
2. **Size contrast must be extreme.** If an h2 is 32px and an h3 is 28px, they look like siblings. Make the difference obvious (32px vs 20px).
3. **Whitespace is not wasted space.** Padding around a heading communicates its importance. Cramped headings feel unimportant.
4. **Left-align body text in left-to-right languages.** Center-align only for very short display text (hero statement, single tagline). Never center-align paragraphs.

---

## 5. Component-Level Rules

### Buttons

```
Primary:   Solid background (accent color), white text, 24px H-padding, 12px V-padding
Secondary: Outline or ghost — same dimensions, lower visual weight
Danger:    Red fill, only for destructive actions
Link:      No box, underline on hover

Border-radius: 6–8px (modern, not pill unless brand calls for it)
Font-weight: 500–600 (medium/semibold)
Font-size: 15–16px — never smaller
Transition: background 150ms ease, box-shadow 150ms ease

Hover: darken background by ~10%, or add subtle box-shadow
Focus: visible outline (outline: 2px solid accent, outline-offset: 2px)
```

### Cards

```
Background:    white (light mode) / zinc-900 (dark mode)
Border:        1px solid zinc-200 (light) / zinc-800 (dark) — or none with shadow
Border-radius: 12–16px
Shadow:        box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)
Padding:       24–32px
Gap between cards: 16–24px

Hover (interactive cards):
  transform: translateY(-2px)
  box-shadow: 0 4px 12px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.06)
  transition: all 200ms ease
```

### Navigation

```
Height:         60–72px (desktop), sticky preferred
Background:     White or near-white, backdrop-filter: blur(12px) with transparency
Border-bottom:  1px solid zinc-100 (subtle, not heavy)
Logo:           Left-aligned, 20–24px brand name or logo mark
Links:          14–15px, font-weight 500, zinc-600, hover → zinc-900 + underline or accent
CTA button:     Right-aligned, primary style, same height as nav
Mobile:         Hamburger → full-screen or slide-in menu, close button, 44px tap targets
```

### Images & Media

```
Border-radius: Match surrounding card radius (or 8px standalone)
Object-fit: cover (always, never stretch)
Aspect ratios: 16:9 for feature images, 1:1 for avatars/thumbnails, 4:3 for cards
Loading: loading="lazy" on all below-fold images
Alt text: always descriptive, not empty on meaningful images
```

---

## 6. Micro-Details That Separate Good from Great

These are the things a non-designer won't name but will feel.

**Borders & Dividers**
- Use `border: 1px solid` sparingly. Prefer whitespace or background-color change to divide sections.
- When using dividers, use `#E4E4E7` (zinc-200) or lighter — never `#ccc` or `#ddd` (too heavy).

**Shadows**
Use a layered shadow system. Single-layer shadows look fake.
```css
/* Subtle (cards, inputs) */
box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);

/* Medium (dropdowns, floating elements) */
box-shadow: 0 4px 12px rgba(0,0,0,0.10), 0 12px 32px rgba(0,0,0,0.06);

/* Heavy (modals, toasts) */
box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 24px 64px rgba(0,0,0,0.08);
```

**Transitions**
```css
/* Fast (color, background — reactive) */
transition: color 100ms ease, background-color 150ms ease;

/* Medium (transform, shadow — spatial) */
transition: transform 200ms ease, box-shadow 200ms ease;

/* Slow (layout, opacity — deliberate) */
transition: opacity 300ms ease;
```

Never `transition: all` — it's lazy and causes unexpected animation on properties you don't want moving (e.g., `width` during resize).

**Focus Styles**
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

**Scrollbar (optional, for showcase polish)**
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 3px; }
```

---

## 7. Improvement Output Format

When reporting the result of an audit or applying improvements, structure your output as:

```
## Design Audit — [Component/Page Name]

### Critical fixes applied
- [what was broken] → [what was done]

### Major improvements
- [what was suboptimal] → [what was done]

### Minor refinements
- [small touches applied]

### What was intentionally left unchanged
- [explain why]
```

Then show the updated code. Do not show the full original unless asked — show only the diff or the
improved version with clear comments explaining each intentional decision.

---

## 8. What NOT To Do (Agent Guardrails)

- **Do not redesign.** Fix what's there. If the layout is a 2-column grid, keep it a 2-column grid
  unless the user asks to change structure.
- **Do not add dependencies.** No new libraries, no new fonts beyond what's already loaded.
  Exception: if a font is plainly wrong (Comic Sans, etc.) and fixing it requires a single
  Google Fonts import, do it and explain.
- **Do not add animations for their own sake.** Animations should serve comprehension or delight —
  not distract. If the page has no animations, don't add them unless asked.
- **Do not change content.** Copy, labels, images — never touch. You are a designer, not an editor.
- **Do not over-explain.** In the output, be precise and brief. The code speaks for itself.
