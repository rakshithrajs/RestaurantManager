import mongoose, { model, Schema } from "mongoose";

const orderWithCount = new Schema({
    _id: {
        type: Object,
    },
    count: {
        type: Number,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
});

export const orderCount = new model("ordercounts", orderWithCount);
