import { Router } from "express";
import { getAllProducts, productDetails } from "../controllers/products.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/productDetails/:productId", productDetails);
export default router;
