import { cpus } from 'node:os'

import { PromisePool } from '@supercharge/promise-pool'
import { db } from 'edbo/src/lib/db'
import { getOffers } from 'edbo/src/lib/edbo'

const THREADS = cpus().length

const getData = async () => {
  const data: string[] = []
  const programs = await db.getPrograms()
  for (const program of programs) {
    const ids = program.ids.split(',')
    data.push(...ids)
  }
  return data
}

const main = async () => {
  const data = await getData()

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
