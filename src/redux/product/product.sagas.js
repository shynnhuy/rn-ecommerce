import {call, fork, takeLatest, put} from "@redux-saga/core/effects";
import {
  actionFetchProductsError,
  actionFetchProductsSuccess,
} from "./product.actions";
import {FETCH_PRODUCTS} from "./product.constants";
import {apiGetProducts} from "./product.services";

function* fetchProducts() {
  try {
    const data = yield call(apiGetProducts);
    yield put(actionFetchProductsSuccess(data.result));
  } catch (error) {
    yield put(actionFetchProductsError(error.message));
  }
}

function* fetchProductsFlow() {
  yield takeLatest(FETCH_PRODUCTS.PENDING, fetchProducts);
}

export function* productSaga() {
  yield fork(fetchProductsFlow);
}
