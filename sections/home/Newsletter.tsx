'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { cn } from '@/lib/utils'
import { useState } from 'react'

// Conversion band. UI-only: submit toggles a local success state. The seam
// below is where a real email provider drops in later.
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
              The week&rsquo;s fact-checks and the takes worth your time — sent once a
              week. Unsubscribe anytime.
            </p>

            {submitted ? (
              <p className='text-primary font-archivo mt-10 text-xl font-bold'>
                You&rsquo;re on the list. Watch your inbox.
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
                  name='email'
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
