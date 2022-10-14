import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validation } from '../../utils'
import { tesloApi } from '../../api'
import { ErrorOutlined } from '@mui/icons-material'

type FormData = {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false)

    try {
      const { data } = await tesloApi.post('/user/login', { email, password })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }

    // TODO navigate to the page the user was before authentication
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Login
              </Typography>
              <Chip
                label="User or password invalid"
                color="error"
                icon={<ErrorOutlined />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                  validate: validation.isEmail,
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" passHref>
                <Link underline="always">Don't you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
