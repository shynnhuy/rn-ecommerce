import {all} from "redux-saga/effects";
import {authSaga} from "./auth";
import {productSaga} from "./product";

export function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
