import { put, fork, take, call, takeLatest } from "redux-saga/effects";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils";
import {
  actionLoginSuccess,
  actionRegisterSuccess,
  actionLogoutSuccess,
  sendRequest,
  sendError,
  actionLogout,
  actionUpdateAvatarSuccess,
  actionUpdateInfoSuccess,
  actionFetchOrdersSuccess,
  actionSavePushTokenSuccess,
} from "./auth.actions";
import {
  FETCH_ORDERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_AVATAR,
  UPDATE_INFO,
  UPDATE_PUSH_TOKEN,
} from "./auth.constants";
import {
  apiLogin,
  apiRegister,
  apiUpdateAvatar,
  apiUpdateInfo,
  apiFetchMyOrders,
  apiSavePushToken,
} from "./auth.services";

function* login(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiLogin, payload);
    // console.log(data.result);
    yield call(setAccessToken, data.result.accessToken);
    yield call(setRefreshToken, data.result.refreshToken);
    yield put(actionLoginSuccess(data.result));
  } catch (error) {
    yield put(sendError(error.message));
    yield put(actionLogout());
  }
}

function* logout() {
  try {
    yield put(sendRequest());
    yield call(removeAccessToken);
    yield put(actionLogoutSuccess());
  } catch (error) {
    yield put(sendError());
  }
}

function* register(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiRegister, payload);
    yield call(setAccessToken, data.result.accessToken);
    yield call(setRefreshToken, data.result.refreshToken);
    yield put(actionRegisterSuccess(data.result));
  } catch (error) {
    yield put(sendError(error.message));
  }
}

function* updateInfo(payload) {
  try {
    yield put(sendRequest());
    const data = yield call(apiUpdateInfo, payload);
    yield put(actionUpdateInfoSuccess(data.result));
    toast.show(data.message, { type: "success" });
  } catch (error) {
    yield put(sendError(error.message));
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
    yield put(sendError(error.message));
  }
}
function* fetchOrders({ cb }) {
  try {
    yield put(sendRequest());
    const data = yield call(apiFetchMyOrders);
    // console.log(data);
    yield put(actionFetchOrdersSuccess(data.result));
    if (cb) {
      cb();
    }
  } catch (error) {
    yield put(sendError(error.result));
  }
}

function* savePushToken(payload) {
  try {
    console.log("SAGA PUSH TOKEN: ", payload);
    yield put(sendRequest());
    yield call(apiSavePushToken, payload);
    // console.log(data);
    yield put(actionSavePushTokenSuccess(payload));
  } catch (error) {
    yield put(sendError(error));
  }
}

function* loginFlow() {
  while (true) {
    // const token = yield call(getAccessToken);
    // if (!Boolean(token)) {
    const { payload } = yield take(LOGIN.PENDING);
    yield call(login, payload);
    // } else {
    //   yield call(logout);
    // }
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

function* logoutFlow() {
  while (true) {
    yield take(LOGOUT.PENDING);
    yield call(logout);
  }
}

function* updateInfoFlow() {
  while (true) {
    const { payload } = yield take(UPDATE_INFO.PENDING);
    yield fork(updateInfo, payload);
  }
}

function* updateAvatarFlow() {
  yield takeLatest(UPDATE_AVATAR.PENDING, uploadAvatar);
}

function* fetchMyOrders() {
  yield takeLatest(FETCH_ORDERS.PENDING, fetchOrders);
}

function* savePushTokenFlow() {
  while (true) {
    const { payload } = yield take(UPDATE_PUSH_TOKEN.PENDING);
    yield fork(savePushToken, payload);
  }
}

export function* authSaga() {
  yield fork(loginFlow);
  yield fork(registerFlow);
  yield fork(logoutFlow);
  yield fork(updateInfoFlow);
  yield fork(updateAvatarFlow);
  yield fork(fetchMyOrders);
  yield fork(savePushTokenFlow);
}
