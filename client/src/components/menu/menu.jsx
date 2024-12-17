import React, { useState, useEffect, useRef } from "react";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { motion } from "framer-motion";
import api from "../../api/api.jsx";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import MenuItems from "./menuItems.jsx";
import AddItem from "./addItem.jsx";
import AddCategory from "./addCategory.jsx";

const Menu = ({ id }) => {
    const { user } = useAuthContext();

    const [query, setQuery] = useState();
    const [searchField, setSearchField] = useState(false);

    // For ordering
    const [table, setTable] = useState();
    const [itemForm, setItemForm] = useState(false);
    const [categoryForm, setCategoryForm] = useState(false);

    // Fetch table data
    useEffect(() => {
        const getTable = async () => {
            if (id) {
                try {
                    const response = await api.get(`/tables/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    setTable(response.data);
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
        if (user) {
            getTable();
        }
    }, [id, user]);

    return (
        <motion.main
            initial={{ opacity: 1 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            layout
            className={`${
                !id
                    ? "bg-gradient-to-br from-yellow-200 to-orange-200 w-full md:w-3/4 lg:w-2/3 m-auto mt-6 p-4 md:p-6 rounded-lg shadow-lg"
                    : "bg-gradient-to-br from-yellow-200 to-orange-200 w-full h-min p-4 md:p-6 ml-0 md:ml-4 mt-4 md:mt-6 rounded-lg shadow-lg"
            } flex flex-col gap-6`}
        >
            {/* Modals for Adding Category and Items */}
            <AddCategory isOpen={categoryForm} setIsOpen={setCategoryForm} />
            <AddItem isVisible={itemForm} setIsVisible={setItemForm} />

            {/* Header Section */}
            <motion.div
                layout
                className="flex flex-row items-start md:items-center justify-between gap-4 md:gap-0"
            >
                <h1 className="text-xl md:text-4xl font-bold font-mono text-gray-800">
                    Menu
                </h1>
                {!id && (
                    <div className="flex gap-4">
                        <button
                            onClick={() => setItemForm(!itemForm)}
                            className="flex h-7 md:h-11 items-center px-2 md:gap-2 md:px-4 md:py-2 bg-white text-xs md:text-lg font-medium rounded-full shadow hover:scale-105 transition-transform focus:outline-none"
                        >
                            <IoMdAddCircleOutline className="hidden md:text-2xl md:block" />
                            Add Item
                        </button>
                        <button
                            onClick={() => setCategoryForm(!categoryForm)}
                            className="flex h-7 md:h-11 items-center px-2 md:gap-2 md:px-4 md:py-2 bg-white text-xs md:text-lg font-medium rounded-full shadow hover:scale-105 transition-transform focus:outline-none"
                        >
                            <IoMdAddCircleOutline className="hidden md:text-2xl md:block" />
                            Add Category
                        </button>
                    </div>
                )}
                <button
                    onClick={() => setSearchField(!searchField)}
                    className="h-7 bg-white md:h-11 px-2 md:px-3 md:py-2 text-xs md:text-lg font-medium rounded-full shadow hover:scale-105 transition-transform focus:outline-none"
                >
                    <IoMdSearch />
                </button>
            </motion.div>

            {/* Search Bar */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    searchField ? "visible" : "hidden"
                }`}
            >
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    layout
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                        className="w-full py-2 text-black bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 active:border-none transition"
                    />
                </motion.div>
            </div>

            {/* Menu Items */}
            <motion.div layout className="p-2 md:p-4">
                <MenuItems table={table} query={query} />
            </motion.div>
        </motion.main>
    );
};

export default Menu;
