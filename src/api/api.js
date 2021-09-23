import axios from "axios";
import {getAccessToken} from "../utils";

const baseURL = "http://192.168.1.113:5000/api/v1";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (Boolean(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => Promise.reject(error.response.data),
);

export {api};
