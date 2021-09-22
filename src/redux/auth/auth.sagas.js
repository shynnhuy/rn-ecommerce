import {put, fork, take, call} from "redux-saga/effects";
import {getAccessToken, removeAccessToken} from "../../utils";
import {
  actionLoginError,
  actionLoginSuccess,
  actionRegisterSuccess,
  actionRegisterError,
  actionLogoutSuccess,
  actionLogoutError,
  sendRequest,
} from "./auth.actions";
import {LOGIN, LOGOUT, REGISTER} from "./auth.constants";
import {apiLogin, apiRegister} from "./auth.services";

function* login(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiLogin, payload);
    yield put(actionLoginSuccess(data.result));
  } catch (error) {
    yield put(actionLoginError(error.message));
  }
}

function* logout() {
  try {
    yield put(sendRequest());
    yield call(removeAccessToken);
    yield put(actionLogoutSuccess());
  } catch (error) {
    yield put(actionLogoutError());
  }
}

function* register(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiRegister, payload);
    yield put(actionRegisterSuccess(data.result));
  } catch (error) {
    yield put(actionRegisterError(error.message));
  }
}

function* loginFlow() {
  while (true) {
    const token = yield call(getAccessToken);
    if (!Boolean(token)) {
      const {payload} = yield take(LOGIN.PENDING);
      yield call(login, payload);
    }
  }
}

function* registerFlow() {
  while (true) {
    const token = yield call(getAccessToken);
    if (!Boolean(token)) {
      const {payload} = yield take(REGISTER.PENDING);
      yield fork(register, payload);
    }
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(LOGOUT.PENDING);
    yield call(logout);
  }
}

export function* authSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(logoutFlow);
}
