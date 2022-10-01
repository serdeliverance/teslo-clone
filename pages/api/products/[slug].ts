import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
    | { message: string }
    | IProduct

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res)
        default:
            return res.status(400)
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug })
    await db.disconnect()

    if (!product) {
        return res.status(404)
    }

    return res.status(200).json(product)
}