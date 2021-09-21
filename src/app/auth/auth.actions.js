import {LOGIN} from "./auth.constants";

export const actionLogin = ({email, password}) => ({
  type: LOGIN.PENDING,
  payload: {email, password},
});
export const actionSuccess = payload => ({
  type: LOGIN.SUCCESS,
  payload,
});
export const actionLoginError = error => ({
  type: LOGIN.ERROR,
  error,
});
