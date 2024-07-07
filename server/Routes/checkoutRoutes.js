import { getTableBill } from "../controllers/checkout.js";
import express from "express";
const router = express.Router();

router.get("/:id", getTableBill);

export default router;