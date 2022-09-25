import { Box, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../components/layouts'

const ErrorPage = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='There is not content to show here'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            flexDirection={{ xs: 'column', sm: 'row' }}
        >
            <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2}>No page found</Typography>
        </Box>
    </ShopLayout>
  )
}

export default ErrorPage
