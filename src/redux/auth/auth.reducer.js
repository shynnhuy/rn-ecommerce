import {
  CLEAR_ERROR,
  FETCH_ORDERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  SEND_REQUEST,
  UPDATE_AVATAR,
  UPDATE_INFO,
  UPDATE_PUSH_TOKEN,
} from "./auth.constants";

const initialState = {
  loading: false,
  token: null,
  error: null,
  user: null,
  orders: [],
};

export const authReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case SEND_REQUEST:
      return { ...state, loading: true };
    case CLEAR_ERROR:
      return { ...state, loading: false, error: null };

    case LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.accessToken,
        user: payload.user,
        error: null,
      };
    case LOGIN.ERROR:
      return { ...state, loading: false, error };

    case REGISTER.SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.accessToken,
        user: payload.user,
        error: null,
      };
    case REGISTER.ERROR:
      return { ...state, loading: false, error };

    case LOGOUT.SUCCESS:
      return { ...state, loading: false, token: null, user: null };
    case LOGOUT.ERROR:
      return { ...state, loading: false, error };

    case UPDATE_INFO.SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, ...payload },
        error: null,
      };
    case UPDATE_INFO.ERROR:
      return { ...state, loading: false, error };

    case UPDATE_AVATAR.SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, avatar: payload },
        error: null,
      };
    case UPDATE_AVATAR.ERROR:
      return { ...state, loading: false, error };

    case FETCH_ORDERS.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        error: null,
      };
    case FETCH_ORDERS.ERROR:
      return { ...state, loading: false, error };

    case UPDATE_PUSH_TOKEN.SUCCESS: {
      console.log("SUCCESS PUSH")
      return {
        ...state,
        loading: false,
        user: { ...state.user, pushToken: payload },
        error: null,
      };
    }
    case UPDATE_PUSH_TOKEN.ERROR:
      return { ...state, loading: false, error };

    default:
      return state;
  }
};
