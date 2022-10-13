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
      return registerUser(req, res)
    default:
      res.status(400)
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name ='' } = req.body as { email: string, password: string, name: string}

  if (password.length < 6) {
    return res.status(400).json({message: 'Password should be of 6 characters or more'})
  }

  if (name.length < 2) {
    return res.status(400).json({message: 'Name should be of 2 characters or more'})
  }

  // TODO validate email

  await db.connect()
  const user = await User.findOne({ email })

  if (user) {
    await db.disconnect()
    return res.status(400).json({message: 'email already exists'})
  }

  await db.disconnect()

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    await db.disconnect()
    return res.status(500)
  }

  await db.disconnect()

  const { _id, role } = newUser

  const token = jwt.signToken(_id, email)

  return res.status(200).json({
    token,
    user: {
        email, role, name
    }
  })
}
