import { categories } from './config';

// Utility functions
function parsePostDate(dateInput) {
    if (dateInput instanceof Date) return dateInput;
    if (typeof dateInput !== 'string') {
        throw new Error(`Invalid date format: ${dateInput}`);
    }
    
    // Ensure consistent timezone handling by setting to noon EST
    const dateString = `${dateInput.split('T')[0]}T12:00:00-05:00`;
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${dateInput}`);
    }
    
    return date;
}

function formatDisplayDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'America/New_York'
    });
}

function processPostMetadata(filepath, metadata) {
    try {
        const id = filepath.split('/').pop().replace('.md', '');
        const postDate = parsePostDate(metadata.date);
        const postBasePath = `/posts/${id}`;
        
        // Process image path
        const image = metadata.image?.startsWith('./') 
            ? `/posts/${id}/${metadata.image.slice(2)}`
            : metadata.image;
            
        // Validate categories
        const validCategories = metadata.categories?.filter(cat => categories[cat]) ?? [];
        
        return {
            ...metadata,
            id,
            year: postDate.getFullYear(),
            displayDate: formatDisplayDate(postDate),
            filepath,
            path: postBasePath,
            image,
            categories: validCategories
        };
    } catch (error) {
        console.error(`Error processing post ${filepath}:`, error);
        return null;
    }
}

// Import all .md files from the posts directory
const postFiles = import.meta.glob('/src/posts/**/*.md', { eager: true });

// Process and sort posts
export const posts = Object.entries(postFiles)
    .filter(([_, post]) => post.metadata?.date)
    .map(([filepath, post]) => processPostMetadata(filepath, post.metadata))
    .filter(post => post !== null)
    .sort((a, b) => {
        const dateA = parsePostDate(a.date);
        const dateB = parsePostDate(b.date);
        return dateB - dateA;
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