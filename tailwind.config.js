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
			light: '#ff455e',
			DEFAULT: '#ff1b3a',
		  },
		  lightRedNCS: {
			DEFAULT: '#fff2f4'
		  },
		  roseTaupe: {
			DEFAULT: '#e58b8b'
		  },
		  taupeGray: {
			DEFAULT: '#c3b3b3'
		  },
		  white: {
			DEFAULT: '#fff',
			dark: '#f7f7f7'
		  }
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
  