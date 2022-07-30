import { cpus } from 'node:os'

import { PromisePool } from '@supercharge/promise-pool'
import { db } from 'edbo/src/lib/db'
import { getUsers } from 'edbo/src/lib/edbo'

const THREADS = cpus().length

const main = async () => {
  const data = await db.getIds()

  const { errors } = await PromisePool.for(data)
    .withConcurrency(THREADS)
    .process<void, unknown>(async (id, index) => {
      console.log({ id, index })
      const users = await getUsers({ id: +id })
      for (const user of users) {
        user.offer = +id
        await db.addUser(user)
      }
    })

  console.log('ERRORS:', errors)
}

main()
