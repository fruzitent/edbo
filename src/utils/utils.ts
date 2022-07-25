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
