/** @type {import('tailwindcss').Config} */
export default {
	content: ['./views/**/*.pug'],
	theme: {
	  extend: {
		maxHeight: {
			'space': '690px',
		},
		colors: {
			redNCS: {
			  DEFAULT: "#33c3f7", // Nuevo valor para redNCS
			  light: "#33c3f7",  // Nuevo valor para la variante light
			},
			lightRedNCS: {
			  DEFAULT: "#FFFFFF",  // Nuevo valor para lightRedNCS
			},
			roseTaupe: {
			  DEFAULT: "#fff19a",  // Nuevo valor para roseTaupe
			},
			taupeGray: {
			  DEFAULT: "#5973be",  // Nuevo valor para taupeGray
			},
			white: {
			  DEFAULT: "#FFFFFF",  // Nuevo valor para blanco
			  dark: "#000000",     // Nuevo valor para negro
			},
			customBlue: '#5973BE',
		  },
		keyframes: {
		  fadeUp: {
			'0%': {
			  display: 'block',
			  opacity: '0',
			  transform: 'translateY(-20px)',
			},
			'10%': {
			  opacity: '1',
			  transform: 'translateY(0)',
			},
			'90%': {
			  opacity: '1',
			  transform: 'translateY(0)',
			},
			'100%': {
			  opacity: '0',
			  transform: 'translateY(20px)',
			  display: 'none',
			},
		  },
		  displayNone: {
			'0%': {
			  display: 'block',
			  marginTop: '-120px'
			},
			'100%': {
			  display: 'none',
			  marginTop: '-120px'
			},
		  }
		},
		animation: {
		  anim1: 'fadeUp 7s ease-in-out',
		  anim2: 'displayNone 7s'
		},
	  },
	},
	plugins: [],
  };
  