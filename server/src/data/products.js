import { Types } from "mongoose";

export const products = [
  {
    name: "Bookshelf",
    categoryId: new Types.ObjectId("67239c42ded8e96ba8db0e13"),
    price: 89.99,
    size: "150",
    material: "Wood",
    color: "Oak",
    available: 15,
    description:
      "A spacious oak bookshelf, perfect for any living room or office.",
    __v: 0,
  },
  {
    name: "Coffee Table",
    categoryId: new Types.ObjectId("67239c42ded8e96ba8db0e13"),
    price: 149.99,
    size: "90",
    material: "Glass and Metal",
    color: "Black",
    available: 20,
    description: "A stylish coffee table with a glass top and metal frame.",
    __v: 0,
  },
  {
    name: "Chair",
    categoryId: new Types.ObjectId("67239c42ded8e96ba8db0e13"),
    price: 149.99,
    size: "90",
    material: "Glass and Metal",
    color: "Black",
    available: 20,
    description: "A stylish chair with a glass top and metal frame.",
    __v: 0,
  },
];
