import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";
import Product from "../models/Product.js";
import { userInfo } from "os";

/**
 * @api POST /cart/add
 *{
 *    "_id": 67289d112377a1ab51abcd40,
 *    "sessionId":"123"
 *    "amount":2
 * }
 */
function updateProduct(products, productId, amount) {
  products.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        amount: product.amount + amount,
      };
    } else {
      return product;
    }
  });
}
export const cart = async (req, res) => {
  try {
    const userId = req.userId;
    await db.connect();
    const { _id, amount } = req.body;

    if (!_id || !amount || !userId) {
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

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [
          {
            productId: _id,
            date: Date.now(),
            amount: amount,
          },
        ],
      });
    } else {
      // cart.products.push({
      //   productId: _id,
      //   date: Date.now(),
      //   amount,
      // });
      cart.products = updateProduct(cart.products, _id, amount);
      cart.products.push({
        productId: _id,
        date: Date.now(),
        amount,
      });
    }
    await cart.save();

    res.json({ message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};
