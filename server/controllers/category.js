import { categoryModel } from "../models/itemCategory.js";

import { CustomError } from "../utils/customError.js";

// getting all the categories available
export const getCategories = async (req, res, next) => {
    try {
        const user_id = req.user[0]._id;
        const category = await categoryModel.find({ user_id });
        res.status(200).json(category);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

// adding a new category
export const addCategories = async (req, res, next) => {
    try {
        const user_id = req.user[0]._id;
        const { name } = req.body;
        const newCategory = new categoryModel({ name, user_id });
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//delete a category
export const deleteCategories = async (req, res, next) => {
    try {
        const id = req.params["id"];
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).json(category);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
