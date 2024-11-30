import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
});

export const categoryModel = new model('categoryModel', categorySchema);
