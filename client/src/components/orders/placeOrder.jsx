import React from "react";
import { useNavigate, useParams } from "react-router";

import Menu from "../menu/menu.jsx";
import Order from "./order.jsx";

const PlaceOrder = () => {
    //for navigation to previous page
    const navigate = useNavigate();

    //getting that table's order
    const { id } = useParams();

    return (
        <div className="p-[0.42rem] bg-gradient-to-br from-gray-100 to-gray-400 flex flex-col">
            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 p-6 lg:h-[80vh]">
                {/* Menu Section */}
                <Menu id={id} />

                {/* Order Section */}
                <Order id={id} />
            </div>

            {/* Footer Section */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate(-1)}
                    className="px-8 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-transform duration-200 transform hover:scale-105"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default PlaceOrder;
