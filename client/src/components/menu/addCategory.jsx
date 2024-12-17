import React, { useState } from "react";

import api from "../../api/api.jsx";

import { IoMdCloseCircle } from "react-icons/io";

import { renderState } from "../../contexts/menuContext.jsx";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { useContext } from "react";

const AddCategory = ({ isOpen, setIsOpen }) => {
    //for auth token
    const { user } = useAuthContext();

    //for rendering
    const [render, setRender] = useContext(renderState);

    //fpr category input
    const [category, setCategory] = useState({ name: "" });

    //for the result messages
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    //for submitting category name
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.name) {
            setError("Category name is required.");
            return;
        }
        setError(null);
        try {
            const response = await api.post("/category", category, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setSuccess(true);
            setCategory({ name: "" });
            setRender(render + 1);
            console.log(response);
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.log(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-6 border-b">
                    <h1 className=" text-3xl font-bold text-gray-800 text-center pb-4">
                        Add Category
                    </h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-red-500 text-3xl hover:text-red-600 transition"
                    >
                        <IoMdCloseCircle />
                    </button>
                </div>
                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                {success && (
                    <div className="text-green-500 text-sm mb-4">
                        Category added successfully!
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        id="categoryname"
                        name="categoryname"
                        value={category.name}
                        className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                        onChange={(e) =>
                            setCategory({ ...category, name: e.target.value })
                        }
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
