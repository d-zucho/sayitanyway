'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

/*
  Cinematic scroll-reveal leaf. Motivation: hierarchy + storytelling. Content
  arrives with weight (fade + lift + a touch of defocus resolving to sharp),
  the way a film cut settles. Collapses to static under prefers-reduced-motion.
*/
export function Reveal({ children, delay = 0, y = 28, ...rest }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
