import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/products/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shopping-cart/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#7b2d87",
        accent: "#d88cc4",
        background: "#fdf6fa",
        "text-primary": "#2e2a35",
        "text-secondary": "#6f5e73",

        // Pastel Complementarios
        "blue-pastel": "#c5d8f0",
        "yellow-pastel": "#fdf1c3",
        "brown-pastel": "#dbc4b0",
        "gold-pastel": "#f6e2a6",
        "green-pastel": "#c5e8c2",
      },
      fontFamily: {
        heading: ["'Barlow Semi Condensed'", "sans-serif"],
        body: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
