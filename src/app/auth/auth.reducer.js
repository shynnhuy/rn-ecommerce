import {LOGIN} from "./auth.constants";

const initialState = {
  loading: false,
  token: null,
  error: null,
};

export const authReducer = (state = initialState, {type, payload, error}) => {
  switch (type) {
    case LOGIN.PENDING:
      return {...state, loading: true};
    case LOGIN.SUCCESS:
      return {...state, loading: false, token: payload};
    case LOGIN.ERROR:
      return {...state, loading: false, error};
    default:
      return state;
  }
};
