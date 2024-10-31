import cors from "cors";
import express, { json } from "express";
import { db } from "./util/db-connect.js";
import { initDb } from "./util/init-db.js";
import productRoute from "./routes/products.js";
const PORT = process.env.PORT || 3000;
const app = express();

await initDb();

app.use(cors());
app.use(json());

app.get("/", async (req, res) => {
  await db.connect();
  // todo

  res.json({ success: true });
});

app.use("/", productRoute);

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
