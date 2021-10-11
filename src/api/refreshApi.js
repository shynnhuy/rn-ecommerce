import axios from "axios";
import { removeAccessToken, removeRefreshToken } from "~app/utils";

const baseURL = "http://192.168.1.94:5000/api/v1";
export const axiosServiceRefresh = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosServiceRefresh.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config } = error;
    if (config.url === "/auth/refresh") {
      await removeRefreshToken();
      await removeAccessToken();
      console.log("REFRESH ERROR");
      return new Promise.reject(error);
    }
  }
);

export const handleRefresh = (refreshToken) =>
  axiosServiceRefresh.post("/auth/refresh", { refreshToken });
