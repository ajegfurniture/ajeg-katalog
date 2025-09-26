import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#45A091',
        'dark-green': '#0D1B1A',
        'light-bg': '#F7FCFA',
        'border-light': '#E6E8EA',
        'border-medium': '#E6F0ED',
      },
    },
  },
  plugins: [],
};

export default config;
