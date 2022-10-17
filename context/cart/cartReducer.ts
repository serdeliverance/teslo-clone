import { ICartProduct } from '../../interfaces'
import { CartState, ShippingAddress } from './CartProvider'

type CartAction =
  | {
      type: '[Cart] - Load cart from cookies | storage'
      payload: ICartProduct[]
    }
  | { type: '[Cart] - Add product'; payload: ICartProduct[] }
  | { type: '[Cart] - Update cart quantity'; payload: ICartProduct }
  | { type: '[Cart] - Remove product in cart'; payload: ICartProduct }
  | {
      type: '[Cart] - Update order summary'
      payload: {
        numberOfItems: number
        subTotal: number
        tax: number
        total: number
      }
    }
  | {
      type: '[Cart] - Load address from cookies'
      payload: ShippingAddress
    }
export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
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
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product
          if (product.size !== action.payload.size) return product
          return action.payload
        }),
      }
    case '[Cart] - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter(
          (p) =>
            !(p._id === action.payload._id && p.size === action.payload.size),
        ),
      }
    case '[Cart] - Update order summary':
      return {
        ...state,
        ...action.payload,
      }
    case '[Cart] - Load address from cookies':
      return {
        ...state,
        shippingAddress: action.payload,
      }
    default:
      return state
  }
}
