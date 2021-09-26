import { ADD_TO_CART, FETCH_PRODUCTS } from "./shop.constants";

export const actionFetchProducts = () => ({
  type: FETCH_PRODUCTS.PENDING,
});
export const actionFetchProductsSuccess = (payload) => ({
  type: FETCH_PRODUCTS.SUCCESS,
  payload,
});
export const actionFetchProductsError = (error) => ({
  type: FETCH_PRODUCTS.ERROR,
  error,
});

export const actionAddToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});
