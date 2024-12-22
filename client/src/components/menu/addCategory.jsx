import React, { useState } from "react";

import { motion } from "framer-motion";

import api from "../../api/api.jsx";

import { IoMdCloseCircle } from "react-icons/io";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";

import { actions, useStore } from "../../contexts/storeContext.jsx";

const AddCategory = ({ isOpen, setIsOpen }) => {
    //for auth token
    const { user } = useAuthContext();

    //state manager
    const { dispatch } = useStore();

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
        }
        setError(null);
        try {
            const response = await api.post("/category", category, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch({ type: actions.ADD_CATEGORY, payload: response.data });
            setCategory({ name: "" });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 500);
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
                {/* make div appear in a smooth transition */}
                {success && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-green-500 text-sm mb-4"
                    >
                        Category added successfully!
                    </motion.div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Category Name"
                        autoFocus
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
