import { connect } from 'http2'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Product, User } from '../../models'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'POST')
    return res.status(404).json({ message: 'Not found' })

  if (process.env.NODE_ENV === 'production') {
    console.log('Invalid operation')
    return res
      .status(401)
      .json({ message: 'Access to this services is not allowed' })
  }

  const conn = await db.connect()
  await Product.deleteMany()
  await Product.insertMany(seedData.initialData.products)
  await User.deleteMany()
  await User.insertMany(seedData.initialData.users)
  await db.disconnect()

  res.status(200).json({ message: 'seed data loaded successfully' })
}
