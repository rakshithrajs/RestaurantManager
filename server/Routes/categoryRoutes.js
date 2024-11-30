import express from "express";

import {
    getCategories,
    addCategories,
    deleteCategories,
} from "../controllers/category.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.route("/").get(getCategories).post(addCategories);
router.route("/:id").delete(deleteCategories);

export default router;