import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Ornament } from '../ui/Divider'

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 })
  const [dragging, setDragging] = useState(false)

  function onMouseDown(e: MouseEvent) {
    const el = scrollRef.current
    if (!el) return
    dragState.current.isDown = true
    dragState.current.startX = e.pageX - el.offsetLeft
    dragState.current.scrollLeft = el.scrollLeft
    setDragging(true)
  }
  function endDrag() {
    dragState.current.isDown = false
    setDragging(false)
  }
  function onMouseMove(e: MouseEvent) {
    const el = scrollRef.current
    if (!el || !dragState.current.isDown) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragState.current.startX) * 1.5
    el.scrollLeft = dragState.current.scrollLeft - walk
  }

  return (
    <section id="galeria" className="bg-alba-cream py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <SectionReveal>
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">
            Momentos
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">Galería</h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.15}>
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={onMouseMove}
          className={`no-scrollbar mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-[calc((100vw-72rem)/2+1.5rem)] ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {galleryPhotos.map((photo, i) => (
            <motion.figure
              key={photo.src}
              className="relative w-[78vw] flex-none snap-center overflow-hidden sm:w-[46vw] md:w-[26rem]"
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </div>
              <figcaption className="mt-3 text-left font-body text-[10px] uppercase tracking-[0.25em] text-alba-muted">
                {String(i + 1).padStart(2, '0')} — {photo.credit}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </SectionReveal>

      <p className="mt-6 text-center font-body text-[10px] uppercase tracking-[0.3em] text-alba-muted/70">
        Desliza para ver más
      </p>
    </section>
  )
}
