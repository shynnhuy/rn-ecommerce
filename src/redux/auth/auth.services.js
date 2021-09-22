import {api} from "../../api";

export const apiRegister = ({email, password}) =>
  api.post("/auth/register", {email, password});

export const apiLogin = ({email, password}) =>
  api.post("/auth/login", {email, password});
