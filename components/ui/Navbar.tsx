import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useContext } from 'react'
import NextLink from 'next/link'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { CartContext, UIContext } from '../../context'

export const Navbar = () => {
  const { asPath } = useRouter()

  const { toggleSideMenu } = useContext(UIContext)
  const { numberOfItems } = useContext(CartContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men" passHref>
            <Link>
              <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
                Kid
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}
