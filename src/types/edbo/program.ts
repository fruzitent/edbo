import { specialities } from 'edbo/src/types/edbo/index'

export interface Program {
  /** comma-separated list of Конкурсна пропозиція */
  ids: string

  /** ids.length */
  n: number

  /** */
  speciality: keyof typeof specialities

  /** Код закладу в ЄДЕБО */
  uid: number

  /** Назва закладу освіти */
  un: string
}
