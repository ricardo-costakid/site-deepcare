import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#5B8F7A',
        'brand-mid':   '#3D6357',
        'brand-dark':  '#243D36',
        'bg-dark':     '#0A0F0D',
        'card-bg':     '#111814',
        'card-hover':  '#161D1A',
        'text-primary':   '#F5F5F3',
        'text-secondary': '#9CA89F',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
