import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TextHighlighter from '@/components/TextHighlighter'
import { featuredFactCheck, formatDate } from '@/lib/placeholder/articles'
import { VERDICT_CHIP, VERDICT_LABEL } from '@/lib/placeholder/verdict'
import { cn } from '@/lib/utils'

// The brand's signature "They Said / Reality" format, rendered from the
// spotlighted fact-check. `claim` is the "They Said"; `excerpt`
// (verdictSummary) + `verdict` is the "Reality".
const SaidVsReality = () => {
  const featured = featuredFactCheck
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
              &ldquo;{featured.claim}&rdquo;
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
