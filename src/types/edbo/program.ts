import { regions } from 'edbo/src/types/edbo'

import type { Offer } from 'edbo/src/types/edbo/offer'

export interface Program {
  /** comma-separated list of Конкурсна пропозиція */
  ids: string

  /** ids.length */
  n: number

  /** Код закладу в ЄДЕБО */
  uid: number

  /** Назва закладу освіти */
  un: string
}

export interface ProgramsRequest {
  /** Курс зарахування */
  course?: `${Offer['cid']}`

  /** Освітній рівень */
  education_base?: `${Offer['ebid']}`

  /** Форма навчання */
  education_form?: `${Offer['efid']}`

  /** Кваліфікація */
  qualification?: `${Offer['qid']}`

  /** Регіон */
  region?: keyof typeof regions

  /** Cпеціальність */
  speciality: `${Offer['ssc']}`

  /** Освітня програма */
  study_program?: `${Offer['spn']}`

  /** Код закладу в ЄДЕБО */
  university?: `${Offer['uid']}`
}

export type ProgramsResponse = Program[]
