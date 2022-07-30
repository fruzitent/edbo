import { cpus } from 'node:os'

import { PromisePool } from '@supercharge/promise-pool'
import { db } from 'edbo/src/lib/db'
import { getPrograms } from 'edbo/src/lib/edbo'
import { specialities } from 'edbo/src/types/edbo'

const THREADS = cpus().length

const main = async () => {
  const data = Object.keys(specialities) as (keyof typeof specialities)[]

  const { errors } = await PromisePool.for(data)
    .withConcurrency(THREADS)
    .process<void, unknown>(async (speciality, index) => {
      for (const program of await getPrograms({ speciality })) {
        console.log({ speciality, index })
        program.speciality = speciality
        await db.addProgram(program)
      }
    })

  console.log('ERRORS:', errors)
}

main()
