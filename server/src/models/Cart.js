import { model, Schema } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      date: { type: Date, default: Date.now },
    },
  ],
});
export const Cart = model("Cart", cartSchema);
export default Cart;
