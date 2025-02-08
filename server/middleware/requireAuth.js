import jwt from "jsonwebtoken";

import { authModel } from "../models/authModel.js";

import { CustomError } from "../utils/customError.js";

export const requireAuth = async (req, res, next) => {
    const token = req.cookies['token'];
    try {
        if (!token) {
            return res.status(401).json({ error: "Auth token required" });
        }
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await authModel.find({ _id }).select("_id");
        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }
        next();
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
