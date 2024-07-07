import mongoose, { model, Schema } from "mongoose";

const orderWithCount = new Schema({
    _id: {
        type: Object,
    },
    count: {
        type: Number,
    },
});

export const orderCount = new model("ordercounts", orderWithCount);
