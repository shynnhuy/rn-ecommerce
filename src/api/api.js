import axios from "axios";
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils";
import { handleRefresh } from "./refreshApi";

const baseURL = "http://192.168.1.113:5000/api/v1";

const api = axios.create({
  baseURL,
});

let refreshTokenRequest = null;
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    // console.log(token);
    if (Boolean(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
      // console.log(isTokenExpired(token));
      // if (!isTokenExpired(token)) {
      //   config.headers.Authorization = `Bearer ${token}`;
      //   return config;
      // } else {
      //   console.log("NEED REFRESH");
      //   const refreshToken = await getRefreshToken();
      //   console.log(refreshToken);

      //   refreshTokenRequest = refreshTokenRequest
      //     ? refreshTokenRequest
      //     : refreshToken(url);
      //     if (Boolean(refreshToken)) {
      //       const newToken = await handleRefresh(refreshToken);
      //       if (newToken && newToken.status === 200) {
      //         await setAccessToken(newToken.accessToken);
      //         await setRefreshToken(newToken.refreshToken);
      //         config.headers.Authorization = `Bearer ${newToken.accessToken}`;
      //         return config;
      //       }
      //     }
      // }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    // console.log(error.response);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (error.config.url === "/auth/refreshToken") {
        await removeRefreshToken();
        await removeAccessToken();
        console.log("REFRESH ERROR");
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      try {
        const refreshToken = await getRefreshToken();
        // console.log(refreshToken);
        const { data } = await handleRefresh(refreshToken);

        await setAccessToken(data.result?.accessToken);
        await setRefreshToken(data.result?.refreshToken);

        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.result?.accessToken}`;

        // return axios(originalRequest);

        return new Promise((resolve, reject) =>
          api(originalRequest)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.response.data))
        );
      } catch (error) {
        // console.log(error);
        return Promise.reject(error.response.data);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export { api };
