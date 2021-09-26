import {FETCH_PRODUCTS, SEND_REQUEST} from "./shop.constants";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const shopReducer = (
  state = initialState,
  {type, payload, error},
) => {
  switch (type) {
    case SEND_REQUEST:
      return {...state, loading: true};

    case FETCH_PRODUCTS.SUCCESS:
      return {...state, products: payload, error: null};
    case FETCH_PRODUCTS.ERROR:
      return {...state, error};

    default:
      return state;
  }
};
