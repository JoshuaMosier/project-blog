// Import all .md files from the posts directory
const postFiles = import.meta.glob('/src/posts/**/*.md', { eager: true });

export const posts = Object.entries(postFiles)
    .filter(([_, post]) => post.metadata?.date)
    .map(([filepath, post]) => {
        const { metadata } = post;
        
        // Extract the post ID from the filepath
        const id = filepath.split('/').pop().replace('.md', '');
        
        // Handle date parsing
        let postDate;
        if (metadata.date instanceof Date) {
            postDate = metadata.date;
        } else if (typeof metadata.date === 'string') {
            // Ensure consistent timezone handling by setting to noon EST
            const dateString = `${metadata.date.split('T')[0]}T12:00:00-05:00`;
            postDate = new Date(dateString);
        } else {
            console.error(`Invalid date format for post ${id}: ${metadata.date}`);
            return null;
        }
        
        // Verify the date is valid
        if (isNaN(postDate.getTime())) {
            console.error(`Invalid date for post ${id}: ${metadata.date}`);
            return null;
        }
        
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
            year: postDate.getFullYear(),
            displayDate: postDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                timeZone: 'America/New_York'
            }),
            filepath,
            path: postBasePath
        };
    })
    .filter(post => post !== null);

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