import jwt from "jsonwebtoken";

import { authModel } from "../models/authModel.js";

import { CustomError } from "../utils/customError.js";

export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Auth token required" });
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await authModel.find({ _id }).select("_id");
        next();
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
