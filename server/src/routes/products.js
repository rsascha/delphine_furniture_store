import { Router } from "express";
import { getAllProducts, productDetails } from "../controllers/products.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", productDetails);

export default router;
