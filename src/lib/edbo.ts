import jsdom from 'jsdom'

import type { Offer } from 'src/types/offers'
import type { User } from 'src/types/users'

const dom = new jsdom.JSDOM()
const DOMParser = dom.window.DOMParser

const BASE_URL = 'https://vstup2021.edbo.gov.ua'
const API_URL = `${BASE_URL}/offer-requests`
const getRefererUrl = (id: number) => `${BASE_URL}/offer/${id}`

const getHTMLPage = async (url: string) => {
  const response = await fetch(url)
  const body = await response.text()
  const parser = new DOMParser()
  return parser.parseFromString(body, 'text/html')
}

export const getOffer = async (id: number): Promise<Offer> => {
  const OFFER_FROM = 'let offer = '
  const OFFER_TO = 'let payment_types = '

  const url = getRefererUrl(id)
  const page = await getHTMLPage(url)
  const scripts = Array.from(page.body.querySelectorAll('script'))

  for (const script of scripts) {
    if (script.textContent !== null && script.textContent.length > 0) {
      const pFrom = script.textContent.search(OFFER_FROM) + OFFER_FROM.length
      const pTo = script.textContent.search(OFFER_TO)
      const offer = script.textContent.slice(pFrom, pTo)
      return JSON.parse(offer)
    }
  }

  throw new Error('no valid scripts found')
}

async function* _getUsers(id: number, last: number = 0) {
  if (last < 0) {
    throw new Error('index must be greater than 0')
  }

  const response = await fetch(API_URL, {
    body: new URLSearchParams({
      id: `${id}`,
      last: `${last}`,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: getRefererUrl(id),
    },
    method: 'POST',
  })
  if (!response.ok) return

  const body = await response.json()
  if (Object.keys(body).length === 0) return

  const users: User[] = body.requests
  if (users.length === 0) return

  for (const user of users) {
    yield user
  }
}

export const getUsers = async (id: number, from: number = 0, to?: number) => {
  const PAGE_LIMIT = 1000
  const PAGE_SIZE = 200

  const isTo = typeof to === 'undefined'
  const last = isTo ? PAGE_LIMIT : to
  const users: User[] = []

  for (let i = from; ; i += PAGE_SIZE) {
    const snapped = Math.floor(i / PAGE_SIZE) * PAGE_SIZE
    if (snapped > PAGE_LIMIT) break

    for await (const user of _getUsers(id, i)) {
      if (!isTo && users.length > last - from) return users
      users.push(user)
    }
  }

  return users
}

export interface Page {
  offer: Offer
  users: User[]
}

export const getPage = async (id: number, from?: number, to?: number) => {
  const page: Page = {
    offer: await getOffer(id),
    users: await getUsers(id, from, to),
  }
  return page
}
