import express from "express";
import {
    getTables,
    getOneTable,
    addTable,
    deleteTable,
} from "../controllers/tables.js";
const router = express.Router();

router.route("/").get(getTables).post(addTable);
router.route("/:id").get(getOneTable).delete(deleteTable);

export default router;
