import express from "express";
import { getCategories, addCategories, deleteCategories } from "../contorllers/category.js";
const router = express.Router();

router.route("/").get(getCategories).post(addCategories);
router.route("/:id").delete(deleteCategories);

export default router;
