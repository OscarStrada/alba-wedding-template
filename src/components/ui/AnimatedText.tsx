import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  type?: 'chars' | 'words'
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/**
 * Splits text into words (each wrapped so overflow is hidden) and reveals
 * them with a staggered upward slide — no GSAP Club SplitText required.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  type = 'words',
  as = 'div',
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as as unknown as 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const units = type === 'words' ? text.split(' ') : text.split('')

    el.innerHTML = units
      .map((unit) => {
        const content = unit === '' ? '&nbsp;' : unit
        const spacer = type === 'words' ? ' ' : ''
        return `<span class="word-wrap"><span class="word" style="transform:translateY(110%)">${content}</span></span>${spacer}`
      })
      .join('')

    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll('.word'), {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: type === 'words' ? 0.09 : 0.02,
        delay,
      })
    }, el)

    return () => ctx.revert()
  }, [text, delay, type])

  return <Tag ref={ref} className={className} aria-label={text} />
}
