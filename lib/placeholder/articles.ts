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
    title: 'No, the new housing bill does not "abolish" single-family zoning',
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
    title: 'That "record crime wave" chart is missing two-thirds of the data',
    slug: 'crime-wave-chart-missing-data',
    author: { name: 'Devin Cole', role: 'Contributing Writer' },
    publishedAt: '2026-06-21T15:30:00.000Z',
    excerpt:
      'The chart starts at 2020 and stops at its own peak. Pull the full FBI series and the "wave" is a return to a decade-long downward trend.',
    readTime: '4 min',
    tags: ['crime', 'data'],
    claim:
      'Violent crime is at an all-time high and rising faster than ever before.',
    claimSource: 'Cable news segment, June 19 2026',
    verdict: 'misleading',
  },
  {
    _type: 'opinionPost',
    title: 'Calling it a "both sides" issue is how the lie wins',
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
    title: 'The minimum-wage "job losses" number was invented in 2014',
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
