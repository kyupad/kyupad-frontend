/* eslint-disable quote-props */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const darkMode = ['class'];
const content = ['./src/**/*.{ts,tsx}'];
const prefix = '';
const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
    },
  },
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      button: {
        primary: {
          DEFAULT: 'var(--button-primary)',
          hover: 'var(--button-primary-hover)',
          border: 'var(--button-primary-border)',
        },
        secondary: {
          DEFAULT: 'var(--button-secondary)',
          hover: 'var(--button-secondary-hover)',
        },
      },
      'kyu-color-1': '#fff9eb',
      'kyu-color-2': '#fdedc8',
      'kyu-color-3': '#fcd88b',
      'kyu-color-4': '#fabf52',
      'kyu-color-5': '#f2820e',
      'kyu-color-6': '#d8d9df',
      'kyu-color-7': '#b6b7c3',
      'kyu-color-8': '#5a5b6f',
      'kyu-color-9': '#3f3f4d',
      'kyu-color-10': '#31313a',
      'kyu-color-11': '#25252c',
      'kyu-color-12': '#f7f7f8',
      'kyu-color-13': '#f8a627',
      'kyu-color-14': '#85879b',
      'kyu-color-15': '#4A4A5A',
      'kyu-color-16': '#EEEDF1',
      'kyu-color-17': '#18CF6A',
      'kyu-color-18': '#EC5347',
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      shine: {
        '100%': { left: '125%' },
      },
    },
    animation: {
      shine: 'shine 1s',
      'shine-loop': 'shine 1s infinite linear',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
    maxWidth: {
      '8xl': '1440px',
    },
    backgroundImage: {
      'golden-cloud': "url('/images/home/golden-cloud.png')",
      'light-blue-cloud': "url('/images/home/kyupad-bg-home.png')",
    },
  },
};
const plugins = [require('tailwindcss-animate')];

// eslint-disable-next-line import/no-unused-modules
export { plugins, content, darkMode, prefix, theme };
