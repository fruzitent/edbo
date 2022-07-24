export const buildQuery = (args: object) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(args)) {
    if (typeof value !== 'undefined') {
      query.set(key, `${value}`)
    }
  }

  return query
}
