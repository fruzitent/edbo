import { getUsers, UserRequest, UserResponse } from 'edbo/src/lib/edbo'

import type { NextApiHandler, NextApiRequest } from 'next'

const getArgs = (req: NextApiRequest): UserRequest => {
  const id = req.query.id as string
  const from = req.query.from as string
  const to = req.query.to as string
  return {
    id: +id,
    from: +from || 0,
    to: +to,
  }
}

const handler: NextApiHandler<UserResponse> = async (req, res) => {
  const args = getArgs(req)
  const users = await getUsers(args)
  res.status(200).json(users)
}

export default handler
