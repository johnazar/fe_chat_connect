/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                primary: '#084c61',
                secondary: '#db504a',
                tertiary: '#e3b505',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                serif: ['Roboto', 'serif'],
            },
        },
    },
    plugins: [],
};
