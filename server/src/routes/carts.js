import { Router } from "express";
import { cart } from "../controllers/cart.js";

const router = Router();

router.post("/add", cart);
export default router;
