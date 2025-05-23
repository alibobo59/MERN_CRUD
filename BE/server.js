import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000; //
//
//  Use the PORT environment variable or defaul

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  connectDB(); // Call the connectDB function to establish the connection t
  console.log(`Server is running on port ${PORT}`);
});
