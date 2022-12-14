import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context'
import { countries } from '../../utils'

type FormData = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string
  phone: string
}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage = () => {
  const router = useRouter()

  const { updateAddress } = useContext(CartContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  })

  const onSubmitAddress = (data: FormData) => {
    updateAddress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title="Address" pageDescription="Confirm destiny direction">
      <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant="h1" component="h1">
          Address
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'This field is required',
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LastName"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is required',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address2"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'This field is required',
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Post Code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'This field is required',
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'This field is required',
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <TextField
                select
                variant="filled"
                label="Country"
                defaultValue={Cookies.get('city') || countries[0].code}
                {...register('country', {
                  required: 'This field is required',
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'This field is required',
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

// import { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//   const { token = '' } = req.cookies

//   let isValidToken

//   try {
//     await jwt.isValidToken(token)
//     isValidToken = true
//   } catch (error) {
//     isValidToken = false
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {

//     }
//   }
// }

export default AddressPage
