import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {productReducer} from "./product";

export const rootReducer = combineReducers({
  auth: authReducer,
  shop: productReducer,
});
