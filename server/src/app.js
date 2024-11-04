import cors from "cors";
import express, { json } from "express";
import productRoute from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.use("/", productRoute);
app.use("/", categoryRoutes);

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
