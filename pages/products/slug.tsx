import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { initialData } from '../../database/products'

const product = initialData.products[0]

const ProductsPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={ product.description }>
        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* Slideshow */}
            </Grid>

            <Grid item xs={12} sm={5}>
                <Box display='flex' flexDirection='column'>
                    {/* title */}
                    <Typography variant='h1' component='h1'> { product.title } </Typography>
                    <Typography variant='subtitle1' component='h2'> ${ product.price } </Typography>
                </Box>

                <Box sx={{my: 2}}>
                    <Typography variant='subtitle2'>Quantity</Typography>
                </Box>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default ProductsPage