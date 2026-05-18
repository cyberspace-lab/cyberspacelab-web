/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:   '#0070f3',
        secondary: '#ff0080',
        'csl-cyan':    '#00f0ff',
        'csl-violet':  '#b300ff',
        'csl-magenta': '#ff0080',
        'csl-amber':   '#ffb347',
        'csl-void':    '#05010f',
        'csl-midnight':'#0a0420',
        'csl-deep':    '#14082e',
        'csl-panel':   '#1c0d3f',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} 