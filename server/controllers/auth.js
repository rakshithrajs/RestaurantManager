import { authModel } from "../models/authModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.logIn(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.signUp(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json(error.message);
    }
};
