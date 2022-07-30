import { cpus } from 'node:os'

import { PromisePool } from '@supercharge/promise-pool'
import { db } from 'edbo/src/lib/db'
import { getOffers } from 'edbo/src/lib/edbo'

const THREADS = cpus().length

const main = async () => {
  const data = await db.getIds()

  const { errors } = await PromisePool.for(data)
    .withConcurrency(THREADS)
    .process<void, unknown>(async (item, index) => {
      for (const offer of await getOffers({ ids: item })) {
        console.log({ offer, index })
        await db.addOffer(offer)
      }
    })

  console.log('ERRORS:', errors)
}

main()
