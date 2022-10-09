import { stat } from 'fs'
import { FC, ReactNode, useReducer } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
}

interface Props {
  children: ReactNode
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: ICartProduct ) => {
    //! alternative 1
    // dispatch({ type: '[Cart] - Add product', payload: product})

    //! alternative 2
    // const productsInCart = state.cart.filter(p => p._id !== product._id && p.size !== product.size)
    // dispatch({ type: '[Cart] - Add product', payload: [...productsInCart, product]})

    //! final solution
    const isProductInCart = state.cart.some( p => p._id === product._id )
    if ( !isProductInCart ) return dispatch({ type: '[Cart] - Add product', payload: [...state.cart, product]})

    const hasSameSize = state.cart.some( p => p._id === product._id && p.size === product.size )
    if ( !hasSameSize ) return dispatch({ type: '[Cart] - Add product', payload: [...state.cart, product]})

    const updatedProducts = state.cart.map( p => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p

      p.quantity += product.quantity

      return p
    })

    dispatch({ type: '[Cart] - Add product', payload: updatedProducts })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
