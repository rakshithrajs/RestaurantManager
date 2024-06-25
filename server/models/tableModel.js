import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const tableSchema = new Schema({
    tableNo: {
        type: Number,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
    },
    occupants:{
        type: Number,
        default: 0,
    },
    veg_or_nonveg:{
        type: String,
        required: true,
        enum: ['veg', 'non-veg', 'both']
    }
});

export const tableModel = new model('tableModel', tableSchema);
