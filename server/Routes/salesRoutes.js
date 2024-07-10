import { getDish, getSales } from "../controllers/sales.js";
import express from "express";
const router = express.Router();

router.route("/").get(getSales);
router.route("/dish").get(getDish);

export default router;
