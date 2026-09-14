// All wedding content as typed constants — no hardcoded copy inside components.

export interface CoupleInfo {
  bride: string
  groom: string
  fullNames: string
  weddingDateISO: string // ISO string used for the countdown
  weddingDateDisplay: string
  hashtag: string
}

export const couple: CoupleInfo = {
  bride: 'Valentina',
  groom: 'Emilio',
  fullNames: 'Valentina & Emilio',
  weddingDateISO: '2027-02-13T17:00:00-06:00',
  weddingDateDisplay: 'sábado 13 de febrero de 2027',
  hashtag: '#ValentinayEmilio',
}

export interface EventDetail {
  id: 'ceremonia' | 'recepcion'
  title: string
  time: string
  venue: string
  address: string
  description: string
  mapsQuery: string
  image: string
}

export const events: EventDetail[] = [
  {
    id: 'ceremonia',
    title: 'Ceremonia religiosa',
    time: '5:00 pm',
    venue: 'Parroquia de Nuestra Señora del Refugio',
    address: 'Valle de Bravo, Estado de México',
    description:
      'Nos acompañarán en una ceremonia íntima donde comenzará esta nueva etapa. Se sugiere llegar quince minutos antes para tomar asiento con calma.',
    mapsQuery: 'Parroquia de Nuestra Señora del Refugio, Valle de Bravo',
    image: '/gallery/ceremony-arch.jpg',
  },
  {
    id: 'recepcion',
    title: 'Recepción',
    time: '7:00 pm',
    venue: 'Jardín Las Acacias',
    address: 'Valle de Bravo, Estado de México',
    description:
      'La celebración continuará al aire libre, entre acacias y luz cálida, con cena, música y baile hasta la madrugada.',
    mapsQuery: 'Jardín Las Acacias, Valle de Bravo, Estado de México',
    image: '/gallery/reception-table.jpg',
  },
]

export const dressCode = {
  title: 'Código de vestimenta',
  value: 'Formal / Black tie optional',
  note: 'Colores sugeridos: tonos neutros, arena y marfil. Evitar blanco, hueso y colores pastel muy claros.',
}

export const ourStory = {
  eyebrow: 'Nuestra historia',
  title: 'Cómo empezó todo',
  paragraphs: [
    'Se conocieron una tarde de octubre en la fila de una librería de segunda mano, discutiendo en broma quién merecía más el último ejemplar de un mismo libro. Emilio cedió el libro; Valentina, sin saberlo, cedió mucho más.',
    'Lo que siguió fueron años de mesas compartidas, viajes improvisados y silencios cómodos — la clase de complicidad que no necesita ruido para sentirse segura.',
    'Hoy, después de ese primer desacuerdo tan afortunado, han decidido escribir juntos el resto de la historia.',
  ],
}

export interface GalleryPhoto {
  src: string
  alt: string
  credit: string
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: '/gallery/gallery-flatlay.jpg',
    alt: 'Flores blancas sobre lino, composición minimalista',
    credit: 'Kerri Shaver — Unsplash',
  },
  {
    src: '/gallery/gallery-tablescape.jpg',
    alt: 'Mesa formal con vajilla neutra y velas',
    credit: 'Silvia Mara — Unsplash',
  },
  {
    src: '/gallery/gallery-shoes.jpg',
    alt: 'Zapatos formales junto a follaje verde',
    credit: 'Christina Victoria Craft — Unsplash',
  },
  {
    src: '/gallery/gallery-tablesetting.jpg',
    alt: 'Montaje de mesa con flores y mantelería en tonos tierra',
    credit: 'Alexander Mass — Unsplash',
  },
  {
    src: '/gallery/reception-table.jpg',
    alt: 'Mesa larga de recepción decorada con flores blancas',
    credit: 'Jonathan Borba — Unsplash',
  },
  {
    src: '/gallery/ceremony-arch.jpg',
    alt: 'Arco ceremonial decorado con flores blancas y follaje',
    credit: 'Jonathan Borba — Unsplash',
  },
]

export const giftRegistry = {
  eyebrow: 'Mesa de regalos',
  title: 'Fondo de luna de miel',
  paragraph:
    'Su presencia es el regalo más importante. Si desean tener un detalle adicional, hemos preparado un fondo para nuestro viaje de luna de miel — cada contribución, grande o pequeña, se convertirá en un recuerdo del camino que apenas comienza.',
  cta: 'Ver detalles de contribución',
  note: 'Los datos de depósito se compartirán directamente por WhatsApp a quienes deseen participar. Gracias por su generosidad.',
}

export const rsvp = {
  eyebrow: 'Confirmación',
  title: 'Acompáñennos',
  description:
    'Busca tu nombre completo o el apellido de tu familia para confirmar su asistencia antes del 10 de enero de 2027.',
  deadline: '10 de enero de 2027',
}

export const footer = {
  namesLine: 'Valentina & Emilio',
  dateLine: '13 · 02 · 2027',
  message: 'Gracias por ser parte de este nuevo capítulo.',
  signature: 'Con amor, Valentina & Emilio',
}
