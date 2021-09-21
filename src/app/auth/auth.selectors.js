import {createSelector} from "reselect";

export const authSelector = state => state.auth;
export const tokenSelector = state => state.auth.token;

// export const isLoggedIn = createSelector()
