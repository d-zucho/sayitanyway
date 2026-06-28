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
              <li key={a.slug} className='py-6 first:pt-0'>
                <Reveal delay={0.05 * (i + 1)}>
                  <Link
                    href={articleHref(a)}
                    className='group block'
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
