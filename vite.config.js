import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.pdf', '**/*.md', '**/*.glb', '**/*.gltf'],
	server: {
		fs: {
			allow: ['static']
		}
	}
});
