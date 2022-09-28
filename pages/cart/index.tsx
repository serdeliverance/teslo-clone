import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

export const CartPage = () => {
  return (
    <ShopLayout title='Cart - x' pageDescription='Shopping cart'>
        <Typography variant='h1' component='h1'>Cart</Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                {/* CartList */}
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Order</Typography>
                        <Divider></Divider>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}
