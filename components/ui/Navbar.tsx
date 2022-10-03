import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

export const Navbar = () => {

    const { asPath } = useRouter()

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6'>Teslo</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ asPath === '/category/men' ? 'primary' : 'info' }>Men</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ asPath === '/category/women' ? 'primary' : 'info' }>Women</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kids' passHref>
                    <Link>
                        <Button color={ asPath === '/category/kid' ? 'primary' : 'info' }>Kids</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1} />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={5} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
