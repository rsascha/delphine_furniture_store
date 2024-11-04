import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    sessionId: { type: String },
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
  },
  {
    versionKey: false,
  }
);
export const Cart = model("Cart", cartSchema);
export default Cart;
