const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		fontFamily: {
			Inter: ['Inter', 'sans-serif']
		},
		extend: {
			animation: {},
			colors: {
				brand: {
					green: {
						light: '#6BB370',
						dark: '#305B33'
					},
					lemon: {
						light: '#F2EAC2',
						dark: '#DAD0A3'
					},
					white: '#F2F2F2',
					red: '#CC6666'
				}
			}
		}
	},

	// plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
