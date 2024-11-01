import cors from "cors";
import express, { json } from "express";
import { db } from "./util/db-connect.js";
import productRoute from "./routes/products.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());

app.get("/", async (req, res) => {
  await db.connect();
  const products = await Product.find().populate("categoryId");
  res.json(products);
});

app.use("/", productRoute);

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
