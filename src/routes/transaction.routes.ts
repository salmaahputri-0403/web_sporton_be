import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/upload.middlewares";
import { createTransaction, getTransaction, getTransactionById, updateTransaction } from "../controllers/transaction.controller";

const router =Router();

router.post("/checkout",upload.single("image"), createTransaction);
router.get("/",authenticate,getTransaction);
router.get("/:id",getTransactionById);
router.patch("/:id", authenticate, updateTransaction);

export default router;