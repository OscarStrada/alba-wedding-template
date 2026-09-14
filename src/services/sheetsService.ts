export interface Guest {
  row: number
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  familia: string
  acompanante: number
  ninos: number
  asistira: string
}

export type RSVPResult = 'success' | 'error'

/**
 * Backend: Google Apps Script Web App vinculado a la hoja de invitados.
 * Busca por nombre completo o apellido de familia y actualiza el estado de
 * asistencia de las filas existentes (nunca crea filas nuevas).
 *
 * El código completo para desplegar en Extensiones → Apps Script está en
 * google-apps-script/Code.gs, con las instrucciones de despliegue en
 * RSVP-SETUP.md. La URL de implementación va en VITE_GOOGLE_SCRIPT_URL
 * (archivo .env, no versionado).
 *
 * NOTA SOBRE CORS: Apps Script no soporta preflight CORS (OPTIONS) desde el
 * navegador. La búsqueda (GET simple, sin encabezados personalizados) sí es
 * legible normalmente. La actualización (POST) usa mode: 'no-cors', por lo
 * que la respuesta es opaca y el éxito se infiere de la ausencia de error de
 * red.
 */

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined
const isConfigured = !!SCRIPT_URL && !SCRIPT_URL.includes('YOUR_SCRIPT_ID')

// Datos de prueba usados SOLO mientras VITE_GOOGLE_SCRIPT_URL no está
// configurado, para poder probar el buscador end-to-end sin depender de un
// despliegue real de Apps Script. Las confirmaciones se guardan en memoria
// (se pierden al recargar la página) hasta que se conecte la hoja real.
// Nombres e familias son enteramente inventados para esta demo.
const MOCK_GUESTS: Guest[] = [
  { row: 2, nombre: 'Renata', apellidoPaterno: 'Sandoval', apellidoMaterno: 'Priego', familia: 'Sandoval Priego', acompanante: 1, ninos: 0, asistira: '' },
  { row: 3, nombre: 'Joaquín', apellidoPaterno: 'Sandoval', apellidoMaterno: 'Priego', familia: 'Sandoval Priego', acompanante: 0, ninos: 0, asistira: '' },
  { row: 4, nombre: 'Fernanda', apellidoPaterno: 'Landeros', apellidoMaterno: 'Quiroz', familia: 'Landeros Quiroz', acompanante: 1, ninos: 0, asistira: 'Sí' },
  { row: 5, nombre: 'Rodrigo', apellidoPaterno: 'Bustamante', apellidoMaterno: 'Ochoa', familia: 'Bustamante Ochoa', acompanante: 2, ninos: 1, asistira: '' },
  { row: 6, nombre: 'Camila', apellidoPaterno: 'Bustamante', apellidoMaterno: 'Ochoa', familia: 'Bustamante Ochoa', acompanante: 0, ninos: 0, asistira: '' },
  { row: 7, nombre: 'Emiliano', apellidoPaterno: 'Villaseñor', apellidoMaterno: 'Anaya', familia: 'Villaseñor Anaya', acompanante: 0, ninos: 2, asistira: '' },
]

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter(Boolean)
}

// Palabras de enlace de apellidos compuestos (ej. "De la O"). No cuentan como
// palabra "real" al decidir si la búsqueda alcanza para tratarla como nombre
// completo — si no, un apellido compuesto de varias palabras + otro apellido
// ya suma 3+ tokens y se confunde con el nombre completo de otra familia.
const STOPWORDS = new Set(['de', 'la', 'los', 'las', 'del', 'y'])

function meaningfulWords(words: string[]): string[] {
  return words.filter((w) => !STOPWORDS.has(w))
}

// Exige nombre completo o apellido de familia completo (2+ palabras reales),
// nunca un solo apellido suelto — así una búsqueda no expone a otras familias
// que comparten un apellido común, y nadie puede tocar el estado de alguien
// más sin conocer ya su nombre completo o el apellido de su familia.
const MIN_QUERY_WORDS = 2

export async function searchGuests(query: string): Promise<Guest[]> {
  const queryWords = tokenize(query)
  const queryMeaningful = meaningfulWords(queryWords)
  if (queryMeaningful.length < MIN_QUERY_WORDS) return []

  if (!isConfigured) {
    console.warn('[sheetsService] VITE_GOOGLE_SCRIPT_URL no está configurado. Usando datos de prueba.')
    await new Promise((resolve) => setTimeout(resolve, 400))
    const families = new Set(
      MOCK_GUESTS.filter((g) => {
        const familiaText = normalize(g.familia)
        const personText = normalize(`${g.nombre} ${g.apellidoPaterno} ${g.apellidoMaterno}`)
        const matchesFamilia = queryWords.every((w) => familiaText.includes(w))
        const matchesPersona = queryMeaningful.length >= 3 && queryWords.every((w) => personText.includes(w))
        return matchesFamilia || matchesPersona
      }).map((g) => g.familia),
    )
    return MOCK_GUESTS.filter((g) => families.has(g.familia)).map((g) => ({ ...g }))
  }

  const res = await fetch(`${SCRIPT_URL}?q=${encodeURIComponent(query.trim())}`)
  const data = await res.json()
  return data.results ?? []
}

export async function updateRSVPStatus(
  updates: { row: number; attending: boolean }[],
): Promise<RSVPResult> {
  if (updates.length === 0) return 'success'

  if (!isConfigured) {
    console.warn('[sheetsService] VITE_GOOGLE_SCRIPT_URL no está configurado. Guardando en memoria.')
    await new Promise((resolve) => setTimeout(resolve, 800))
    updates.forEach(({ row, attending }) => {
      const guest = MOCK_GUESTS.find((g) => g.row === row)
      if (guest) guest.asistira = attending ? 'Sí' : 'No'
    })
    return 'success'
  }

  try {
    await fetch(SCRIPT_URL as string, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates }),
    })
    return 'success'
  } catch {
    return 'error'
  }
}
