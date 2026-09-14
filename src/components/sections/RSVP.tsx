import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { rsvp } from '../../data/wedding'
import { SectionReveal } from '../ui/SectionReveal'
import { Ornament } from '../ui/Divider'
import { cn } from '../../lib/utils'

interface RSVPFormData {
  name: string
  email: string
  attending: 'yes' | 'no'
  guests: number
  dietary: string
}

const inputClasses =
  'w-full border-0 border-b border-alba-ink/25 bg-transparent px-0 py-3 font-body text-base text-alba-ink placeholder:text-alba-muted/60 focus:border-alba-ink focus:outline-none focus:ring-0 transition-colors'

const labelClasses = 'block font-body text-[11px] uppercase tracking-[0.3em] text-alba-muted mb-2'

export function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RSVPFormData>({
    defaultValues: { attending: 'yes', guests: 1, dietary: '' },
  })

  const attending = watch('attending')

  async function onSubmit(data: RSVPFormData) {
    // Demo template — no backend call. Simulates a brief network delay
    // then shows a client-side success state only.
    await new Promise((resolve) => setTimeout(resolve, 700))
    setSubmittedName(data.name.split(' ')[0] ?? '')
    setSubmitted(true)
  }

  function handleReset() {
    setSubmitted(false)
    reset()
  }

  return (
    <section id="rsvp" className="bg-alba-cream px-6 py-28 md:py-36">
      <div className="mx-auto max-w-xl">
        <SectionReveal className="text-center">
          <p className="font-body text-[11px] uppercase tracking-[0.4em] text-alba-muted">
            {rsvp.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-alba-ink md:text-5xl">
            {rsvp.title}
          </h2>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
          <p className="mx-auto mt-6 max-w-sm font-body text-sm font-light text-alba-ink/65">
            {rsvp.description}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center border border-alba-ink/15 px-8 py-16 text-center"
              >
                <span className="font-display text-3xl italic text-alba-ink">
                  Gracias{submittedName ? `, ${submittedName}` : ''}
                </span>
                <p className="mx-auto mt-4 max-w-xs font-body text-sm font-light text-alba-ink/70">
                  Tu confirmación fue registrada. Estamos felices de compartir este día contigo.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 font-body text-[11px] uppercase tracking-[0.3em] text-alba-ink underline decoration-alba-ink/30 underline-offset-4 hover:decoration-alba-ink"
                >
                  Enviar otra respuesta
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                noValidate
              >
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className={inputClasses}
                    {...register('name', { required: 'Por favor comparte tu nombre.' })}
                  />
                  {errors.name && (
                    <p className="mt-2 font-body text-xs text-alba-ink/60">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    className={inputClasses}
                    {...register('email', {
                      required: 'Necesitamos un correo para contactarte.',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Ingresa un correo válido.' },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 font-body text-xs text-alba-ink/60">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <span className={labelClasses}>¿Podrás acompañarnos?</span>
                  <div className="flex gap-4 pt-1">
                    {(['yes', 'no'] as const).map((option) => (
                      <label
                        key={option}
                        className={cn(
                          'flex-1 cursor-pointer border px-5 py-3 text-center font-body text-sm uppercase tracking-[0.2em] transition-colors',
                          attending === option
                            ? 'border-alba-ink bg-alba-ink text-alba-cream'
                            : 'border-alba-ink/25 text-alba-ink/70 hover:border-alba-ink/50',
                        )}
                      >
                        <input
                          type="radio"
                          value={option}
                          className="sr-only"
                          {...register('attending')}
                        />
                        {option === 'yes' ? 'Sí, asistiré' : 'No podré'}
                      </label>
                    ))}
                  </div>
                </div>

                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8 overflow-hidden"
                  >
                    <div>
                      <label htmlFor="guests" className={labelClasses}>
                        Número de invitados (incluyéndote)
                      </label>
                      <input
                        id="guests"
                        type="number"
                        min={1}
                        max={6}
                        className={inputClasses}
                        {...register('guests', {
                          valueAsNumber: true,
                          min: { value: 1, message: 'Mínimo un invitado.' },
                          max: { value: 6, message: 'Para grupos mayores, escríbenos directamente.' },
                        })}
                      />
                      {errors.guests && (
                        <p className="mt-2 font-body text-xs text-alba-ink/60">{errors.guests.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dietary" className={labelClasses}>
                        Restricciones alimenticias (opcional)
                      </label>
                      <input
                        id="dietary"
                        type="text"
                        placeholder="Vegetariano, alergias, etc."
                        className={inputClasses}
                        {...register('dietary')}
                      />
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-alba-ink bg-alba-ink py-4 font-body text-[11px] uppercase tracking-[0.35em] text-alba-cream transition-opacity hover:opacity-85 disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando…' : 'Confirmar asistencia'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </SectionReveal>
      </div>
    </section>
  )
}
