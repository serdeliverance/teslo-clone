import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title='Order summary' pageDescription='Order summary'>
        <Typography variant='h1' component='h1'>Order: abc123</Typography>

        {/* <Chip
            sx={{my: 2}}
            label='Pending'
            variant='outlined'
            color='error'
            icon = {<CreditCardOffOutlined/>}
        /> */}

        <Chip
            sx={{my: 2}}
            label='Payed'
            variant='outlined'
            color='success'
            icon = {<CreditScoreOutlined/>}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Summary (3 products)</Typography>
                        <Divider sx={{my: 1}} />
                        
                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Delivery address</Typography>
                            <NextLink href='/checkout/address'>
                                <Link underline='always'>
                                    Edit
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography>John Doe</Typography>
                        <Typography>123 Fake Street</Typography>
                        <Typography>xxxx</Typography>
                        <Typography>Canada</Typography>
                        <Typography>+1 123123</Typography>

                        <Divider sx={{my: 1}} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart'>
                                <Link underline='always'>
                                    Edit
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3}}>
                            {/* TODO */}
                            <h1>Pay</h1>
                        </Box>

                        <Chip
                            sx={{my: 2}}
                            label='Payed'
                            variant='outlined'
                            color='success'
                            icon = {<CreditScoreOutlined/>}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage