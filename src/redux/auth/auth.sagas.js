import { put, fork, take, call, takeLatest } from "redux-saga/effects";
import { getAccessToken, removeAccessToken, setAccessToken } from "../../utils";
import {
  actionLoginError,
  actionLoginSuccess,
  actionRegisterSuccess,
  actionRegisterError,
  actionLogoutSuccess,
  actionLogoutError,
  sendRequest,
  actionLogout,
  actionUpdateAvatarError,
  actionUpdateAvatarSuccess,
  actionUpdateInfoError,
  actionUpdateInfoSuccess,
} from "./auth.actions";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_AVATAR,
  UPDATE_INFO,
} from "./auth.constants";
import {
  apiLogin,
  apiRegister,
  apiUpdateAvatar,
  apiUpdateInfo,
} from "./auth.services";

function* login(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiLogin, payload);
    yield call(setAccessToken, data.result.token);
    yield put(actionLoginSuccess(data.result));
  } catch (error) {
    yield put(actionLoginError(error.message));
    yield put(actionLogout());
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
    yield call(setAccessToken, data.result.token);
    yield put(actionRegisterSuccess(data.result));
  } catch (error) {
    yield put(actionRegisterError(error.message));
  }
}

function* updateInfo(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiUpdateInfo, payload);
    yield put(actionUpdateInfoSuccess(data.result));
    toast.show(data.message, { type: "success" });
  } catch (error) {
    yield put(actionUpdateInfoError(error.message));
    toast.show(error.message, { type: "danger" });
  }
}

function* uploadAvatar({ payload }) {
  try {
    console.log(payload);
    yield put(sendRequest());
    const data = yield call(apiUpdateAvatar, payload);
    yield put(actionUpdateAvatarSuccess(data.result));
    toast.show(data.message, { type: "success" });
  } catch (error) {
    yield put(actionUpdateAvatarError(error.message));
  }
}

function* loginFlow() {
  while (true) {
    // const token = yield call(getAccessToken);
    // if (!Boolean(token)) {
    const { payload } = yield take(LOGIN.PENDING);
    yield call(login, payload);
    // }
    // yield take(LOGIN.PENDING);
    // yield call(login, payload);
  }
}

function* registerFlow() {
  while (true) {
    const token = yield call(getAccessToken);
    if (!Boolean(token)) {
      const { payload } = yield take(REGISTER.PENDING);
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

export function* updateInfoFlow() {
  while (true) {
    const { payload } = yield take(UPDATE_INFO.PENDING);
    yield fork(updateInfo, payload);
  }
}

export function* updateAvatarFlow() {
  yield takeLatest(UPDATE_AVATAR.PENDING, uploadAvatar);
}

export function* authSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(logoutFlow);
  yield fork(updateInfoFlow);
  yield fork(updateAvatarFlow);
}
