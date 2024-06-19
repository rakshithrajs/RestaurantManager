import React from "react";
import logo from '/logowithoutbg.png';
const navbar = () => {
    return (
        <nav className=" h-fit p-2 shadow-md flex gap-10 items-center justify-center">
            <img src={logo} alt="logo" height={100} width={100} className="cursor-pointer transition-all hover:scale-[1.1]"/>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Menu</a>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Tables</a>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Sales</a>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Orders</a>
        </nav>
    );
};

export default navbar;
