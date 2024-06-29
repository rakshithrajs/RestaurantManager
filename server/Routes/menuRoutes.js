import express from "express";
import {
    addMenuItems,
    getMenuItems,
    updateMenuItems,
    getOneItem,
    deleteItems,
    deleteByCategory,
} from "../controllers/menu.js";
const router = express.Router();

router.route("/").get(getMenuItems).post(addMenuItems);
router.route("/:id").get(getOneItem).put(updateMenuItems).delete(deleteItems);
router.delete("/all/:id", deleteByCategory);

export default router;
