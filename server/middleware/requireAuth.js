import jwt from "jsonwebtoken";

import { authModel } from "../models/authModel.js";

import { CustomError } from "../utils/customError.js";

export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new Error("Auth token required");
        }
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await authModel.find({ _id }).select("_id");
        next();
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
