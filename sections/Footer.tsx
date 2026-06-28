import {
  XLogoIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
  RssSimpleIcon,
} from '@phosphor-icons/react/dist/ssr'

const columns = [
  {
    heading: 'Read',
    links: [
      'The Latest',
      'Investigations',
      'Fact Checks',
      'Opinion',
      'Human Rights',
    ],
  },
  {
    heading: 'Newsroom',
    links: ['About us', 'Contact a reporter', 'Corrections', 'Ethics policy'],
  },
  {
    heading: 'Support',
    links: ['Subscribe', 'Donate', 'Gift a membership', 'Tip us off'],
  },
]

const socials = [
  { label: 'X', icon: XLogoIcon },
  { label: 'Instagram', icon: InstagramLogoIcon },
  { label: 'YouTube', icon: YoutubeLogoIcon },
  { label: 'RSS', icon: RssSimpleIcon },
]

export function SiteFooter() {
  return (
    <footer className='border-line border-t bg-secondary-600/70'>
      <div className='mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8'>
          <div className='lg:col-span-5'>
            <p className='font-display-soft text-foreground text-3xl font-extrabold tracking-tight md:text-4xl'>
              Say It Anyway<span className='text-accent'>.</span>
            </p>
            <p className='text-muted mt-4 max-w-[40ch] leading-relaxed'>
              Independent reporting that fact-checks power and the media paid to
              flatter it. Funded by readers, accountable to no one else.
            </p>
            <div className='mt-7 flex items-center gap-3'>
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href='#top'
                    aria-label={s.label}
                    className='border-line text-muted hover:text-accent hover:border-accent flex h-10 w-10 items-center justify-center border transition-colors'
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} className='lg:col-span-2'>
              <p className='text-muted-2 font-mono text-xs font-medium tracking-[0.18em] uppercase'>
                {col.heading}
              </p>
              <ul className='mt-4 space-y-3'>
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href={l === 'Subscribe' ? '#subscribe' : '#latest'}
                      className='text-muted hover:text-foreground text-sm transition-colors'
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className='border-line mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-muted-2 text-xs'>
            © {new Date().getFullYear()} Say It Anyway Media. Reader-owned.
          </p>
          <div className='flex gap-6'>
            <a
              href='#top'
              className='text-muted-2 hover:text-foreground text-xs transition-colors'
            >
              Privacy
            </a>
            <a
              href='#top'
              className='text-muted-2 hover:text-foreground text-xs transition-colors'
            >
              Terms
            </a>
            <a
              href='#top'
              className='text-muted-2 hover:text-foreground text-xs transition-colors'
            >
              Press freedom policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
