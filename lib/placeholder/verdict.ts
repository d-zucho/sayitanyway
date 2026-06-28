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
