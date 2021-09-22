import {LOGIN, LOGOUT, REGISTER, SEND_REQUEST} from "./auth.constants";

export const sendRequest = () => ({
  type: SEND_REQUEST,
});

export const actionLogin = ({email, password}) => ({
  type: LOGIN.PENDING,
  payload: {email, password},
});
export const actionLoginSuccess = payload => ({
  type: LOGIN.SUCCESS,
  payload,
});
export const actionLoginError = error => ({
  type: LOGIN.ERROR,
  error,
});

export const actionRegister = ({email, password}) => ({
  type: REGISTER.PENDING,
  payload: {email, password},
});
export const actionRegisterSuccess = payload => ({
  type: REGISTER.SUCCESS,
  payload,
});
export const actionRegisterError = error => ({
  type: REGISTER.ERROR,
  error,
});

export const actionLogout = () => ({
  type: LOGOUT.PENDING,
});
export const actionLogoutSuccess = () => ({
  type: LOGOUT.SUCCESS,
});
export const actionLogoutError = error => ({
  type: LOGOUT.ERROR,
  error,
});
