import { FC, ReactNode, useEffect, useReducer } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subTotal: number
  tax: number
  total: number
  shippingAddress?: ShippingAddress
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  address2?: string
  zip: string
  city: string
  country: string
  phone: string
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
}

interface Props {
  children: ReactNode
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []
      dispatch({
        type: '[Cart] - Load cart from cookies | storage',
        payload: cookieProducts,
      })
    } catch (error) {
      // catch just in case of cookie being altered by the client and it fails parsing
      dispatch({
        type: '[Cart] - Load cart from cookies | storage',
        payload: [],
      })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, currentItem) => currentItem.quantity + prev,
      0,
    )
    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0,
    )
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
  }, [state.cart])

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }

      dispatch({
        type: '[Cart] - Load address from cookies',
        payload: shippingAddress,
      })
    }
  }, [])

  const addProductToCart = (product: ICartProduct) => {
    //! alternative 1
    // dispatch({ type: '[Cart] - Add product', payload: product})

    //! alternative 2
    // const productsInCart = state.cart.filter(p => p._id !== product._id && p.size !== product.size)
    // dispatch({ type: '[Cart] - Add product', payload: [...productsInCart, product]})

    //! final solution
    const isProductInCart = state.cart.some((p) => p._id === product._id)
    if (!isProductInCart)
      return dispatch({
        type: '[Cart] - Add product',
        payload: [...state.cart, product],
      })

    const hasSameSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size,
    )
    if (!hasSameSize)
      return dispatch({
        type: '[Cart] - Add product',
        payload: [...state.cart, product],
      })

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity

      return p
    })

    dispatch({ type: '[Cart] - Add product', payload: updatedProducts })
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Update cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set('firstName', address.firstName)
    Cookie.set('lastName', address.lastName)
    Cookie.set('address', address.address)
    Cookie.set('address2', address.address2 || '')
    Cookie.set('zip', address.zip)
    Cookie.set('city', address.city)
    Cookie.set('country', address.country)
    Cookie.set('phone', address.country)

    dispatch({ type: '[Cart] - Update address', payload: address })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
