# Home Page Sections — Design

**Date:** 2026-06-28
**Status:** Approved (pending spec review)

## Goal

The home page is a brand-introduction landing page, not an article feed. A
first-time visitor should: (1) read the work, and (2) sign up — in that order.
The page earns the signup by proving value first.

The current page has only two sections (`Hero`, `Manifesto`) — it makes promises
("we follow the receipts") but shows no receipts. These new sections supply the
**proof**, the **method**, the **range**, and the **conversion**.

## Final section order

1. `Hero` — hook *(exists)*
2. `Manifesto` — why we exist *(exists)*
3. **`SaidVsReality`** — one punchy "They Said / Reality" fact-check *(new)*
4. **`FeaturedWork`** — curated recent pieces, the proof *(new)*
5. **`HowWeVerify`** — the method, the differentiator *(new)*
6. **`WhatWeCover`** — content pillars + beats, the range *(new)*
7. **`Newsletter`** — the conversion, UI-only *(new)*
8. `SiteFooter` — *(exists, wire into layout if not already)*

## Design language (reuse, don't reinvent)

From `app/globals.css` and existing components:

- **Type:** `font-archivo` headings, `font-mono` kicker/eyebrow labels (uppercase,
  tracked), `font-inter` body.
- **Color:** `--primary` amber `#fca311` for CTAs/emphasis; `--accent` red
  `#e63946` for false/negative verdicts; `--secondary-600` near-black `#111827`
  for dark bands; `--secondary-400` deep blue `#003153` for true verdicts.
- **Signature motifs:** `siaw-redact` redaction-marker wipe (the literal "say it
  anyway" gesture), `siaw-marquee` ticker, `siaw-underline` hover, `siaw-plate`
  + `siaw-grain` for dark surfaces, `TextHighlighter` animated highlight.
- **Layout:** wrap content in `MaxWidthWrapper`; follow `Manifesto`'s rhythm
  (mono kicker → large statement → mono footnote).
- **Motion:** respect `prefers-reduced-motion` (already honored by `siaw-redact`);
  use the existing `Reveal` component for scroll-in where appropriate.

## Placeholder data

All content is local for now, shaped to mirror the deployed Sanity schema so the
later swap to GROQ queries is a drop-in. No live Sanity fetches in this work.

- `lib/placeholder/articles.ts` — array of fact-check + opinion items.
- `lib/placeholder/pillars.ts` — content pillars + beats.

**Article placeholder shape** (subset of real `factCheck` / `opinionPost`):

```ts
type Verdict =
  | 'true' | 'mostly-true' | 'misleading'
  | 'mostly-false' | 'false' | 'unverified'

type PlaceholderArticle = {
  _type: 'factCheck' | 'opinionPost'
  title: string
  slug: string
  author: { name: string; role?: string }
  publishedAt: string          // ISO
  excerpt: string              // opinionPost.excerpt OR factCheck.verdictSummary
  readTime: string             // derived/manual, e.g. "4 min"
  tags?: string[]
  // factCheck-only:
  claim?: string
  claimSource?: string
  verdict?: Verdict
}
```

Category label is derived from `_type` (`factCheck` → "Fact Check",
`opinionPost` → "Opinion"), never an invented field.

**Verdict → color mapping:**

| Verdict | Color |
|---|---|
| `false`, `mostly-false` | `--accent` (red) |
| `misleading`, `unverified` | `--primary` (amber) |
| `true`, `mostly-true` | `--secondary-400` (deep blue) |

## Section specs

### 3. `SaidVsReality.tsx`
Standalone showcase of a single fact-check in the brand's IG "They Said / Reality"
format. Two stacked/side-by-side blocks:
- **They Said** — the `claim`, attributed via `claimSource`, set in muted/quote
  styling.
- **Reality** — the `verdictSummary`, with a bold verdict chip colored per the
  map above. A key phrase uses the `siaw-redact` wipe on scroll.

One mono kicker (e.g. `The receipts`). Pulls the first flagged fact-check from
placeholder data. This is the most shareable, most on-brand block on the page.

### 4. `FeaturedWork.tsx`
Mono kicker (`Latest / On file`). Editorial index: one **lead** item (large
`font-archivo` headline + dek) and 2–3 **secondary** items in a list using
`siaw-underline` hover. Each item shows:
- category tag (derived from `_type`),
- headline,
- one-line dek (`excerpt` / `verdictSummary`),
- `publishedAt` (formatted) + `readTime`,
- verdict chip when `_type === 'factCheck'`.

Items link to `/<type>/<slug>` (routes may not exist yet — links are forward-
looking placeholders). Serves the "get them reading" goal.

### 5. `HowWeVerify.tsx`
Four numbered steps (`01`–`04`, mono): **Claim → Investigate → Verdict →
Sources**. Each step: number, short title, one-line description. One key phrase
gets the `siaw-redact` wipe. This is the trust-builder that makes the later
signup land. Static content (no placeholder file needed — content lives in the
component).

### 6. `WhatWeCover.tsx`
Mono kicker (`What we cover`). Responsive grid of the five content pillars
(Fact-Checks, Hot Takes, Explainers, Callouts, Behind the Post) plus beats
(e.g. Human Rights). Each cell: emoji/label, one-line description, forward link.
Content from `lib/placeholder/pillars.ts`.

### 7. `Newsletter.tsx`
Dark conversion band (`secondary-600` + `siaw-plate`/`siaw-grain` for contrast
against the light page). Headline: *"Get the receipts in your inbox."* Email
input + amber CTA button + reassurance microcopy. **UI-only:** a client
component whose submit handler is a no-op that toggles a local success state
(`"You're on the list."`); a clearly marked seam (`// TODO: wire provider`)
shows where a real provider drops in. Optional thin `siaw-marquee` of recent
verdicts above the form. No backend, no env, no network.

## Out of scope (YAGNI)

- Real Sanity/GROQ fetching (placeholder only).
- Working newsletter backend / email provider.
- Article detail routes / individual post pages.
- Search, pagination, tag filtering.
- Any schema changes.

## Component boundaries

Each section is a self-contained component in `sections/home/`, presentational,
fed by props-free local imports of placeholder data. No shared mutable state.
Each can be understood, restyled, and later rewired to Sanity independently.
`Newsletter` is the only client component (`'use client'`) due to local form
state; the rest are server components.
