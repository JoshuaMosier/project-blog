import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

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
			rehypePlugins: [],
			smartypants: {
				dashes: 'oldschool'
			}
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
