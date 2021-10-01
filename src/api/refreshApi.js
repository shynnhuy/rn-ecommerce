import axios from "axios";

const axiosServiceRefresh = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export const handleRefresh = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    axiosServiceRefresh
      .post("/auth/refresh", { refreshToken })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};
