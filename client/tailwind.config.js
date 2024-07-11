/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            //add a custom grid template column where there are 2 columns where 1 occupies 3/4 space
            //and the other occupies 1/4 space
            gridTemplateColumns: {
                "2/4-1/4": "6fr 1fr",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
