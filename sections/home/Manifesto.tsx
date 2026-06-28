import { HighlightText } from '@/components/HighlightText'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import TextHighlighter from '@/components/TextHighlighter'

const Manifesto = () => {
  return (
    <section id='manifesto' className='py-24 bg-secondary-600/40'>
      <MaxWidthWrapper>
        {/* <div className='mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-36'> */}
        <div className='max-w-[20ch]'>
          <p className='text-muted-foreground font-mono text-lg font-medium tracking-[0.2em] uppercase'>
            Why we exist
          </p>
        </div>
        <div>
          <p className='text-foreground mt-8 max-w-[16ch] text-3xl leading-[1.3] font-bold tracking-tight md:max-w-[22ch] md:text-5xl lg:text-6xl'>
            Most newsrooms answer to advertisers, owners, and the powerful
            people they are supposed to cover.{' '}
            <TextHighlighter
              transition={{
                duration: 1.5,
                delay: 0.5,
                type: 'linear',
              }}
            >
              We answer to the people.
            </TextHighlighter>{' '}
            When the truth is inconvenient, we say it anyway.
          </p>
        </div>
        <div>
          <p className='text-muted-2 font-mono mt-10 text-xs tracking-wide'>
            The Say It Anyway newsroom
          </p>
        </div>
        {/* </div> */}
      </MaxWidthWrapper>
    </section>
  )
}

export default Manifesto
