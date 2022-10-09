import { Box, Button, Grid, Typography, Chip } from '@mui/material'
import React, { FC, useContext, useState } from 'react'
import { ShopLayout } from '../../components/layouts'
import { ItemCounter } from '../../components/ui'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { GetStaticPaths } from 'next'
interface Props {
  product: IProduct
}

const ProductsPage: FC<Props> = ({ product }) => {
  const router = useRouter()

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size,
    })
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity,
    })
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    addProductToCart(tempCartProduct)
    router.push('/cart')
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* title */}
            <Typography variant="h1" component="h1">
              {' '}
              {product.title}{' '}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {' '}
              ${product.price}{' '}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
                onUpdateQuantity={onUpdateQuantity}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectSize={onSelectedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size ? 'Add to cart' : 'Select a size'}
              </Button>
            ) : (
              <Chip label="Not available" color="error" variant="outlined" />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// Don't use SSR here... because that way we are generating the full page with every request

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const { slug } = params as { slug: string }
//     const product = await dbProducts.getProductBySlug(slug)

//     if ( !product ) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

// Better to use SSG

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CartContext, CartProvider } from '../../context'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }

  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  }
}

export default ProductsPage
