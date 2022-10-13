import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import { jwt } from '../../../utils'

type Data = 
    | { message: string }
    | { token: string, user: { role: string, email: string, name: string}}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res)
    default:
      res.status(400)
  }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies

    let userId = ''

    try {
        userId = await jwt.isValidToken(token.toString())
    } catch (error) {
        return res.status(401).json({ message: 'Authorization token is not valid'})
    }

    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if (!user) {
        return res.status(400).json({message: 'user not exists'})
    }

    const { _id, email, role, name } = user

  res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
        email,
        role,
        name
    }
  })
}
