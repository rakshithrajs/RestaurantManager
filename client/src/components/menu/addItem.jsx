import React, { useContext, useState } from "react";
import axios from "../../api/api.jsx";
import { categorydata, renderState } from "../../contexts/menuContext.jsx";

const addItem = ({ isVisible, setIsVisible }) => {
    const [render, setRender] = useContext(renderState);
    const category = useContext(categorydata)
    const [formData, setFormData] = useState({
        item: "",
        price: 0.0,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData.category);
            const response = await axios.post("/menu", formData);
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
        setIsVisible(!isVisible);
        setRender(render+1);
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
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[50%] flex flex-col">
                <div className="bg-white p-2 rounded">
                    <h2 className="mb-4 text-2xl text-center font-bold text-gray-900">
                        Add a new product
                    </h2>
                    <form
                        method="post"
                        className=" p-4"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        name="form"
                    >
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="item"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="item"
                                    id="item"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Type Item name"
                                    required
                                    value={formData.item}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            item: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    required
                                    placeholder="Add the price"
                                    value={formData.price}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            price: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                    value={formData.category}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            category: event.target.value,
                                        });
                                    }}
                                >
                                    <option>Select category</option>
                                    {category.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center">
                                <label
                                    htmlFor="veg"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Veg
                                </label>
                                <input
                                    type="radio"
                                    name="veg_or_nonveg"
                                    value="veg"
                                    id="veg"
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            veg_or_nonveg: event.target.value,
                                        })
                                    }
                                />
                                <label
                                    htmlFor="nonveg"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Non Veg
                                </label>
                                <input
                                    type="radio"
                                    name="veg_or_nonveg"
                                    value="non-veg"
                                    id="nonveg"
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            veg_or_nonveg: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-90"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                                    placeholder="Item Description"
                                    value={formData.description}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            description: event.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                type="submit"
                                className="flex items-center px-5 py-2.5 mt-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:ring-primary-200"
                            >
                                Add product
                            </button>
                            <button
                                className=" flex items-center px-5 py-2.5 mt-2 text-sm font-medium text-center rounded-lg text-red-600  focus:ring-4 focus:ring-primary-200"
                                onClick={() => {
                                    setIsVisible(!isVisible);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default addItem;
