import React, { useState } from "react";

const addTable = ({ isOpen, setIsOpen }) => {
    const [people, setPeople] = useState(0);
    if (!isOpen) return null;
    return (
        <div className=" fixed inset-0 bg-amber-50 bg-opacity-25 backdrop-blur-md flex justify-center items-center">
            <div className="flex flex-col items-center size-[65.1vw] bg-amber-100 bg-opacity-50 rounded-full pt-[10vw]">
                <form className="">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="tableNo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Table No:
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            name="tableNo"
                                            id="tableNo"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="customerName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Customer Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="customerName"
                                        id="customerName"
                                        className="block w-full rounded-md bg-transparent border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="occupants"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    No of people sitting:
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="number"
                                            name="occupants"
                                            id="occupants"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <fieldset className="col-span-full">
                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                    Veg or Non-Veg
                                </legend>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="Veg"
                                            name="veg_or_nonveg"
                                            value="veg"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="Veg"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Veg
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="nonveg"
                                            name="veg_or_nonveg"
                                            value="non-veg"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="nonveg"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Non Veg
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="both"
                                            name="veg_or_nonveg"
                                            value="both"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label
                                            htmlFor="both"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Both
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={()=>{
                                setIsOpen(!isOpen)
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={()=>{
                                setIsOpen(!isOpen)
                            }}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default addTable;
