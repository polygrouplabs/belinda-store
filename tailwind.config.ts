import type { Config } from "tailwindcss";
const { addDynamicIconSelectors } = require('@iconify/tailwind')

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				grey: {
					'50': '#f2f2f2',
					light: '#e6e6e6',
					DEFAULT: '#cccccc',
					dark: '#4d4d4d'
				},
				gold: {
					'50': '#eee8de',
					light: '#ded2bd',
					DEFAULT: '#bca479',
					dark: '#a38d69'
				},
				pink: {
					'50': '#f3e9e4',
					light: '#f1ddda',
					DEFAULT: '#e2bab5',
					dark: '#a7776b'
				},
				black: '#000000',
				red: '#cc2b52',
				white: '#ffffff',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontSize: {
				'h2': ['40px', {
					lineHeight: '57px',
				}],
				'h3': ['24px', {
					lineHeight: '32px',
				}],
				'h4': ['20px', {
					lineHeight: '30px',
				}],
				'h5': ['16px', {
					lineHeight: '24px',
				}],
				'h6': ['14px', {
					lineHeight: '24px',
				}],
			},
		}
	},
	plugins: [require("tailwindcss-animate"), addDynamicIconSelectors()],
} satisfies Config;
