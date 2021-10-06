import { api } from "./api";

export const queries = {
  getCategories: async () => {
    const { result } = await api.get("/products/categories");
    return result;
  },
};
