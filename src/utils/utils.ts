export const fetcher = async (url: string, init: object) => {
  const res = await fetch(url, init)
  if (res.ok) return await res.json()
  return await res.text()
}
