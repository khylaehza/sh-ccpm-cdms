/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: { montserrat: ['Montserrat', 'sans-serif'] },
			colors: {
				primary: '#123A6D',
				secondary: '#FE8410',
			},
		},
	},
	plugins: [],
};
