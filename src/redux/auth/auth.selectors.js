import { createSelector } from "reselect";

export const authSelector = (state) => state.auth;
export const tokenSelector = (state) => state.auth.token;
export const userSelector = (state) => state.auth.user;

export const isAdminSelector = createSelector(
  userSelector,
  (user) => user.role === "Admin"
);
