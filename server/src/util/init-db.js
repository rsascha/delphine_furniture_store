import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Discount from "../models/Discount.js";
import Cart from "../models/Cart.js";

import { products } from "../data/products.js";
import { categories } from "../data/category.js";

import db from "./db-connect.js";

// ------Product-----------------------
export async function initDb() {
  await db.connect();
  // ------category-----------------------

  // const category = await Category.find({});

  // if (category.length == 0) {
  //  return;
  //

  await Category.deleteMany({});

  await Category.insertMany(categories);

  // const tableCategory = new Category({
  //   name: "Table",
  // });
  // await tableCategory.save();

  // const decorCategory = new Category({
  //   name: "Decor",
  // });
  // await decorCategory.save();

  // console.log("Categories established!");
  // const products = await Product.find({});
  // if (products.length > 0) {
  //   return;
  // }

  await Product.deleteMany({});

  await Product.insertMany(products);
  // const bookshelf = new Product({
  //   name: "Bookshelf",
  //   categoryId: tableCategory._id,
  //   price: 89.99,
  //   size: 150,
  //   material: "Wood",
  //   color: "Oak",
  //   available: 15,
  //   description:
  //     "A spacious oak bookshelf, perfect for any living room or office.",
  // });

  // await bookshelf.save();

  // const coffeeTable = new Product({
  //   name: "Coffee Table",
  //   categoryId: decorCategory._id,
  //   price: 149.99,
  //   size: 90,
  //   material: "Glass and Metal",
  //   color: "Black",
  //   available: 20,
  //   description: "A stylish coffee table with a glass top and metal frame.",
  // });

  // await coffeeTable.save();
  process.exit(0);
}

await initDb();
