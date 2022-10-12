import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs'
import { jwt } from '../../../utils'

type Data = 
    | { message: string }
    | { token: string, user: { role: string, email: string, name: string}}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res)
    default:
      res.status(400)
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body

  await db.connect()
  const user = await User.findOne({ email })
  await db.disconnect()

  if (!user || !bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'username or password invalid' })
  }

  const { role, name } = user

  const token = jwt.signToken(user._id, user.email)

  return res.status(200).json({
    token,
    user: {
        email, role, name
    }
  })
}
