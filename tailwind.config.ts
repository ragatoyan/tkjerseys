import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch:    '#080808',   // near-black background
        surface:  '#111114',   // card surface
        elevated: '#1C1C21',   // elevated card / hover
        border:   '#2A2A32',   // borders
        muted:    '#6B6B7B',   // secondary text
        gold:     '#C8A44A',   // brand gold
        'gold-dim': '#8A6E2E', // muted gold for borders
        'gold-light': '#DFC068', // highlight gold
        chalk:    '#F4F4F5',   // near-white text
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
