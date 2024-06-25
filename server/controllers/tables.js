import { tableModel } from "../models/tableModel.js"
import mongoose from "mongoose"

export const getTables = async (req,res) => {
    try{
        const tables = await tableModel.find()
        res.status(200).json(tables)
    }catch(err){
        res.json({message:err.message})
        console.log(err.message)
    }
}

export const getOneTable = async (req,res) => {
    const {id} = req.params;
    try{
        const table = await tableModel.findById(id)
        res.status(200).json(table)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const addTable = async (req,res) => {
    const table = req.body;
    try{
        const newTable = new tableModel(table)
        await newTable.save()
        res.status(201).json(newTable);
        console.log(newTable)
    }catch(err){
        console.log(err)
        res.json({message: err.message})
    }
}

export const deleteTable = async (req,res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({message: "no item with this id"});
        const deleted = await tableModel.findByIdAndDelete(id)
        res.status(200).json(deleted)
    }catch(error){
        res.status(400).json({message: error.message})
    }
}