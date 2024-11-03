import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Discount from "../models/Discount.js";
import Cart from "../models/Cart.js";

import { products } from "../data/products.js";
import { categories } from "../data/category.js";

import db from "./db-connect.js";

export async function initDb() {
  await db.connect();
  try {
    console.log("Datenbankverbindung erfolgreich!");

    // ------category-----------------------
    await Category.deleteMany({});
    await Category.insertMany(categories);

    // ------Product-----------------------
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Datenbank initialisiert.");
  } catch (error) {
    console.error("Fehler bei der Datenbankinitialisierung:", error.message);
  } finally {
    process.exit(0);
  }
}

await initDb();
