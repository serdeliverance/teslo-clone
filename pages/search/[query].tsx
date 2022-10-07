import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'
import { ProductList } from '../../components/products'

interface Props {
  products: IProduct[]
}
const SearchPage: NextPage<Props> = ({ products }) => {

  return (
    <ShopLayout title='Teslo Shop - Search' pageDescription='Find the best products here'>
      <Typography variant='h1' component='h1'>Search product</Typography>
      <Typography variant='h2' sx={{ mb: 1}}>XXXX - XXXX</Typography>

      <ProductList products={products} />
      
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query)

  // TODO return other products if empty

  return {
    props: {
      
    }
  }
}

export default SearchPage
