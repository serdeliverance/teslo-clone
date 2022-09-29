import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

const AddressPage = () => {
  return (
    <ShopLayout title='Address' pageDescription='Confirm destiny direction'>
        <Typography variant='h1' component='h1'>Address</Typography>

        <Grid container spacing={2} sx={{mt: 2}}>
            <Grid item xs={12} sm={6}>
                <TextField label='Name' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='LastName' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Post Code' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='City' variant='filled' fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select variant='filled' label='Country' value={1}>
                        <MenuItem value={1}>Argentina</MenuItem>
                        <MenuItem value={2}>Brazil</MenuItem>
                        <MenuItem value={3}>Uruguay</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField label='Phone' variant='filled' fullWidth />
            </Grid>
        </Grid>

        <Box sx={{mt:5}} display='flex' justifyContent='center'>
            <Button color='secondary' className='circular-btn' size='large'>
                Review order
            </Button>
        </Box>
    </ShopLayout>
  )
}

export default AddressPage