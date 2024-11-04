import Product from "../models/Product.js";
import { db } from "../util/db-connect.js";

// Alle Produkte abrufen
export const getAllProducts = async (req, res) => {
  try {
    await db.connect();
    const products = await Product.find().populate("categoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
