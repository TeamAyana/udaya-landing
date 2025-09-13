import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        udaya: {
          sage: '#5C7B65',      // Primary green
          white: '#FFFFFF',     // Pure white
          cream: '#F6F2E6',     // Light cream background
          gold: '#D9A441',      // Accent gold
          terracotta: '#C98A6D', // Warm terracotta
          charcoal: '#2B2B2B',  // Text color
        },
        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#5C7B65',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F6F2E6',
          foreground: '#2B2B2B',
        },
        accent: {
          DEFAULT: '#D9A441',
          foreground: '#2B2B2B',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.25rem, 3vw, 1.875rem)', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section': 'clamp(3rem, 10vw, 6rem)',
        'container': '90rem', // 1440px
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'lotus-bloom': 'lotusBloom 2s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lotusBloom: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sunrise': 'linear-gradient(180deg, #D9A441 0%, #F6F2E6 50%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}
export default config