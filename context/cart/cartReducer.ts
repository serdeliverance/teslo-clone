import { ICartProduct } from '../../interfaces'
import { CartState } from './CartProvider'

type CartAction =
  | {
      type: '[Cart] - Load cart from cookies | storage'
      payload: ICartProduct[]
    }
  | { type: '[Cart] - Add product'; payload: ICartProduct }
export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case '[Cart] - Load cart from cookies | storage':
      return {
        ...state,
      }
    default:
      return state
  }
}
