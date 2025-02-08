import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
});

export const categoryModel = new model("categoryModel", categorySchema);
