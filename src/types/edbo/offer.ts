import { specialities } from 'edbo/src/types/edbo'

export const entryBasis = {
  30: 'Базова загальна середня освіта',
  40: 'Повна загальна середня освіта',
  510: 'Кваліфікований робітник',
  520: 'Молодший спеціаліст',
  530: 'Фаховий молодший бакалавр',
  610: 'Молодший бакалавр',
  620: 'Бакалавр',
  630: 'Спеціаліст',
  640: 'Магістр',
} as const

export const masterProgram = {
  1: 'Освітньо-професійна',
  2: 'Освітньо-наукова',
} as const

export const mba = {
  1: 'Денна',
  2: 'Заочна',
  4: 'Вечірня',
  5: 'Дистанційна',
} as const

export const qualification = {
  1: 'Бакалавр',
  2: 'Магістр',
  3: 'Спеціаліст',
  4: 'Молодший спеціаліст',
  6: 'Молодший бакалавр',
  9: 'Фаховий молодший бакалавр',
} as const

interface Os {
  /** */
  a?: number

  /** */
  efid: number

  /** Коефіцієнт */
  k: number

  /** Мінімальний бал */
  mv?: number

  /** Назва предмету */
  sn: string
}

interface Osn {
  /** */
  i: number[]

  /** */
  n?: string
}

interface StatsFields {
  /** Допущено до конкурсу */
  a: number

  /** Заяв на бюджет */
  b: number

  /** Сер. бал */
  ka?: number

  /** Мін. бал */
  km?: number

  /** Макс. бал */
  kx?: number

  /** Зараховано на бюджет */
  ob: number

  /** Мін. бал зарахованих на бюджет */
  obm?: number

  /** Зараховано на контракт */
  oc: number

  /** Мін. бал зарахованих на контракт */
  ocm?: number

  /** Рекомендовано на загальних підставах */
  r: number

  /** Мін. бал рекомендованих */
  rm?: number

  /** Подано заяв */
  t: number
}

interface StatsTitles {
  /** Статистика заяв */
  c?: StatsFields

  /** Конкурсна пропозиція минулого року */
  p?: StatsFields
}

export interface Offer {
  /** Курс зарахування */
  cid: 1 | 2 | 3 | 4 | 5

  /** Освітній рівень */
  ebid: keyof typeof entryBasis

  /** Основа вступу */
  ebn: typeof entryBasis[keyof typeof entryBasis]

  /** Форма навчання */
  efid: keyof typeof mba

  /** Форма навчання */
  efn: typeof mba[keyof typeof mba]

  /** Термін навчання */
  etrm: string

  /** */
  gd?: number

  /** */
  gid?: number

  /** */
  grid?: number

  /** */
  gz?: number

  /** */
  indid?: 105 | 108 | 109 | 111 | 150

  /** Тип програми магістра */
  mptid?: `${keyof typeof masterProgram}`

  /** Тип програми магістра */
  mptn?: typeof masterProgram[keyof typeof masterProgram]

  /** */
  ob?: number

  /** Обсяг на контракт */
  oc?: number

  /** Ліцензійний обсяг */
  ol?: number

  /** */
  os: Record<string, Os>

  /** */
  osn: Record<string, Osn>

  /** Макс. обсяг держзамовлення */
  ox?: number

  /** Вартість навчання за рік (контракт) */
  price?: string

  /** Кваліфікація */
  qid: `${keyof typeof qualification}`

  /** Кваліфікація */
  qn: typeof qualification[keyof typeof qualification]

  /** Рег. коефіцієнт */
  rk?: string | 1

  /** */
  rr?: 1

  /** Термін подачі заяв */
  rtrm: string

  /** Освітня програма */
  spn?: string

  /** Cпеціальність */
  ssc: keyof typeof specialities

  /** Cпеціальність */
  ssn: typeof specialities[keyof typeof specialities]

  /** */
  st: StatsTitles

  /** id sus специальности */
  szc?: string

  /** name sus специальности */
  szn?: string

  /** Факультет */
  ufn?: string

  /** Код закладу в ЄДЕБО */
  uid: number

  /** Назва закладу освіти */
  un: string

  /** Пропозиція з пріоритетом */
  up?: 1

  /** Конкурсна пропозиція */
  usid: number

  /** */
  usidp?: number

  /** Назва пропозиції */
  usn: string

  /** Вид пропозиції */
  ustn: 'Відкрита' | 'Небюджетна' | 'Основна' | 'Фіксована'

  /** Загальна вартість за повний термін навчання */
  xprice?: string
}
