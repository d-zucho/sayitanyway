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
