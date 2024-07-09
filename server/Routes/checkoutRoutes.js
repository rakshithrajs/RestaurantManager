import { getTableBill, postOrderHistory } from "../controllers/checkout.js";
import express from "express";
const router = express.Router();

router.get("/:id", getTableBill);
router.post("/history", postOrderHistory);

export default router;
