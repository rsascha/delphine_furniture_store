import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";

/**
 * @api POST /cart/add
 *{
 * "_id": 67289d112377a1ab51abcd40,
 *"sessionId":"123"

 * }
 */

export const cart = async (req, res) => {
  try {
    await db.connect();
    const { _id, sessionId } = req.body;

    if (!_id || !sessionId) {
      return res.json({ message: "Missing required fields" });
    }
    const cart = new Cart({
      sessionId: sessionId,

      products: [
        {
          productId: _id,
          date: Date.now(),
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
