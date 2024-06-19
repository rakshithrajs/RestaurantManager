import React, { useState, useEffect } from "react";
import MenuItems from "./menuItems";
import "./menu.modules.css";
import plus from "/plus.png";
import AddItem from "./addItem";
import axios from "../api/api.jsx";

const menu = () => {
    const [itemForm, setItemForm] = useState(false);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/category");
                setCategory(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchCategories();
    }, []);
    return (
        <>
            <AddItem
                isVisible={itemForm}
                setIsVisible={setItemForm}
                category={category}
            />
            <main className=" bg-orange-300 w-2/3 rounded-lg m-auto mt-8">
                <div className=" p-4 flex items-center justify-center gap-8">
                    <h1 className=" text-4xl font-bold text-center font-mono">
                        Menu
                    </h1>
                    <button
                        className="cursor-pointer transition-all hover:scale-110 focus:outline-none "
                        onClick={() => {
                            setItemForm(!itemForm);
                        }}
                    >
                        <img src={plus} alt="add item" height={30} width={30} />
                    </button>
                </div>
                <MenuItems
                    category={category}
                    setIsVisible={setItemForm}
                />
            </main>
        </>
    );
};

export default menu;
