import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter({ runtime: 'experimental_bun1.x' }) },
	preprocess: [vitePreprocess({ style: true, script: true })],
	extensions: ['.svelte', '.svx']
};

export default config;
