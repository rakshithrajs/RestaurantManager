import { getTableBill, postOrderHistory } from "../controllers/checkout.js";
import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
const router = express.Router();

router.use(requireAuth);

router.get("/:id", getTableBill);
router.post("/history", postOrderHistory);

export default router;
