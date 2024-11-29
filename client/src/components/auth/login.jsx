import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const LogIn = () => {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="h-[87vh] flex items-center justify-center bg-gradient-formal">
            <motion.div
                className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Header */}
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4 relative">
                        <FaEnvelope className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-gray-50"
                            placeholder="Email Address"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <FaLock className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 bg-gray-50"
                            placeholder="Password"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="mb-6 flex items-center justify-between">
                        <label htmlFor="remember" className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                className="rounded text-blue-500 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-600">
                                Remember Me
                            </span>
                        </label>
                        <a
                            href="#"
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full shadow-md transform transition-transform duration-300 ${
                            loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:scale-105"
                        }`}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div
                            className="bg-red-100 border mt-6 border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md animate-fadeIn"
                            role="alert"
                        >
                            <strong className="font-bold">Error: </strong>
                            {error}
                        </div>
                    )}
                </form>

                {/* Link to Sign Up */}
                <div className="mt-6 text-center">
                    <span className="text-gray-600">
                        Don't have an account?{" "}
                    </span>
                    <Link
                        to="/signup"
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition duration-300"
                    >
                        Sign up here!
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LogIn;
