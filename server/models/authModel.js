import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // name: {
    //     type: String,
    // },
    // role: {
    //     type: String,
    //     default: "waiter",
    //     enum: ["waiter", "cook", "admin"],
    // },
});

userSchema.statics.logIn = async function (email, password) {
    if (!email || !password) {
        const error = new Error("All fields are required");
        error.statusCode = 400; // Bad Request
        throw error;
    }
    const user = await this.findOne({ email });
    if (!user) {
        const error = new Error("incorrect Email");
        error.statusCode = 401; // Unauthorized
        throw error;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        const error = new Error("incorrect Password");
        error.statusCode = 401; // Unauthorized
        throw error;
    }
    return user;
};

userSchema.statics.signUp = async function (email, password) {
    if (!email || !password) {
        const error = new Error("All fields are required");
        error.statusCode = 400; // Bad Request
        throw error;
    }
    if (!validator.isEmail(email)) {
        const error = new Error("Not a valid email");
        error.statusCode = 400; // Bad Request
        throw error;
    }
    if (!validator.isStrongPassword(password)) {
        const error = new Error("Password is not strong enough");
        error.statusCode = 400; // Bad Request
        throw error;
    }
    const exists = await this.findOne({ email });
    if (exists) {
        const error = new Error("Email already exists");
        error.statusCode = 409; // Conflict
        throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });
    return user;
};

export const authModel = new model("authModel", userSchema);
