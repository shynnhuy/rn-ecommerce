import { createSelector } from "reselect";

export const selectShop = (state) => state.shop;
export const selectCart = (state) => state.shop.cart;