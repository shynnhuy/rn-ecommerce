import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { productSaga } from "./shop";

export function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
