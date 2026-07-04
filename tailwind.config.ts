import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0B0D',
        carbon: '#121418',
        graphite: '#1C1F24',
        chrome: '#E8EAED',
        mist: '#9AA0A8',
        ember: '#FF4D2E',
        emberdim: '#B8331C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.04em' },
    },
  },
  plugins: [],
};
export default config;
