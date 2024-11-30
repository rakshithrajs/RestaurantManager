import { getDish, getSales } from "../controllers/sales.js";

import express from "express";

import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getSales);
router.route("/dish").get(getDish);

export default router;
