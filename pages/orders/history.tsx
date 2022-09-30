import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Fullname', width: 300},
    {
        field: 'paid', 
        headerName: 'Pay',
        description: 'Information about the order payment status',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='paid' variant='outlined'/>
                    : <Chip color='error' label='not paid' variant='outlined'/>
            )
        }
    },
    {
        field: 'order', 
        headerName: 'See order',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        See order
                    </Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    { id: 1, fullname: 'Pepo Mendoza'},
    { id: 2, fullname: 'Pepo Mendoza'},
    { id: 3, fullname: 'Pepo Mendoza'},
    { id: 4, fullname: 'Pepo Mendoza'},
    { id: 5, fullname: 'Pepo Mendoza'},
    { id: 6, fullname: 'Pepo Mendoza'},
    { id: 7, fullname: 'Pepo Mendoza'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Order History' pageDescription='Order history page'>
        <Typography variant='h1' component='h1'>Order history</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%'}}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage