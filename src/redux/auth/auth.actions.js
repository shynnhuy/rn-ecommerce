import {
  CLEAR_ERROR,
  LOGIN,
  LOGOUT,
  REGISTER,
  SEND_REQUEST,
  UPDATE_INFO,
} from "./auth.constants";

export const sendRequest = () => ({
  type: SEND_REQUEST,
});
export const clearError = () => ({
  type: CLEAR_ERROR,
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

export const actionUpdateInfo = payload => ({
  type: UPDATE_INFO.PENDING,
  payload,
});
export const actionUpdateInfoSuccess = payload => ({
  type: UPDATE_INFO.SUCCESS,
  payload,
});
export const actionUpdateInfoError = error => ({
  type: UPDATE_INFO.ERROR,
  error,
});
