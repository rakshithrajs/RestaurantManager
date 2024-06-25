import {categoryModel} from "../models/itemCategory.js";

export const getCategories = async (req, res) => {
    try {
        const category = await categoryModel.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }
};

export const addCategories = async (req, res) => {
    try {
        const category = req.body;
        const newCategory = new categoryModel(category);
        await newCategory.save();
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategories = async (req, res) => {
    try {
        const id = req.params["id"];
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
