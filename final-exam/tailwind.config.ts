import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        text: '#242424',
        darkText: '#213547',
        link: '#2e78ae',
        button: {
          DEFAULT: '#306fa0',
          hover: '#2e78ae',
        },
        background: '#ffffff',
      },
    },
  },
  plugins: [],
}

export default config