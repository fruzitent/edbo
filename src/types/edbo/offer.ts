import {
  degree,
  masterDegree,
  mba,
  qualification,
  specialities,
} from 'edbo/src/types/edbo'

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

interface St {
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

export interface Offer {
  /** Курс зарахування */
  cid: 1 | 2 | 3 | 4 | 5

  /** Освітній рівень */
  ebid: keyof typeof degree

  /** Основа вступу */
  ebn: typeof degree[keyof typeof degree]

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
  mptid?: `${keyof typeof masterDegree}`

  /** Тип програми магістра */
  mptn?: typeof masterDegree[keyof typeof masterDegree]

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
  st: Record<string, St>

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
  ustn: 'Відкрита' | 'Небюджетна' | 'Фіксована'

  /** Загальна вартість за повний термін навчання */
  xprice?: string
}

export interface OfferRequest {
  /** comma-separated list of Offer['usid'] */
  ids: string
}

export type OfferResponse = Offer[]
