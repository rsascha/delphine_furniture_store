import Product from "../models/Product.js";
import db from "./db-connect.js";

export async function initDb() {
  await db.connect();

  const products = await Product.find({});

  if (products.length > 0) {
    return;
  }

  const table = new Product({
    name: "Esstisch",
  });
  table.save();

  console.log("Database initialized!");
}
