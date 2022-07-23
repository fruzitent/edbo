import { NextApiHandler } from 'next'

import { getPage, Page } from 'src/lib/edbo'

const page: NextApiHandler<Page> = async (req, res) => {
  const id = +req.query.id!
  const page = await getPage(id)
  res.status(200).json(page)
}

export default page
