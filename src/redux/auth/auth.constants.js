import {createActionSet} from "../../utils";

export const SEND_REQUEST = "auth/SEND_REQUEST";
export const CLEAR_ERROR = "auth/CLEAR_ERROR";

export const LOGIN = createActionSet("auth/LOGIN");
export const REGISTER = createActionSet("auth/REGISTER");
export const LOGOUT = createActionSet("auth/LOGOUT");
export const UPDATE_INFO = createActionSet("auth/UPDATE_INFO");
export const UPDATE_AVATAR = createActionSet("auth/UPDATE_AVATAR");

export const FETCH_ORDERS = createActionSet("auth/FETCH_ORDERS");
