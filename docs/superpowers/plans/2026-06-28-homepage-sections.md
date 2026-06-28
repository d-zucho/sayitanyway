# Home Page Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five brand-introduction sections to the home page (SaidVsReality, FeaturedWork, HowWeVerify, WhatWeCover, Newsletter), fed by local placeholder data shaped like the Sanity schema.

**Architecture:** Each section is a self-contained component in `sections/home/`. Presentational sections are server components; only `Newsletter` is a client component (local form state). All content comes from local modules in `lib/placeholder/` whose shapes mirror the deployed `factCheck` / `opinionPost` Sanity schemas, so a later swap to GROQ queries is a drop-in. No live Sanity fetches, no backend.

**Tech Stack:** Next.js 16 (App Router, React 19), Tailwind CSS v4 (token-based, see `app/globals.css`), `motion` for animation, `@phosphor-icons/react` for icons.

## Global Constraints

- This is Next.js 16 — APIs may differ from training data. Per `AGENTS.md`, consult `node_modules/next/dist/docs/` before using any unfamiliar Next API. These sections use only `Link` (`next/link`) and standard JSX, so no exotic APIs are expected.
- No test runner exists. Per-task verification = typecheck (`npx tsc --noEmit`) + lint (`npm run lint`) + visual check (`npm run dev`, view at `http://localhost:3000`).
- Reuse the existing design language — do NOT introduce new colors or fonts. Tokens: `font-archivo` (headings), `font-mono` (kicker labels), `--primary` amber `#fca311` (CTA/emphasis), `--accent` red `#e63946` (false verdicts), `--secondary-400` deep blue `#003153` (true verdicts), `--secondary-600` near-black `#111827` (dark bands). Helpers: `siaw-redact`, `siaw-marquee` + `siaw-marquee-track`, `siaw-underline`, `siaw-plate`, `siaw-grain`.
- Wrap section content in `MaxWidthWrapper` (`@/components/MaxWidthWrapper`); follow `Manifesto`'s rhythm (mono kicker → large statement → mono footnote). Use `cn` from `@/lib/utils` for conditional classes.
- Use the existing `Reveal` component (`@/components/Reveal`) for scroll-in where noted. All motion must respect `prefers-reduced-motion` (`Reveal` and `siaw-redact` already do).
- Commit after each task with a `feat:` message.

---

### Task 1: Placeholder data and verdict helpers

**Files:**
- Create: `lib/placeholder/verdict.ts`
- Create: `lib/placeholder/articles.ts`
- Create: `lib/placeholder/pillars.ts`

**Interfaces:**
- Produces: `Verdict` type; `VERDICT_LABEL: Record<Verdict, string>`; `VERDICT_CHIP: Record<Verdict, string>` (Tailwind classes); `PlaceholderArticle` type; `articles: PlaceholderArticle[]`; `categoryLabel(t): string`; `articleHref(a): string`; `formatDate(iso): string`; `Pillar` type; `pillars: Pillar[]`.

- [ ] **Step 1: Create the verdict helper**

`lib/placeholder/verdict.ts`:

```ts
// Verdict vocabulary mirrors the Sanity `factCheck.verdict` option list.
export type Verdict =
  | 'true'
  | 'mostly-true'
  | 'misleading'
  | 'mostly-false'
  | 'false'
  | 'unverified'

export const VERDICT_LABEL: Record<Verdict, string> = {
  true: 'True',
  'mostly-true': 'Mostly True',
  misleading: 'Misleading',
  'mostly-false': 'Mostly False',
  false: 'False',
  unverified: 'Unverified',
}

// Chip styling per the design spec's verdict→color map.
// false/mostly-false → accent red; misleading/unverified → amber;
// true/mostly-true → deep blue.
export const VERDICT_CHIP: Record<Verdict, string> = {
  true: 'bg-secondary-400 text-white',
  'mostly-true': 'bg-secondary-400 text-white',
  misleading: 'bg-primary text-foreground',
  unverified: 'bg-primary text-foreground',
  'mostly-false': 'bg-accent text-white',
  false: 'bg-accent text-white',
}
```

- [ ] **Step 2: Create the article placeholder data**

`lib/placeholder/articles.ts`:

```ts
import type { Verdict } from './verdict'

// Subset of the deployed `factCheck` / `opinionPost` Sanity schemas — just the
// fields the home page renders. Keeping the names identical means the later
// swap to GROQ projections is a rename of the import, nothing more.
export type PlaceholderArticle = {
  _type: 'factCheck' | 'opinionPost'
  title: string
  slug: string
  author: { name: string; role?: string }
  publishedAt: string // ISO 8601
  excerpt: string // opinionPost.excerpt OR factCheck.verdictSummary
  readTime: string // e.g. "4 min"
  tags?: string[]
  // factCheck-only:
  claim?: string
  claimSource?: string
  verdict?: Verdict
}

export const articles: PlaceholderArticle[] = [
  {
    _type: 'factCheck',
    title: 'No, the new housing bill does not “abolish” single-family zoning',
    slug: 'housing-bill-single-family-zoning',
    author: { name: 'Mara Ellison', role: 'Staff Writer' },
    publishedAt: '2026-06-24T13:00:00.000Z',
    excerpt:
      'The bill lets cities opt in to denser zoning. It bans nothing. The viral claim collapses the moment you read past the headline.',
    readTime: '5 min',
    tags: ['housing', 'zoning'],
    claim:
      'This new bill abolishes single-family neighborhoods and forces apartments onto every street in America.',
    claimSource: 'Viral post on X, June 22 2026 (1.4M views)',
    verdict: 'false',
  },
  {
    _type: 'factCheck',
    title: 'That “record crime wave” chart is missing two-thirds of the data',
    slug: 'crime-wave-chart-missing-data',
    author: { name: 'Devin Cole', role: 'Contributing Writer' },
    publishedAt: '2026-06-21T15:30:00.000Z',
    excerpt:
      'The chart starts at 2020 and stops at its own peak. Pull the full FBI series and the “wave” is a return to a decade-long downward trend.',
    readTime: '4 min',
    tags: ['crime', 'data'],
    claim:
      'Violent crime is at an all-time high and rising faster than ever before.',
    claimSource: 'Cable news segment, June 19 2026',
    verdict: 'misleading',
  },
  {
    _type: 'opinionPost',
    title: 'Calling it a “both sides” issue is how the lie wins',
    slug: 'both-sides-is-how-the-lie-wins',
    author: { name: 'Priya Raman', role: 'Editor-in-Chief' },
    publishedAt: '2026-06-18T11:00:00.000Z',
    excerpt:
      'Neutral framing treats a documented fact and a fabrication as equal claims. That is not balance — it is laundering.',
    readTime: '6 min',
    tags: ['media', 'opinion'],
  },
  {
    _type: 'factCheck',
    title: 'The minimum-wage “job losses” number was invented in 2014',
    slug: 'minimum-wage-job-losses-invented',
    author: { name: 'Mara Ellison', role: 'Staff Writer' },
    publishedAt: '2026-06-15T09:00:00.000Z',
    excerpt:
      'We traced the stat to a single think-tank model that has never been peer-reviewed — and that its own authors have since walked back.',
    readTime: '7 min',
    tags: ['labor', 'wages'],
    claim:
      'Raising the minimum wage will kill three million jobs, studies show.',
    claimSource: 'Op-ed, June 12 2026',
    verdict: 'mostly-false',
  },
]

export const categoryLabel = (type: PlaceholderArticle['_type']): string =>
  type === 'factCheck' ? 'Fact Check' : 'Opinion'

// Forward-looking routes; detail pages do not exist yet.
export const articleHref = (a: PlaceholderArticle): string =>
  `/${a._type === 'factCheck' ? 'fact-check' : 'opinion'}/${a.slug}`

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
```

- [ ] **Step 3: Create the pillars data**

`lib/placeholder/pillars.ts`:

```ts
// Content pillars from BRAND.md, plus the beats the newsroom covers.
export type Pillar = {
  emoji: string
  label: string
  description: string
  href: string
}

export const pillars: Pillar[] = [
  {
    emoji: '✅',
    label: 'Fact-Checks',
    description: 'A claim, verified against primary sources, with a clear verdict.',
    href: '/fact-check',
  },
  {
    emoji: '🔥',
    label: 'Hot Takes',
    description: 'A stated opinion on politics and culture. No pretending to be neutral.',
    href: '/opinion',
  },
  {
    emoji: '📖',
    label: 'Explainers',
    description: 'Something complicated, made plain — without the jargon.',
    href: '/explainers',
  },
  {
    emoji: '⚡',
    label: 'Callouts',
    description: 'A politician, outlet, or pundit got it wrong. We correct it, with receipts.',
    href: '/callouts',
  },
  {
    emoji: '🔍',
    label: 'Behind the Post',
    description: 'How we verify a claim — the research process, in the open.',
    href: '/behind-the-post',
  },
  {
    emoji: '✊',
    label: 'Human Rights',
    description: 'The beat at the center of everything: who power leaves behind.',
    href: '/human-rights',
  },
]
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors referencing `lib/placeholder/*`.

- [ ] **Step 5: Commit**

```bash
git add lib/placeholder
git commit -m "feat: add placeholder data and verdict helpers for home sections"
```

---

### Task 2: SaidVsReality section

**Files:**
- Create: `sections/home/SaidVsReality.tsx`
- Modify: `app/page.tsx` (insert after `Manifesto`)

**Interfaces:**
- Consumes: `articles`, `formatDate` from `@/lib/placeholder/articles`; `VERDICT_LABEL`, `VERDICT_CHIP` from `@/lib/placeholder/verdict`; `MaxWidthWrapper`, `TextHighlighter`, `cn`.
- Produces: default export `SaidVsReality` (server component).

- [ ] **Step 1: Create the component**

`sections/home/SaidVsReality.tsx`:

```tsx
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TextHighlighter from '@/components/TextHighlighter'
import { articles, formatDate } from '@/lib/placeholder/articles'
import { VERDICT_CHIP, VERDICT_LABEL } from '@/lib/placeholder/verdict'
import { cn } from '@/lib/utils'

// The brand's signature "They Said / Reality" format, rendered from the first
// fact-check in the dataset. `claim` is the "They Said"; `excerpt`
// (verdictSummary) + `verdict` is the "Reality".
const SaidVsReality = () => {
  const featured = articles.find((a) => a._type === 'factCheck' && a.verdict)
  if (!featured || !featured.verdict) return null

  return (
    <section className='py-24'>
      <MaxWidthWrapper>
        <p className='text-muted-foreground font-mono text-sm font-medium tracking-[0.2em] uppercase'>
          The receipts
        </p>

        <div className='mt-10 grid gap-px overflow-hidden border border-black/10 md:grid-cols-2'>
          {/* They Said */}
          <div className='bg-secondary-600 p-8 md:p-12'>
            <p className='font-mono text-xs tracking-[0.18em] text-white/50 uppercase'>
              They said
            </p>
            <blockquote className='font-archivo mt-6 text-2xl leading-snug font-bold text-white md:text-3xl'>
              “{featured.claim}”
            </blockquote>
            {featured.claimSource && (
              <p className='mt-6 font-mono text-xs text-white/40'>
                — {featured.claimSource}
              </p>
            )}
          </div>

          {/* Reality */}
          <div className='bg-secondary-600/[0.04] p-8 md:p-12'>
            <div className='flex items-center gap-3'>
              <p className='font-mono text-xs tracking-[0.18em] text-black/50 uppercase'>
                Reality
              </p>
              <span
                className={cn(
                  'px-2 py-0.5 font-mono text-xs font-bold tracking-wide uppercase',
                  VERDICT_CHIP[featured.verdict],
                )}
              >
                {VERDICT_LABEL[featured.verdict]}
              </span>
            </div>
            <p className='font-archivo text-foreground mt-6 text-2xl leading-snug font-bold md:text-3xl'>
              <TextHighlighter
                transition={{ duration: 1.2, delay: 0.3, type: 'linear' }}
              >
                {featured.excerpt}
              </TextHighlighter>
            </p>
            <p className='text-muted-2 mt-6 font-mono text-xs tracking-wide'>
              {featured.author.name} · {formatDate(featured.publishedAt)}
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default SaidVsReality
```

- [ ] **Step 2: Insert into the page after Manifesto**

In `app/page.tsx`, add the import and render `<SaidVsReality />` immediately after `<Manifesto />`:

```tsx
import Hero from '@/sections/home/Hero'
import Manifesto from '@/sections/home/Manifesto'
import SaidVsReality from '@/sections/home/SaidVsReality'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Manifesto />
      <SaidVsReality />
    </div>
  )
}
```

- [ ] **Step 3: Typecheck, lint, visual check**

Run: `npx tsc --noEmit && npm run lint`
Then run `npm run dev` and open `http://localhost:3000`. Expected: a two-panel "They Said / Reality" block below the Manifesto; left panel dark with the claim, right panel light with an amber-highlighted reality line and a red `FALSE` chip.

- [ ] **Step 4: Commit**

```bash
git add sections/home/SaidVsReality.tsx app/page.tsx
git commit -m "feat: add SaidVsReality home section"
```

---

### Task 3: FeaturedWork section

**Files:**
- Create: `sections/home/FeaturedWork.tsx`
- Modify: `app/page.tsx` (insert after `SaidVsReality`)

**Interfaces:**
- Consumes: `articles`, `categoryLabel`, `articleHref`, `formatDate`, `PlaceholderArticle` from `@/lib/placeholder/articles`; `VERDICT_LABEL`, `VERDICT_CHIP` from `@/lib/placeholder/verdict`; `MaxWidthWrapper`, `Reveal`, `cn`; `Link` from `next/link`.
- Produces: default export `FeaturedWork` (server component).

- [ ] **Step 1: Create the component**

`sections/home/FeaturedWork.tsx`:

```tsx
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Reveal } from '@/components/Reveal'
import {
  articles,
  articleHref,
  categoryLabel,
  formatDate,
  type PlaceholderArticle,
} from '@/lib/placeholder/articles'
import { VERDICT_CHIP, VERDICT_LABEL } from '@/lib/placeholder/verdict'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const VerdictChip = ({ a }: { a: PlaceholderArticle }) =>
  a.verdict ? (
    <span
      className={cn(
        'px-2 py-0.5 font-mono text-[0.65rem] font-bold tracking-wide uppercase',
        VERDICT_CHIP[a.verdict],
      )}
    >
      {VERDICT_LABEL[a.verdict]}
    </span>
  ) : null

const Meta = ({ a }: { a: PlaceholderArticle }) => (
  <div className='flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-black/45'>
    <span className='text-accent font-medium'>{categoryLabel(a._type)}</span>
    <VerdictChip a={a} />
    <span>{formatDate(a.publishedAt)}</span>
    <span aria-hidden>·</span>
    <span>{a.readTime}</span>
  </div>
)

// Curated proof: one lead story plus a hairline-ruled index of the rest.
const FeaturedWork = () => {
  const [lead, ...rest] = articles

  return (
    <section id='latest' className='py-24'>
      <MaxWidthWrapper>
        <div className='flex items-end justify-between'>
          <p className='text-muted-foreground font-mono text-sm font-medium tracking-[0.2em] uppercase'>
            On file
          </p>
          <Link
            href='/archive'
            className='siaw-underline font-mono text-xs tracking-wide text-black/60'
          >
            View all →
          </Link>
        </div>

        <div className='mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Lead */}
          <Reveal>
            <Link href={articleHref(lead)} className='group block'>
              <Meta a={lead} />
              <h3 className='font-archivo mt-4 text-3xl leading-tight font-bold tracking-tight md:text-4xl'>
                <span className='siaw-underline'>{lead.title}</span>
              </h3>
              <p className='text-text mt-4 max-w-prose leading-relaxed'>
                {lead.excerpt}
              </p>
              <p className='mt-5 font-mono text-xs text-black/45'>
                {lead.author.name}
                {lead.author.role ? `, ${lead.author.role}` : ''}
              </p>
            </Link>
          </Reveal>

          {/* Index */}
          <ul className='divide-y divide-black/10 border-y border-black/10'>
            {rest.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={0.05 * (i + 1)}>
                  <Link
                    href={articleHref(a)}
                    className='group block py-6 first:pt-0'
                  >
                    <Meta a={a} />
                    <h4 className='font-archivo mt-3 text-xl leading-snug font-bold tracking-tight md:text-2xl'>
                      <span className='siaw-underline'>{a.title}</span>
                    </h4>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default FeaturedWork
```

- [ ] **Step 2: Insert into the page after SaidVsReality**

In `app/page.tsx`, import and render `<FeaturedWork />` after `<SaidVsReality />`.

- [ ] **Step 3: Typecheck, lint, visual check**

Run: `npx tsc --noEmit && npm run lint`
Then `npm run dev`, open `http://localhost:3000`. Expected: a lead story on the left (large headline, dek, byline) and a hairline-ruled list of three more on the right, each with a category tag and verdict chip; headlines underline-animate on hover; items fade in on scroll.

- [ ] **Step 4: Commit**

```bash
git add sections/home/FeaturedWork.tsx app/page.tsx
git commit -m "feat: add FeaturedWork home section"
```

---

### Task 4: HowWeVerify section

**Files:**
- Create: `sections/home/HowWeVerify.tsx`
- Modify: `app/page.tsx` (insert after `FeaturedWork`)

**Interfaces:**
- Consumes: `MaxWidthWrapper`, `Reveal`, `TextHighlighter`.
- Produces: default export `HowWeVerify` (server component).

- [ ] **Step 1: Create the component**

`sections/home/HowWeVerify.tsx`:

```tsx
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Reveal } from '@/components/Reveal'
import TextHighlighter from '@/components/TextHighlighter'

// The method — the brand's differentiator. Static content; the four steps map
// to the factCheck schema (claim → analysis → verdict → sources).
const steps = [
  {
    n: '01',
    title: 'The Claim',
    body: 'We pull the exact statement — in the speaker’s own words — and pin down where and when it was said.',
  },
  {
    n: '02',
    title: 'Investigate',
    body: 'We go to primary sources: the bill, the dataset, the transcript. Not someone’s summary of them.',
  },
  {
    n: '03',
    title: 'The Verdict',
    body: 'We rate it on the record — True to False — and explain the call in plain language up top.',
  },
  {
    n: '04',
    title: 'Show the Sources',
    body: 'Every verdict ships with its receipts, linked. You can check our work, and you should.',
  },
]

const HowWeVerify = () => {
  return (
    <section id='method' className='bg-secondary-600/[0.04] py-24'>
      <MaxWidthWrapper>
        <p className='text-muted-foreground font-mono text-sm font-medium tracking-[0.2em] uppercase'>
          The method
        </p>
        <h2 className='font-archivo mt-8 max-w-[18ch] text-3xl leading-[1.15] font-bold tracking-tight md:text-5xl'>
          We don’t ask you to trust us.{' '}
          <TextHighlighter
            transition={{ duration: 1.2, delay: 0.3, type: 'linear' }}
          >
            We show our work.
          </TextHighlighter>
        </h2>

        <ol className='mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.08 * i}>
              <li className='border-t-2 border-black/10 pt-5'>
                <span className='text-accent font-mono text-sm font-medium'>
                  {s.n}
                </span>
                <h3 className='font-archivo mt-3 text-xl font-bold tracking-tight'>
                  {s.title}
                </h3>
                <p className='text-text mt-3 leading-relaxed'>{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </MaxWidthWrapper>
    </section>
  )
}

export default HowWeVerify
```

- [ ] **Step 2: Insert into the page after FeaturedWork**

In `app/page.tsx`, import and render `<HowWeVerify />` after `<FeaturedWork />`.

- [ ] **Step 3: Typecheck, lint, visual check**

Run: `npx tsc --noEmit && npm run lint`
Then `npm run dev`. Expected: a tinted band with a two-line headline (second clause highlights amber on scroll) and four numbered steps (red `01`–`04`) that fade in.

- [ ] **Step 4: Commit**

```bash
git add sections/home/HowWeVerify.tsx app/page.tsx
git commit -m "feat: add HowWeVerify home section"
```

---

### Task 5: WhatWeCover section

**Files:**
- Create: `sections/home/WhatWeCover.tsx`
- Modify: `app/page.tsx` (insert after `HowWeVerify`)

**Interfaces:**
- Consumes: `pillars` from `@/lib/placeholder/pillars`; `MaxWidthWrapper`, `Reveal`; `Link` from `next/link`.
- Produces: default export `WhatWeCover` (server component).

- [ ] **Step 1: Create the component**

`sections/home/WhatWeCover.tsx`:

```tsx
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Reveal } from '@/components/Reveal'
import { pillars } from '@/lib/placeholder/pillars'
import Link from 'next/link'

// The range — content pillars and beats, as a hairline grid.
const WhatWeCover = () => {
  return (
    <section id='cover' className='py-24'>
      <MaxWidthWrapper>
        <p className='text-muted-foreground font-mono text-sm font-medium tracking-[0.2em] uppercase'>
          What we cover
        </p>
        <h2 className='font-archivo mt-8 max-w-[20ch] text-3xl leading-[1.15] font-bold tracking-tight md:text-5xl'>
          Five ways we say it. One standard behind all of them.
        </h2>

        <div className='mt-14 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3'>
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={0.05 * i}>
              <Link
                href={p.href}
                className='group bg-background hover:bg-secondary-600/[0.03] flex h-full flex-col p-8 transition-colors'
              >
                <span className='text-3xl' aria-hidden>
                  {p.emoji}
                </span>
                <h3 className='font-archivo mt-5 text-xl font-bold tracking-tight'>
                  <span className='siaw-underline'>{p.label}</span>
                </h3>
                <p className='text-text mt-3 leading-relaxed'>{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default WhatWeCover
```

- [ ] **Step 2: Insert into the page after HowWeVerify**

In `app/page.tsx`, import and render `<WhatWeCover />` after `<HowWeVerify />`.

- [ ] **Step 3: Typecheck, lint, visual check**

Run: `npx tsc --noEmit && npm run lint`
Then `npm run dev`. Expected: a hairline-gridded set of six pillar cells (emoji, label, description); labels underline-animate and cells tint on hover; cells fade in on scroll.

- [ ] **Step 4: Commit**

```bash
git add sections/home/WhatWeCover.tsx app/page.tsx
git commit -m "feat: add WhatWeCover home section"
```

---

### Task 6: Newsletter section

**Files:**
- Create: `sections/home/Newsletter.tsx`
- Modify: `app/page.tsx` (insert after `WhatWeCover`)

**Interfaces:**
- Consumes: `MaxWidthWrapper`, `cn`. Uses React `useState` (client component).
- Produces: default export `Newsletter` (client component).

- [ ] **Step 1: Create the component**

`sections/home/Newsletter.tsx`:

```tsx
'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// Conversion band. UI-only: submit toggles a local success state. The seam
// below is where a real email provider drops in later.
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire provider (e.g. POST to a /api/subscribe route or ESP).
    setSubmitted(true)
  }

  return (
    <section id='subscribe' className='py-24'>
      <MaxWidthWrapper>
        <div className='siaw-plate bg-secondary-600 relative overflow-hidden px-6 py-16 md:px-16 md:py-20'>
          <div className='siaw-grain' />
          <div className='relative'>
            <p className='font-mono text-sm font-medium tracking-[0.2em] text-white/50 uppercase'>
              No spin. No spam.
            </p>
            <h2 className='font-archivo mt-6 max-w-[16ch] text-3xl leading-[1.1] font-bold tracking-tight text-white md:text-5xl'>
              Get the receipts in your inbox.
            </h2>
            <p className='mt-5 max-w-prose leading-relaxed text-white/60'>
              The week’s fact-checks and the takes worth your time — sent once a
              week. Unsubscribe anytime.
            </p>

            {submitted ? (
              <p className='text-primary font-archivo mt-10 text-xl font-bold'>
                You’re on the list. Watch your inbox.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='mt-10 flex max-w-md flex-col gap-3 sm:flex-row'
              >
                <label htmlFor='nl-email' className='sr-only'>
                  Email address
                </label>
                <input
                  id='nl-email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@email.com'
                  className='h-12 flex-1 border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/35 focus:border-primary focus:outline-none'
                />
                <button
                  type='submit'
                  className={cn(
                    'bg-primary text-secondary-600 h-12 px-7 text-sm font-semibold tracking-wide uppercase',
                    'transition-opacity hover:opacity-90',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600',
                  )}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}

export default Newsletter
```

- [ ] **Step 2: Insert into the page after WhatWeCover**

In `app/page.tsx`, import and render `<Newsletter />` after `<WhatWeCover />`. Final file:

```tsx
import Hero from '@/sections/home/Hero'
import Manifesto from '@/sections/home/Manifesto'
import SaidVsReality from '@/sections/home/SaidVsReality'
import FeaturedWork from '@/sections/home/FeaturedWork'
import HowWeVerify from '@/sections/home/HowWeVerify'
import WhatWeCover from '@/sections/home/WhatWeCover'
import Newsletter from '@/sections/home/Newsletter'

export default function Home() {
  return (
    <div className=''>
      <Hero />
      <Manifesto />
      <SaidVsReality />
      <FeaturedWork />
      <HowWeVerify />
      <WhatWeCover />
      <Newsletter />
    </div>
  )
}
```

- [ ] **Step 3: Typecheck, lint, visual check**

Run: `npx tsc --noEmit && npm run lint`
Then `npm run dev`. Expected: a dark grain-textured band with a headline, email field, and amber Subscribe button; submitting a valid email swaps the form for the "You're on the list" confirmation.

- [ ] **Step 4: Commit**

```bash
git add sections/home/Newsletter.tsx app/page.tsx
git commit -m "feat: add Newsletter home section"
```

---

### Task 7: Full-page review and production build

**Files:**
- Modify (only if review surfaces issues): any of `sections/home/*`, `app/page.tsx`.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors; `/` is included in the route output.

- [ ] **Step 2: Full-page visual pass**

Run `npm run dev`, open `http://localhost:3000`, and scroll the whole home page. Verify section order Hero → Manifesto → SaidVsReality → FeaturedWork → HowWeVerify → WhatWeCover → Newsletter → Footer, consistent vertical rhythm, and that the page reads as a coherent brand intro. Check one narrow viewport (~375px) for layout breaks. Fix any issues found, then re-run Step 1.

- [ ] **Step 3: Commit (if any fixes were made)**

```bash
git add -A
git commit -m "fix: polish home page section spacing and responsive layout"
```
