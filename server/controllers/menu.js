import mongoose from "mongoose";

import { menuModel } from "../models/menuModel.js";

import { CustomError } from "../utils/customError.js";

//to just get all the items in the restaurant
export const getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await menuModel.find();
        res.status(200).json(menuItems);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//to get one specific item in the menu
export const getOneItem = async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await menuModel.find({ _id: id });
        res.status(200).json(item);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//add an tiem into menu
export const addMenuItems = async (req, res, next) => {
    const item = req.body;
    const newItem = new menuModel(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
        console.log(newItem);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//update an time on the menu
export const updateMenuItems = async (req, res, next) => {
    const { id: _id } = req.params;
    const updatedData = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            throw new Error("No item with this id exists");
        const updates = await menuModel.findByIdAndUpdate(_id, updatedData, {
            new: true,
        });
        res.status(200).json(updates);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//to delete the item in the menu
export const deleteItems = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("No item with this id exists");
        const deleted = await menuModel.deleteOne({ _id: id });
        res.status(200).json(deleted);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//delete all items in the category
export const deleteByCategory = async (req, res, next) => {
    const { id } = req.params;
    try {
        const itemsByCategory = await menuModel.deleteMany({
            category: id,
        });
        res.status(200).json(itemsByCategory);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
