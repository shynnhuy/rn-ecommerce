import {combineReducers} from "redux";
import {authReducer} from "./auth";
import {shopReducer} from "./shop";

export const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
});
