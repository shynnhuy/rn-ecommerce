import axios from "axios";

const baseURL = "http://192.168.1.113:5000/api/v1";

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => Promise.reject(error.response.data),
);

export {api};
