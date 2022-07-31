import { Offer, Program, regions, University, User } from 'edbo/src/types/edbo'

const BASE_URL = 'https://vstup2021.edbo.gov.ua'

const USERS_URL = `${BASE_URL}/offer-requests`
const OFFERS_URL = `${BASE_URL}/offers-list`
const PROGRAMS_URL = `${BASE_URL}/offers-universities`
const UNIVERSITIES_URL = `${BASE_URL}/university-search`

const getHeaders = (ref: string) => ({
  'Content-Type': 'application/x-www-form-urlencoded',
  Referer: ref,
})

export const buildQuery = (args: object) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(args)) {
    if (typeof value !== 'undefined') {
      query.set(key, `${value}`)
    }
  }

  return query
}

export interface OfferRequest {
  /** comma-separated list of Offer['usid'] */
  ids: string
}

export type OfferResponse = Offer[]

export const getOffers = async (args: OfferRequest) => {
  const res = await fetch(OFFERS_URL, {
    body: buildQuery(args),
    headers: getHeaders(OFFERS_URL),
    method: 'POST',
  })
  const data: { offers: OfferResponse } = await res.json()
  return data.offers
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

export const getPrograms = async (args: ProgramsRequest) => {
  const res = await fetch(PROGRAMS_URL, {
    body: buildQuery(args),
    headers: getHeaders(PROGRAMS_URL),
    method: 'POST',
  })
  const data: { universities: ProgramsResponse } = await res.json()
  return data.universities
}

export interface UniversityRequest {
  /** Регіон */
  lc?: keyof typeof regions

  /** Код закладу в ЄДЕБО або Назва закладу освіти */
  ns: number | string

  /** */
  ut?: 0
}

export type UniversityResponse = University[]

export const getUniversities = async (args: UniversityRequest) => {
  const url = `${UNIVERSITIES_URL}/?` + buildQuery(args)
  const res = await fetch(url, {
    headers: getHeaders(UNIVERSITIES_URL),
  })
  const data: UniversityResponse = await res.json()
  return data
}

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

async function* _getUsers(args: UserGenerator) {
  if (args.last < 0) {
    throw new Error('index must be greater than 0')
  }

  const res = await fetch(USERS_URL, {
    body: buildQuery(args),
    headers: getHeaders(USERS_URL),
    method: 'POST',
  })
  if (!res.ok) return

  const data: { requests: UserResponse } = await res.json()
  if (Object.keys(data).length === 0) return

  const users = data.requests
  if (users.length === 0) return

  for (const user of users) {
    yield user
  }
}

export const getUsers = async ({ id, from = 0, to }: UserRequest) => {
  const PAGE_LIMIT = 1000
  const PAGE_SIZE = 200

  const isTo = typeof to === 'undefined'
  const last = isTo ? PAGE_LIMIT : to
  const users: UserResponse = []

  for (let i = from; ; i += PAGE_SIZE) {
    const snapped = Math.floor(i / PAGE_SIZE) * PAGE_SIZE
    if (snapped > PAGE_LIMIT) break

    for await (const user of _getUsers({ id, last: i })) {
      if (!isTo && users.length > last - from) return users
      users.push(user)
    }
  }

  return users
}
