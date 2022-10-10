import { ICartProduct } from '../../interfaces'
import { CartState } from './CartProvider'

type CartAction =
  | {
      type: '[Cart] - Load cart from cookies | storage'
      payload: ICartProduct[]
    }
  | { type: '[Cart] - Add product'; payload: ICartProduct[] }
  | { type: '[Cart] - Update cart quantity'; payload: ICartProduct }
export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart from cookies | storage':
      return {
        ...state,
        cart: action.payload,
      }
    case '[Cart] - Add product':
      return {
        ...state,
        cart: [...action.payload],
      }
    case '[Cart] - Update cart quantity':
      return {
        ...state,
        cart: state.cart.map( product => {
          if ( product._id !== action.payload._id) return product
          if ( product.size !== action.payload.size) return product
          return action.payload
        })
      }
    default:
      return state
  }
}
