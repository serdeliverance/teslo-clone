import { Box, Button, Grid, Typography, Chip } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { initialData } from '../../database/products'

const product = initialData.products[0]

const ProductsPage = () => {
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

export default ProductsPage