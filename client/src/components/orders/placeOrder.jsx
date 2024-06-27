import React from "react";
import Menu from "../menu/menu.jsx";
import Order from "./order.jsx";
import { useNavigate, useParams } from "react-router";

const placeOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <>
            <div className="flex">
                <Menu id={id} />
                <Order id={id} />
            </div>
            <button
                className=" mt-[2vw] ml-[2vw] text-teal-600 border border-teal-600 px-[1vw] py-[0.5vw]"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Go Back
            </button>
        </>
    );
};

export default placeOrder;
