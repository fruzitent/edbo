import { getUniversities } from 'edbo/src/lib/edbo'

import type { UniversityRequest, UniversityResponse } from 'edbo/src/types/edbo'
import type { NextApiHandler, NextApiRequest } from 'next'

const getArgs = (req: NextApiRequest): UniversityRequest => {
  const lc = req.query.lc as UniversityRequest['lc']
  const ns = req.query.ns as string
  const ut = req.query.ut as string
  return {
    lc,
    ns: Number.parseInt(ns) || ns,
    // @ts-ignore
    ut: +ut,
  }
}

const handler: NextApiHandler<UniversityResponse> = async (req, res) => {
  const args = getArgs(req)
  const universities = await getUniversities(args)
  res.status(200).json(universities)
}

export default handler
