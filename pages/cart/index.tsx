import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CartContext, cartReducer } from '../../context'

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext)

  const router = useRouter()

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, cart, router])

  if (!isLoaded || cart.length === 0) {
    return <></> // to show empty page while loading
  }

  return (
    <ShopLayout title="Cart - x" pageDescription="Shopping cart">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList isEditable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage
