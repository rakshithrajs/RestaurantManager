import mongoose from "mongoose";

import { tableModel } from "../models/tableModel.js";

import { CustomError } from "../utils/customError.js";

//get all tables
export const getTables = async (req, res) => {
    try {
        const tables = await tableModel.find();
        res.status(200).json(tables);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//get details of table in big view
export const getOneTable = async (req, res) => {
    const { id } = req.params;
    try {
        const table = await tableModel.findById(id);
        res.status(200).json(table);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//add a new table
export const addTable = async (req, res) => {
    const table = req.body;
    try {
        const newTable = new tableModel(table);
        await newTable.save();
        res.status(201).json(newTable);
        console.log(newTable);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};

//remove a table
export const deleteTable = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "no item with this id" });
        const deleted = await tableModel.findByIdAndDelete(id);
        res.status(200).json(deleted);
    } catch (error) {
        const err = new CustomError(error.message, error.statusCode);
        next(err);
    }
};
