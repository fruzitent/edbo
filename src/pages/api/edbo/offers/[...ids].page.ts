import { getOffers, OfferRequest, OfferResponse } from 'edbo/src/lib/edbo'

import type { NextApiHandler, NextApiRequest } from 'next'

const getArgs = (req: NextApiRequest): OfferRequest => {
  const ids = req.query.ids as string[]
  return {
    ids: ids.join(','),
  }
}

const handler: NextApiHandler<OfferResponse> = async (req, res) => {
  const args = getArgs(req)
  const offers = await getOffers(args)
  res.status(200).json(offers)
}

export default handler
