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
      return {
        data: res.data,
        success: true,
        message: "Product created successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.response.data.message,
      };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products/");
      const data = res.data.data;
      set({ products: data });
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      }
      if (res.data.success) {
        console.log("day la re.sdata");
        console.log(res.data);
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        }));
        return {
          success: true,
          message: res.data.message,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
}));
