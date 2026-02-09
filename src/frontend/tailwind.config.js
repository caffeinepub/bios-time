import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                parchment: 'oklch(0.95 0.02 45)',
                'amber-50': 'oklch(0.97 0.02 45)',
                'amber-100': 'oklch(0.92 0.04 45)',
                'amber-200': 'oklch(0.85 0.08 45)',
                'amber-600': 'oklch(0.60 0.15 45)',
                'amber-700': 'oklch(0.50 0.15 45)',
                'amber-800': 'oklch(0.40 0.12 45)',
                'amber-900': 'oklch(0.30 0.10 40)',
                'green-600': 'oklch(0.55 0.15 140)',
                'green-700': 'oklch(0.45 0.15 140)',
                'indigo-50': 'oklch(0.95 0.02 260)',
                'indigo-600': 'oklch(0.50 0.15 260)',
                'indigo-700': 'oklch(0.40 0.15 260)',
                'indigo-800': 'oklch(0.35 0.12 260)',
                'indigo-900': 'oklch(0.28 0.10 260)',
                'red-700': 'oklch(0.50 0.20 25)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            fontFamily: {
                serif: ['Georgia', 'Palatino', 'Times New Roman', 'serif'],
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'ritual-gradient-drift': {
                    '0%, 100%': {
                        transform: 'translateX(0) translateY(0)',
                        opacity: '0.5'
                    },
                    '50%': {
                        transform: 'translateX(2%) translateY(2%)',
                        opacity: '0.7'
                    }
                },
                'ritual-pulse': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: '0.8'
                    },
                    '50%': {
                        transform: 'scale(1.1)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'ritual-gradient-drift': 'ritual-gradient-drift 20s ease-in-out infinite',
                'ritual-pulse': 'ritual-pulse 1.28s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
