import {FETCH_PRODUCTS, SEND_REQUEST} from "./product.constants";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const productReducer = (
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
