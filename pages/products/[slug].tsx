import { Box, Button, Grid, Typography, Chip } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { initialData } from '../../database/products'
import { IProduct } from '../../interfaces'
import { GetServerSideProps } from 'next'
import { dbProducts } from '../../database'

interface Props {
    product: IProduct
}

const ProductsPage: FC<Props> = ({ product }) => {    

  return (
    <ShopLayout title={product.title} pageDescription={ product.description }>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <ProductSlideshow images={product.images} />
            </Grid>

            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection='column'>
                    {/* title */}
                    <Typography variant='h1' component='h1'> { product.title } </Typography>
                    <Typography variant='subtitle1' component='h2'> ${ product.price } </Typography>

                    <Box sx={{my: 2}}>
                        <Typography variant='subtitle2'>Quantity</Typography>
                        <ItemCounter />
                        <SizeSelector sizes={product.sizes} />
                    </Box>

                    <Button color='secondary' className='circular-btn'>
                        Add to Cart
                    </Button>

                    {/* <Chip label='Not available' color='error' variant='outlined' /> */}

                    <Box sx={{ mt: 3}}>
                        <Typography variant='subtitle2'>Description</Typography>
                        <Typography variant='body2'>{product.description}</Typography>
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

// TODO getStaticProps...
// blocking

// TODO getStaticProps...
// revalidate every 24hs

export default ProductsPage