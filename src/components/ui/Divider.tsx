import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../lib/utils'

interface DividerProps {
  className?: string
  width?: string
}

export function Divider({ className, width = 'w-16' }: DividerProps) {
  return <div className={cn(width, 'h-px bg-alba-ink/30', className)} />
}

const drawEase = [0.65, 0, 0.35, 1] as const

/**
 * The line-dot-line motif repeats on every section header. Rather than
 * paint it in statically, each half draws inward toward the center dot as
 * it enters view — a small, precise gesture that costs nothing extra to
 * call (same `<Ornament />` API) but compounds across the whole page.
 */
export function Ornament({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <svg
      ref={ref}
      viewBox="0 0 60 20"
      className={cn('h-4 w-14 text-alba-ink/50', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="10"
        x2="22"
        y2="10"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transformOrigin: '0px 10px' }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: drawEase }}
      />
      <motion.circle
        cx="30"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transformOrigin: '30px 10px' }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.55, ease: 'backOut' }}
      />
      <motion.line
        x1="38"
        y1="10"
        x2="60"
        y2="10"
        stroke="currentColor"
        strokeWidth="1"
        style={{ transformOrigin: '60px 10px' }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: drawEase }}
      />
    </svg>
  )
}
