import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypePrism from 'rehype-prism-plus';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: 'src/lib/MarkdownLayout.svelte'
			},
			remarkPlugins: [],
			rehypePlugins: [rehypePrism],
			smartypants: {
				dashes: 'oldschool'
			},
			preserve: ['html']
		})
	],
	kit: {
		adapter: adapter(),
		files: {
			assets: 'static'
		},
		paths: {
			base: ''
		}
	}
};

export default config;
