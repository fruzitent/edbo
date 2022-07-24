import { getUsers } from 'src/lib/edbo'

import type { NextApiHandler } from 'next'
import type { UserResponse } from 'src/types/edbo'

const handler: NextApiHandler<UserResponse> = async (req, res) => {
  const id = +req.query.id!
  const from = +req.query.from! || 0
  const to = +req.query.to!
  const users = await getUsers({ id, from, to })
  res.status(200).json(users)
}

export default handler
