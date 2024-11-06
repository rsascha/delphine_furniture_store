import { Router } from "express";
import {
  productDetails,
  bestSellingProducts,
  filterProducts,
} from "../controllers/products.js";

const router = Router();

router.get("/bestSelling", bestSellingProducts);
router.get("/", filterProducts);
router.get("/:productId", productDetails);

export default router;
