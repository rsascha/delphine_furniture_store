// import { Router } from "express";
// import { cart } from "../controllers/cart.js";

// const router = Router();

// router.post("/add", cart);
// export default router;

//-------------------------


import { Router } from "express";
import { getCart, addToCart } from "../controllers/cart.js";

const router = Router();

router.get("/", getCart);  // Fetches the current user's cart
router.post("/add", addToCart);  // Adds an item to the user's cart

export default router;
