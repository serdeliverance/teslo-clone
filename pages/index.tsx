import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

const HomePage: NextPage = () => {

  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ShopLayout title='Teslo Shop' pageDescription='Find the best products here'>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>All products</Typography>

      <ProductList 
        products={data}
      />
    </ShopLayout>
  )
}

export default HomePage
