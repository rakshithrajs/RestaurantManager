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
});

userSchema.statics.logIn = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error("incorrect Password");
    }
    return user;
};

userSchema.statics.signUp = async function (email, password) {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Not a valid email");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });
    return user;
};

export const authModel = new model("authModel", userSchema);
