import mongoose from "mongoose";
import { menuModel } from "../models/menuModel.js";

export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await menuModel.find();
        res.status(200).json(menuItems);
    } catch (err) {
        res.status(404).json({ message: err.message });
        console.log(err);
    }
};

export const getOneItem = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await menuModel.find({ _id: id });
        res.status(200).json(item);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const addMenuItems = async (req, res) => {
    const item = req.body;
    const newItem = new menuModel(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
        console.log(newItem);
    } catch (err) {
        console.log(err);
        res.status(409).json({ message: err.message });
    }
};

export const updateMenuItmes = async (req, res) => {
    const { id: _id } = req.params;
    const updatedData = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("no item with that id exists");
        const updates = await menuModel.findByIdAndUpdate(_id, updatedData, {
            new: true,
        });
        res.status(200).json(updates);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const deleteItems = async (req,res) =>{
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({message: "no item with this id"});
        const deleted = await menuModel.deleteOne({_id: id})
        res.status(200).json(deleted)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}
