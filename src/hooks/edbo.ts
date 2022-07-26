import { buildQuery } from 'edbo/src/utils/utils'
import useSWR from 'swr'

import type {
  OfferRequest,
  OfferResponse,
  ProgramsRequest,
  ProgramsResponse,
  UniversityRequest,
  UniversityResponse,
  UserRequest,
  UserResponse,
} from 'edbo/src/types/edbo'

export const useOffers = (args: OfferRequest) => {
  const ids = args.ids.split(',').join('/')
  const url = `/api/edbo/offers/${ids}`
  const { data, error, mutate } = useSWR<OfferResponse, unknown>(url)
  return {
    offers: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const usePrograms = (args: ProgramsRequest) => {
  const { speciality, ...other } = args
  const query = buildQuery(other)
  const url = `/api/edbo/programs/${speciality}?${query}`
  const { data, error, mutate } = useSWR<ProgramsResponse, unknown>(url)
  return {
    programs: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const useUniversities = (args: UniversityRequest) => {
  const { ns, ...other } = args
  const query = buildQuery(other)
  const url = `/api/edbo/universities/${ns}?${query}`
  const { data, error, mutate } = useSWR<UniversityResponse, unknown>(url)
  return {
    universities: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export const useUsers = (args: UserRequest) => {
  const { id, ...other } = args
  const query = buildQuery(other)
  const url = `/api/edbo/users/${id}?${query}`
  const { data, error, mutate } = useSWR<UserResponse, unknown>(url)
  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
