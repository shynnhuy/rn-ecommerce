import {FETCH_PRODUCTS} from "./product.constants";

export const actionFetchProducts = () => ({
  type: FETCH_PRODUCTS.PENDING,
});
export const actionFetchProductsSuccess = payload => ({
  type: FETCH_PRODUCTS.SUCCESS,
  payload,
});
export const actionFetchProductsError = error => ({
  type: FETCH_PRODUCTS.ERROR,
  error,
});
