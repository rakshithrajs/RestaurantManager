import React, { useContext, useEffect, useState } from "react";
import edit from "/edit.png";
import rupee from "../../utils/currencyFormatter.jsx";
import api from "../../api/api.jsx";
import { capitalize } from "../../utils/capitalize.jsx";
import available from "/available.png";
import notavailable from "/notavailable.png";
import deleteImg from "/delete.png";
import EditItem from "./editItem.jsx";
import { menuState } from "../../contexts/menuContext.jsx";
import "./styles/menuItems.modules.css";

const menuItems = () => {
    const [editForm, setEditForm] = useState(false);
    const [edited, setEdited] = useState({
        item: "",
        price: 0.0,
        availability: false,
        veg_or_nonveg: "",
        description: "",
        category: "",
    });
    const [items, setItems] = useState([]);
    const [render, setRender] = useContext(menuState);
    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await api.get("/menu");
                setItems(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getItems();
    }, [render]);
    const tobeEdited = (id) => {
        items.find((i) => {
            if (i._id == id) {
                setEdited(i)
            }
        });
    };
    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await api.delete(`/menu/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
        setRender(render + 1);
    };
    const [idi, setId] = useState(0);
    return (
        <ol>
            {editForm && (
                <EditItem
                    isVisible={editForm}
                    setIsVisible={setEditForm}
                    id={idi}
                    editItem = {edited}
                />
            )}
            {items.map((i, index) => (
                <li
                    key={i._id}
                    className="grid grid-cols-6-i text-[1.5vw] p-3 transition-all duration-100 hover:bg-orange-400 rounded-md"
                >
                    <span>{index + 1}</span>
                    <p className=" flex flex-col justify-center font-semibold">
                        {capitalize(i.item)}
                        <span className="font-thin text-[1.3vw]">
                            {i.description}
                        </span>
                    </p>
                    <span>{rupee.format(i.price)}</span>
                    <span>
                        {i.availability ? (
                            <img
                                src={available}
                                alt="Available"
                                className=" h-8 w-8"
                            />
                        ) : (
                            <img
                                src={notavailable}
                                alt="Not Available"
                                className=" h-8 w-8"
                            />
                        )}
                    </span>
                    <button
                        onClick={() => {
                            setEditForm(true);
                            setId(i._id);
                            tobeEdited(i._id);
                        }}
                    >
                        <img src={edit} alt="edit" className="h-10 w-10" />
                    </button>
                    <button
                        onClick={() => {
                            handleDelete(i._id);
                        }}
                    >
                        <img
                            src={deleteImg}
                            alt="delete"
                            className=" h-10 w-10"
                        />
                    </button>
                </li>
            ))}
        </ol>
    );
};

export default menuItems;
