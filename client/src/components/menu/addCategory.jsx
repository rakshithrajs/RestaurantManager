import React from "react";
import api from "../../api/api.jsx"
import { IoMdCloseCircle } from "react-icons/io";

const addCategory = ({ isOpen, setIsOpen }) => {
    const [category, setCategory] = React.useState({ name: "" });
    const handleSubmit = async() => {
        try {
            const response = await api.post("/category", category)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg p-4 w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Add Category</h1>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-red-500 text-3xl"
                    >
                        <IoMdCloseCircle />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        className="border border-gray-300 rounded px-4 py-2"
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                    />
                    <button className="bg-blue-500 text-white rounded px-4 py-2">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default addCategory;
