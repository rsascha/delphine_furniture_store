import { Types } from "mongoose";

export const cart = [
  {
    // userId: new Types.ObjectId("67289d112377a1ab51ab0004"),
    sessionId: "123",
    products: [
      {
        productId: new Types.ObjectId("67289d112377a1ab51ab0007"),
        date: "2024-11-15",
      },
      {
        productId: new Types.ObjectId("67289d112377a1ab51ab0008"),
        date: "2024-11-15",
      },
    ],
  },
  {
    products: [
      {
        productId: new Types.ObjectId("67289d112377a1ab51ab0008"),
        date: "2024-11-15",
      },
    ],
  },
];
