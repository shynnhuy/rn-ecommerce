import {createActionSet} from "../../utils";

export const SEND_REQUEST = "auth/SEND_REQUEST";

export const LOGIN = createActionSet("auth/LOGIN");
export const REGISTER = createActionSet("auth/REGISTER");
export const LOGOUT = createActionSet("auth/LOGOUT");
