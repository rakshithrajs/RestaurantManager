import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const tableSchema = new Schema(
    {
        tableNo: {
            type: Number,
            required: true,
            unique: true,
        },
        customerName: {
            type: String,
            trim: true,
        },
        customerPhone: {
            type: String,
            trim: true,
        },
        occupants: {
            type: Number,
            default: 0,
        },
        veg_or_nonveg: {
            type: String,
            required: true,
            enum: ["veg", "non-veg", "both"],
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
            required: true,
        },
    },
    { timestamps: true }
);

//for saving phone number with +91
//TODO: make this dynamic by accessing the loacle of the user
tableSchema.pre("save", function () {
    this.customerPhone = "+91" + this.customerPhone;
});

export const tableModel = new model("tableModel", tableSchema);
