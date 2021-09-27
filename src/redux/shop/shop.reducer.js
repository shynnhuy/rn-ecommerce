import {
  ADD_TO_CART,
  EMPTY_CART,
  FETCH_PRODUCTS,
  REMOVE_FROM_CART,
  SEND_REQUEST,
} from "./shop.constants";
import { addToCart, removeFromCart } from "./shop.utils";

const initialState = {
  loading: false,
  products: [],
  cart: [],
  error: null,
};

export const shopReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case SEND_REQUEST:
      return { ...state, loading: true };

    case FETCH_PRODUCTS.SUCCESS:
      return { ...state, products: payload, error: null };
    case FETCH_PRODUCTS.ERROR:
      return { ...state, error };

    case ADD_TO_CART: {
      const newCart = addToCart(state.cart, payload);
      return { ...state, cart: newCart };
    }

    case REMOVE_FROM_CART: {
      const newCart = removeFromCart(state.cart, payload);
      return { ...state, cart: newCart };
    }
    case EMPTY_CART: {
      return { ...state, cart: [] };
    }

    default:
      return state;
  }
};

export const selectCartCount = (state) =>
  state.shop.cart.reduce((acc, cur) => acc + cur.amount, 0);

export const selectCartTotal = (state) =>
  state.shop.cart.reduce((acc, cur) => acc + cur.amount * cur.price.new, 0);
