import { db } from 'edbo/src/lib/db'

export const buildQuery = (args: object) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(args)) {
    if (typeof value !== 'undefined') {
      query.set(key, `${value}`)
    }
  }

  return query
}

export const fetcher = async (url: string, init: object) => {
  const res = await fetch(url, init)
  if (res.ok) return await res.json()
  return await res.text()
}

export const getIds = async () => {
  const data: string[] = []
  const programs = await db.getPrograms()
  for (const program of programs) {
    const ids = program.ids.split(',')
    data.push(...ids)
  }
  return data
}
