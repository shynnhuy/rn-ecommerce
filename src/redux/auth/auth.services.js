import { api } from "../../api";

const createFormData = (photo) => {
  const data = new FormData();

  data.append("image", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.replace("file://", "") : photo,
  });
  return data;
};

export const apiRegister = ({ email, password }) =>
  api.post("/auth/register", { email, password });

export const apiLogin = ({ email, password }) =>
  api.post("/auth/login", { email, password });

export const apiUpdateInfo = (data) => api.patch("/auth", data);

export const apiUpdateAvatar = (data) =>
  api.patch("/auth/avatar", createFormData(data));

export const apiFetchMyOrders = () => api.get("/order/user");
