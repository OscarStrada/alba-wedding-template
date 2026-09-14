import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { couple } from '../../data/wedding'

gsap.registerPlugin(ScrollTrigger)

/**
 * The one deliberate departure from "just fade sections in": a scroll-scrubbed
 * signature that bridges the hero into the rest of the page. It blows the
 * small line–dot–line ornament (repeated small throughout the site) up to a
 * single dramatic full-width gesture, tying the couple's initials to the
 * page's own recurring motif instead of introducing a disconnected effect.
 *
 * Scrubbed to scroll position (not a one-shot trigger) so it reads as part
 * of the act of scrolling, not a delayed animation playing on top of it.
 */
export function SignatureReveal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.sig-line-left, .sig-line-right', { scaleX: 0 })
      gsap.set('.sig-dot', { scale: 0, rotate: -45 })
      gsap.set('.sig-initial', { opacity: 0, y: 14 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          end: 'top 32%',
          scrub: 0.6,
        },
      })

      tl.to('.sig-line-left, .sig-line-right', { scaleX: 1, duration: 1, ease: 'power2.out' })
        .to('.sig-dot', { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.45')
        .to('.sig-initial', { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }, '-=0.35')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center gap-5 bg-alba-cream px-6 py-20 sm:gap-8 md:py-28"
      aria-hidden="true"
    >
      <span className="sig-initial font-display text-2xl italic text-alba-ink/60 sm:text-3xl md:text-4xl">
        {couple.bride[0]}
      </span>
      <div className="sig-line-left h-px w-14 origin-right bg-alba-ink/30 sm:w-24 md:w-36" />
      <span className="sig-dot block h-2 w-2 shrink-0 rotate-45 bg-alba-ink/50" />
      <div className="sig-line-right h-px w-14 origin-left bg-alba-ink/30 sm:w-24 md:w-36" />
      <span className="sig-initial font-display text-2xl italic text-alba-ink/60 sm:text-3xl md:text-4xl">
        {couple.groom[0]}
      </span>
    </div>
  )
}
