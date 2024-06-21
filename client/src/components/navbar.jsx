import React from "react";
import logo from '/logowithoutbg.png';
import { Link } from "react-router-dom";

const navbar = () => {
    return (
        <nav className=" h-fit p-2 shadow-md flex gap-10 items-center justify-center">
            <img src={logo} alt="logo" height={100} width={100} className="cursor-pointer transition-all hover:scale-[1.1]"/>
            <Link to={"/"} className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Menu</Link>
            <Link to={"/tables"} className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Tables</Link>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Sales</a>
            <a className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110">Orders</a>
        </nav>
    );
};

export default navbar;
