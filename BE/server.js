import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import mongoose from "mongoose";
import productRouter from "./routes/product.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  connectDB(); // Call the connectDB function to establish the connection t
  console.log("Server is running on port 3000");
});
