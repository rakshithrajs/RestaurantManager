import React from "react";
import logo from "/logowithoutbg.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const navbar = () => {
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    };
    const { user } = useAuthContext();
    return (
        <React.Fragment>
            <div className=" h-fit p-2 shadow-md grid grid-cols-2/4-1/4">
                <nav className=" place-content-end flex justify-center items-center gap-10">
                    <img
                        src={logo}
                        alt="logo"
                        height={100}
                        width={100}
                        className="cursor-pointer transition-all hover:scale-[1.1]"
                    />
                    <Link
                        to={"/"}
                        className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                    >
                        Menu
                    </Link>
                    <Link
                        to={"/tables"}
                        className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                    >
                        Tables
                    </Link>
                    <Link
                        to={"/sales"}
                        className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                    >
                        Sales
                    </Link>
                    <Link
                        to={"/allorders"}
                        className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                    >
                        Orders
                    </Link>
                </nav>
                {user && (
                    <div className="place-content-end flex items-center gap-6 mr-[2vw]">
                        <span>{user.data.email}</span>
                        <button
                            onClick={handleLogout}
                            className=" font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                        >
                            Log Out
                        </button>
                    </div>
                )}
                {!user && (
                    <div className=" place-content-end flex items-center gap-6 mr-[2vw]">
                        <Link
                            to={"/login"}
                            className="font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                        >
                            Log In
                        </Link>
                        <Link
                            to={"/signup"}
                            className="font-bold text-2xl cursor-pointer transition-all hover:scale-110"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default navbar;
