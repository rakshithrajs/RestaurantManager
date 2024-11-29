import React, { useState } from "react";
import logo from "/logowithoutbg.png";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-gray-800 w-full text-white flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 md:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="flex justify-between items-center">
                <Link to="/">
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                        <h1 className="text-xl md:text-2xl font-semibold">
                            Restaurant Manager
                        </h1>
                    </div>
                </Link>
                {/* Hamburger Menu for Small Screens */}
                <button
                    onClick={toggleMenu}
                    className="text-white text-2xl md:hidden focus:outline-none"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav
                className={`${
                    menuOpen
                        ? "block absolute top-16 left-0 w-full bg-gray-800 z-40"
                        : "hidden"
                } md:block`}
            >
                <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left">
                    {user && (
                        <>
                            <li>
                                <Link
                                    to="/"
                                    onClick={
                                        window.innerWidth < 768
                                            ? () => toggleMenu()
                                            : null
                                    }
                                    className="block py-2 px-4 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
                                >
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/tables"
                                    onClick={
                                        window.innerWidth < 768
                                            ? () => toggleMenu()
                                            : null
                                    }
                                    className="block py-2 px-4 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
                                >
                                    Tables
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sales"
                                    onClick={
                                        window.innerWidth < 768
                                            ? () => toggleMenu()
                                            : null
                                    }
                                    className="block py-2 px-4 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
                                >
                                    Sales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/allorders"
                                    onClick={
                                        window.innerWidth < 768
                                            ? () => toggleMenu()
                                            : null
                                    }
                                    className="block py-2 px-4 text-lg font-medium hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
                                >
                                    Orders
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            {/* User Authentication Section */}
            <div className="md:mt-0 flex justify-end items-center space-x-4">
                {user ? (
                    <>
                        <span className="hidden md:block text-sm font-medium">
                            {user.data.email}
                        </span>
                        {!menuOpen && (
                            <button
                                onClick={handleLogout}
                                className="px-2 py-2 bg-red-500 rounded-full text-sm font-bold hover:bg-red-400 transition"
                            >
                                <IoLogOut />
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-gray-900 transition"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
