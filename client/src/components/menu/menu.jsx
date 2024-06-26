import React, { useState, useEffect } from "react";
import MenuItems from "./menuItems.jsx";
import "./styles/menu.modules.css";
import plus from "/plus.png";
import AddItem from "./addItem.jsx";
import api from "../../api/api.jsx";

const menu = ({ id }) => {
    const [table, setTable] = useState();
    useEffect(() => {
        const getTable = async () => {
            try {
                const response = await api.get(`/tables/${id}`);
                setTable(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getTable();
    }, []);
    const [itemForm, setItemForm] = useState(false);
    return (
        <>
            <AddItem isVisible={itemForm} setIsVisible={setItemForm} />
            <main className=" bg-orange-300 w-2/3 rounded-lg m-auto mt-8">
                <div className=" p-4 flex items-center justify-center gap-8">
                    <h1 className=" text-4xl font-bold text-center font-mono">
                        Menu
                    </h1>
                    {!id && (
                        <button
                            className="cursor-pointer transition-all hover:scale-110 focus:outline-none "
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
                    )}
                </div>
                <div className="p-4">
                    <MenuItems table={table} />
                </div>
            </main>
        </>
    );
};

export default menu;
