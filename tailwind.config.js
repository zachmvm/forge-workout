/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink:        '#0C100E',
        panel:      '#141A16',
        'panel-2':  '#1B2219',
        'panel-3':  '#232C20',
        edge:       '#2A3327',
        'edge-2':   '#3A4536',
        bone:       '#E8E2D4',
        dim:        '#B5B0A4',
        mute:       '#7E867A',
        'mute-2':   '#555B52',
        lime:       '#D4FF3A',
        'lime-2':   '#B8E62A',
        'lime-dim': '#7F9A1F',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,255,58,0.35), 0 12px 40px rgba(212,255,58,0.15)',
      },
      letterSpacing: {
        tightish: '-0.02em',
        tighter2: '-0.035em',
      },
    },
  },
  plugins: [],
}
