import { Router } from "express";
import {
  getAllProducts,
  productDetails,
  filterProducts,
} from "../controllers/products.js";

const router = Router();

router.get("/", filterProducts);
router.get("/:productId", productDetails);

export default router;
