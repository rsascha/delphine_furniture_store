import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";

// Alle Produkte abrufen
/**
 * @api POST /cart/add
 *{
 * "_id": 67289d112377a1ab51abcd40,
 * "available":20,

 * }
 */
export const cart = async (req, res) => {
  try {
    await db.connect();
    const { _id, available } = req.body;

    if (!_id || !available) {
      return res.json({ message: "Missing required fields" });
    }
    const newProduct = new Cart({
      _id,
      available,
      date: new Date(date),
    });

    await newProduct.save();

    resjson({ message: "Product added to cart" });
  } catch (error) {
    res.json({ message: "Internal server error" });
  }
};
