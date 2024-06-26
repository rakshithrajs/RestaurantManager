import React from "react";
import Menu from "../menu/menu.jsx";
import { useNavigate, useParams } from "react-router";

const placeOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div>
            <Menu id={id} />
            <button className=" mt-[2vw] mx-[16.5vw] text-teal-600 border border-teal-600 px-[1vw] py-[0.5vw]"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Go Back
            </button>
        </div>
    );
};

export default placeOrder;
