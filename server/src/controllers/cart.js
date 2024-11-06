import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";
import Product from "../models/Product.js";

// /**
//  * @api POST /cart/add
//  *{
//  *    "_id": 67289d112377a1ab51abcd40,
//  *    "sessionId":"123"
//  *    "amount":2
//  * }
//  */

// export const cart = async (req, res) => {
//   try {
//     await db.connect();
//     const { _id, amount } = req.body;
//     // const { userId } = req;

//     if (!_id || !amount) {
//       return res.json({ message: "Missing required fields" });
//     }
//     const product = await Product.findById(_id);
//     if (!product) {
//       return res.json({ message: "Product not found" });
//     }
//     if (product.available < amount) {
//       return res.json({ message: "Not enough product available" });
//     }
//     product.available -= amount;
//     await product.save();

//     const cart = new Cart({
//       // userId: userId,

//       products: [
//         {
//           productId: _id,
//           date: Date.now(),
//           amount: amount,
//         },
//       ],
//     });
//     if (!Cart.products) {
//       Cart.products = [];
//     }
//     Cart.products.push(cart);
//     await cart.save();

//     res.json({ message: "Product added to cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "Internal server error" });
//   }
// };

//-------------

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price image"
    );
    if (!cart) return res.json({ products: [] });

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.sub;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId, amount } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, amount }] });
    } else {
      const productIndex = cart.products.findIndex((p) =>
        p.productId.equals(productId)
      );
      if (productIndex > -1) {
        cart.products[productIndex].amount += amount;
      } else {
        cart.products.push({ productId, amount });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};
