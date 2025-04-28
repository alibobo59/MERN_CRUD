import axios from "axios";
import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.price || !newProduct.image || !newProduct.name) {
      return {
        success: false,
        message: "please fill all the fields",
      };
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/products/",
        newProduct
      );
      set((state) => ({
        products: [...state.products, res.data],
      }));
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }
  },
}));
