import jwt from "jsonwebtoken";

import { authModel } from "../models/authModel.js";

import { CustomError } from "../utils/customError.js";

//creating the token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login logic
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.logIn(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//signup logic
export const signup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.signUp(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
