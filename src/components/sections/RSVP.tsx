import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { searchGuests, updateRSVPStatus, type Guest } from '../../services/sheetsService'
import { rsvp } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Ornament } from '../ui/Divider'
import { cn } from '../../lib/utils'

type Stage = 'search' | 'searching' | 'not-found' | 'results' | 'submitting' | 'success' | 'error'

const panelVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55 } },
  exit: { opacity: 0, y: -12, filter: 'blur(6px)', transition: { duration: 0.25 } },
}

const inputClasses =
  'w-full border-0 border-b border-alba-ink/25 bg-transparent px-0 py-3 font-body text-base text-alba-ink placeholder:text-alba-muted/60 focus:border-alba-ink focus:outline-none focus:ring-0 transition-colors'

const labelClasses = 'block font-body text-[11px] uppercase tracking-[0.3em] text-alba-muted mb-2'

function fullName(guest: Guest): string {
  return [guest.nombre, guest.apellidoPaterno, guest.apellidoMaterno].filter(Boolean).join(' ')
}

function allowanceLabel(guest: Guest): string | null {
  const parts: string[] = []
  if (guest.acompanante > 0) parts.push(`+${guest.acompanante} acompañante${guest.acompanante > 1 ? 's' : ''}`)
  if (guest.ninos > 0) parts.push(`${guest.ninos} niño${guest.ninos > 1 ? 's' : ''}`)
  return parts.length > 0 ? parts.join(' · ') : null
}

function Spinner() {
  return <div className="h-8 w-8 animate-spin rounded-full border border-alba-ink/20 border-t-alba-ink" />
}

export function RSVP() {
  const [query, setQuery] = useState('')
  const [queryError, setQueryError] = useState(false)
  const [stage, setStage] = useState<Stage>('search')
  const [guests, setGuests] = useState<Guest[]>([])
  const [selections, setSelections] = useState<Record<number, boolean>>({})

  const familias = Array.from(new Set(guests.map((g) => g.familia)))
  const hasSelections = Object.keys(selections).length > 0

  async function handleSearch() {
    const wordCount = query.trim().split(/\s+/).filter(Boolean).length
    if (wordCount < 2) {
      setQueryError(true)
      return
    }
    setQueryError(false)
    setStage('searching')

    const results = await searchGuests(query)
    if (results.length === 0) {
      setStage('not-found')
      return
    }

    const initialSelections: Record<number, boolean> = {}
    results.forEach((guest) => {
      if (guest.asistira === 'Sí') initialSelections[guest.row] = true
      else if (guest.asistira === 'No') initialSelections[guest.row] = false
    })

    setGuests(results)
    setSelections(initialSelections)
    setStage('results')
  }

  function handleReset() {
    setQuery('')
    setQueryError(false)
    setGuests([])
    setSelections({})
    setStage('search')
  }

  function setFamilySelection(familia: string, attending: boolean) {
    setSelections((prev) => {
      const next = { ...prev }
      guests.filter((g) => g.familia === familia).forEach((g) => (next[g.row] = attending))
      return next
    })
  }

  async function handleSave() {
    const updates = Object.entries(selections).map(([row, attending]) => ({
      row: Number(row),
      attending,
    }))
    if (updates.length === 0) return

    setStage('submitting')
    const result = await updateRSVPStatus(updates)
    setStage(result === 'success' ? 'success' : 'error')
  }

  return (
    <section id="rsvp" className="bg-alba-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-xl">
        <SectionReveal className="text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">{rsvp.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">{rsvp.title}</h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
          <p className="mx-auto mt-6 max-w-sm font-body text-sm font-light text-alba-ink/65">
            {rsvp.description}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14">
          <div className="min-h-[18rem]">
            <AnimatePresence mode="wait">
              {stage === 'search' && (
                <motion.div
                  key="search"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-8"
                >
                  <div>
                    <label htmlFor="guest-query" className={labelClasses}>
                      Nombre completo o apellido de familia
                    </label>
                    <input
                      id="guest-query"
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value)
                        setQueryError(false)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch()
                      }}
                      placeholder="Ej. Renata Sandoval Priego"
                      className={cn(inputClasses, queryError && 'border-red-800/50 focus:border-red-800/60')}
                    />
                    {queryError && (
                      <p className="mt-2 font-body text-xs text-alba-ink/60">
                        Escribe tu nombre completo (ej. "Renata Sandoval Priego") o el apellido completo de
                        tu familia (ej. "Sandoval Priego").
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSearch}
                    className="w-full border border-alba-ink bg-alba-ink py-4 font-body text-[11px] uppercase tracking-[0.35em] text-alba-cream transition-opacity hover:opacity-85"
                  >
                    Buscar mi nombre
                  </button>
                </motion.div>
              )}

              {stage === 'searching' && (
                <motion.div
                  key="searching"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-5 py-10"
                >
                  <Spinner />
                  <p className="font-display italic text-alba-ink/60">Buscando…</p>
                </motion.div>
              )}

              {stage === 'not-found' && (
                <motion.div
                  key="not-found"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-5 py-10 text-center"
                >
                  <p className="font-display text-2xl italic text-alba-ink">No te encontramos</p>
                  <p className="mx-auto max-w-xs font-body text-sm font-light text-alba-ink/65">
                    Verifica que tu nombre completo o el apellido de tu familia estén bien escritos. Si el
                    problema continúa, contáctanos directamente.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-body text-[11px] uppercase tracking-[0.3em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 hover:decoration-alba-ink"
                  >
                    Buscar de nuevo
                  </button>
                </motion.div>
              )}

              {stage === 'results' && (
                <motion.div
                  key="results"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-10 text-left"
                >
                  {familias.length > 1 && (
                    <p className="font-body text-xs font-light leading-relaxed text-alba-ink/55">
                      Encontramos {familias.length} familias con ese apellido. Si no reconoces la tuya,
                      prueba escribiendo el apellido completo de tu familia.
                    </p>
                  )}

                  {familias.map((familia) => (
                    <div key={familia} className="space-y-5">
                      <div className="flex items-center justify-between gap-3 border-b border-alba-ink/15 pb-3">
                        <p className="font-body text-[11px] uppercase tracking-[0.3em] text-alba-muted">
                          Familia {familia}
                        </p>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setFamilySelection(familia, true)}
                            className="font-body text-[10px] uppercase tracking-[0.2em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 hover:decoration-alba-ink"
                          >
                            Todos asisten
                          </button>
                          <button
                            type="button"
                            onClick={() => setFamilySelection(familia, false)}
                            className="font-body text-[10px] uppercase tracking-[0.2em] text-alba-muted underline decoration-alba-muted/40 underline-offset-4 hover:text-alba-ink hover:decoration-alba-ink"
                          >
                            Ninguno asiste
                          </button>
                        </div>
                      </div>

                      {guests
                        .filter((g) => g.familia === familia)
                        .map((guest) => {
                          const allowance = allowanceLabel(guest)
                          return (
                            <div key={guest.row} className="space-y-3">
                              <div className="flex items-baseline justify-between gap-2">
                                <p className="font-display text-lg italic text-alba-ink">{fullName(guest)}</p>
                                {allowance && (
                                  <span className="whitespace-nowrap font-body text-[10px] uppercase tracking-[0.2em] text-alba-muted">
                                    {allowance}
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-3">
                                {(['yes', 'no'] as const).map((option) => {
                                  const isActive =
                                    option === 'yes'
                                      ? selections[guest.row] === true
                                      : selections[guest.row] === false
                                  return (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() =>
                                        setSelections((prev) => ({
                                          ...prev,
                                          [guest.row]: option === 'yes',
                                        }))
                                      }
                                      className={cn(
                                        'flex-1 border px-4 py-2.5 text-center font-body text-xs uppercase tracking-[0.2em] transition-colors',
                                        isActive
                                          ? 'border-alba-ink bg-alba-ink text-alba-cream'
                                          : 'border-alba-ink/25 text-alba-ink/70 hover:border-alba-ink/50',
                                      )}
                                    >
                                      {option === 'yes' ? 'Asistirá' : 'No asistirá'}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ))}

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={!hasSelections}
                      className="w-full border border-alba-ink bg-alba-ink py-4 font-body text-[11px] uppercase tracking-[0.35em] text-alba-cream transition-opacity hover:opacity-85 disabled:opacity-40"
                    >
                      Guardar confirmación
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full font-body text-[11px] uppercase tracking-[0.3em] text-alba-muted underline decoration-alba-muted/40 underline-offset-4 hover:text-alba-ink hover:decoration-alba-ink"
                    >
                      Buscar otro nombre
                    </button>
                  </div>
                </motion.div>
              )}

              {stage === 'submitting' && (
                <motion.div
                  key="submitting"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-5 py-10"
                >
                  <Spinner />
                  <p className="font-display italic text-alba-ink/60">Guardando…</p>
                </motion.div>
              )}

              {stage === 'success' && (
                <motion.div
                  key="success"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 border border-alba-ink/15 px-8 py-16 text-center"
                >
                  <span className="font-display text-3xl italic text-alba-ink">Gracias</span>
                  <p className="mx-auto max-w-xs font-body text-sm font-light text-alba-ink/70">
                    Tu confirmación fue registrada. Estamos felices de compartir este día contigo.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-2 font-body text-[11px] uppercase tracking-[0.3em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 hover:decoration-alba-ink"
                  >
                    Confirmar otra familia
                  </button>
                </motion.div>
              )}

              {stage === 'error' && (
                <motion.div
                  key="error"
                  variants={panelVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <p className="font-display text-2xl italic text-alba-ink">Algo salió mal</p>
                  <p className="font-body text-sm font-light text-alba-ink/65">
                    Por favor intenta de nuevo.
                  </p>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="font-body text-[11px] uppercase tracking-[0.3em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 hover:decoration-alba-ink"
                  >
                    Intentar de nuevo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
