// Import all .md files from the posts directory
const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });

export const posts = Object.entries(postFiles).map(([filepath, post]) => {
    const { metadata } = post;
    
    // Extract the post ID from the filepath (filename without .md)
    const id = filepath.split('/').pop().replace('.md', '');
    const year = new Date(metadata.date).getFullYear();
    
    // Get the base path for this post
    const postBasePath = `/posts/${id}`;
    
    // Handle the metadata image path
    if (metadata.image) {
        metadata.image = metadata.image.startsWith('./') 
            ? `/posts/${id}/${metadata.image.slice(2)}`
            : metadata.image;
    }

    return {
        ...metadata,
        id,
        year,
        displayDate: new Date(metadata.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }),
        filepath,
        path: postBasePath
    };
});

export function getPost(slug) {
    return posts.find(post => post.id === slug);
}

export function getPostsByYear() {
    return posts.reduce((acc, post) => {
        const year = post.year;
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {});
} 