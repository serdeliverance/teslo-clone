import { Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { ShopLayout } from '../../components/layouts'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Fullname', width: 300}
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