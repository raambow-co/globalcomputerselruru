/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gc-red': {
          DEFAULT: '#E51E2B',
          hover: '#D11724',
          active: '#BA121E',
          tint: '#FFF0F1',
          glow: 'rgba(229, 30, 43, 0.28)'
        },
        'gc-charcoal': {
          DEFAULT: '#0E1117',
          muted: '#1C2028',
          secondary: '#4A5364'
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'red-cta': '0 10px 28px -4px rgba(229, 30, 43, 0.38)',
        'red-hover': '0 14px 34px -4px rgba(229, 30, 43, 0.5)',
        'glass-card': '0 20px 50px -10px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(15, 23, 42, 0.04)',
        'product-3d': '0 30px 60px -12px rgba(15, 23, 42, 0.18)'
      },
      keyframes: {
        floatSlow1: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-8deg)' },
          '50%': { transform: 'translate3d(8px, -12px, 0) rotate(-6deg)' },
          '100%': { transform: 'translate3d(-6px, 6px, 0) rotate(-9deg)' }
        },
        floatSlow2: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(6deg)' },
          '50%': { transform: 'translate3d(-8px, -14px, 0) rotate(4deg)' },
          '100%': { transform: 'translate3d(6px, -4px, 0) rotate(7deg)' }
        },
        floatSlow3: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-14deg)' },
          '50%': { transform: 'translate3d(6px, -10px, 0) rotate(-12deg)' },
          '100%': { transform: 'translate3d(-4px, 4px, 0) rotate(-15deg)' }
        },
        floatMain: {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(2deg)' },
          '50%': { transform: 'translate3d(-6px, -12px, 0) rotate(3deg)' },
          '100%': { transform: 'translate3d(4px, -6px, 0) rotate(1deg)' }
        },
        pulseGreen: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.3)' }
        }
      },
      animation: {
        'float-1': 'floatSlow1 9s ease-in-out infinite alternate',
        'float-2': 'floatSlow2 10s ease-in-out infinite alternate',
        'float-3': 'floatSlow3 8s ease-in-out infinite alternate',
        'float-main': 'floatMain 11s ease-in-out infinite alternate',
        'pulse-green': 'pulseGreen 2.2s infinite'
      }
    },
  },
  plugins: [],
}
