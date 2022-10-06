import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks/useProducts'

const SearchPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title='Teslo Shop - Search' pageDescription='Find the best products here'>
      <Typography variant='h1' component='h1'>Search product</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>XXXX - XXXX</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

    </ShopLayout>
  )
}

export default SearchPage
