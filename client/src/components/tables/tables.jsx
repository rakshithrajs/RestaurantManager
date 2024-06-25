import React, { useState } from "react";
import AddTable from "./addTable.jsx";
import plus from "/plus.png";

const tables = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="relative">
            <AddTable isOpen={isActive} setIsOpen={setIsActive} />
            <h1 className=" text-center text-3xl font-bold">Live Tables</h1>
            <button
                onClick={() => {
                    setIsActive(!isActive);
                }}
                className=" fixed bg-blue-700 text-white bg-opacity-80 p-[0.5vw] bottom-[3vw] left-[3vw] rounded-full"
            >
                <img src={plus} alt="Add Table" className=" size-12 invert" />
            </button>
            <main className="flex items-center justify-center gap-10 mt-8 flex-wrap">
                <button className="flex justify-center items-center cursor-pointer size-[200px] rounded-full bg-sky-500 bg-opacity-55 border border-black transition-all hover:bg-opacity-65 hover:scale-105 hover:font-extrabold">
                    <h1 className="text-3xl font-bold ">1</h1>
                </button>
            </main>
        </div>
    );
};

export default tables;
