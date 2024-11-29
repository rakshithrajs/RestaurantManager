/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                "2/4-1/4": "6fr 1fr",
            },
            backgroundImage: {
                "gradient-formal":
                    "linear-gradient(to right, #f7f9fc, #eaeef3)",
            },
        },
        screens: {
            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "850px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
