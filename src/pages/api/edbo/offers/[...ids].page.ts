import { getOffers } from 'src/lib/edbo'

import type { NextApiHandler } from 'next'
import type { OfferResponse } from 'src/types/edbo'

const handler: NextApiHandler<OfferResponse> = async (req, res) => {
  const ids = req.query.ids as string[]
  const offers = await getOffers({ ids: ids.join(',') })
  res.status(200).json(offers)
}

export default handler
