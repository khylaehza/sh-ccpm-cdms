/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: { montserrat: ['Montserrat', 'sans-serif'] },
			colors: {
				primary: '#123A6D',
				primary50: '#19467d',
				secondary: '#FE8410',
			},
		},
	},
	plugins: [],
};
