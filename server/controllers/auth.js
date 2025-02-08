import jwt from "jsonwebtoken";

import { authModel } from "../models/authModel.js";

import { CustomError } from "../utils/customError.js";

//creating the token
const createToken = (_id, res) => {
    const token =  jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { 
        httpOnly: false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return token;
};

// login logic
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.logIn(email, password);
        const token = createToken(user._id, res);
        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: null
            }
        });
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
        const token = createToken(user._id, res);
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const authCheck = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ success: true, user: req.user });
        } else {
            res.status(401).json({ success: false, error: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};