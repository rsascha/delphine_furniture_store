import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";
import Product from "../models/Product.js";

/**
 * @api POST /cart/add
 *{
 *    "_id": 67289d112377a1ab51abcd40,
 *    "sessionId":"123"
 *    "amount":2
 * }
 */

export const cart = async (req, res) => {
  try {
    await db.connect();
    const { _id, amount } = req.body;
    // const { userId } = req;

    if (!_id || !amount) {
      return res.json({ message: "Missing required fields" });
    }
    const product = await Product.findById(_id);
    if (!product) {
      return res.json({ message: "Product not found" });
    }
    if (product.available < amount) {
      return res.json({ message: "Not enough product available" });
    }
    product.available -= amount;
    await product.save();

    const cart = new Cart({
      // userId: userId,

      products: [
        {
          productId: _id,
          date: Date.now(),
          amount: amount,
        },
      ],
    });
    if (!Cart.products) {
      Cart.products = [];
    }
    Cart.products.push(cart);
    await cart.save();

    res.json({ message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};
