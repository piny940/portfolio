import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('headers: ', req.headers)
  res.status(200).json({ name: 'John Doe' })
}

export default handler
