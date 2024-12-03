import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp.jsx";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const SignUp = () => {
    const { signup, loading, error } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        try {
            await signup(email, password);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
        }
    };

    return (
        <div className="h-[87vh] bg-gradient-formal bg-fixed bg-cover flex items-center justify-center">
            <motion.div
                className="bg-white shadow-xl rounded-lg p-10 w-full max-w-lg relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Logo or Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        Welcome to{" "}
                        <span className="text-blue-600">Our Platform</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Create your account to get started.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-6 relative">
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
                    <div className="mb-6 relative">
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

                    {/* Confirm Password Input */}
                    <div className="mb-6 relative">
                        <FaLock className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full border ${
                                confirmPassword && password !== confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 ${
                                confirmPassword && password !== confirmPassword
                                    ? "focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            } transition duration-300 bg-gray-50`}
                            placeholder="Confirm Password"
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Password Mismatch Warning */}
                    {confirmPassword && password !== confirmPassword && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            Passwords do not match.
                        </p>
                    )}

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
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                    {/* Error Handling */}
                    {error && (
                        <motion.div
                            className="bg-red-100 border mt-6 border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md"
                            role="alert"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <strong className="font-bold">Error: </strong>
                            {error}
                        </motion.div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <motion.div
                            className="bg-green-100 border mt-6 border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md"
                            role="alert"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <strong className="font-bold">Success!</strong> Your
                            account has been created.
                        </motion.div>
                    )}
                </form>

                {/* Link to Login */}
                <div className="text-center mt-8">
                    <span className="text-gray-500">
                        Already have an account?{" "}
                    </span>
                    <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition duration-300"
                    >
                        Log in here!
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;
