import axios from "axios";

const baseURL = "http://192.168.1.113:5000/api/v1";
export const axiosServiceRefresh = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const handleRefresh = (refreshToken) =>
  axiosServiceRefresh.post("/auth/refresh", { refreshToken });
