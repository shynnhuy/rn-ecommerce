import { createActionSet } from "../../utils";

export const SEND_REQUEST = "shop/SEND_REQUEST";

export const FETCH_PRODUCTS = createActionSet("shop/FETCH_PRODUCTS");

export const ADD_TO_CART = "shop/ADD_TO_CART";
export const REMOVE_FROM_CART = "shop/REMOVE_FROM_CART";
export const EMPTY_CART = "shop/EMPTY_CART";
