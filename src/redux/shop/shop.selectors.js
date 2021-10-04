import { createSelector } from "reselect";

export const selectShop = (state) => state.shop;
export const selectCart = (state) => state.shop.cart;

export const selectFilteredProducts = (state) => state.shop.filteredProducts;
