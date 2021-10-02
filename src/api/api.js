import axios from "axios";
import { getAccessToken } from "../utils";

const baseURL = "http://192.168.1.113:5000/api/v1";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    // console.log(token);
    if (Boolean(token)) {
      //   if (!isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
      //   } else {
      //     console.log("REFRESH");
      //     const refreshToken = await getRefreshToken();

      //     if (Boolean(refreshToken)) {
      //       const newToken = await handleRefresh(refreshToken);
      //       if (newToken && newToken.status === 200) {
      //         await setAccessToken(newToken.accessToken);
      //         await setRefreshToken(newToken.refreshToken);

      //         config.headers.Authorization = `Bearer ${newToken.accessToken}`;
      //         return config;
      //       }
      //     }
      //   }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error.response.data)
);

export { api };
