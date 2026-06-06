import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green':  '#5B8F7A',
        'brand-mid':    '#3D6357',
        'brand-light':  '#8BBFAE',
        'bg-alt':       '#F8F9FA',
        'bg-dark':      '#1A2620',
        'text-primary': '#111111',
        'text-secondary': '#555555',
        'text-muted':   '#888888',
        'text-dark-muted': '#9CA89F',
        'border-subtle': '#E5E7EB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
