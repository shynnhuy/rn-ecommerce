import { api } from "./api";

export const queries = {
  getCategories: async () => {
    const { result } = await api.get("/products/categories");
    return result;
  },
  createProduct: async (newProduct) => {
    const { result } = await api.post("/products", newProduct);
    return result;
  },

  getAllOrders: async () => {
    const { result } = await api.get("/manager/orders");
    return result;
  },

  changeOrderStatus: async (_id, status) => {
    console.log(_id, status);
    const { result } = await api.patch(`/manager/orders/${_id}`, { status });
    return result;
  },

  getFormData: (object) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData()),
};
