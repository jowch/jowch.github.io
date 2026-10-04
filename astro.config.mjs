import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://jowch.github.io',
  trailingSlash: 'ignore',
  markdown: { syntaxHighlight: false },
  vite: { plugins: [tailwindcss()] },
})
