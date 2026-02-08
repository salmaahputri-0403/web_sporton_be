import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import { createBank, deleteBank, getBank, updateBank } from "../controllers/bank.controller";

const router =Router();

router.post("/",authenticate, createBank);
router.get("/",getBank);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;