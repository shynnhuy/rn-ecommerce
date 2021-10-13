import { createSelector } from "reselect";

export const authSelector = (state) => state.auth;
export const tokenSelector = (state) => state.auth.token;
export const userSelector = (state) => state.auth.user;

export const isAdminSelector = createSelector(
  userSelector,
  (user) => user?.role === "Admin"
);

export const selectOrderByStatus = createSelector(
  (state) => state.auth.orders,
  (_, status) => status,
  (orders, status) => orders.filter((order) => order.status === status)
);
