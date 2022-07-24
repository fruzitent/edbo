import { regions } from 'src/types/edbo/index'

export interface University {
  /** Код закладу в ЄДЕБО */
  id: number

  /** Назва закладу освіти */
  name: string
}

export interface UniversityRequest {
  /** Регіон */
  lc?: regions

  /** Код закладу в ЄДЕБО або Назва закладу освіти */
  ns: number | string

  /** */
  ut?: 0
}

export type UniversityResponse = University[]
