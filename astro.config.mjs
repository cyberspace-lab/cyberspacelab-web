import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [vue(), tailwind(), mdx()],
  content: {collections: ['team']},
  site: 'https://cyberspacelab.cz',
  base: '/',
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
}); 