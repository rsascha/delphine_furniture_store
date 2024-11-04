import cors from "cors";
import express, { json } from "express";
import productRoute from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import cartRoutes from "./routes/carts.js";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "./config.js";
import { addUserInfo, addUserId } from "./middlewares/index.js";
import Product from "./models/Product.js";
import { db } from "./util/db-connect.js";

const PORT = process.env.PORT || 3000;
const app = express();
const jwtCheck = auth(config.authOptions);

app.use(cors());
app.use(json());
app.use(jwtCheck);

app.get("/", addUserId, addUserInfo, async (req, res) => {
  const { userId, userInfo } = req;
  console.debug({ userId, userInfo });
  await db.connect();
  const products = await Product.find().populate("categoryId");
  res.json(products);
});

app.use("/products", productRoute);
app.use("/", categoryRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
