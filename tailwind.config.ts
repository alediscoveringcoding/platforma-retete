import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#1c1c1c', // Negru-cărbune
                foreground: '#f5f0e8', // Alb-crem
                primary: '#d4c4a8',      // Bej-nisipiu pentru accente
                'primary-foreground': '#1c1c1c', // Text închis pentru butoane
                card: '#2a2a2a',        // Gri închis pentru fundalul cardurilor
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-playfair)', 'serif'], // Am schimbat Poppins cu Playfair
            },
        },
    },
    plugins: [],
};
export default config;