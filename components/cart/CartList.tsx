import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { initialData } from "../../database/products"
import NextLink from 'next/link'
import { ItemCounter } from "../ui"
import { IProduct } from "../../interfaces"

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList= () => {
  return (
    <>
        {
            productsInCart.map( product => {
              <Grid container spacing={2} sx={{mb: 1}} key={product.slug}>
                <Grid item xs={3}>
                  <NextLink href='/products/slug'>
                    <Link>
                      <CardActionArea>
                        <CardMedia 
                          image={`products/${product.images[0]}`}
                          component='img'
                          sx={{ borderRadius: '5px'}}
                        />
                      </CardActionArea>
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item xs={7}>
                  <Box display='flex' flexDirection='column'>
                    <Typography variant="body1">{product.title}</Typography>
                    <Typography variant="body1">Size: <strong>M</strong></Typography>

                    {/* Conditional */}
                    <ItemCounter />
                  </Box>
                </Grid>
                <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                  <Typography variant='subtitle1'>${product.price}</Typography>
                  {/* Editable */}
                  <Button variant="text" color="secondary">Remove</Button>
                </Grid>
              </Grid>
            })
        }
    </>
  )
}