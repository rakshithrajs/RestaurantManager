import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp.jsx";

const signUp = () => {
    const { signup, loading, error } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="mt-[10vw] flex justify-center items-center">
            <div className=" w-1/4 ">
                <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
                <form action="#" method="POST">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">
                            Email
                        </label>
                        <input
                            autoComplete="off"
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            autoComplete="off"
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        className={
                            !loading
                                ? "bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                                : "bg-blue-500 opacity-50 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                        }
                    >
                        Sign Up
                    </button>
                    {error && (
                        <div
                            className="bg-red-100 border mt-[1vw] border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">{error}</strong>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default signUp;
