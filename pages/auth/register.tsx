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
  name: string
  email: string
  password: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const [showError, setShowError] = useState(false)

  const orRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false)

    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      })
      const { token, user } = data
      console.log({ token, user })
    } catch (error) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
    }
  }

  return (
    <AuthLayout title="Login">
      <form noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create account
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
                label="Fullname"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'This field is required',
                  minLength: { value: 2, message: 'Min 2 characters' },
                  validate: validation.isEmail,
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">Don you have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
