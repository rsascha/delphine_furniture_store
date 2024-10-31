import { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
});

export const Product = model("Product", productSchema);

export default Product;
