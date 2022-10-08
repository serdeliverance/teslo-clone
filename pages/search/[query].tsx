import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'
import { ProductList } from '../../components/products'
import { Box } from '@mui/system'

interface Props {
  products: IProduct[]
  foundProducts: boolean
  query: string
}
const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="Teslo Shop - Search"
      pageDescription="Find the best products here"
    >
      <Typography variant="h1" component="h1">
        Search product
      </Typography>

      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }}>
          Term: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            We haven't found any product
          </Typography>
          <Typography variant="h2" sx={{ ml: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <Typography variant="h2" sx={{ mb: 1 }}>
        {query}
      </Typography>

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
        permanent: true,
      },
    }
  }

  let products = await dbProducts.getProductsByTerm(query)

  const foundProducts = products.length > 0

  if (!foundProducts) {
    products = await dbProducts.getAllProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  }
}

export default SearchPage
