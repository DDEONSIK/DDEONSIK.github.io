/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            colors: {
                // Custom palette from ColorHunt #F1F6F9 #394867 #212A3E #9BA4B5
                background: "#F1F6F9", // Light Grey/White
                foreground: "#212A3E", // Dark Navy (Text)
                primary: {
                    DEFAULT: "#394867", // Dark Blue
                    foreground: "#F1F6F9",
                },
                secondary: {
                    DEFAULT: "#9BA4B5", // Cool Grey
                    foreground: "#212A3E",
                },
                muted: {
                    DEFAULT: "#DBE2EF", // Lighter grey for backgrounds
                    foreground: "#5B6C8C",
                },
                accent: {
                    DEFAULT: "#3F72AF", // Slightly brighter blue for accents
                    foreground: "#F1F6F9",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#212A3E",
                },
                border: "#9BA4B5", // Using Secondary for borders
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.4s ease-out',
            },
        },
    },
    plugins: [],
}
