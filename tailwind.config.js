import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        apple: {
          bg: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            tertiary: 'var(--color-text-tertiary)',
          },
          accent: {
            purple: 'var(--color-accent-purple)',
            blue: 'var(--color-accent-blue)',
          },
          border: 'var(--color-border)',
        },
        primary: {
          DEFAULT: 'var(--color-text-primary)',
          foreground: 'var(--color-bg-primary)',
          purple: 'var(--color-accent-purple)',
          blue: 'var(--color-accent-blue)',
        },
        secondary: {
          DEFAULT: 'var(--color-bg-secondary)',
          foreground: 'var(--color-text-primary)',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'var(--color-bg-secondary)',
          foreground: 'var(--color-text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-bg-secondary)',
          foreground: 'var(--color-text-primary)',
        },
        background: 'var(--color-bg-primary)',
        foreground: 'var(--color-text-primary)',
        border: 'var(--color-border)',
        input: 'var(--color-border)',
        ring: 'var(--color-accent-blue)',
        neutral: {
          dark: 'var(--color-text-primary)',
          white: 'var(--color-bg-primary)',
          light: 'var(--color-bg-secondary)',
        },
      },
      borderRadius: {
        'apple-sm': 'var(--radius-sm)',
        'apple-md': 'var(--radius-md)',
        'apple-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'apple-sm': 'var(--shadow-sm)',
        'apple-md': 'var(--shadow-md)',
        'apple-lg': 'var(--shadow-lg)',
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
