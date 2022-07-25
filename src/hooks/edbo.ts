import { buildQuery } from 'edbo/src/utils/utils'
import useSWR from 'swr'

import type { OfferResponse } from 'edbo/src/types/edbo/offer'
import type { UserResponse } from 'edbo/src/types/edbo/user'

export const useOffers = (id: number) => {
  const url = `/api/edbo/offers/${id}`
  const { data, error, mutate } = useSWR<OfferResponse, unknown>(url)
  return {
    offers: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const useUsers = (id: number, from?: number, to?: number) => {
  const query = buildQuery({ from, to })
  const url = `/api/edbo/users/${id}?${query}`
  const { data, error, mutate } = useSWR<UserResponse, unknown>(url)
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
