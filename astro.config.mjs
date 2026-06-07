// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages user site — served at the root URL (no base path needed).
  site: 'https://muttayyab-13.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
