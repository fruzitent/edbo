import { getOffers } from 'edbo/src/lib/edbo'

import type { OfferResponse } from 'edbo/src/types/edbo'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler<OfferResponse> = async (req, res) => {
  const ids = req.query.ids as string[]
  const offers = await getOffers({ ids: ids.join(',') })
  res.status(200).json(offers)
}

export default handler
