/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 科技风主色板
        primary: {
          cyan: '#22D3EE',
          purple: '#A855F7',
          indigo: '#6366F1',
        },
        bg: {
          DEFAULT: '#0B1120',
          soft: '#111827',
          card: '#1E293B',
        },
        ink: {
          DEFAULT: '#E2E8F0',
          muted: '#94A3B8',
        },
        func: {
          green: '#34D399',
          red: '#F87171',
          amber: '#FBBF24',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.25)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #22D3EE 0%, #6366F1 50%, #A855F7 100%)',
      },
    },
  },
  plugins: [],
};
