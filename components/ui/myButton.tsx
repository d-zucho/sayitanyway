import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

interface MyButtonProps {
  children: ReactNode
  className?: string
  /** When set, renders a navigating link instead of a button (avoids
   *  nesting a <button> inside an <a> at the call site). */
  href?: string
}

const baseClasses =
  'relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-primary bg-primary px-7 py-2.5 font-semibold tracking-wide text-secondary-600 group hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-600'

// Primary CTA. Reads as a solid amber chip; on hover the brand ink (#111827)
// floods in from the corners and the label flips to white. Sharp-ish corners
// keep it editorial rather than pill-soft.
const MyButton = ({ children, className, href }: MyButtonProps) => {
  const reveal = (
    <>
      <span className='absolute top-0 left-0 h-0 w-0 border-t-2 border-secondary-600 transition-all duration-200 group-hover:w-full motion-reduce:transition-none'></span>
      <span className='absolute right-0 bottom-0 h-0 w-0 border-b-2 border-secondary-600 transition-all duration-200 group-hover:w-full motion-reduce:transition-none'></span>
      <span className='absolute top-0 left-0 h-0 w-full bg-secondary-600 transition-all delay-200 duration-300 group-hover:h-full motion-reduce:transition-none'></span>
      <span className='absolute bottom-0 left-0 h-0 w-full bg-secondary-600 transition-all delay-200 duration-300 group-hover:h-full motion-reduce:transition-none'></span>
      <span className='absolute inset-0 h-full w-full bg-secondary-600 opacity-0 delay-300 duration-300 group-hover:opacity-100 motion-reduce:transition-none'></span>
      <span className='relative transition-colors delay-200 duration-300 group-hover:text-white motion-reduce:transition-none'>
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)}>
        {reveal}
      </Link>
    )
  }

  return (
    <button type='button' className={cn(baseClasses, className)}>
      {reveal}
    </button>
  )
}

export default MyButton
