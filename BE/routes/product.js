import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();
// import mongoose from "mongoose";

const productController = new ProductController();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.updateProduct);

export default router;
