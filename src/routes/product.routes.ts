import { Router } from "express";
import {createProduct, getProduct, getProductById, updateProduct, deleteProduct} from "../controllers/product.controller";
import {upload} from "../middlewares/upload.middlewares";
import { authenticate } from "../middlewares/auth.middlewares";


const router =Router();

router.post("/",authenticate, upload.single("image"), createProduct);
router.get("/",getProduct);
router.get("/:id",getProductById);
router.put("/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;