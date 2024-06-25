import api from "../../api/api.jsx";
import { useContext } from "react";
import { renderState } from "../../contexts/menuContext.jsx";

const table = ({ table, isOpen, setIsOpen }) => {
    if (!isOpen) return null;
    const [render, setRender] = useContext(renderState);
    const handleCheckout = async () => {
        try {
            const response = await api.delete(`/tables/${table._id}`);
            console.log(response.data);
            setIsOpen(!isOpen);
            setRender(render + 1);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className=" fixed inset-0 bg-teal-100 bg-opacity-60 backdrop-blur-md flex justify-center items-center">
            <div className="flex flex-col items-center size-[65.1vw] space-y-[1vw] bg-teal-200 bg-opacity-50 rounded-full pt-[10vw]">
                <h1 className="text-[1.5vw]">Table No: {table.tableNo}</h1>
                <h1 className="text-[1.5vw]">
                    Customer Name: {table.customerName}
                </h1>
                <p className="text-[3vw] font-semibold">Order Details</p>
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default table;
