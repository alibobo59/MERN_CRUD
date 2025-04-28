import mongoose from "mongoose";
import Product from "../models/Product.js";
import _ from "lodash";

class ProductController {
  constructor() {
    this.Product = Product; // Reference to the Product model

    // Bind all instance methods to ensure `this` context
    _.bindAll(this, [
      "createProduct",
      "getProducts",
      "getProductById",
      "updateProduct",
      "deleteProduct",
    ]);
  }

  // Private method for validating ObjectId
  #isValidObjectId(id) {
    return mongoose.isValidObjectId(id);
  }

  // Private method for centralized error handling
  #handleError(res, error, message = "Something went wrong") {
    console.error(error);
    return res.status(500).json({
      success: false,
      message,
    });
  }

  // Create a new product
  async createProduct(req, res) {
    const productData = req.body;
    console.log("Creating product:", productData);

    // Validate required fields
    if (!productData.name || !productData.price || !productData.image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    try {
      const newProduct = new this.Product(productData);
      await newProduct.save();
      return res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      return this.#handleError(res, error);
    }
  }

  // Get all products
  async getProducts(req, res) {
    try {
      const products = await this.Product.find();
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found",
        });
      }
      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      return this.#handleError(res, error);
    }
  }

  // Get a product by ID
  async getProductById(req, res) {
    const { id } = req.params;
    console.log("Fetching product with ID:", id);

    if (!this.#isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    try {
      const product = await this.Product.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return this.#handleError(res, error);
    }
  }

  // Update a product
  async updateProduct(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!this.#isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    try {
      const product = await this.Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return this.#handleError(res, error);
    }
  }

  // Delete a product
  async deleteProduct(req, res) {
    const { id } = req.params;

    if (!this.#isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    try {
      const product = await this.Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return this.#handleError(res, error);
    }
  }
}

export default ProductController;
