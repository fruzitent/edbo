interface Rss {
  /** Коефіцієнти */
  f?: string

  /** Предмет */
  id?: number

  /** Показник */
  kv: string

  /** Квота */
  sn?: 'Квота 1' | 'Квота 2' | 'Співбесіда'

  /** */
  t?:
    | 'gk' /** Галузевий коефіцієнт */
    | 'ob' /** Бал за особливі успіхи */
    | 'pk' /** Першочерговий коефіцієнт */
    | 'q' /** Квота */
    | 'rk' /** Регіональний коефіцієнт */
    | 'sk' /** Сільський коефіцієнт */
}

interface UserBase {
  /** */
  artid: -1 | 0 | 1 | 11 | 13

  /** Подано оригінали документів */
  d: 0 | 1

  /** ПІБ */
  fio: string

  /** # */
  n: number

  /** */
  offer: number

  /** */
  p: 0 | 1 | 2 | 3 | 4 | 5

  /** */
  pa: 0 | 1 | 2 | 3 | 4 | 5

  /** */
  prid: number

  /** Статус */
  prsid:
    | 1 /** заява надійшла з сайту */
    | 2 /** затримано */
    | 3 /** скасовано вступником */
    | 4 /** скасовано (втрата пріор.) */
    | 5 /** зареєстровано */
    | 6 /** допущено */
    | 7 /** відмова */
    | 8 /** скасовано ЗО */
    | 9 /** рекомендовано (бюджет) */
    | 10 /** відхилено (бюджет) */
    | 11 /** допущено (контракт, за ріш. ПК) */
    | 12 /** рекомендовано (контракт) */
    | 13 /** відхилено (контракт) */
    | 14 /** до наказу */
    | 15 /** відраховано */
    | 16 /** скасовано (зарах. на бюджет) */

  /** Сплата */
  ptid: 0 | 1 /** бюджет */ | 2 /** контракт */

  /** Предмети */
  rss: Rss[]
}

interface UserWithTextScore extends UserBase {
  /** Конкурсний бал, text */
  kv: number

  /** Конкурсний бал, base64 */
  kvi?: never
}

interface UserWithImageScore extends UserBase {
  /** Конкурсний бал, text */
  kv?: never

  /** Конкурсний бал, base64 */
  kvi: string
}

export type User = UserWithTextScore | UserWithImageScore

export interface UserGenerator {
  id: number
  last: number
}

export interface UserRequest {
  id: number
  from?: number
  to?: number
}

export type UserResponse = User[]
