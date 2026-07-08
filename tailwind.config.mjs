/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 语义色指向 RGB 通道变量，支持 /透明度 修饰符（如 bg-primary-cyan/15）
        // 变量定义见 global.css 的 :root(浅色) / html.dark(深色)
        primary: {
          cyan: 'rgb(var(--c-primary-cyan) / <alpha-value>)',
          purple: 'rgb(var(--c-primary-purple) / <alpha-value>)',
          indigo: 'rgb(var(--c-primary-indigo) / <alpha-value>)',
        },
        bg: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          soft: 'rgb(var(--c-bg-soft) / <alpha-value>)',
          card: 'rgb(var(--c-bg-card) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-ink-soft) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-muted) / <alpha-value>)',
        },
        func: {
          green: 'rgb(var(--c-func-green) / <alpha-value>)',
          red: 'rgb(var(--c-func-red) / <alpha-value>)',
          amber: 'rgb(var(--c-func-amber) / <alpha-value>)',
          blue: 'rgb(var(--c-func-blue) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: 'var(--glow)',
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-gradient)',
      },
    },
  },
  plugins: [],
};
