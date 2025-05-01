import axios from "axios";
import { create } from "zustand";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        `${API_BASE_URL}/products/`, // Use environment variable
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
        message: err.response?.data?.message || "An error occurred",
      };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products/`); // Use environment variable
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
        `${API_BASE_URL}/products/${id}` // Use environment variable
      );

      if (!res.data.success) {
        return {
          success: false,
          message: res.data.message,
        };
      }
      if (res.data.success) {
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
  updateProduct: async (id, updatedData) => {
    if (!updatedData.price || !updatedData.image || !updatedData.name) {
      return {
        success: false,
        message: "Please fill all the fields",
      };
    }
    try {
      const res = await axios.put(
        `${API_BASE_URL}/products/${id}`, // Use environment variable
        updatedData
      );
      if (res.data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === id ? { ...product, ...res.data.data } : product
          ),
        }));
        return {
          success: true,
          message: "Product updated successfully",
          data: res.data.data,
        };
      } else {
        return {
          success: false,
          message: res.data.message || "Failed to update product",
        };
      }
    } catch (err) {
      console.error("Error updating product:", err);
      return {
        success: false,
        message: err.response?.data?.message || "An error occurred",
      };
    }
  },
}));
