import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = { kit: { adapter: adapter({runtime:"experimental_bun1.x"}) } };

export default config;
