/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryRed: '#FC4747',
                primaryDarkBlue: '#10141E',
                primaryGrey: '#979797',
                secondaryDarkBlue: '#161D2F',
                greyishBlue: '#5A698F',
                primaryWhite: '#ffffff',
            },
            fontFamily: {
                Inter: ['Inter', 'sans-serif'],
            },
            screens: {
                xs: '375px',
            },
        },
        plugins: [],
    },
}
