import { Router } from "express";
import {
  getAllProducts,
  productDetails,
  bestSellingProducts,
} from "../controllers/products.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/bestSelling", bestSellingProducts);
router.get("/:productId", productDetails);

export default router;
