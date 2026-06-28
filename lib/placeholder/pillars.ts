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
