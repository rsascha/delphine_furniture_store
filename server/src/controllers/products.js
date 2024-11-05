import Product from "../models/Product.js";
import { db } from "../util/db-connect.js";

// Alle Produkte abrufen
/**
 * @api GET /products
 *
 */
export const getAllProducts = async (req, res) => {
  try {
    await db.connect();
    const products = await Product.find()
      .select("name price categoryId image")
      .populate("categoryId", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * @api GET /productDetails/productId
 *
 */
export const productDetails = async (req, res) => {
  const { productId } = req.params;
  try {
    await db.connect();
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
