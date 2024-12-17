import React, { useContext, useState } from "react";
import api from "../../api/api.jsx";
import { renderState } from "../../contexts/menuContext.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";

const AddTableModal = ({ isOpen, setIsOpen }) => {
    const { user } = useAuthContext();
    const [render, setRender] = useContext(renderState);
    const [formData, setFormData] = useState({
        tableNo: 0,
        customerName: "",
        customerPhone: "",
        occupants: 0,
        veg_or_nonveg: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post("/tables", formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setIsOpen(false);
            setRender(render + 1);
            setFormData({
                tableNo: 0,
                customerName: "",
                customerPhone: "",
                occupants: 0,
                veg_or_nonveg: "",
            });
        } catch (error) {
            console.log("Error adding table:", error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg mx-auto">
                <h2 className="mb-6 text-3xl font-bold text-gray-800 text-center border-b pb-4">
                    Add a New Table
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Table Number */}
                    <div>
                        <label
                            htmlFor="tableNo"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Table No
                        </label>
                        <input
                            type="number"
                            id="tableNo"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter table number"
                            value={formData.tableNo}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    tableNo: parseInt(e.target.value),
                                })
                            }
                            required
                        />
                    </div>

                    {/* Customer Name */}
                    <div>
                        <label
                            htmlFor="customerName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customerName"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter customer name"
                            value={formData.customerName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    customerName: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Customer Phone */}
                    <div>
                        <label
                            htmlFor="customerPhone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone No
                        </label>
                        <input
                            type="tel"
                            id="customerPhone"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter phone number"
                            value={formData.customerPhone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    customerPhone: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    {/* Occupants */}
                    <div>
                        <label
                            htmlFor="occupants"
                            className="block text-sm font-medium text-gray-700"
                        >
                            No. of People Sitting
                        </label>
                        <input
                            type="number"
                            id="occupants"
                            className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 bg-gray-50"
                            placeholder="Enter number of occupants"
                            value={formData.occupants}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    occupants: parseInt(e.target.value),
                                })
                            }
                            required
                        />
                    </div>

                    {/* Veg or Non-Veg */}
                    <fieldset className="space-y-2">
                        <legend className="text-sm font-semibold text-gray-700">
                            Meal Type
                        </legend>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
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
                                <span>Veg</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="veg_or_nonveg"
                                    value="non-veg"
                                    checked={
                                        formData.veg_or_nonveg === "non-veg"
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            veg_or_nonveg: e.target.value,
                                        })
                                    }
                                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                                />
                                <span>Non-Veg</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="veg_or_nonveg"
                                    value="both"
                                    checked={formData.veg_or_nonveg === "both"}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            veg_or_nonveg: e.target.value,
                                        })
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Both</span>
                            </label>
                        </div>
                    </fieldset>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-300 transition duration-150"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                        >
                            Add Table
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTableModal;
