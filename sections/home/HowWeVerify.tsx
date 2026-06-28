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
          We don&rsquo;t ask you to trust us.{' '}
          <TextHighlighter
            transition={{ duration: 1.2, delay: 0.3, type: 'linear' }}
          >
            We show our work.
          </TextHighlighter>
        </h2>

        <ol className='mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          {steps.map((s, i) => (
            <li key={s.n} className='border-t-2 border-black/10 pt-5'>
              <Reveal delay={0.08 * i}>
                <span className='text-accent font-mono text-sm font-medium'>
                  {s.n}
                </span>
                <h3 className='font-archivo mt-3 text-xl font-bold tracking-tight'>
                  {s.title}
                </h3>
                <p className='text-text mt-3 leading-relaxed'>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </MaxWidthWrapper>
    </section>
  )
}

export default HowWeVerify
