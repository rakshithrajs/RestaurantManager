import React, { useContext, useState, useEffect } from "react";

import axios from "../../api/api.jsx";

import { renderState } from "../../contexts/menuContext.jsx";

import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const AddItem = ({ isVisible, setIsVisible }) => {
    //for auth token
    const { user } = useAuthContext();

    //for rendering
    const [render, setRender] = useContext(renderState);

    //form data
    const [formData, setFormData] = useState({
        item: "",
        price: 0.0,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/category", {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                });
                setCategory(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCategories();
    }, []);

    //for submitting
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user) {
            alert("Please login to add items");
            return;
        }
        try {
            const response = await axios.post("/menu", formData, {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setIsVisible(false);
        setRender(render + 1);
        setFormData({
            item: "",
            price: 0.0,
            veg_or_nonveg: "",
            description: "",
            category: "",
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg mx-auto">
                <h2 className="mb-6 text-3xl font-bold text-gray-800 text-center border-b pb-4">
                    Add a New Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Item Name */}
                    <div>
                        <label
                            htmlFor="item"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Item Name
                        </label>
                        <input
                            type="text"
                            id="item"
                            name="item"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter item name"
                            value={formData.item}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    item: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter price"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                })
                            }
                        >
                            <option value="" disabled>
                                Select category
                            </option>
                            {category.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Veg or Non-Veg */}
                    <div className="flex items-center gap-6">
                        <span className="text-sm font-medium text-gray-700">
                            Type:
                        </span>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="veg"
                                name="veg_or_nonveg"
                                value="veg"
                                checked={formData.veg_or_nonveg === "veg"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        veg_or_nonveg: e.target.value,
                                    })
                                }
                                className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <label
                                htmlFor="veg"
                                className="text-sm text-gray-700"
                            >
                                Veg
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="nonveg"
                                name="veg_or_nonveg"
                                value="non-veg"
                                checked={formData.veg_or_nonveg === "non-veg"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        veg_or_nonveg: e.target.value,
                                    })
                                }
                                className="h-4 w-4 text-red-600 focus:ring-red-500"
                            />
                            <label
                                htmlFor="nonveg"
                                className="text-sm text-gray-700"
                            >
                                Non-Veg
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="4"
                            name="description"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Describe the item"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                        >
                            Add Product
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsVisible(false)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition duration-150"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
