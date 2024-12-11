import { error } from '@sveltejs/kit';
import { getPost } from '$lib/posts';

export async function load({ params }) {
    try {
        const post = getPost(params.slug);
        if (!post) {
            throw error(404, `Post not found`);
        }

        try {
            const content = await import(`../../../posts/${params.slug}.md`);
            return {
                content: content.default,
                metadata: content.metadata
            };
        } catch (importError) {
            throw error(404, `Post content not found`);
        }
    } catch (e) {
        throw error(404, `Post not found`);
    }
} 