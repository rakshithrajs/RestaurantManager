import React, { useState, useEffect } from "react";
import MenuItems from "./menuItems.jsx";
import "./styles/menu.modules.css";
import plus from "/plus.png";
import AddItem from "./addItem.jsx";
import api from "../../api/api.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddCategory from "./addCategory.jsx";

const menu = ({ id }) => {
    const [items, setItems] = useState();
    const [table, setTable] = useState();
    const [itemForm, setItemForm] = useState(false);
    const [categoryForm, setCategoryForm] = useState(false);
    useEffect(() => {
        const getTable = async () => {
            if (id) {
                try {
                    const response = await api.get(`/tables/${id}`);
                    setTable(response.data);
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
        getTable();
    }, []);

    return (
        <>
            <main
                className={
                    !id
                        ? " bg-orange-300 rounded-lg w-2/3 m-auto mt-[2vw] flex flex-col"
                        : " bg-orange-300 w-full h-min rounded-lg ml-[2vw] mt-[2vw] flex flex-col"
                }
            >
                <AddCategory
                    isOpen={categoryForm}
                    setIsOpen={setCategoryForm}
                />
                <AddItem isVisible={itemForm} setIsVisible={setItemForm} />
                <div className=" p-4 flex items-center justify-center gap-8">
                    <h1 className=" text-4xl font-bold text-center font-mono">
                        Menu
                    </h1>
                    {!id && (
                        <>
                            <button
                                className="cursor-pointer transition-all active:scale-110 focus:outline-none "
                                onClick={() => {
                                    setItemForm(!itemForm);
                                }}
                            >
                                <img
                                    src={plus}
                                    alt="add item"
                                    height={30}
                                    width={30}
                                />
                            </button>
                            <button
                                onClick={() => {
                                    setCategoryForm(!categoryForm);
                                }}
                                className=" flex items-center font-semibold gap-[0.5vw] text-2xl cursor-pointer transition-all active:scale-110 focus:outline-none "
                            >
                                Add Category
                                <IoMdAddCircleOutline className=" mt-[0.3vw]" />
                            </button>
                        </>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(event)=>{
                        setItems(event.target.value)
                    }}
                    className=" bg-transparent outline-none border-b-2 border-0 border-black text-black active:border-black focus:border-black placeholder:text-black mx-[1vw] rounded-full"
                />
                <div className="p-4">
                    <MenuItems table={table} set={items} />
                </div>
            </main>
        </>
    );
};

export default menu;
