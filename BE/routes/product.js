import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProducts,
} from "../controllers/ProductController.js";

const router = express.Router();
// import mongoose from "mongoose";

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;
